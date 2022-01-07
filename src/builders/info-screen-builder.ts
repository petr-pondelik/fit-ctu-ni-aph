import * as ECS from '../../libs/pixi-ecs';
import {SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';
import {TextStyle} from 'pixi.js';

const style = {
	fontFamily: 'Arial',
	fontSize: 20,
	fill: '#ffffff',
	align: 'center'
} as TextStyle;

export default class InfoScreenBuilder {

	static intro = (scene: ECS.Scene): ECS.Builder => {
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText('Press Enter or Space to start the game', style)
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
						style)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			);
	};

	static playerDied = (scene: ECS.Scene): ECS.Builder => {
		let customStyle = {
			fill: '#ff0000',
		} as TextStyle;
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText(
						'YOU DIED\n\n' +
						'Press Enter or Space to play again',
						{...style, ...customStyle} as TextStyle)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			);
	}

}