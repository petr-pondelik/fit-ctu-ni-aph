import * as ECS from '../../libs/pixi-ecs';
import {SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';
import {TextStyle} from 'pixi.js';
import {COMMON_TEXT_STYLE} from '../styles/common';

const textStyle = {
	...COMMON_TEXT_STYLE
	, ...{
		fontSize: 20,
		align: 'center'
	}
} as TextStyle;

export default class InfoScreenBuilder {

	static intro = (scene: ECS.Scene): ECS.Builder => {
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText('Press Enter or Space to start the game', textStyle)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			);
	};

	static gameFinished = (scene: ECS.Scene): ECS.Builder => {
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText(
						'CONGRATULATIONS, YOU FINISHED THE GAME!\n\n' +
						'Press Enter or Space to play again',
						textStyle)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			);
	};

	static playerDied = (scene: ECS.Scene): ECS.Builder => {
		const customStyle = { fill: '#ff0000' } as TextStyle;
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText(
						'YOU DIED\n\n' +
						'Press Enter or Space to play again',
						{...textStyle, ...customStyle} as TextStyle)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			);
	}

}