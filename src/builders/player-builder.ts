import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {MapPosition} from '../model/game-struct';
import {Assets} from '../constants/constants';
import {SPRITE_SIZE} from '../constants/config';
import PlayerKeyboardController from '../components/player-keyboard-controller';


export default class PlayerBuilder {

	static prepare = (scene: ECS.Scene, initPos: MapPosition) => {
		const playerBuilder = new ECS.Builder(scene)
			.withName('player')
			.asSprite(PIXI.Texture.from(Assets.PLAYER))
			.localPos(initPos.column * SPRITE_SIZE, initPos.row * SPRITE_SIZE)
			.withParent(scene.stage)
			.withComponent(new PlayerKeyboardController());

		return playerBuilder;
	}

}