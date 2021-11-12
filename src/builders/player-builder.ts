import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {MapPosition} from '../model/game-struct';
import {Assets} from '../constants/constants';
import {SPRITE_SIZE} from '../constants/config';
import PlayerKeyboardController from '../components/player-keyboard-controller';
import {Container} from '../../libs/pixi-ecs';


export default class PlayerBuilder {

	static prepare = (scene: ECS.Scene, initPos: MapPosition) => {
		let texture = PIXI.Texture.from(Assets.PLAYER);
		// texture = texture.clone();
		// texture.frame = new PIXI.Rectangle(0, 0, 32, 32);
		const playerBuilder = new ECS.Builder(scene)
			.withName('player')
			.asSprite(texture)
			.localPos(initPos.column * SPRITE_SIZE, initPos.row * SPRITE_SIZE)
			.withParent(scene.stage.getChildByName('maze') as Container)
			// .withParent(scene.stage)
			.withComponent(new PlayerKeyboardController());

		return playerBuilder;
	}

}