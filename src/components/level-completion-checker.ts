import * as ECS from '../../libs/pixi-ecs';
import AbstractCollision from './abstract-collision';
import {Selectors} from '../helpers/selectors';
import {Messages} from '../constants/constants';
import GameState from '../model/states/game-state';
import {GridPosition} from '../model/game-struct';
import GameActions from '../actions/game-actions';


export default class LevelCompletionChecker extends AbstractCollision {

	gameState: GameState;

	onInit() {
		this.gameState = Selectors.gameStateSelector(this.scene);
		this.subscribe(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_PLAYER_POSITION) {
			const pos = msg.data as GridPosition;
			if (this.gameState.levelState.map.getTile(pos).isLevelExit) {
				this._action();
			}
		}
	}

	_action(): void {
		console.log('LEVEL COMPLETED');
		this.scene.addGlobalComponentAndRun(GameActions.completeLevel(this.scene));
	}

}