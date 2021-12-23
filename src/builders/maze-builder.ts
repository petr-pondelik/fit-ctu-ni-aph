import * as ECS from '../../libs/pixi-ecs';
import {GRID_SIZE} from '../constants/config';
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
					.asSprite(TextureFactory.create(tile.type))
					.localPos(tile.getColumn() * GRID_SIZE, tile.getRow() * GRID_SIZE)
					.withName(`tile_${tile.getRow()}_${tile.getColumn()}`)
					.anchor(0.5);
				mazeContainerBuilder.withChild(tileBuilder);
			}
		}

		mazeContainerBuilder.build().pivot.set(GRID_SIZE/2, GRID_SIZE/2);

		PlayerBuilder.build(engine.scene, levelState.levelData.playerInitPos);
		for (let i = 0; i < levelState.levelData.monsters.amount; i++) {
			let monsterSeed = levelState.levelData.monsters.seeds[i];
			let monsterState = levelState.monstersState[i];
			let tile = getMonsterInitPosition(levelState.map, levelState.playerState, monsterSeed);
			monsterState.position = tile.position;
			MonsterBuilder.build(engine.scene, tile.position, levelState.map);
		}
	}

}