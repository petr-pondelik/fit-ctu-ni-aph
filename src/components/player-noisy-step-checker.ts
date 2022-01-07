import * as ECS from '../../libs/pixi-ecs';
import AbstractCollision from './abstract-collision';
import {Messages} from '../constants/constants';
import {Position2D} from '../model/geometry';
import {isNoisyTile} from '../helpers/grid';
import {MapData} from '../model/game-struct';
import {Selectors} from '../helpers/selectors';


export default class PlayerNoisyStepChecker extends AbstractCollision {

	map: MapData;
	position?: Position2D;

	onInit() {
		this.map = Selectors.levelStateSelector(this.scene).map;
		this.subscribe(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_PLAYER_POSITION) {
			const pos = msg.data as Position2D;
			if (isNoisyTile(this.map.getTile(pos).type)) {
				console.log('PLAYER STEPPED ON NOISY TILE!');
				this.position = pos;
				this._action();
			}
		}
	}

	protected _action() {
		console.log('SEND MESSAGE');
		this.sendMessage(Messages.PLAYER_NOISY_STEP, this.position);
	}
}