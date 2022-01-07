import MonsterMovement from '../components/monster-movement';
import {getDirections} from '../helpers/grid';
import {GridPosition} from '../model/game-struct';
import {Vector2D} from '../model/geometry';
import {
	MONSTER_CHANGE_SPEED,
	MONSTER_MAX_MOVING_DISTANCE,
	MONSTER_SPEED_MAX,
	MONSTER_SPEED_MIN
} from '../constants/config';
import {getRandomTileInSurroundings} from '../helpers/random';

export interface IMonsterMovementStrategy {
	move(component: MonsterMovement, delta: number);
}

export class MonsterRandomWalk implements IMonsterMovementStrategy {

	randomDestination(component: MonsterMovement) {
		component.destination = getRandomTileInSurroundings(component.map, component.origin, MONSTER_MAX_MOVING_DISTANCE).position;
		component.aStar.findPath(
			component.actualPosition.column, component.actualPosition.row,
			component.destination.column, component.destination.row,
			(path) => {
				component.path = path.slice(1);
			});
		component.aStar.calculate();
	}

	move(component: MonsterMovement, delta: number) {
		if (component.destination === undefined && component.path.length < 1) {
			this.randomDestination(component);
		}

		let nextStep = component.getNextStep();

		if (component.getMonsterActualSpeed() > MONSTER_SPEED_MIN) {
			component.acceleration -= MONSTER_CHANGE_SPEED;
		}

		console.log(component.getMonsterActualSpeed());

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new GridPosition(nextStep.y, nextStep.x));
			let vector: Vector2D = {
				x: component.getMonsterActualSpeed() * delta * directions.x,
				y: component.getMonsterActualSpeed() * delta * directions.y
			};
			component.props.applyMovement(vector);
			component.actualPosition = new GridPosition(component.props.gridPosition.row, component.props.gridPosition.column);
		} else {
			component.destination = undefined;
		}
	}

}

export class MonsterChasePlayer implements IMonsterMovementStrategy {

	destinationToPlayer(component: MonsterMovement) {
		component.destination = component.levelState.playerState.gridPosition;
		component.aStar.findPath(
			component.actualPosition.column, component.actualPosition.row,
			component.destination.column, component.destination.row,
			(path) => {
				if (path !== null) {
					component.path = path.slice(1);
				}
			});
		component.aStar.calculate();
	}

	move(component: MonsterMovement, delta: number) {
		this.destinationToPlayer(component);
		let nextStep = component.getNextStep();

		if (component.getMonsterActualSpeed() < MONSTER_SPEED_MAX) {
			component.acceleration += MONSTER_CHANGE_SPEED;
		}

		console.log(component.getMonsterActualSpeed());

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new GridPosition(nextStep.y, nextStep.x));
			let vector: Vector2D = {
				x: component.getMonsterActualSpeed() * delta * directions.x,
				y: component.getMonsterActualSpeed() * delta * directions.y
			};
			component.props.applyMovement(vector);
			component.actualPosition = new GridPosition(component.props.gridPosition.row, component.props.gridPosition.column);
		} else {
			component.destination = undefined;
		}
	}

}