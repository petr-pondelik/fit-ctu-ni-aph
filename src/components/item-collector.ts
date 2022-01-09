import * as ECS from '../../libs/pixi-ecs';
import {ItemType, Messages} from '../constants/constants';
import {Selectors} from '../helpers/selectors';
import LevelState from '../model/states/level-state';
import {Position2D} from '../model/geometry';
import PlayerState from '../model/states/player-state';

export class ItemCollector extends ECS.Component {

	private levelState: LevelState;
	private playerState: PlayerState;

	onInit() {
		this.levelState = Selectors.levelStateSelector(this.scene);
		this.playerState = Selectors.playerStateSelector(this.scene);
		this.subscribe(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_PLAYER_POSITION) {
			let item = this.levelState.getItem(msg.data as Position2D);
			if (item !== undefined && this.owner.name === `item_${item.position.x}_${item.position.y}`) {
				this.sendMessage(Messages.DOSE_COLLECTED);
				this.sendMessage(Messages.PLAYER_NOISY_STEP, msg.data);
				if (item.type === ItemType.SPEED_UP) {
					this.speedUpEffect();
				}
				this.owner.detach();
			}
		}
	}

	speedUpEffect() {
		this.playerState.speedUp(1.5);
	}
}