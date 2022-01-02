import {TextStyle} from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';


const style = {
	fontFamily: 'Arial',
	fontSize: 20,
	fill: '#ffffff',
	align: 'center'
} as TextStyle;

export default class GameFinishedBuilder {

	static build = (scene: ECS.Scene) => {
		new ECS.Builder(scene)
			.withParent(scene.stage)
			.withChild(
				new ECS.Builder(scene)
					.asText(
						'CONGRATULATIONS, YOU FINISHED THE GAME!\n\n' +
						'Press Enter or Space to play again',
						style)
					.localPos(SCENE_WIDTH / (2 * SCENE_RESOLUTION), SCENE_HEIGHT / (2 * SCENE_RESOLUTION))
					.anchor(0.5)
			)
			.build();
	}

}