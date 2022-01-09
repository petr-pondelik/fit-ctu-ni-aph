import * as ECS from '../../libs/pixi-ecs';
import PlayerBuilder from './player-builder';
import MonsterBuilder from './monster-builder';
import {getMonsterInitPosition} from '../helpers/random';
import TilesBuilder from './tiles-builder';
import {BLOCK_SIZE} from '../constants/config';
import GameState from '../model/states/game-state';
import {ItemsBuilder} from './items-builder';

export default class MazeBuilder {

	static build = (scene: ECS.Scene, gameState: GameState) => {

		TilesBuilder.basic(scene, gameState.map.tiles)
			.build()
			.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		ItemsBuilder.items(scene, gameState.levelState.levelData.items)
			.build();

		PlayerBuilder.basic(scene, gameState.playerState)
			.build()
			.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		for (let i = 0; i < gameState.levelState.levelData.monsters.amount; i++) {
			let monsterSeed = gameState.levelState.levelData.monsters.seeds[i];
			let monsterState = gameState.levelState.monstersState[i];
			let tile = getMonsterInitPosition(gameState.map, gameState.playerState, monsterSeed);
			monsterState.position = tile.position;
			MonsterBuilder.basic(scene, gameState.levelState, monsterState)
				.build()
				.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);
		}
	}

}