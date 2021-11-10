import * as ECS from '../libs/pixi-ecs';
import * as PIXI from 'pixi.js';
import {GameLoader} from './loaders/game-loader';
import {SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from './constants/config';


class MazeEscape {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);

		// init the game loop
		this.engine.init(canvas, {
			// transparent: true,
			resizeToScreen: true,
			width: SCENE_WIDTH,
			height: SCENE_HEIGHT,
			resolution: SCENE_RESOLUTION,
			flagsSearchEnabled: false, // searching by flags feature
			statesSearchEnabled: false, // searching by states feature
			tagsSearchEnabled: false, // searching by tags feature
			namesSearchEnabled: true, // searching by names feature
			notifyAttributeChanges: false, // will send message if attributes change
			notifyStateChanges: false, // will send message if states change
			notifyFlagChanges: false, // will send message if flags change
			notifyTagChanges: false, // will send message if tags change
			debugEnabled: false // debugging window
		});

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());

		this.load();
	}

	load() {
		PIXI.settings.ROUND_PIXELS = true;
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		new GameLoader().loadGame(this.engine);
		// console.log(this.engine.app.loader.resources);
	}
}

// this will create a new instance as soon as this file is loaded
export default new MazeEscape();