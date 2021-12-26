import * as ECS from '../../libs/pixi-ecs';
import {Container} from '../../libs/pixi-ecs';
import {GRID_SIZE} from '../constants/config';
import PlayerKeyboardController from '../components/player-keyboard-controller';
import TextureFactory from '../factory/texture-factory';
import {Containers, GameObjectType} from '../constants/constants';
import {PlayerSyncComponent} from '../components/player-sync-component';
import PlayerState from '../model/states/player-state';


export default class PlayerBuilder {

	static build = (scene: ECS.Scene, state: PlayerState) => {
		return new ECS.Builder(scene)
			.withName('player')
			.asSprite(TextureFactory.create(GameObjectType.PLAYER))
			.anchor(0.5)
			.withAttribute('pivot', 16)
			.localPos(state.gridPosition.column * GRID_SIZE + GRID_SIZE/2, state.gridPosition.row * GRID_SIZE + GRID_SIZE / 2)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container)
			.withComponents([new PlayerKeyboardController(), new PlayerSyncComponent(state)])
			.build()
			.pivot.set(GRID_SIZE/2, GRID_SIZE/2);
	}

}