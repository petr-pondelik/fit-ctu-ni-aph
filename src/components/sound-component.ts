import * as ECS from '../../libs/pixi-ecs';
import {Messages, Music} from '../constants/constants';
import PIXISound from 'pixi-sound';

export class SoundComponent extends ECS.Component {

	barMovementsSoundStarted?: number = -100;

	onInit() {
		this.subscribe(Messages.PLAYER_NOISY_STEP);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.PLAYER_NOISY_STEP) {
			if (typeof this.barMovementsSoundStarted === 'number' && this.scene.currentAbsolute - this.barMovementsSoundStarted > Music.BAR_MOVEMENTS_SOUND.length/2) {
				PIXISound.play(Music.BAR_MOVEMENTS_SOUND.key, { volume: 0.25 });
				this.barMovementsSoundStarted = this.scene.currentAbsolute;
			}
		}
	}

}