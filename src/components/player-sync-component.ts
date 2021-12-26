import {Messages} from '../constants/constants';
import * as ECS from '../../libs/pixi-ecs';
import PlayerState from '../model/states/player-state';

export class PlayerSyncComponent extends ECS.Component<PlayerState> {

	onInit() {
		this.subscribe(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_PLAYER_POSITION) {
			this.syncPosition();
		}
		return super.onMessage(msg);
	}

	syncPosition() {
		this.owner.parentGameObject.position.x -= this.props.lastMove.x;
		this.owner.parentGameObject.position.y -= this.props.lastMove.y;
		this.owner.position.x = this.props.realPosition.x;
		this.owner.position.y = this.props.realPosition.y;
	}
}