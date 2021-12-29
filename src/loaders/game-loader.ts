import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {GameData} from '../model/game-struct';
import {LevelFactory} from '../factory/level-factory';
import GameState from '../model/states/game-state';
import {Selectors} from '../helpers/selectors';
import MazeBuilder from '../builders/maze-builder';
import {SCENE_HEIGHT, SCENE_WIDTH, BLOCK_SIZE, SCENE_RESOLUTION} from '../constants/config';
import LevelState from '../model/states/level-state';

/**
 * Game loader, loads assets
 */
export class GameLoader {

	loadGame(engine: ECS.Engine) {
		engine.app.loader
			.reset()
			.add(Assets.SPRITESHEET, 'assets/map-spritesheet.png')
			.add(Assets.PLAYER, 'assets/draft-player-16.png')
			.add(Assets.MONSTER, 'assets/draft-monster-16.png')
			.load(() => this.onAssetsLoaded(engine));
	}

	loadLevel(engine: ECS.Engine, index: number) {
		const levelData = Selectors.gameDataSelector(engine.scene).levels[index];
		const levelState = new LevelState(engine.scene, levelData);
		let gameState = Selectors.gameStateSelector(engine.scene);
		gameState.levelState = levelState;
		MazeBuilder.build(engine, gameState.levelState);
		console.log(SCENE_HEIGHT);
		console.log(SCENE_HEIGHT/2);
		engine.scene.stage.pivot.x = -SCENE_WIDTH/(2*SCENE_RESOLUTION) - (levelData.playerInitPos.column * BLOCK_SIZE) + BLOCK_SIZE/2;
		engine.scene.stage.pivot.y = -SCENE_HEIGHT/(2*SCENE_RESOLUTION) + (levelData.playerInitPos.row * BLOCK_SIZE) - BLOCK_SIZE + BLOCK_SIZE/2;
		console.log(engine.scene.stage.pivot);
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);

		const gameData = new GameData(LevelFactory.createAllLevels());
		let gameState = new GameState(engine.scene, gameData);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, gameState);

		this.loadLevel(engine, gameState.currentLevel);
	}
}