import {isAccessibleTile} from '../helpers';
import {MapTileType} from '../constants/constants';


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

export type GridPosition = {
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
	playerInitPos: GridPosition;
	monstersAmount: number;
}

export type GameData = {
	levels: LevelData[];
}