import * as ECS from '../../libs/pixi-ecs';
import {Container} from '../../libs/pixi-ecs';
import {GridPosition} from '../model/game-struct';
import {GRID_SIZE} from '../constants/config';
import PlayerKeyboardController from '../components/player-keyboard-controller';
import TextureFactory from '../factory/texture-factory';
import {Containers, GameObjectType} from '../constants/constants';


export default class PlayerBuilder {

	static build = (scene: ECS.Scene, initPos: GridPosition) => {
		return new ECS.Builder(scene)
			.withName('player')
			.asSprite(TextureFactory.create(GameObjectType.PLAYER))
			.anchor(0.5)
			.withAttribute('pivot', 16)
			.localPos(initPos.column * GRID_SIZE + GRID_SIZE/2, initPos.row * GRID_SIZE + GRID_SIZE / 2)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponent(new PlayerKeyboardController())
			.build()
			.pivot.set(GRID_SIZE/2, GRID_SIZE/2);
	}

}