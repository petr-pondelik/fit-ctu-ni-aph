import {MapTileType} from '../constants/constants';
import {isAccessibleTile, isLevelExit} from '../helpers/grid';
import {BLOCK_SIZE} from '../constants/config';
import {Container} from "../../libs/pixi-ecs";
import {Vector2D} from "./geometry";

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
	readonly isLevelExit: boolean;

	constructor(type: MapTileType, row: number, column: number) {
		this.type = type;
		this.position = new GridPosition(row, column);
		this.isAccessible = isAccessibleTile(type);
		this.isLevelExit = isLevelExit(type);
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

	getSurrounding(newX: number, newY: number) {

		let surrounding: MapTile[] = [];

		/**
		 *  topL    |   topM    | topR
		 *             -------
		 *  leftM   |   Player  | rightM
		 *             -------
		 *  bottomL |  bottomM  | bottomR
		 */

		let exploringShifts = [
			[ -1, -1 ], // Top-Left
			[ -1, 0 ], // Top-Middle
			[ -1, 1 ], // Top-Right
			[ 0, 1 ], // Right-Middle
			[ 1, 1 ], // Bottom-Right
			[ 1, 0 ], // Bottom-Middle
			[ 1, -1 ], // Bottom-Left
			[ 0, -1 ] // Left-Middle
		];

		for (const shift of exploringShifts) {
			let tile: MapTile = this.getTile(
				new GridPosition(
					Math.floor((newY - shift[0] * BLOCK_SIZE) / BLOCK_SIZE),
					Math.floor((newX - shift[1] * BLOCK_SIZE) / BLOCK_SIZE)
				)
			);
			if (!tile.isAccessible) {
				surrounding.push(tile);
			}
		}

		return surrounding;
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