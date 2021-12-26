import * as ECS from '../../libs/pixi-ecs';
import {Containers, GameObjectType} from '../constants/constants';
import TextureFactory from '../factory/texture-factory';
import {GRID_SIZE} from '../constants/config';
import {Container} from '../../libs/pixi-ecs';
import MonsterMovementComponent from '../components/monster-movement-component';
import MonsterState from '../model/states/monster-state';
import {MonsterSyncComponent} from '../components/monster-sync-component';
import LevelState from '../model/states/level-state';
import MonsterChaseComponent from '../components/monster-chase-component';


export default class MonsterBuilder {

	static build = (scene: ECS.Scene, levelState: LevelState, monsterState: MonsterState) => {
		return new ECS.Builder(scene)
			.asSprite(TextureFactory.create(GameObjectType.MONSTER))
			.localPos(monsterState.gridPosition.column * GRID_SIZE, monsterState.gridPosition.row * GRID_SIZE)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponents([
				new MonsterMovementComponent(monsterState, levelState),
				new MonsterChaseComponent(monsterState, levelState),
				new MonsterSyncComponent(monsterState)
			])
			.withTag('MONSTER_' + monsterState.monsterId)
			.build()
			.pivot.set(GRID_SIZE/2, GRID_SIZE/2);
	}

}