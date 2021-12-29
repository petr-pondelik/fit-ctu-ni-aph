export enum Assets {
	FLOOR = 'floor',
	WALL = 'wall',
	// WALL_FRONT_UPPER = 'wall_front_upper',
	// WALL_FRONT_BOTTOM = 'wall_front_bottom',
	// WALL_UPPER_LEFT_INNER_EDGE = 'wall_upper_left_inner_edge',
	// WALL_LEFT = 'wall_left',
	PLAYER = 'player',
	MONSTER = 'monster'
}

export enum Containers {
	MAZE = 'maze'
}

export enum MapTileType {
	EMPTY,
	FLOOR,
	WALL
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