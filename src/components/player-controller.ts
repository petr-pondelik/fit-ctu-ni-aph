import * as ECS from '../../libs/pixi-ecs';
import {Direction, getMovementDirection, MovementVector, PlayerPosition} from '../model/movement';
import {Attributes} from '../constants/constants';
import GameState from '../model/states/game-state';
import {MapPosition, MapTile} from '../model/game-struct';
import {SPRITE_SIZE} from "../constants/config";


export default class PlayerController extends ECS.Component {

	vector: MovementVector = {x: 0, y: 0}

	move() {
		if (this.vector.x !== 0 || this.vector.y !== 0) {
			let levelState = this.scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE).currentLevel;
			let playerState = levelState.playerState;
			// console.log(levelState.levelData.map);
			// console.log(playerState);

			console.log(this.vector);

			// console.log([this.owner.position.x, this.owner.position.y]);
			// console.log(playerState.position);

			let surroundingTiles: MapPosition[] = this.findSurroundingTiles();
			// console.log(surroundingTiles);

			// TODO: Check collisions with surrounding
			let collision = this.checkCollisions(surroundingTiles);

			if (!collision) {
				console.log('MOVE');
				this.owner.parentGameObject.position.x -= this.vector.x;
				this.owner.parentGameObject.position.y -= this.vector.y;
				this.owner.position.x += this.vector.x;
				this.owner.position.y += this.vector.y;
				playerState.applyMovement(this.vector);
			}
		}
	}

	findSurroundingTiles() {

		let newX = this.owner.position.x + this.vector.x;
		let newY = this.owner.position.y + this.vector.y;

		/**
		 *  topL    |   topM    | topR
		 *             -------
		 *  leftM   |   Player  | rightM
		 *             -------
		 *  bottomL |  bottomM  | bottomR
		 *
		 */

		let topL: MapPosition = {
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let topM: MapPosition = {
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let topR: MapPosition = {
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let rightM: MapPosition = {
			row: Math.floor((newY + 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let bottomR: MapPosition = {
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let bottomM: MapPosition = {
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let bottomL: MapPosition = {
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		let leftM: MapPosition = {
			row: Math.floor((newY + 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.5 * SPRITE_SIZE) / SPRITE_SIZE)
		};

		// TODO: Filter surrounding to unique tiles

		return [topL, topM, topR, rightM, bottomR, bottomM, bottomL, leftM];
	}

	checkCollisions(surroundingTiles: MapPosition[]): bool {

		let bounds = this.owner.getBounds();
		// console.log(bounds);

		let topBound = bounds.top;
		let rightBound = bounds.right;
		let bottomBound = bounds.bottom;
		let leftBound = bounds.left;

		/**
		 * The following situations leads into collision:
		 *  - player's top bound colliding with topL, topM, topR bottom bound
		 *
		 * */

		for (const pos of surroundingTiles) {
			let tileFrame = this.owner.parentGameObject.getChildByName(`tile_${pos.row}_${pos.column}`);
			// console.log(tileFrame.getBounds());
			let tileModel = this.scene.stage.getAttribute<GameState>(Attributes.GAME_STATE).currentLevel.getMapTile(pos.row, pos.column);
			/** Check the top tiles collision */
			if (this.vector.y < 0) {
				if (topBound > tileFrame.getBounds().top) {
					// console.log(tileModel);
					// console.log([topBound, tileFrame.getBounds().bottom]);
					if (
						!tileModel.isSteppable
						&& (tileFrame.getBounds().bottom - topBound) > this.vector.y
						&& (
							(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
							(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
						)
					) {
						console.log(tileFrame.getBounds().bottom - topBound);
						console.log(this.vector.y);
						console.log('COLLIDED');
						console.log([bounds.right, tileFrame.getBounds().left]);
						this.vector.y = tileFrame.getBounds().bottom - topBound;
						console.log(this.vector.y);
					}
				}
			}
			if (this.vector.x > 0) {
				if(rightBound < tileFrame.getBounds().right) {
					// console.log(tileModel);
					// console.log([topBound, tileFrame.getBounds().bottom]);
					if (
						!tileModel.isSteppable
						&& (tileFrame.getBounds().left - rightBound < this.vector.x)
						&& (topBound < tileFrame.getBounds().bottom && bottomBound > tileFrame.getBounds().top || topBound > tileFrame.getBounds().bottom && bottomBound < tileFrame.getBounds().top)
					)
						// && (
						// 	(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
						// 	(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
						// )
					{
						console.log([bottomBound, tileFrame.getBounds().top]);
						console.log('COLLIDED');
						// console.log([bounds.right, tileFrame.getBounds().left]);
						this.vector.x = tileFrame.getBounds().left - rightBound;
						return false;
					}
				}
			}
		}

		return false;
	}

}