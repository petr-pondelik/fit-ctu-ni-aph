import {Assets, GameObjectType, MapTileType} from './constants/constants';
import {RealPosition} from './model/movement';
import {GridPosition} from './model/game-struct';
import {GRID_SIZE} from './constants/config';


export const getAsset = (type: MapTileType|GameObjectType): Assets => {
	switch (type) {
		case MapTileType.FLOOR:                         return Assets.FLOOR;
		case MapTileType.WALL_FRONT_UPPER:              return Assets.WALL_FRONT_UPPER;
		case MapTileType.WALL_FRONT_BOTTOM:             return Assets.WALL_FRONT_BOTTOM;
		case MapTileType.WALL_UPPER_LEFT_INNER_EDGE:    return Assets.WALL_UPPER_LEFT_INNER_EDGE;
		case MapTileType.WALL_LEFT:                     return Assets.WALL_LEFT;
		case GameObjectType.PLAYER:                     return Assets.PLAYER;
		case GameObjectType.MONSTER:                    return Assets.MONSTER;
	}
};

export const isAccessibleTile = (type: MapTileType): boolean => {
	return type === MapTileType.FLOOR;
};

export const realPositionToGrid = (realPos: RealPosition): GridPosition => {
	return new GridPosition(Math.floor(realPos.y / GRID_SIZE), Math.floor(realPos.x / GRID_SIZE));
};

export const getDirections = (origin: GridPosition, destination: GridPosition) => {
	const xDir = origin.column === destination.column ? 0 : origin.column < destination.column ? 1 : -1;
	const yDir = origin.row === destination.row ? 0 : origin.row < destination.row ? 1 : -1;
	return {
		x: xDir,
		y: yDir
	};
}