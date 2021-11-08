import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {Selectors} from '../selectors/selectors';
import MazeBuilder from '../builders/maze-builder';
import {LevelData, MapTile} from '../model/game-struct';
import {LEVELS} from '../constants/levels';
import {Assets} from '../constants/constants';


export class LevelFactory {

	static createLevels = (): LevelData[] => {
		let res: LevelData[] = [];
		for (const level of LEVELS) {
			let map: MapTile[][] = [], rowInx: number = 0;
			for (const r of level.map) {
				let row: MapTile[] = [], colInx: number = 0;
				for (const tileType of r) {
					row.push(new MapTile(tileType, rowInx, colInx++));
				}
				map.push(row);
				rowInx++;
			}
			res.push({
				name: level.name,
				map: map
			} as LevelData);
		}
		return res;
	}

	static loadLevel = (scene: ECS.Scene, index: number) => {
		const levelData = Selectors.gameDataSelector(scene).levels[index];
		// console.log(levelData);
		MazeBuilder.prepare(scene, levelData).build();
		// WallBuilder.build();
	}

}