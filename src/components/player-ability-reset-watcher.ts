import * as ECS from '../../libs/pixi-ecs';
import PlayerState from '../model/states/player-state';
import {Selectors} from '../helpers/selectors';

export default class PlayerAbilityResetWatcher extends ECS.Component {

	playerState: PlayerState;

	onInit() {
		this.playerState = Selectors.playerStateSelector(this.scene);
	}

	onUpdate(delta: number, absolute: number) {
		this.playerState.checkSpeedReset();
	}
}