import * as ECS from '../../libs/pixi-ecs';
import PlayerController from './player-controller';
import {Vector2D} from '../model/geometry';
import {Selectors} from '../helpers/selectors';


export default class PlayerKeyboardController extends PlayerController {

	private keyInputCmp: ECS.KeyInputComponent;

	onInit() {
		super.onInit();
		this.keyInputCmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(ECS.KeyInputComponent.name);
		this.playerState = Selectors.playerStateSelector(this.scene);
	}

	onUpdate(delta: number, absolute: number) {

		let stepSize: number = delta * this.playerState.speed;
		let xStep: number = 0;
		let yStep: number = 0;

		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_W)) {
			yStep -= stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_A)) {
			xStep -= stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_S)) {
			yStep += stepSize;
		}
		if (this.keyInputCmp.isKeyPressed(ECS.Keys.KEY_D)) {
			xStep += stepSize;
		}

		this.vector = new Vector2D(xStep, yStep);

		this.move();
	}

}