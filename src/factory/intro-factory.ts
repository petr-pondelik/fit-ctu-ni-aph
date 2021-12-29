import * as ECS from '../../libs/pixi-ecs';
import WaitInputComponent from '../components/wait-input-component';
import GameActions from '../actions/game-actions';
import IntroBuilder from '../builders/intro-builder';

export default class IntroFactory {

	static loadIntro = (scene: ECS.Scene) => {

		IntroBuilder.build(scene);

		scene.addGlobalComponentAndRun(new ECS.ChainComponent()
			.waitFor(() => new WaitInputComponent())
			.mergeWith(GameActions.start(scene, 0))
		);
	}

}