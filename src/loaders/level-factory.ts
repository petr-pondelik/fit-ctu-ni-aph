import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {Selectors} from '../selectors/selectors';
import MazeBuilder from '../builders/maze-builder';
import {LevelData, MapTile} from '../model/game-struct';
import {LEVELS} from '../constants/levels';
import PlayerBuilder from "../builders/player-builder";
import {SCENE_HEIGHT, SCENE_WIDTH, SPRITE_SIZE} from "../constants/config";


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
				map: map,
				playerInitPos: {row: level.playerInitPos[0], column: level.playerInitPos[1]}
			} as LevelData);
		}
		return res;
	}

	static loadLevel = (scene: ECS.Scene, index: number) => {
		const levelData = Selectors.gameDataSelector(scene).levels[index];
		// console.log(levelData);
		MazeBuilder.prepare(scene, levelData).build();
		PlayerBuilder.prepare(scene, levelData.playerInitPos).build();

		// console.log(levelData.playerInitPos.column);

		scene.stage.pivot.x = (levelData.playerInitPos.column * SPRITE_SIZE) - (SCENE_WIDTH/SPRITE_SIZE/2 * SPRITE_SIZE)/2 + SPRITE_SIZE/2;
		scene.stage.pivot.y = (levelData.playerInitPos.row * SPRITE_SIZE) - (SCENE_HEIGHT/SPRITE_SIZE/2 * SPRITE_SIZE)/2 + SPRITE_SIZE/2;
	}

}