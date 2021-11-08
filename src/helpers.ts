import {MapTileType} from './model/game-struct';
import {Assets} from './constants/constants';

export const getTileAsset = (type: MapTileType): Assets => {
	switch (type) {
		case MapTileType.FLOOR:
			return Assets.PLAYER;
		case MapTileType.WALL:
			return Assets.TILE_WALL;
	}
};