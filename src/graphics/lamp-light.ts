import * as PIXI from 'pixi.js';
import * as ECS from '../../libs/pixi-ecs';
import {BLOCK_SIZE, SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';
import {Position2D} from '../model/geometry';

export default class LampLight extends ECS.Graphics {

	constructor(zeroPosition: Position2D, playerPosition: Position2D) {
		super();

		this.beginFill(0x070707);
		this.drawRect(zeroPosition.x, zeroPosition.y, SCENE_WIDTH / SCENE_RESOLUTION, SCENE_HEIGHT / SCENE_RESOLUTION);
		this.endFill();

		this.beginFill(0xCCCCCC);
		this.drawCircle(playerPosition.x - BLOCK_SIZE, playerPosition.y - BLOCK_SIZE, 130);
		this.endFill();

		let filter = new PIXI.filters.BlurFilter(50, 8, SCENE_RESOLUTION);
		filter.blendMode = PIXI.BLEND_MODES.MULTIPLY;

		this.filters = [filter];
	}

}