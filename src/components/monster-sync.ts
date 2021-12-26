import * as ECS from '../../libs/pixi-ecs';
import MonsterState from '../model/states/monster-state';
import {Messages} from '../constants/constants';

export class MonsterSync extends ECS.Component<MonsterState> {

	onInit() {
		this.subscribe(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_MONSTER_POSITION) {
			this.syncPosition();
		}
	}

	syncPosition() {
		this.owner.position.x = this.props.realPosition.x;
		this.owner.position.y = this.props.realPosition.y;
	}

}