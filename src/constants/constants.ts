export const GAME_TITLE = 'Escape the Dungeon';

export enum Assets {
	SPRITESHEET = 'spritesheet',
	PLAYER = 'player',
	MONSTER = 'monster',
}

export class Music {
	static BG_MUSIC = {
		key: 'LOOP_MUSIC',
		path: '../../assets/Hazy-Darkness_Looping.mp3',
		length: 115000 // in ms
	};

	static BAR_MOVEMENTS_SOUND = {
		key: 'BAR_MOVEMENTS_SOUND',
		path: '../../assets/mixkit-metal-bar-movement-hits-3138.wav',
		length: 2000
	};
}

export enum Containers {
	MAZE = 'maze',
	HUD_RIGHT_BOTTOM = 'hud_right_bottom'
}

export enum HudElements {
	GAME_MESSAGE = 'game_message'
}

export enum MapTileType {
	EMPTY = 0,
	FLOOR = 1,
	WALL_FRONT_UPPER = 50,
	WALL_FRONT_STANDARD = 51,
	CORNER_INNER_LEFT_UPPER = 52,
	WALL_LEFT = 53,
	CORNER_OUTER_RIGHT_UPPER = 54,
	WALL_BACK = 55,
	CORNER_INNER_LEFT_BOTTOM = 56,
	CORNER_OUTER_RIGHT_BOTTOM = 57,
	CORNER_WALL_OUTER_RIGHT = 58,
	WALL_RIGHT = 59,
	CORNER_INNER_RIGHT_UPPER = 60,
	CORNER_INNER_RIGHT_BOTTOM = 61,
	CORNER_OUTER_LEFT_BOTTOM = 62,
	CORNER_WALL_OUTER_LEFT = 63,
	CORNER_OUTER_LEFT_UPPER = 64,

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
	DOORS_STAIRS_UP_5_3 = 123,

	ABYSS_0_0 = 200,
	ABYSS_0_1 = 201,
	ABYSS_0_2 = 202,
	ABYSS_0_3 = 203,
	ABYSS_1_0 = 204,
	ABYSS_1_1 = 205,
	ABYSS_1_2 = 206,
	ABYSS_1_3 = 207,
	ABYSS_2_0 = 208,
	ABYSS_2_1 = 209,
	ABYSS_2_2 = 210,
	ABYSS_2_3 = 211,
	ABYSS_3_0 = 212,
	ABYSS_3_1 = 213,
	ABYSS_3_2 = 214,
	ABYSS_3_3 = 215,

	IRON_GRID_0_0 = 300,
	IRON_GRID_0_1 = 301,
	IRON_GRID_1_0 = 302,
	IRON_GRID_1_1 = 303
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
	MONSTER_STOP_CHASING_PLAYER = 'monster_stop_chasing_player',
	PLAYER_NOISY_STEP = 'player_noisy_step',
	MONSTER_ALERTED = 'monster_alerted'
}