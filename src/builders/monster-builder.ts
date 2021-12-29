import * as ECS from '../../libs/pixi-ecs';
import {Containers, GameObjectType, Tags} from '../constants/constants';
import TextureFactory from '../factory/texture-factory';
import {BLOCK_SIZE} from '../constants/config';
import {Container} from '../../libs/pixi-ecs';
import MonsterMovement from '../components/monster-movement';
import MonsterState from '../model/states/monster-state';
import {MonsterSync} from '../components/monster-sync';
import LevelState from '../model/states/level-state';
import MonsterChasePlayer from '../components/monster-chase-player';
import PlayerMonsterCollision from '../components/player-monster-collision';


export default class MonsterBuilder {

	static build = (scene: ECS.Scene, levelState: LevelState, monsterState: MonsterState) => {
		return new ECS.Builder(scene)
			.asSprite(TextureFactory.createObjectTexture(GameObjectType.MONSTER))
			.localPos(monsterState.gridPosition.column * BLOCK_SIZE, monsterState.gridPosition.row * BLOCK_SIZE)
			.anchor(0.5)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponents([
				new MonsterMovement(monsterState),
				new MonsterChasePlayer(monsterState),
				new PlayerMonsterCollision(),
				new MonsterSync(monsterState)
			])
			.withTag(Tags.MONSTER + '_' + monsterState.monsterId)
			.build()
			.pivot.set(BLOCK_SIZE/2, BLOCK_SIZE/2);
	}

}