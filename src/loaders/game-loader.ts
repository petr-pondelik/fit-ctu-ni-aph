import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes} from '../constants/constants';
import {GameData} from '../model/game-struct';
import {LevelFactory} from '../factory/level-factory';
import GameState from '../model/states/game-state';
import {Selectors} from '../selectors/selectors';
import MazeBuilder from '../builders/maze-builder';
import PlayerBuilder from '../builders/player-builder';
import {SCENE_HEIGHT, SCENE_WIDTH, GRID_SIZE} from '../constants/config';
import MonsterBuilder from '../builders/monster-builder';

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

	loadLevel(scene: ECS.Scene, index: number) {
		const levelData = Selectors.gameDataSelector(scene).levels[index];
		// console.log(levelData);
		MazeBuilder.build(scene, levelData);
		let player = PlayerBuilder.build(scene, levelData.playerInitPos);
		MonsterBuilder.build(scene, { row: 5, column: 5 });

		scene.stage.pivot.x = (levelData.playerInitPos.column * GRID_SIZE) - (SCENE_WIDTH/GRID_SIZE/2 * GRID_SIZE)/2 + GRID_SIZE/2;
		scene.stage.pivot.y = (levelData.playerInitPos.row * GRID_SIZE) - (SCENE_HEIGHT/GRID_SIZE/2 * GRID_SIZE)/2 + GRID_SIZE/2;
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		console.log('ASSETS LOADED');
		console.log(engine.app.loader.resources);

		const gameData: GameData = {
			levels: LevelFactory.createAllLevels()
		};

		console.log('GAME DATA');
		console.log(gameData);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, new GameState(engine.scene, gameData));

		console.log('ADD KeyInputComponent');
		// console.log(engine.scene.getGlobalAttribute<LevelData>(Attributes.GAME_DATA));
		this.loadLevel(engine.scene, 0);
	}
}