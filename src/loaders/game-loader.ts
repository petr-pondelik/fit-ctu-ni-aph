import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {GameData} from '../model/game-struct';
import {LevelFactory} from '../factory/level-factory';
import GameState from '../model/states/game-state';
import {Selectors} from '../helpers/selectors';
import MazeBuilder from '../builders/maze-builder';
import {SCENE_HEIGHT, SCENE_WIDTH, GRID_SIZE} from '../constants/config';
import LevelState from '../model/states/level-state';

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
			.add(Assets.MONSTER, 'assets/draft-monster.png')
			.load(() => this.onAssetsLoaded(engine));
	}

	loadLevel(engine: ECS.Engine, index: number) {
		const levelData = Selectors.gameDataSelector(engine.scene).levels[index];
		const levelState = new LevelState(engine.scene, levelData);
		let gameState = engine.scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE);
		gameState.currentLevel = levelState;
		MazeBuilder.build(engine, gameState.currentLevel);
		engine.scene.stage.pivot.x = (levelData.playerInitPos.column * GRID_SIZE) - (SCENE_WIDTH/GRID_SIZE/2 * GRID_SIZE)/2 + GRID_SIZE/2;
		engine.scene.stage.pivot.y = (levelData.playerInitPos.row * GRID_SIZE) - (SCENE_HEIGHT/GRID_SIZE/2 * GRID_SIZE)/2 + GRID_SIZE/2;
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);

		const gameData = new GameData(LevelFactory.createAllLevels());
		let gameState = new GameState(engine.scene, gameData);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, gameState);

		this.loadLevel(engine, 0);
	}
}