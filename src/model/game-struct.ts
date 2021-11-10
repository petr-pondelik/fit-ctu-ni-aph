export enum MapTileType {
	EMPTY,
	FLOOR,
	WALL_FRONT_UPPER,
	WALL_FRONT_BOTTOM,
	WALL_UPPER_LEFT_INNER_EDGE,
	WALL_LEFT
}

/**
 * A single sprite descriptor for map tile
 */
export class MapTile {

	readonly type: MapTileType;
	readonly row: number;
	readonly column: number;

	constructor(type: MapTileType, row: number, column: number) {
		this.type = type;
		this.row = row;
		this.column = column;
	}

}

export type LevelData = {
	name: string;
	map: MapTile[][];
}

export type GameData = {
	levels: LevelData[];
}