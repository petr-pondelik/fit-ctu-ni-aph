export enum Assets {
	SPRITESHEET = 'spritesheet',
	FLOOR = 'floor',
	WALL_FRONT_UPPER = 'wall_front_upper',
	WALL_FRONT_BOTTOM = 'wall_front_bottom',
	WALL_UPPER_LEFT_INNER_EDGE = 'wall_upper_left_inner_edge',
	WALL_LEFT = 'wall_left',
	PLAYER = 'player',
	MONSTER = 'monster'
}

export enum Containers {
	MAZE = 'maze'
}

export enum MapTileType {
	EMPTY,
	FLOOR,
	WALL_FRONT_UPPER,
	WALL_FRONT_BOTTOM,
	WALL_UPPER_LEFT_INNER_EDGE,
	WALL_LEFT
}

export enum GameObjectType {
	PLAYER = 1000,
	MONSTER
}

export enum Attributes {
	GAME_DATA = 'GAME_DATA',
	GAME_STATE = 'GAME_STATE'
}

export enum Messages {
	TEST_MESSAGE = 'test_message',
	STATE_CHANGE_PLAYER_POSITION = 'state_change_player_position'
}