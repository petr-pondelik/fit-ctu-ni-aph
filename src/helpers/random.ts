import {GridPosition, MapData, MapTile, MonsterSeed} from '../model/game-struct';
import PlayerState from '../model/states/player-state';
import {euclideanDistance} from '../model/states/geometry';
import {MONSTER_PLAYER_MIN_DISTANCE} from '../constants/config';

export const getRandomInt = (dispersion: number, shift: number = 0) => {
	return Math.floor(Math.floor(Math.random() * dispersion) + shift);
};

export const getRandomTile = (map: MapData, rowShift: number = 0, colShift: number = 0) => {
	let tile: MapTile;
	do {
		let pos = new GridPosition(getRandomInt(map.size.rows, rowShift), getRandomInt(map.size.columns, colShift));
		tile = map.getTile(pos);
	} while (!tile.isAccessible);
	return tile;
};

export const getRandomTileInSurroundings = (map: MapData, center: GridPosition, distance: number) => {
	let tile: MapTile;
	do {
		let m = Math.random() < 0.5 ? 1 : -1;
		let row = getRandomInt(m * distance/2, center.row);
		let col = getRandomInt(m * distance/2, center.column);
		row = row >= 0 && row < map.size.rows ? row : center.row;
		col = col >= 0 && col < map.size.columns ? col : center.column;
		let pos = new GridPosition(row, col);
		tile = map.getTile(pos);
	} while (!tile.isAccessible);
	return tile;
};

export const getMonsterInitPosition = (map: MapData, playerState: PlayerState, monsterSeed: MonsterSeed) => {
	let res: MapTile, valid = true;
	let mapDist = euclideanDistance(new GridPosition(0, 0), new GridPosition(map.size.rows, map.size.columns));
	let playerMinDistance = MONSTER_PLAYER_MIN_DISTANCE * mapDist;
	do {
		let tile = getRandomTileInSurroundings(map, monsterSeed.position, 10);
		if (euclideanDistance(playerState.gridPosition, tile.position) < playerMinDistance) {
			valid = false;
		}
		if (valid === true) {
			res = tile;
		}
	} while (valid === false);
	return res;
};