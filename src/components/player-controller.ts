import * as ECS from '../../libs/pixi-ecs';
import {Vector2D} from '../model/geometry';
import {GridPosition, MapTile} from '../model/game-struct';
import {BLOCK_SIZE} from '../constants/config';
import LevelState from '../model/states/level-state';
import {Selectors} from '../helpers/selectors';
import {adjustMovementByObstacles} from '../helpers/grid';


export default class PlayerController extends ECS.Component {

	vector: Vector2D = {x: 0, y: 0}

	move() {
		if (this.vector.x !== 0 || this.vector.y !== 0) {
			let levelState = Selectors.levelStateSelector(this.scene);
			let playerState = levelState.playerState;
			let newX = this.owner.position.x + this.vector.x;
			let newY = this.owner.position.y + this.vector.y;
			let surroundingTiles = levelState.map.getSurrounding(newX, newY);
			this.vector = adjustMovementByObstacles(surroundingTiles, this.owner, this.vector);
			if (this.vector.x !== 0.0 || this.vector.y !== 0.0) {
				playerState.applyMovement(this.vector);
			}
		}
	}

	exploreSurrounding(levelState: LevelState) {
		let newX = this.owner.position.x + this.vector.x;
		let newY = this.owner.position.y + this.vector.y;

		let surrounding: MapTile[] = [];

		/**
		 *  topL    |   topM    | topR
		 *             -------
		 *  leftM   |   Player  | rightM
		 *             -------
		 *  bottomL |  bottomM  | bottomR
		 */

		let exploringShifts = [
			[ -1, -1 ], // Top-Left
			[ -1, 0 ], // Top-Middle
			[ -1, 1 ], // Top-Right
			[ 0, 1 ], // Right-Middle
			[ 1, 1 ], // Bottom-Right
			[ 1, 0 ], // Bottom-Middle
			[ 1, -1 ], // Bottom-Left
			[ 0, -1 ] // Left-Middle
		];

		for (const shift of exploringShifts) {
			let tile: MapTile = levelState.levelData.map.getTile(
				new GridPosition(
					Math.floor((newY - shift[0] * BLOCK_SIZE) / BLOCK_SIZE),
					Math.floor((newX - shift[1] * BLOCK_SIZE) / BLOCK_SIZE)
				)
			);
			if (!tile.isAccessible) {
				surrounding.push(tile);
			}
		}

		return surrounding;
	}

	limitMovement(surrounding: MapTile[]): boolean {
		let bounds = this.owner.getBounds();

		let topBound = bounds.top;
		let rightBound = bounds.right;
		let bottomBound = bounds.bottom;
		let leftBound = bounds.left;

		/**
		 * The following situations leads into collision:
		 *  - player's top bound colliding with topL, topM, topR bottom bound
		 *
		 * */

		for (const tile of surrounding) {
			let tileFrame = this.owner.parentGameObject.getChildByName(`TILE_${tile.getRow()}_${tile.getColumn()}`);

			/** Check the top tiles collision */
			if (this.vector.y < 0) {
				if (topBound > tileFrame.getBounds().top) {
					if (
						(tileFrame.getBounds().bottom - topBound) > this.vector.y
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
						(tileFrame.getBounds().left - rightBound < this.vector.x)
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
						(tileFrame.getBounds().top - bottomBound) < this.vector.y
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
						(tileFrame.getBounds().right - leftBound > this.vector.x)
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