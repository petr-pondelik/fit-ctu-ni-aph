import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {GameData} from '../model/game-struct';
import {LevelFactory} from '../factory/level-factory';
import GameState from '../model/states/game-state';
import IntroFactory from '../factory/intro-factory';

/**
 * Game loader, loads assets
 */
export class GameLoader {

	loadGame(engine: ECS.Engine) {
		engine.app.loader
			.reset()
			.add(Assets.SPRITESHEET, 'assets/mainlevbuild.png')
			.add(Assets.PLAYER, 'assets/player-16.png')
			.add(Assets.MONSTER, 'assets/monster-bat-16.png')
			.load(() => this.onAssetsLoaded(engine));
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);

		const gameData = new GameData(LevelFactory.createAllLevels());
		let gameState = new GameState(engine.scene, gameData);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, gameState);

		IntroFactory.loadIntro(engine.scene);
	}
}