import {MapTileType} from '../constants/constants';
import {isAccessibleTile} from '../helpers/grid';

export class GridPosition {
	row: number;
	column: number;

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;
	}

	isEqual(pos: GridPosition) {
		return this.row === pos.row && this.column === pos.column;
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

export type MapDimensions = {
	rows: number;
	columns: number;
};

export class MapData {
	raw: number[][];
	tiles: MapTile[][];
	size: MapDimensions

	constructor(raw: number[][], tiles: MapTile[][], size: MapDimensions) {
		this.raw = raw;
		this.tiles = tiles;
		this.size = size;
	}

	getTile(position: GridPosition): MapTile {
		if (position.column >= this.size.columns || position.row >= this.size.rows || position.column < 0 || position.row < 0) {
			throw new Error(`Coordinates outside bounds: [${position.column}, ${position.row}]`);
		}
		return this.tiles[position.row][position.column];
	}
}

export class MonsterSeed {
	position: GridPosition;

	constructor(row: number, column: number) {
		this.position = new GridPosition(row, column);
	}
}

export class MonstersData {
	amount: number;
	seeds: MonsterSeed[] = [];

	constructor(amount: number) {
		this.amount = amount;
	}
}

export class LevelData {
	name: string;
	map: MapData;
	playerInitPos: GridPosition;
	monsters: MonstersData;

	constructor(name: string, map: MapData, playerInitPos: GridPosition, monsters: MonstersData) {
		this.name = name;
		this.map = map;
		this.playerInitPos = playerInitPos;
		this.monsters = monsters;
	}
}

export class GameData {
	levels: LevelData[];

	constructor(levels: LevelData[]) {
		this.levels = levels;
	}
}