import * as ECS from '../../libs/pixi-ecs';
import {BLOCK_SIZE} from '../constants/config';
import TextureFactory from '../factory/texture-factory';
import {Containers, MapTileType} from '../constants/constants';
import PlayerBuilder from './player-builder';
import LevelState from '../model/states/level-state';
import MonsterBuilder from './monster-builder';
import {getMonsterInitPosition} from '../helpers/random';

export default class MazeBuilder {

	static build = (engine: ECS.Engine, levelState: LevelState) => {
		let scene: ECS.Scene = engine.scene;
		const mazeContainerBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName(Containers.MAZE)
			.withParent(scene.stage);

		for (const tilesRow of levelState.levelData.map.tiles) {
			for (const tile of tilesRow) {
				if (tile.type === MapTileType.EMPTY) {
					continue;
				}
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(TextureFactory.createTileTexture(tile.type))
					.localPos(tile.getColumn() * BLOCK_SIZE, tile.getRow() * BLOCK_SIZE)
					.withName(`TILE_${tile.getRow()}_${tile.getColumn()}`)
					.anchor(0.5);
				mazeContainerBuilder.withChild(tileBuilder);
			}
		}

		mazeContainerBuilder.build().pivot.set(BLOCK_SIZE/2, BLOCK_SIZE/2);

		PlayerBuilder.build(engine.scene, levelState.playerState);
		for (let i = 0; i < levelState.levelData.monsters.amount; i++) {
			let monsterSeed = levelState.levelData.monsters.seeds[i];
			let monsterState = levelState.monstersState[i];
			let tile = getMonsterInitPosition(levelState.map, levelState.playerState, monsterSeed);
			monsterState.position = tile.position;
			MonsterBuilder.build(engine.scene, levelState, monsterState);
		}
	}

}