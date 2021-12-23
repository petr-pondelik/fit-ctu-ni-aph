import * as ECS from '../../libs/pixi-ecs';
import {MovementVector, RealPosition} from '../model/movement';
import {MONSTER_MAX_MOVING_DISTANCE, MONSTER_SPEED} from '../constants/config';
import EasyStar from 'easystarjs';
import easyStar from '../algorithms/a-star';
import {GridPosition, MapData} from '../model/game-struct';
import {getDirections, realPositionToGrid} from '../helpers/grid';
import {getRandomTileInSurroundings} from '../helpers/random';

type PathStep = {
	x: number;
	y: number;
}

export default class MonsterBehavior extends ECS.Component {

	map: MapData;
	aStar: EasyStar.js = easyStar;
	origin: GridPosition;
	actualPosition: GridPosition;
	destination?: GridPosition;
	path: PathStep[] = [];

	constructor(map: MapData) {
		super();
		this.map = map;
	}

	initPositions() {
		this.origin = realPositionToGrid(new RealPosition(this.owner.position.x, this.owner.position.y));
		this.actualPosition = realPositionToGrid(new RealPosition(this.owner.position.x, this.owner.position.y));
	}

	randomDestination() {
		this.destination = getRandomTileInSurroundings(this.map, this.origin, MONSTER_MAX_MOVING_DISTANCE).position;
		this.aStar.findPath(this.actualPosition.column, this.actualPosition.row, this.destination.column, this.destination.row, (path) => {
			this.path = path.slice(1);
		});
		this.aStar.calculate();
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

	onInit() {
		console.log('MonsterBehavior INIT');
		this.aStar.setGrid(this.map.raw);
		this.initPositions();
		this.randomDestination();
	}

	onMessage(msg: ECS.Message) {
		// TODO
	}

	onUpdate(delta: number, absolute: number) {

		if (this.destination === undefined) {
			this.randomDestination();
		}

		let nextStep = this.getNextStep();

		if (nextStep) {
			const directions = getDirections(this.actualPosition, new GridPosition(nextStep.y, nextStep.x));
			let movement: MovementVector = {
				x: MONSTER_SPEED * delta * directions.x,
				y: MONSTER_SPEED * delta * directions.y
			};
			let x = this.owner.position.x + movement.x;
			let y = this.owner.position.y + movement.y;
			this.owner.position.x = x;
			this.owner.position.y = y;
			this.actualPosition = realPositionToGrid(new RealPosition(this.owner.position.x, this.owner.position.y));
		} else {
			this.destination = undefined;
		}
	}

}