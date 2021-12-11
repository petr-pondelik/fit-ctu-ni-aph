import * as ECS from '../../libs/pixi-ecs';
import {GridPosition} from '../model/game-struct';
import {Containers, GameObjectType} from '../constants/constants';
import TextureFactory from '../factory/texture-factory';
import {SPRITE_SIZE} from '../constants/config';
import {Container} from '../../libs/pixi-ecs';
import MonsterBehaviour from '../components/monster-behavior';


export default class MonsterBuilder {

	static build = (scene: ECS.Scene, initPos: GridPosition) => {
		return new ECS.Builder(scene)
			.asSprite(TextureFactory.create(GameObjectType.MONSTER))
			.localPos(initPos.column * SPRITE_SIZE, initPos.row * SPRITE_SIZE)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponent(new MonsterBehaviour())
			.build();
	}

}