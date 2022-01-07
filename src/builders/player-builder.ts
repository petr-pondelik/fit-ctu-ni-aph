import * as ECS from '../../libs/pixi-ecs';
import {Container} from '../../libs/pixi-ecs';
import PlayerKeyboardController from '../components/player-keyboard-controller';
import TextureFactory from '../factory/texture-factory';
import {Containers, GameObjectType} from '../constants/constants';
import {PlayerSync} from '../components/player-sync';
import PlayerState from '../model/states/player-state';


export default class PlayerBuilder {

	static basic = (scene: ECS.Scene, state: PlayerState): ECS.Builder => {
		return new ECS.Builder(scene)
			.withName('player')
			.asSprite(TextureFactory.createObjectTexture(GameObjectType.PLAYER))
			.anchor(0.5)
			.withAttribute('pivot', 16)
			.localPos(state.realPosition.x, state.realPosition.y)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponents([new PlayerKeyboardController(), new PlayerSync(state)]);
	}

}