import * as ECS from '../../libs/pixi-ecs';
import InfoScreenBuilder from '../builders/info-screen-builder';
import WaitInputComponent from '../components/wait-input-component';
import GameActions from '../actions/game-actions';

export default class GameStateScreenFactory {

	static loadIntro = (scene: ECS.Scene) => {
		InfoScreenBuilder.intro(scene).build();
		scene.addGlobalComponentAndRun(new ECS.ChainComponent()
			.waitFor(() => new WaitInputComponent())
			.mergeWith(GameActions.start(scene, 0))
		);
	};

	static loadGameFinished = (scene: ECS.Scene) => {
		InfoScreenBuilder.gameFinished(scene).build();
		scene.addGlobalComponentAndRun(new ECS.ChainComponent()
			.waitFor(() => new WaitInputComponent())
			.mergeWith(GameActions.start(scene, 0))
		);
	};

	static loadPlayerDied = (scene: ECS.Scene) => {
		InfoScreenBuilder.playerDied(scene).build();
		scene.addGlobalComponentAndRun(new ECS.ChainComponent()
			.waitFor(() => new WaitInputComponent())
			.mergeWith(GameActions.start(scene, 0))
		);
	}

}