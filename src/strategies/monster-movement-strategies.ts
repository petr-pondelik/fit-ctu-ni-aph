import MonsterMovementComponent from '../components/monster-movement-component';
import {getDirections, realPositionToGrid} from '../helpers/grid';
import {GridPosition} from '../model/game-struct';
import {MovementVector, RealPosition} from '../model/movement';
import {MONSTER_MAX_MOVING_DISTANCE, MONSTER_SPEED} from '../constants/config';
import {getRandomTileInSurroundings} from '../helpers/random';

export interface IMonsterMovementStrategy {
	move(component: MonsterMovementComponent, delta: number);
}

export class MonsterRandomWalk implements IMonsterMovementStrategy {

	randomDestination(component: MonsterMovementComponent) {
		component.destination = getRandomTileInSurroundings(component.map, component.origin, MONSTER_MAX_MOVING_DISTANCE).position;
		component.aStar.findPath(
			component.actualPosition.column, component.actualPosition.row,
			component.destination.column, component.destination.row,
			(path) => {
				component.path = path.slice(1);
			});
		component.aStar.calculate();
	}

	move(component: MonsterMovementComponent, delta: number) {
		if (component.destination === undefined && component.path.length < 1) {
			this.randomDestination(component);
		}

		let nextStep = component.getNextStep();

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new GridPosition(nextStep.y, nextStep.x));
			let movement: MovementVector = {
				x: MONSTER_SPEED * delta * directions.x,
				y: MONSTER_SPEED * delta * directions.y
			};
			component.props.applyMovement(movement);
			component.actualPosition = realPositionToGrid(new RealPosition(component.owner.position.x, component.owner.position.y));
		} else {
			component.destination = undefined;
		}
	}

}

export class MonsterChasePlayer implements IMonsterMovementStrategy {

	destinationToPlayer(component: MonsterMovementComponent) {
		component.destination = component.levelState.playerState.gridPosition;
		component.aStar.findPath(
			component.actualPosition.column, component.actualPosition.row,
			component.destination.column, component.destination.row,
			(path) => {
				component.path = path.slice(1);
			});
		component.aStar.calculate();
	}

	move(component: MonsterMovementComponent, delta: number) {
		this.destinationToPlayer(component);

		let nextStep = component.getNextStep();

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new GridPosition(nextStep.y, nextStep.x));
			let movement: MovementVector = {
				x: MONSTER_SPEED * delta * directions.x,
				y: MONSTER_SPEED * delta * directions.y
			};
			component.props.applyMovement(movement);
			component.actualPosition = realPositionToGrid(new RealPosition(component.owner.position.x, component.owner.position.y));
		} else {
			component.destination = undefined;
		}
	}

}