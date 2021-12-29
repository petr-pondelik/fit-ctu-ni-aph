import * as ECS from '../../libs/pixi-ecs';
import PlayerBuilder from './player-builder';
import LevelState from '../model/states/level-state';
import MonsterBuilder from './monster-builder';
import {getMonsterInitPosition} from '../helpers/random';
import TilesBuilder from './tiles-builder';

export default class MazeBuilder {

	static build = (scene: ECS.Scene, levelState: LevelState) => {

		TilesBuilder.build(scene, levelState.map.tiles);
		PlayerBuilder.build(scene, levelState.playerState);

		for (let i = 0; i < levelState.levelData.monsters.amount; i++) {
			let monsterSeed = levelState.levelData.monsters.seeds[i];
			let monsterState = levelState.monstersState[i];
			let tile = getMonsterInitPosition(levelState.map, levelState.playerState, monsterSeed);
			monsterState.position = tile.position;
			MonsterBuilder.build(scene, levelState, monsterState);
		}
	}

}