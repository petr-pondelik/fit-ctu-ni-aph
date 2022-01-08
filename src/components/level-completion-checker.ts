import * as ECS from '../../libs/pixi-ecs';
import AbstractCollision from './abstract-collision';
import {Selectors} from '../helpers/selectors';
import {Messages} from '../constants/constants';
import GameActions from '../actions/game-actions';
import {Position2D} from '../model/geometry';
import {MapData} from '../model/game-struct';


export default class LevelCompletionChecker extends AbstractCollision {

	map: MapData;

	onInit() {
		this.map = Selectors.levelStateSelector(this.scene).map;
		this.subscribe(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_PLAYER_POSITION) {
			const pos = msg.data as Position2D;
			if (this.map.getTile(pos).isLevelExit) {
				this._action();
			}
		}
	}

	_action(): void {
		this.scene.addGlobalComponentAndRun(GameActions.completeLevel(this.scene));
	}

}