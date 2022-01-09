import * as ECS from '../../libs/pixi-ecs';
import {Position2D} from '../model/geometry';
import EasyStar from 'easystarjs';
import easyStar from '../algorithms/a-star';
import {MapData} from '../model/game-struct';
import MonsterState from '../model/states/monster-state';
import {Messages} from '../constants/constants';
import {
	IMonsterMovementStrategy,
	MonsterChasePlayer,
	MonsterRandomWalk
} from '../strategies/monster-movement-strategies';
import {Selectors} from '../helpers/selectors';
import GameState from '../model/states/game-state';

type PathStep = {
	x: number;
	y: number;
}

export default class MonsterMovement extends ECS.Component<MonsterState> {

	gameState: GameState;
	map: MapData;
	aStar: EasyStar.js = easyStar;

	origin: Position2D;
	actualPosition: Position2D;
	destination?: Position2D;
	path: PathStep[] = [];

	movementStrategies = { 'RANDOM_WALK': new MonsterRandomWalk(), 'CHASE_PLAYER': new MonsterChasePlayer() };
	activeStrategy: IMonsterMovementStrategy;
	acceleration: number = 0.0;

	onInit() {
		this.gameState = Selectors.gameStateSelector(this.scene);
		this.map = this.gameState.levelState.levelData.map;
		this.subscribe(Messages.MONSTER_START_CHASING_PLAYER, Messages.MONSTER_STOP_CHASING_PLAYER, Messages.MONSTER_ALERTED);
		this.aStar.setGrid(this.map.raw);
		this.initPositions();
		this.activeStrategy = this.movementStrategies.RANDOM_WALK;
	}

	initPositions() {
		this.origin = this.props.realPosition.toGrid();
		this.actualPosition = this.origin.clone();
	}

	onMessage(msg: ECS.Message) {
		if (msg.action === Messages.MONSTER_START_CHASING_PLAYER && msg.gameObject.tags.has('MONSTER_' + this.props.monsterId)) {
			this.reset();
			this.activeStrategy = this.movementStrategies.CHASE_PLAYER;
		} else if (msg.action === Messages.MONSTER_STOP_CHASING_PLAYER && msg.gameObject.tags.has('MONSTER_' + this.props.monsterId)) {
			this.reset();
			this.activeStrategy = this.movementStrategies.RANDOM_WALK;
		} else if (msg.action === Messages.MONSTER_ALERTED && msg.gameObject.tags.has('MONSTER_' + this.props.monsterId)) {
			console.log(this.owner.name);
			this.destination = msg.data;
		}
	}

	onUpdate(delta: number, absolute: number) {
		this.activeStrategy.move(this, delta);
		this.sendMessage(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

	getNextStep(): PathStep|undefined {
		if (this.path.length > 0) {
			let nextStep = this.path[0];
			if (nextStep && this.actualPosition.y !== nextStep.y || this.actualPosition.x !== nextStep.x) {
				return nextStep;
			}
			return this.path.shift();
		}
		return undefined;
	}

	getMonsterActualSpeed(): number {
		return this.gameState.config.monsterSpeedMin + this.acceleration;
	}

	reset() {
		this.destination = undefined;
		this.path = [];
	}

}