import {Assets, GameObjectType, MapTileType} from './constants/constants';

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