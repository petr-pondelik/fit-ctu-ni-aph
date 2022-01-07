import * as ECS from '../../libs/pixi-ecs';
import LevelState from '../model/states/level-state';
import {euclideanDistance} from '../helpers/geometry';
import {
	NOISE_CHASE_DISTANCE,
	PLAYER_CHASE_DISTANCE,
} from '../constants/config';
import {Messages} from '../constants/constants';
import MonsterState from '../model/states/monster-state';
import {Selectors} from '../helpers/selectors';
import {Position2D} from '../model/geometry';


export default class MonsterSense extends ECS.Component<MonsterState> {

	levelState: LevelState;
	isChasingPlayer: boolean = false;
	isAlerted: boolean = false;
	playerChaseDistance: number;
	noiseChaseDistance: number;

	onInit() {
		console.log('MonsterChaseComponent INIT');
		this.levelState = Selectors.levelStateSelector(this.scene);
		this.playerChaseDistance = PLAYER_CHASE_DISTANCE;
		this.noiseChaseDistance = NOISE_CHASE_DISTANCE;
		this.subscribe(Messages.PLAYER_NOISY_STEP);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === Messages.PLAYER_NOISY_STEP) {
			let noiseDistance = euclideanDistance(msg.data as Position2D, this.props.gridPosition);
			if (noiseDistance <= this.noiseChaseDistance) {
				this.sendMessage(Messages.MONSTER_ALERTED, msg.data);
			}
		}
	}

	onUpdate(delta: number, absolute: number) {
		let playerDistance = euclideanDistance(this.levelState.playerState.gridPosition, this.props.gridPosition);
		if (!this.isChasingPlayer && playerDistance <= this.playerChaseDistance) {
			this.switchChasing();
			this.sendMessage(Messages.MONSTER_START_CHASING_PLAYER);
		} else if (this.isChasingPlayer && playerDistance > this.playerChaseDistance) {
			this.switchChasing();
			this.sendMessage(Messages.MONSTER_STOP_CHASING_PLAYER);
		}
	}

	switchChasing() {
		this.isChasingPlayer = !this.isChasingPlayer;
	}

}