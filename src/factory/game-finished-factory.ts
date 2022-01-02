import * as ECS from '../../libs/pixi-ecs';
import WaitInputComponent from '../components/wait-input-component';
import GameActions from '../actions/game-actions';
import GameFinishedBuilder from '../builders/game-finished-builder';

export default class GameFinishedFactory {

	static create = (scene: ECS.Scene) => {

		GameFinishedBuilder.build(scene);

		scene.addGlobalComponentAndRun(new ECS.ChainComponent()
			.waitFor(() => new WaitInputComponent())
			.mergeWith(GameActions.start(scene, 0))
		);
	}

}