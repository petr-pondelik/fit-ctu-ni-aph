import {MapData, MapTile, MonsterSeed} from '../model/game-struct';
import PlayerState from '../model/states/player-state';
import {euclideanDistance} from '../model/states/geometry';
import {MONSTER_PLAYER_MIN_DISTANCE, MONSTER_SPAWN_DISPERSION} from '../constants/config';
import {Position2D} from '../model/geometry';

export const getRandomInt = (dispersion: number, shift: number = 0) => {
	return Math.floor(Math.floor(Math.random() * dispersion) + shift);
};

export const getRandomTileInSurroundings = (map: MapData, center: Position2D, distance: number) => {
	let tile: MapTile;
	do {
		let m = Math.random() < 0.5 ? 1 : -1;
		let row = getRandomInt(m * distance/2, center.y);
		let col = getRandomInt(m * distance/2, center.x);
		row = row >= 0 && row < map.size.rows ? row : center.y;
		col = col >= 0 && col < map.size.columns ? col : center.x;
		let pos = new Position2D(col, row);
		tile = map.getTile(pos);
	} while (!tile.isAccessible || tile.position.isEqual(center.toGrid()));
	return tile;
};

export const getMonsterInitPosition = (map: MapData, playerState: PlayerState, monsterSeed: MonsterSeed) => {
	let res: MapTile, valid = true;
	do {
		let tile = getRandomTileInSurroundings(map, monsterSeed.position, MONSTER_SPAWN_DISPERSION);
		if (euclideanDistance(playerState.realPosition.toGrid(), tile.position) < MONSTER_PLAYER_MIN_DISTANCE) {
			valid = false;
		}
		if (valid === true) {
			res = tile;
		}
	} while (valid === false);
	return res;
};