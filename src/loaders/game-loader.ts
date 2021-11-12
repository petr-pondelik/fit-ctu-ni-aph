import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {LEVELS} from '../constants/levels';
import {GameData, LevelData} from '../model/game-struct';
import {LevelFactory} from './level-factory';
import GameState from '../model/states/game-state';

/**
 * Game loader, loads assets
 */
export class GameLoader {

	loadGame(engine: ECS.Engine) {
		engine.app.loader
			.reset()
			.add(Assets.FLOOR, 'assets/dungeon-floor-1.png')
			.add(Assets.WALL_FRONT_UPPER, 'assets/dungeon-wall-front-up.png')
			.add(Assets.WALL_FRONT_BOTTOM, 'assets/dungeon-wall-front-bottom.png')
			.add(Assets.WALL_UPPER_LEFT_INNER_EDGE, 'assets/dungeon-wall-upper-left-inner-edge.png')
			.add(Assets.WALL_LEFT, 'assets/dungeon-wall-left.png')
			.add(Assets.PLAYER, 'assets/draft-player.png')
			.load(() => this.onAssetsLoaded(engine));
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);

		const gameData: GameData = {
			levels: LevelFactory.createLevels()
		};

		console.log('GAME DATA');
		console.log(gameData);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, new GameState(engine.scene, gameData));

		console.log('ADD KeyInputComponent');
		// console.log(engine.scene.getGlobalAttribute<LevelData>(Attributes.GAME_DATA));
		LevelFactory.loadLevel(engine.scene, 0);
	}
}