import {MapTileType} from '../constants/constants';
import {MovementVector, RealPosition} from '../model/movement';
import {GridPosition, MapTile} from '../model/game-struct';
import {BLOCK_SIZE} from '../constants/config';
import {Container} from '../../libs/pixi-ecs';


export const isAccessibleTile = (type: MapTileType): boolean => {
	return type === MapTileType.FLOOR;
};

export const realPositionToGrid = (realPos: RealPosition): GridPosition => {
	return new GridPosition(Math.floor(realPos.y / BLOCK_SIZE), Math.floor(realPos.x / BLOCK_SIZE));
};

export const getDirections = (origin: GridPosition, destination: GridPosition) => {
	const xDir = origin.column === destination.column ? 0 : origin.column < destination.column ? 1 : -1;
	const yDir = origin.row === destination.row ? 0 : origin.row < destination.row ? 1 : -1;
	return {
		x: xDir,
		y: yDir
	};
};

export const adjustMovementByObstacles = (surrounding: MapTile[], movingObject: Container, vector: MovementVector) => {
	let bounds = movingObject.getBounds();

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
		let tileFrame = movingObject.parentGameObject.getChildByName(`TILE_${tile.getRow()}_${tile.getColumn()}`);

		/** Check the top tiles collision */
		if (vector.y < 0) {
			if (topBound > tileFrame.getBounds().top) {
				if (
					(tileFrame.getBounds().bottom - topBound) > vector.y
					&& (
						(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
						(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
					)
				) {
					vector.y = tileFrame.getBounds().bottom - topBound;
				}
			}
		}
		if (vector.x > 0) {
			if (rightBound < tileFrame.getBounds().right) {
				if (
					(tileFrame.getBounds().left - rightBound < vector.x)
					&& (
						topBound < tileFrame.getBounds().bottom && bottomBound > tileFrame.getBounds().top ||
						topBound > tileFrame.getBounds().bottom && bottomBound < tileFrame.getBounds().top
					)
				) {
					vector.x = tileFrame.getBounds().left - rightBound;
				}
			}
		}
		if (vector.y > 0) {
			if (bottomBound < tileFrame.getBounds().bottom) {
				if (
					(tileFrame.getBounds().top - bottomBound) < vector.y
					&& (
						(bounds.right > tileFrame.getBounds().left && bounds.left < tileFrame.getBounds().left) ||
						(bounds.left < tileFrame.getBounds().right && bounds.right > tileFrame.getBounds().left)
					)
				) {
					vector.y = tileFrame.getBounds().top - bottomBound;
				}
			}
		}
		if (vector.x < 0) {
			if (leftBound > tileFrame.getBounds().left) {
				if (
					(tileFrame.getBounds().right - leftBound > vector.x)
					&& (
						topBound < tileFrame.getBounds().bottom && bottomBound > tileFrame.getBounds().top ||
						topBound > tileFrame.getBounds().bottom && bottomBound < tileFrame.getBounds().top
					)
				) {
					vector.x = tileFrame.getBounds().right - leftBound;
				}
			}
		}
	}

	return vector;
};