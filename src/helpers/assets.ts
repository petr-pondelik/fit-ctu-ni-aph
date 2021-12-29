import {Assets, GameObjectType, MapTileType} from '../constants/constants';
import {Position2D} from '../model/geometry';
import {BLOCK_SIZE} from '../constants/config';

export const getTileOffset = (type: MapTileType): Position2D|null => {
	switch (type) {
		case MapTileType.FLOOR: return {x: 46 * BLOCK_SIZE, y: 13 * BLOCK_SIZE} as Position2D;
		case MapTileType.WALL: return {x: 17 * BLOCK_SIZE, y: 17 * BLOCK_SIZE} as Position2D;
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
	}
	return null;
};

export const getObjectAsset = (type: GameObjectType): Assets => {
	switch (type) {
		case GameObjectType.PLAYER:                     return Assets.PLAYER;
		case GameObjectType.MONSTER:                    return Assets.MONSTER;
	}
};