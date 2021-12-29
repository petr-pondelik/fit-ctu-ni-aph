import * as ECS from '../../libs/pixi-ecs';
import {Position2D} from '../model/geometry';
import EasyStar from 'easystarjs';
import easyStar from '../algorithms/a-star';
import {GridPosition, MapData} from '../model/game-struct';
import {realPositionToGrid} from '../helpers/grid';
import MonsterState from '../model/states/monster-state';
import {Messages} from '../constants/constants';
import {
	IMonsterMovementStrategy,
	MonsterChasePlayer,
	MonsterRandomWalk
} from '../strategies/monster-movement-strategies';
import LevelState from '../model/states/level-state';
import {Selectors} from '../helpers/selectors';

type PathStep = {
	x: number;
	y: number;
}

export default class MonsterMovement extends ECS.Component<MonsterState> {

	levelState: LevelState;
	map: MapData;
	aStar: EasyStar.js = easyStar;

	origin: GridPosition;
	actualPosition: GridPosition;
	destination?: GridPosition;
	path: PathStep[] = [];

	movementStrategies = { 'RANDOM_WALK': new MonsterRandomWalk(), 'CHASE_PLAYER': new MonsterChasePlayer() };
	activeStrategy: IMonsterMovementStrategy;

	onInit() {
		console.log('MonsterBehavior INIT');
		this.levelState = Selectors.levelStateSelector(this.scene);
		this.map = this.levelState.levelData.map;
		this.subscribe(Messages.MONSTER_START_CHASING_PLAYER, Messages.MONSTER_STOP_CHASING_PLAYER);
		this.aStar.setGrid(this.map.raw);
		this.initPositions();
		this.activeStrategy = this.movementStrategies.RANDOM_WALK;
	}

	initPositions() {
		this.origin = realPositionToGrid(new Position2D(this.props.realPosition.x, this.props.realPosition.y));
		this.actualPosition = new GridPosition(this.origin.row, this.origin.column);
	}

	onMessage(msg: ECS.Message) {
		if (msg.action === Messages.MONSTER_START_CHASING_PLAYER && msg.gameObject.tags.has('MONSTER_' + this.props.monsterId)) {
			this.reset();
			this.activeStrategy = this.movementStrategies.CHASE_PLAYER;
		} else if (msg.action === Messages.MONSTER_STOP_CHASING_PLAYER && msg.gameObject.tags.has('MONSTER_' + this.props.monsterId)) {
			this.reset();
			this.activeStrategy = this.movementStrategies.RANDOM_WALK;
		}
	}

	onUpdate(delta: number, absolute: number) {
		this.activeStrategy.move(this, delta);
		this.sendMessage(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

	getNextStep(): PathStep|undefined {
		if (this.path.length > 0) {
			let nextStep = this.path[0];
			if (nextStep && this.actualPosition.row !== nextStep.y || this.actualPosition.column !== nextStep.x) {
				return nextStep;
			}
			return this.path.shift();
		}
		return undefined;
	}

	reset() {
		this.destination = undefined;
		this.path = [];
	}

}