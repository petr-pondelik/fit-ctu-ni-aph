import {LevelData, MapData, MapTile} from '../model/game-struct';
import {LEVELS} from '../constants/levels';


export class LevelFactory {

	static createAllLevels = (): LevelData[] => {
		let res: LevelData[] = [];
		for (const level of LEVELS) {
			let map: MapData = {
				tiles: [],
				size: {
					rows: level.map.length,
					columns: level.map[0].length
				}
			};
			let rowInx: number = 0;
			for (const r of level.map) {
				let row: MapTile[] = [], colInx: number = 0;
				for (const tileType of r) {
					row.push(new MapTile(tileType, rowInx, colInx++));
				}
				map.tiles.push(row);
				rowInx++;
			}
			res.push({
				name: level.name,
				map: map,
				playerInitPos: {row: level.playerInitPos[0], column: level.playerInitPos[1]}
			} as LevelData);
		}
		return res;
	}

}