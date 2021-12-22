import * as ECS from '../../libs/pixi-ecs';
import {MovementVector, RealPosition} from '../model/movement';
import {MONSTER_SPEED} from '../constants/config';
import EasyStar from 'easystarjs';
import easyStar from '../algorithms/a-star';
import {GridPosition, MapData} from '../model/game-struct';
import {getDirections, realPositionToGrid} from '../helpers';

type PathStep = {
	x: number;
	y: number;
}

export default class MonsterBehavior extends ECS.Component {

	map: MapData;
	aStar: EasyStar.js = easyStar;
	position: GridPosition;
	destination: GridPosition;
	path: PathStep[] = [];

	constructor(map: MapData) {
		super();
		this.map = map;
	}

	getNextStep(): PathStep|undefined {
		if (this.path.length > 0) {
			let nextStep = this.path[0];
			if (nextStep && this.position.row !== nextStep.y || this.position.column !== nextStep.x) {
				return nextStep;
			}
			return this.path.shift();
		}
		return undefined;
	}

	onInit() {
		console.log('MonsterBehavior INIT');
		this.aStar.setGrid(this.map.raw);
		this.position = realPositionToGrid(new RealPosition(this.owner.position.x, this.owner.position.y));
		this.destination = new GridPosition(8, 12);
		this.aStar.findPath(this.position.column, this.position.row, this.destination.column, this.destination.row, (path) => {
			this.path = path.slice(1);
		});
		this.aStar.calculate();
	}

	onMessage(msg: ECS.Message) {
		// TODO
	}

	onUpdate(delta: number, absolute: number) {

		let nextStep = this.getNextStep();

		if (nextStep) {
			const directions = getDirections(this.position, new GridPosition(nextStep.y, nextStep.x));
			let movement: MovementVector = {
				x: MONSTER_SPEED * delta * directions.x,
				y: MONSTER_SPEED * delta * directions.y
			};
			let x = this.owner.position.x + movement.x;
			let y = this.owner.position.y + movement.y;
			this.owner.position.x = x;
			this.owner.position.y = y;
			this.position = realPositionToGrid(new RealPosition(this.owner.position.x, this.owner.position.y));
		}
	}

}