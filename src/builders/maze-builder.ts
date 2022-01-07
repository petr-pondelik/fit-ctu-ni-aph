import * as ECS from '../../libs/pixi-ecs';
import PlayerBuilder from './player-builder';
import LevelState from '../model/states/level-state';
import MonsterBuilder from './monster-builder';
import {getMonsterInitPosition} from '../helpers/random';
import TilesBuilder from './tiles-builder';
import {BLOCK_SIZE} from '../constants/config';

export default class MazeBuilder {

	static build = (scene: ECS.Scene, levelState: LevelState) => {

		TilesBuilder.basic(scene, levelState.map.tiles)
			.build()
			.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		PlayerBuilder.basic(scene, levelState.playerState)
			.build()
			.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		for (let i = 0; i < levelState.levelData.monsters.amount; i++) {
			let monsterSeed = levelState.levelData.monsters.seeds[i];
			let monsterState = levelState.monstersState[i];
			let tile = getMonsterInitPosition(levelState.map, levelState.playerState, monsterSeed);
			monsterState.position = tile.position;
			MonsterBuilder.basic(scene, levelState, monsterState)
				.build()
				.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);
		}
	}

}