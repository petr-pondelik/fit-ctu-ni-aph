import {Assets, GameObjectType, MapTileType} from '../constants/constants';
import {Position2D} from '../model/geometry';
import {BLOCK_SIZE} from '../constants/config';

export const getTileOffset = (type: MapTileType): Position2D|null => {
	switch (type) {
		case MapTileType.FLOOR: return {x: 736, y: 13 * BLOCK_SIZE} as Position2D;
		case MapTileType.WALL_FRONT_UPPER: return {x: 80, y: 112} as Position2D;
		case MapTileType.WALL_FRONT_STANDARD: return {x: 109, y: 133} as Position2D;
		case MapTileType.WALL_LEFT: return {x: 272, y: 62} as Position2D;
		case MapTileType.WALL_RIGHT: return {x: 32, y: 62} as Position2D;
		case MapTileType.WALL_BACK: return {x: 193, y: 48} as Position2D;
		case MapTileType.CORNER_OUTER_RIGHT_UPPER: return {x: 272, y: 48} as Position2D;
		case MapTileType.CORNER_OUTER_RIGHT_BOTTOM: return {x: 272, y: 112} as Position2D;
		case MapTileType.CORNER_OUTER_LEFT_UPPER: return {x: 32, y: 48} as Position2D;
		case MapTileType.CORNER_OUTER_LEFT_BOTTOM: return {x: 32, y: 112} as Position2D;
		case MapTileType.CORNER_INNER_LEFT_UPPER: return {x: 224, y: 16} as Position2D;
		case MapTileType.CORNER_INNER_LEFT_BOTTOM: return {x: 128, y: 16} as Position2D;
		case MapTileType.CORNER_INNER_RIGHT_UPPER: return {x: 80, y: 16} as Position2D;
		case MapTileType.CORNER_INNER_RIGHT_BOTTOM: return {x: 176, y: 16} as Position2D;
		case MapTileType.CORNER_WALL_OUTER_RIGHT: return {x: 272, y: 128} as Position2D;
		case MapTileType.CORNER_WALL_OUTER_LEFT: return {x: 32, y: 128} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_0_0: return {x: 55 * BLOCK_SIZE, y: 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_0_1: return {x: 56 * BLOCK_SIZE, y: 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_0_2: return {x: 57 * BLOCK_SIZE, y: 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_0_3: return {x: 58 * BLOCK_SIZE, y: 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_1_0: return {x: 55 * BLOCK_SIZE, y: BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_1_1: return {x: 56 * BLOCK_SIZE, y: BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_1_2: return {x: 57 * BLOCK_SIZE, y: BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_1_3: return {x: 58 * BLOCK_SIZE, y: BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_2_0: return {x: 55 * BLOCK_SIZE, y: 2*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_2_1: return {x: 56 * BLOCK_SIZE, y: 2*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_2_2: return {x: 57 * BLOCK_SIZE, y: 2*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_2_3: return {x: 58 * BLOCK_SIZE, y: 2*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_3_0: return {x: 55 * BLOCK_SIZE, y: 3*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_3_1: return {x: 56 * BLOCK_SIZE, y: 3*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_3_2: return {x: 57 * BLOCK_SIZE, y: 3*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_3_3: return {x: 58 * BLOCK_SIZE, y: 3*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_4_0: return {x: 55 * BLOCK_SIZE, y: 4*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_4_1: return {x: 56 * BLOCK_SIZE, y: 4*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_4_2: return {x: 57 * BLOCK_SIZE, y: 4*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_4_3: return {x: 58 * BLOCK_SIZE, y: 4*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_5_0: return {x: 55 * BLOCK_SIZE, y: 5*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_5_1: return {x: 56 * BLOCK_SIZE, y: 5*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_5_2: return {x: 57 * BLOCK_SIZE, y: 5*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.DOORS_STAIRS_UP_5_3: return {x: 58 * BLOCK_SIZE, y: 5*BLOCK_SIZE + 9} as Position2D;
		case MapTileType.ABYSS_0_0: return {x: 624, y: 272} as Position2D;
		case MapTileType.ABYSS_0_1: return {x: 640, y: 272} as Position2D;
		case MapTileType.ABYSS_0_2: return {x: 656, y: 272} as Position2D;
		case MapTileType.ABYSS_0_3: return {x: 672, y: 272} as Position2D;
		case MapTileType.ABYSS_1_0: return {x: 624, y: 288} as Position2D;
		case MapTileType.ABYSS_1_1: return {x: 640, y: 288} as Position2D;
		case MapTileType.ABYSS_1_2: return {x: 656, y: 288} as Position2D;
		case MapTileType.ABYSS_1_3: return {x: 672, y: 288} as Position2D;
		case MapTileType.ABYSS_2_0: return {x: 624, y: 304} as Position2D;
		case MapTileType.ABYSS_2_1: return {x: 640, y: 304} as Position2D;
		case MapTileType.ABYSS_2_2: return {x: 656, y: 304} as Position2D;
		case MapTileType.ABYSS_2_3: return {x: 672, y: 304} as Position2D;
		case MapTileType.ABYSS_3_0: return {x: 624, y: 320} as Position2D;
		case MapTileType.ABYSS_3_1: return {x: 640, y: 320} as Position2D;
		case MapTileType.ABYSS_3_2: return {x: 656, y: 320} as Position2D;
		case MapTileType.IRON_GRID_0_0: return {x: 496, y: 288} as Position2D;
		case MapTileType.IRON_GRID_0_1: return {x: 496, y: 304} as Position2D;
		case MapTileType.IRON_GRID_1_0: return {x: 510, y: 288} as Position2D;
		case MapTileType.IRON_GRID_1_1: return {x: 510, y: 304} as Position2D;
	}
	return null;
};

export const getObjectAsset = (type: GameObjectType): Assets => {
	switch (type) {
		case GameObjectType.PLAYER:                     return Assets.PLAYER;
		case GameObjectType.MONSTER:                    return Assets.MONSTER;
	}
};