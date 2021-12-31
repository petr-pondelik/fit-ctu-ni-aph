import * as ECS from '../../libs/pixi-ecs';
import PlayerController from './player-controller';
import {PLAYER_SPEED} from '../constants/config';


export default class PlayerKeyboardController extends PlayerController {

	private keyInputCmp: ECS.KeyInputComponent;

	onInit() {
		console.log('PlayerKeyboardController INIT');
		super.onInit();
		this.keyInputCmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name);
	}

	onUpdate(delta: number, absolute: number) {

		let stepSize: number = delta * PLAYER_SPEED;
		let xStep: number = 0;
		let yStep: number = 0;

		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_W)) {
			// console.log('KEY_W');
			yStep -= stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_A)) {
			// console.log('KEY_A');
			xStep -= stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_S)) {
			// console.log('KEY_S');
			yStep += stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_D)) {
			// console.log('KEY_D');
			xStep += stepSize;
		}

		this.vector = { x: xStep, y: yStep };

		this.move();
	}

}