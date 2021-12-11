import {isAccessibleTile} from '../helpers';
import {MapTileType} from '../constants/constants';

export class GridPosition {
	row: number;
	column: number;

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;
	}
}

/**
 * A single sprite descriptor for map tile
 */
export class MapTile {

	readonly type: MapTileType;
	readonly position: GridPosition;
	readonly isAccessible: boolean;

	constructor(type: MapTileType, row: number, column: number) {
		this.type = type;
		this.position = new GridPosition(row, column);
		this.isAccessible = isAccessibleTile(type);
	}

	getRow(): number {
		return this.position.row;
	}

	getColumn(): number {
		return this.position.column;
	}

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
	playerInitPos: GridPosition;
	monstersAmount: number;
}

export type GameData = {
	levels: LevelData[];
}