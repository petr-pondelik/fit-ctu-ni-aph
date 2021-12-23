import {
	GridPosition,
	LevelData,
	MapData,
	MapDimensions,
	MapTile,
	MonstersData, MonsterSeed,
} from '../model/game-struct';
import {LEVELS} from '../constants/levels';


export class LevelFactory {

	static createAllLevels = (): LevelData[] => {
		let res: LevelData[] = [];
		for (const level of LEVELS) {
			let size: MapDimensions = {
				rows: level.map.length,
				columns: level.map[0].length
			};
			let map: MapData = new MapData(level.map, [], size);
			let rowInx: number = 0;
			for (const r of level.map) {
				let row: MapTile[] = [], colInx: number = 0;
				for (const tileType of r) {
					row.push(new MapTile(tileType, rowInx, colInx++));
				}
				map.tiles.push(row);
				rowInx++;
			}
			let monstersData = new MonstersData(level.monsters.length);
			for (const m of level.monsters) {
				monstersData.seeds.push(new MonsterSeed(m.positionSeed[0], m.positionSeed[1]));
			}
			res.push(new LevelData(level.name, map, new GridPosition(level.playerInitPos[0], level.playerInitPos[1]), monstersData));
		}
		return res;
	}

}