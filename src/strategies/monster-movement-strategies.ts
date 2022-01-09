import MonsterMovement from '../components/monster-movement';
import {getDirections} from '../helpers/grid';
import {Position2D, Vector2D} from '../model/geometry';
import {
	MONSTER_MAX_MOVING_DISTANCE,
} from '../constants/config';
import {getRandomTileInSurroundings} from '../helpers/random';

export interface IMonsterMovementStrategy {
	move(component: MonsterMovement, delta: number);
}

export class MonsterRandomWalk implements IMonsterMovementStrategy {

	randomDestination(component: MonsterMovement) {
		component.destination = getRandomTileInSurroundings(component.map, component.origin, MONSTER_MAX_MOVING_DISTANCE).position;
		component.aStar.findPath(
			component.actualPosition.x, component.actualPosition.y,
			component.destination.x, component.destination.y,
			(path) => {
				component.path = path.slice(1);
			});
		component.aStar.calculate();
	}

	move(component: MonsterMovement, delta: number) {
		if (component.destination === undefined && component.path.length < 1) {
			this.randomDestination(component);
		} else if (component.destination !== undefined && component.path.length < 1) {
			component.aStar.findPath(
				component.actualPosition.x, component.actualPosition.y,
				component.destination.x, component.destination.y,
				(path) => {
					component.path = path.slice(1);
				});
			component.aStar.calculate();
		}

		let nextStep = component.getNextStep();

		if (component.getMonsterActualSpeed() > component.gameState.config.monsterSpeedMin) {
			component.acceleration -= component.gameState.config.monsterSpeedChange;
		}

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new Position2D(nextStep.x, nextStep.y));
			let vector = new Vector2D(
				component.getMonsterActualSpeed() * delta * directions.x,
				component.getMonsterActualSpeed() * delta * directions.y
			);
			vector.normalizeDiagonalSize();
			component.props.applyMovement(vector);
			component.actualPosition = component.props.gridPosition.clone();
		} else {
			component.destination = undefined;
		}
	}

}

export class MonsterChasePlayer implements IMonsterMovementStrategy {

	destinationToPlayer(component: MonsterMovement) {
		component.destination = component.gameState.playerState.gridPosition;
		component.aStar.findPath(
			component.actualPosition.x, component.actualPosition.y,
			component.destination.x, component.destination.y,
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

		if (component.getMonsterActualSpeed() < component.gameState.config.monsterSpeedMax) {
			component.acceleration += component.gameState.config.monsterSpeedChange;
		}

		if (nextStep) {
			const directions = getDirections(component.actualPosition, new Position2D(nextStep.x, nextStep.y));
			let vector = new Vector2D(
				component.getMonsterActualSpeed() * delta * directions.x,
				component.getMonsterActualSpeed() * delta * directions.y
			);
			vector.normalizeDiagonalSize();
			component.props.applyMovement(vector);
			component.actualPosition = component.props.gridPosition.clone();
		} else {
			component.destination = undefined;
		}
	}

}