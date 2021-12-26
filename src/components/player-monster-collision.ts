import * as ECS from '../../libs/pixi-ecs';
import AbstractCollision from './abstract-collision';
import {Messages} from '../constants/constants';
import {Selectors} from '../helpers/selectors';
import GameState from '../model/states/game-state';

export default class PlayerMonsterCollision extends AbstractCollision {

	gameState: GameState;

	onInit() {
		this.gameState = Selectors.gameStateSelector(this.scene);
		this.subscribe(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_MONSTER_POSITION) {
			if (this.hasCollided(this.gameState.levelState.playerState.realPosition.x, this.gameState.levelState.playerState.realPosition.y)) {
				this._action();
			}
		}
	}

	_action(): void {
		console.log('ACTION');
		this.gameState.resetGame();
	}

}