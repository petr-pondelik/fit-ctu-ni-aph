import * as ECS from '../../libs/pixi-ecs';
import {LevelFactory} from '../factory/level-factory';
import {Selectors} from '../helpers/selectors';
import GameFinishedFactory from '../factory/game-finished-factory';

export default class GameActions {

	static start = (scene: ECS.Scene, delay = 1000) => {
		return new ECS.ChainComponent()
			.waitTime(delay)
			.call((cmp) => {
				cmp.mergeWith(
					new ECS.ChainComponent()
						.call(
							() => scene.callWithDelay(0, () => LevelFactory.loadLevel(scene, 0))
						)
				);
			});
	};

	static completeLevel = (scene: ECS.Scene) => {
		console.log('completeLevel');
		return new ECS.ChainComponent()
			.call(
				(cmp) => {
					const gameState = Selectors.gameStateSelector(scene);
					let nextLevelInx = gameState.currentLevel + 1;
					if (nextLevelInx < gameState.gameData.levels.length) {
						cmp.mergeWith(
							new ECS.ChainComponent()
								.call(
									() => scene.callWithDelay(0, () => LevelFactory.loadLevel(scene, nextLevelInx))
								)
						);
					} else {
						cmp.mergeWith(
							new ECS.ChainComponent()
								.call(
									() => scene.callWithDelay(0, () => GameActions.completeGame(scene))
								)
						);
					}
				}
			);
	};

	static completeGame = (scene: ECS.Scene) => {
		LevelFactory.clearScene(scene, false);
		return GameFinishedFactory.create(scene);
	}

}