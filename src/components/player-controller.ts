import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {MovementVector} from '../model/movement';
import {Attributes} from '../constants/constants';
import GameState from '../model/states/game-state';
import {GridPosition, MapTile} from '../model/game-struct';
import {GRID_SIZE} from '../constants/config';
import LevelState from '../model/states/level-state';


export default class PlayerController extends ECS.Component {

	vector: MovementVector = {x: 0, y: 0}

	move() {
		if (this.vector.x !== 0 || this.vector.y !== 0) {
			let levelState = this.scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE).currentLevel;
			let playerState = levelState.playerState;

			let surroundingTiles: MapTile[] = this.exploreSurrounding(levelState);

			let canMove: boolean = this.limitMovement(surroundingTiles);

			if (canMove) {
				this.owner.parentGameObject.position.x -= this.vector.x;
				this.owner.parentGameObject.position.y -= this.vector.y;
				this.owner.position.x += this.vector.x;
				this.owner.position.y += this.vector.y;
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
			let tile: MapTile = levelState.getMapTile(
				new GridPosition(
					Math.floor((newY - shift[0] * GRID_SIZE) / GRID_SIZE),
					Math.floor((newX - shift[1] * GRID_SIZE) / GRID_SIZE)
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
			let tileFrame = this.owner.parentGameObject.getChildByName(`tile_${tile.getRow()}_${tile.getColumn()}`);

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