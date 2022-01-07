import {MapTileType} from '../constants/constants';
import {isAccessibleTile, isLevelExit} from '../helpers/grid';
import {BLOCK_SIZE} from '../constants/config';
import {Position2D} from './geometry';

/**
 * A single sprite descriptor for map tile
 */
export class MapTile {

	readonly type: MapTileType;
	readonly position: Position2D;
	readonly isAccessible: boolean;
	readonly isLevelExit: boolean;

	constructor(type: MapTileType, row: number, column: number) {
		this.type = type;
		this.position = new Position2D(column, row);
		this.isAccessible = isAccessibleTile(type);
		this.isLevelExit = isLevelExit(type);
	}

	getRow(): number {
		return this.position.y;
	}

	getColumn(): number {
		return this.position.x;
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

	getTile(position: Position2D): MapTile {
		if (position.x >= this.size.columns || position.y >= this.size.rows || position.x < 0 || position.y < 0) {
			throw new Error(`Coordinates outside bounds: [${position.x}, ${position.y}]`);
		}
		return this.tiles[position.y][position.x];
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
			[ 0, -1 ], // Top-Middle
			[ 1, -1 ], // Top-Right
			[ 1, 0 ], // Right-Middle
			[ 1, 1 ], // Bottom-Right
			[ 0, 1 ], // Bottom-Middle
			[ -1, 1 ], // Bottom-Left
			[ -1, 0 ] // Left-Middle
		];

		for (const shift of exploringShifts) {
			let tile: MapTile = this.getTile(
				new Position2D(
					Math.floor((newX + shift[0] * BLOCK_SIZE) / BLOCK_SIZE),
					Math.floor((newY + shift[1] * BLOCK_SIZE) / BLOCK_SIZE),
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
	position: Position2D;

	constructor(x: number, y: number) {
		this.position = new Position2D(x, y);
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
	playerInitPos: Position2D;
	monsters: MonstersData;

	constructor(name: string, map: MapData, playerInitPos: Position2D, monsters: MonstersData) {
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