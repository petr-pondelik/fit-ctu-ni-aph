import {Assets, GameObjectType, MapTileType} from '../constants/constants';

export const getAsset = (type: MapTileType|GameObjectType): Assets => {
	switch (type) {
		case MapTileType.FLOOR:                         return Assets.FLOOR;
		case MapTileType.WALL:                          return Assets.WALL;
		case GameObjectType.PLAYER:                     return Assets.PLAYER;
		case GameObjectType.MONSTER:                    return Assets.MONSTER;
	}
};