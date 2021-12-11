import {MapTileType} from './model/game-struct';
import {Assets} from './constants/constants';

export const getTileAsset = (type: MapTileType): Assets => {
	switch (type) {
		case MapTileType.FLOOR:                         return Assets.FLOOR;
		case MapTileType.WALL_FRONT_UPPER:              return Assets.WALL_FRONT_UPPER;
		case MapTileType.WALL_FRONT_BOTTOM:             return Assets.WALL_FRONT_BOTTOM;
		case MapTileType.WALL_UPPER_LEFT_INNER_EDGE:    return Assets.WALL_UPPER_LEFT_INNER_EDGE;
		case MapTileType.WALL_LEFT:                     return Assets.WALL_LEFT;
	}
};

export const isAccessibleTile = (type: MapTileType): boolean => {
	return type === MapTileType.FLOOR;
};