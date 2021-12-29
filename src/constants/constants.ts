export enum Assets {
	SPRITESHEET = 'spritesheet',
	PLAYER = 'player',
	MONSTER = 'monster'
}

export enum Containers {
	MAZE = 'maze'
}

export enum MapTileType {
	EMPTY,
	FLOOR,
	WALL,
	DOORS_STAIRS_UP_0_0 = 100,
	DOORS_STAIRS_UP_0_1 = 101,
	DOORS_STAIRS_UP_0_2 = 102,
	DOORS_STAIRS_UP_0_3 = 103,
	DOORS_STAIRS_UP_1_0 = 104,
	DOORS_STAIRS_UP_1_1 = 105,
	DOORS_STAIRS_UP_1_2 = 106,
	DOORS_STAIRS_UP_1_3 = 107,
	DOORS_STAIRS_UP_2_0 = 108,
	DOORS_STAIRS_UP_2_1 = 109,
	DOORS_STAIRS_UP_2_2 = 110,
	DOORS_STAIRS_UP_2_3 = 111,
	DOORS_STAIRS_UP_3_0 = 112,
	DOORS_STAIRS_UP_3_1 = 113,
	DOORS_STAIRS_UP_3_2 = 114,
	DOORS_STAIRS_UP_3_3 = 115,
	DOORS_STAIRS_UP_4_0 = 116,
	DOORS_STAIRS_UP_4_1 = 117,
	DOORS_STAIRS_UP_4_2 = 118,
	DOORS_STAIRS_UP_4_3 = 119,
	DOORS_STAIRS_UP_5_0 = 120,
	DOORS_STAIRS_UP_5_1 = 121,
	DOORS_STAIRS_UP_5_2 = 122,
	DOORS_STAIRS_UP_5_3 = 123
}

export enum GameObjectType {
	PLAYER = 1000,
	MONSTER
}

export enum Attributes {
	GAME_DATA = 'GAME_DATA',
	GAME_STATE = 'GAME_STATE'
}

export enum Tags {
	MONSTER = 'MONSTER'
}

export enum Messages {
	STATE_CHANGE_PLAYER_POSITION = 'state_change_player_position',
	STATE_CHANGE_MONSTER_POSITION = 'state_change_monster_position',
	MONSTER_START_CHASING_PLAYER = 'monster_start_chasing_player',
	MONSTER_STOP_CHASING_PLAYER = 'monster_stop_chasing_player'
}