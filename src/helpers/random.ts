import {GridPosition, MapData, MapTile} from '../model/game-struct';
import MonsterState from '../model/states/monster-state';
import PlayerState from '../model/states/player-state';
import {euclideanDistance} from '../model/states/geometry';
import {MONSTER_MUTUAL_MIN_DISTANCE, MONSTER_PLAYER_MIN_DISTANCE} from '../constants/config';

export const getRandomInt = (dispersion: number, center: number) => {
	return Math.floor(Math.floor(Math.random() * dispersion) + center);
};

export const getRandomTile = (map: MapData) => {
	let tile: MapTile;
	do {
		let pos = new GridPosition(getRandomInt(map.size.rows, 0), getRandomInt(map.size.columns, 0));
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

export const getMonsterInitPosition = (map: MapData, playerState: PlayerState, monsterStates: MonsterState[]) => {
	let res: MapTile, valid = true;
	let mapDist = euclideanDistance(new GridPosition(0, 0), new GridPosition(map.size.rows, map.size.columns));
	let playerMinDistance = MONSTER_PLAYER_MIN_DISTANCE * mapDist;
	let mutualMinDistance = MONSTER_MUTUAL_MIN_DISTANCE * mapDist;
	console.log(monsterStates);
	let round = 0;
	do {
		let tile = getRandomTile(map);
		console.log(tile);
		console.log(euclideanDistance(playerState.gridPosition, tile.position));
		if (euclideanDistance(playerState.gridPosition, tile.position) < playerMinDistance) {
			valid = false;
		}
		for (const monsterState of monsterStates) {
			if (monsterState.gridPosition instanceof GridPosition) {
				if (euclideanDistance(monsterState.gridPosition, tile.position) < mutualMinDistance) {
					valid = false;
				}
			}
		}
		if (valid === true) {
			res = tile;
		}
		round++;
		if (round > 100) {
			break;
		}
	} while (valid === false);
	return res;
};