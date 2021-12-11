import {isAccessibleTile} from "../helpers";

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
	readonly isAccessible: boolean;

	constructor(type: MapTileType, row: number, column: number) {
		this.type = type;
		this.row = row;
		this.column = column;
		this.isAccessible = isAccessibleTile(type);
	}

}

export type MapPosition = {
	row: number;
	column: number;
}

export type MapData = {
	tiles: MapTile[][];
	size: {
		rows: number;
		columns: number;
	};
}

export type LevelData = {
	name: string;
	map: MapData;
	playerInitPos: MapPosition;
}

export type GameData = {
	levels: LevelData[];
}