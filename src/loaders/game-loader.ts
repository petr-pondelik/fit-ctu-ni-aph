import * as ECS from '../../libs/pixi-ecs';
import {Assets, Attributes, Music} from '../constants/constants';
import {GameData} from '../model/game-struct';
import {LevelFactory} from '../factory/level-factory';
import GameState from '../model/states/game-state';
import GameStateScreenFactory from '../factory/game-state-screen-factory';
import PIXISound from 'pixi-sound';

/**
 * Game loader, loads assets
 */
export class GameLoader {

	loadGame(engine: ECS.Engine) {
		engine.app.loader
			.reset()
			.add(Assets.SPRITESHEET, 'assets/mainlevbuild.png')
			.add(Assets.ITEMS_SPRITESHEET, 'assets/decorative.png')
			.add(Assets.PLAYER, 'assets/player-16.png')
			.add(Assets.MONSTER, 'assets/monster-bat-16.png')
			.load(() => this.onAssetsLoaded(engine));
		PIXISound.add(Music.BG_MUSIC.key, Music.BG_MUSIC.path);
		PIXISound.add(Music.BAR_MOVEMENTS_SOUND.key, Music.BAR_MOVEMENTS_SOUND.path);
		PIXISound.add(Music.BREAK_DOSE.key, Music.BREAK_DOSE.path);
	}

	private onAssetsLoaded(engine: ECS.Engine) {
		const gameData = new GameData(LevelFactory.createAllLevels());
		let gameState = new GameState(engine.scene);

		engine.scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		engine.scene.assignGlobalAttribute(Attributes.GAME_STATE, gameState);
		PIXISound.play(Music.BG_MUSIC.key, { volume: 0.3, loop: true });
		GameStateScreenFactory.loadIntro(engine.scene);
	}
}