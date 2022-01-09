import * as ECS from '../../libs/pixi-ecs';
import {MapTileType} from '../constants/constants';
import {Position2D, Vector2D} from '../model/geometry';
import {MapTile} from '../model/game-struct';
import {Container} from '../../libs/pixi-ecs';


export const isAccessibleTile = (type: MapTileType): boolean => {
	const tiles = [
		MapTileType.FLOOR,
		MapTileType.DOORS_STAIRS_UP_5_1, MapTileType.DOORS_STAIRS_UP_5_2, MapTileType.DOORS_STAIRS_UP_4_1, MapTileType.DOORS_STAIRS_UP_4_2,
		MapTileType.IRON_GRID_0_0, MapTileType.IRON_GRID_0_1, MapTileType.IRON_GRID_1_0, MapTileType.IRON_GRID_1_1
	];
	return tiles.indexOf(type) !== -1;
};

export const isLevelExitTile = (type: MapTileType): boolean => {
	const tiles = [
		MapTileType.DOORS_STAIRS_UP_5_1, MapTileType.DOORS_STAIRS_UP_5_2,
		MapTileType.DOORS_STAIRS_UP_4_1, MapTileType.DOORS_STAIRS_UP_4_2
	];
	return tiles.indexOf(type) !== -1;
};

export const isLevelExit = (type: MapTileType): boolean => {
	const levelExitTiles = [
		MapTileType.DOORS_STAIRS_UP_4_1, MapTileType.DOORS_STAIRS_UP_4_2,
	];
	return levelExitTiles.indexOf(type) !== -1;
};

export const isNoisyTile = (type: MapTileType): boolean => {
	const ironGridTiles = [
		MapTileType.IRON_GRID_0_0, MapTileType.IRON_GRID_0_1, MapTileType.IRON_GRID_1_0, MapTileType.IRON_GRID_1_1
	];
	return ironGridTiles.indexOf(type) !== -1;
};

export const getDirections = (origin: Position2D, destination: Position2D) => {
	const xDir = origin.x === destination.x ? 0 : origin.x < destination.x ? 1 : -1;
	const yDir = origin.y === destination.y ? 0 : origin.y < destination.y ? 1 : -1;
	return {
		x: xDir,
		y: yDir
	};
};

export const adjustMovementByObstacles = (surrounding: MapTile[], scene: ECS.Scene, movingObject: Container, vector: Vector2D) => {
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
		let tileFrame = scene.findObjectByName(`TILE_${tile.getRow()}_${tile.getColumn()}`);
		console.log(tileFrame);

		if (tileFrame === null) {
			return new Vector2D(0, 0);
		}

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