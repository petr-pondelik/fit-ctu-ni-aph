import * as ECS from '../../libs/pixi-ecs';
import {MovementVector} from '../model/movement';
import {Attributes} from '../constants/constants';
import GameState from '../model/states/game-state';
import {MapPosition} from '../model/game-struct';
import {SPRITE_SIZE} from '../constants/config';


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

			let surroundingTiles: MapPosition[] = this.exploreSurrounding();
			console.log(surroundingTiles);

			let canMove: boolean = this.limitMovement(surroundingTiles);
			console.log(canMove);

			if (canMove) {
				console.log('MOVE');
				this.owner.parentGameObject.position.x -= this.vector.x;
				this.owner.parentGameObject.position.y -= this.vector.y;
				this.owner.position.x += this.vector.x;
				this.owner.position.y += this.vector.y;
				playerState.applyMovement(this.vector);
			}
		}
	}

	exploreSurrounding() {

		let newX = this.owner.position.x + this.vector.x;
		let newY = this.owner.position.y + this.vector.y;

		let surrounding: MapPosition[] = [];

		/**
		 *  topL    |   topM    | topR
		 *             -------
		 *  leftM   |   Player  | rightM
		 *             -------
		 *  bottomL |  bottomM  | bottomR
		 */

		// Top-Left
		surrounding.push({
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Top-Middle
		surrounding.push({
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Top-Right
		surrounding.push({
			row: Math.floor((newY - 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Right-Middle
		surrounding.push({
			row: Math.floor((newY + 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Bottom-Right
		surrounding.push({
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 1.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Bottom-Middle
		surrounding.push({
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX + 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Bottom-Left
		surrounding.push({
			row: Math.floor((newY + 1.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.25 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// Left-Middle
		surrounding.push({
			row: Math.floor((newY + 0.25 * SPRITE_SIZE) / SPRITE_SIZE),
			column: Math.floor((newX - 0.5 * SPRITE_SIZE) / SPRITE_SIZE)
		});

		// TODO: Filter surrounding to unique tiles

		return surrounding;
	}

	limitMovement(surrounding: MapPosition[]): boolean {

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

		for (const pos of surrounding) {
			let tileFrame = this.owner.parentGameObject.getChildByName(`tile_${pos.row}_${pos.column}`);
			let tileModel = this.scene.stage.getAttribute<GameState>(Attributes.GAME_STATE).currentLevel.getMapTile(pos.row, pos.column);
			/** Check the top tiles collision */
			if (this.vector.y < 0) {
				if (topBound > tileFrame.getBounds().top) {
					if (
						!tileModel.isAccessible
						&& (tileFrame.getBounds().bottom - topBound) > this.vector.y
						&& (
							(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
							(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
						)
					) {
						this.vector.y = tileFrame.getBounds().bottom - topBound;
					}
				}
			}
			if (this.vector.x > 0) {
				if (rightBound < tileFrame.getBounds().right) {
					if (
						!tileModel.isAccessible
						&& (tileFrame.getBounds().left - rightBound < this.vector.x)
						&& (
							topBound < tileFrame.getBounds().bottom && bottomBound > tileFrame.getBounds().top ||
							topBound > tileFrame.getBounds().bottom && bottomBound < tileFrame.getBounds().top
						)
					) {
						this.vector.x = tileFrame.getBounds().left - rightBound;
					}
				}
			}
			if (this.vector.y > 0) {
				if (bottomBound < tileFrame.getBounds().bottom) {
					if (
						!tileModel.isAccessible
						&& (tileFrame.getBounds().top - bottomBound) < this.vector.y
						&& (
							(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
							(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
						)
					) {
						this.vector.y = tileFrame.getBounds().top - bottomBound;
					}
				}
			}
			if (this.vector.x < 0) {
				if (leftBound > tileFrame.getBounds().left) {
					if (
						!tileModel.isAccessible
						&& (tileFrame.getBounds().right - leftBound > this.vector.x)
						&& (
							topBound < tileFrame.getBounds().bottom && bottomBound > tileFrame.getBounds().top ||
							topBound > tileFrame.getBounds().bottom && bottomBound < tileFrame.getBounds().top
						)
					) {
						this.vector.x = tileFrame.getBounds().right - leftBound;
					}
				}
			}
		}

		return this.vector.x !== 0.0 || this.vector.y !== 0.0;
	}

}