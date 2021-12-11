import * as ECS from '../../libs/pixi-ecs';
import {Container} from '../../libs/pixi-ecs';
import {GridPosition} from '../model/game-struct';
import {SPRITE_SIZE} from '../constants/config';
import PlayerKeyboardController from '../components/player-keyboard-controller';
import TextureFactory from '../factory/texture-factory';
import {Containers, GameObjectType} from '../constants/constants';


export default class PlayerBuilder {

	static build = (scene: ECS.Scene, initPos: GridPosition) => {
		return new ECS.Builder(scene)
			.withName('player')
			.asSprite(TextureFactory.create(GameObjectType.PLAYER))
			.localPos(initPos.column * SPRITE_SIZE, initPos.row * SPRITE_SIZE)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponent(new PlayerKeyboardController())
			.build();
	}

}