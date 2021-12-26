import * as ECS from '../../libs/pixi-ecs';
import LevelState from '../model/states/level-state';
import {euclideanDistance} from '../model/states/geometry';
import {PLAYER_CHASE_DISTANCE} from '../constants/config';
import {Messages} from '../constants/constants';
import MonsterState from '../model/states/monster-state';


export default class MonsterChaseComponent extends ECS.Component<MonsterState> {

	levelState: LevelState;
	isChasingPlayer: boolean = false;

	constructor(props: MonsterState, levelState: LevelState) {
		super(props);
		this.levelState = levelState;
	}

	onInit() {
		console.log('MonsterChaseComponent INIT');
	}

	onUpdate(delta: number, absolute: number) {
		let playerDistance = euclideanDistance(this.levelState.playerState.gridPosition, this.props.gridPosition);
		if (!this.isChasingPlayer && playerDistance <= PLAYER_CHASE_DISTANCE) {
			this.switchChasing();
			this.sendMessage(Messages.MONSTER_START_CHASING_PLAYER);
		} else if (this.isChasingPlayer && playerDistance > PLAYER_CHASE_DISTANCE) {
			this.switchChasing();
			this.sendMessage(Messages.MONSTER_STOP_CHASING_PLAYER);
		}
	}

	switchChasing() {
		this.isChasingPlayer = !this.isChasingPlayer;
	}

}