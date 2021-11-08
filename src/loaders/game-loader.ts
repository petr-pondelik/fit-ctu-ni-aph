import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {LEVELS} from '../constants/levels';
import {GameData, LevelData} from "../model/game-struct";
import {LevelFactory} from "./level-factory";

/**
 * Game loader, loads assets
 */
export class GameLoader {

	loadGame(engine: ECS.Engine) {
		engine.app.loader
			.reset()
			.add(Assets.SPRITESHEET, 'assets/draft-spritesheet.png')
			.add(Assets.TILE_FLOOR, 'assets/draft-tile-floor.png')
			.add(Assets.TILE_WALL, 'assets/draft-tile-wall.png')
			.add(Assets.PLAYER, 'assets/draft-player.png')
			.load(() => this.onAssetsLoaded(engine));
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);
		const gameData: GameData = {
			levels: LevelFactory.createLevels()
		};
		// console.log(gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		// console.log(engine.scene.getGlobalAttribute<LevelData>(Attributes.GAME_DATA));
		LevelFactory.loadLevel(engine.scene, 0);
	}
}