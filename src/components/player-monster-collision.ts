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
		console.log(this.gameState.playerState.realPosition);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.STATE_CHANGE_MONSTER_POSITION) {
			if (this.hasCollided(this.gameState.playerState.realPosition.x, this.gameState.playerState.realPosition.y)) {
				this._action();
			}
		}
	}

	_action(): void {
		this.scene.addGlobalComponentAndRun(GameActions.playerDied(this.scene));
	}

}