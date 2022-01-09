import * as ECS from '../../libs/pixi-ecs';
import GameState from '../model/states/game-state';
import {Containers, GAME_TITLE, HudElements} from '../constants/constants';
import {TextStyle} from 'pixi.js';
import {BLOCK_SIZE, SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';
import {COMMON_TEXT_STYLE} from '../styles/common';
import {HudMessageRenderer} from '../components/hud-message-renderer';

const style = {
	...COMMON_TEXT_STYLE,
	... {
		fill: '#ffffff',
		fontSize: 10,
		align: 'left'
	}
} as TextStyle;

export default class HudBuilder {

	static leftTop = (scene: ECS.Scene, gameState) => {
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withName(HudElements.GAME_TITLE)
			.asText(GAME_TITLE, style)
			.localPos(
				-SCENE_WIDTH / (2 * SCENE_RESOLUTION) + gameState.playerState.realPosition.x - BLOCK_SIZE/2,
				gameState.playerState.realPosition.y - SCENE_HEIGHT / (2 * SCENE_RESOLUTION) - BLOCK_SIZE/2
			);
	}

	static leftBottom = (scene: ECS.Scene, gameState: GameState) => {
		return new ECS.Builder(scene)
			.withParent(scene.stage)
			.withName(HudElements.LEVEL_NAME)
			.asText(gameState.levelState.levelData.name, {...style, ...{ fontSize: 8 }} as TextStyle)
			.localPos(
				-SCENE_WIDTH / (2 * SCENE_RESOLUTION) + gameState.playerState.realPosition.x - BLOCK_SIZE/2,
				gameState.playerState.realPosition.y + SCENE_HEIGHT / (2 * SCENE_RESOLUTION) - 2.25 * BLOCK_SIZE
			);
	}

	static rightBottom = (scene: ECS.Scene, gameState: GameState) => {

		const hudBuilder = new ECS.Builder(scene)
			.withName(Containers.HUD_RIGHT_BOTTOM)
			.withParent(scene.stage)
			.asContainer()
			.localPos(
				SCENE_WIDTH / (2 * SCENE_RESOLUTION) - 4 * BLOCK_SIZE,
				gameState.playerState.realPosition.y + SCENE_HEIGHT / (2 * SCENE_RESOLUTION) - 2.25 * BLOCK_SIZE
			);

		const hudMessageBuilder = new ECS.Builder(scene)
			.withName(HudElements.GAME_MESSAGE)
			.asText('', {...style, ...{ fontSize: 8 }} as TextStyle)
			.withComponent(new HudMessageRenderer());

		hudBuilder.withChild(hudMessageBuilder);

		return hudBuilder;
	}

}