import * as ECS from '../../libs/pixi-ecs';
import {Messages} from '../constants/constants';


export class HudMessageRenderer extends ECS.Component {

	lastMsgShown?: number;

	onInit() {
		this.subscribe(Messages.PLAYER_NOISY_STEP);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.PLAYER_NOISY_STEP) {
			let owner = this.owner.asText();
			owner.text = 'Be careful with the noise';
			this.lastMsgShown = this.scene.currentAbsolute;
		}
	}

	onUpdate(delta: number, absolute: number) {
		if (typeof this.lastMsgShown === 'number' && (absolute - this.lastMsgShown) > 2000) {
			let owner = this.owner.asText();
			owner.text = '';
		}
	}

}