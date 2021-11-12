import {MapPosition} from './game-struct';
import {SPRITE_SIZE} from '../constants/config';

export enum Direction {
	'UP' = 'UP',
	'DOWN' = 'DOWN',
	'LEFT' = 'LEFT',
	'RIGHT' = 'RIGHT',
	'UPLEFT' = 'UPLEFT',
	'UPRIGHT' = 'UPRIGHT',
	'DOWNLEFT' = 'DOWNLEFT',
	'DOWNRIGHT' = 'DOWNRIGHT',
}

export class PlayerPosition {
	x: number;
	y: number;

	constructor(mapPosition: MapPosition) {
		this.x = mapPosition.column * SPRITE_SIZE;
		this.y = mapPosition.row * SPRITE_SIZE;
	}
}

export type MovementVector = {
	x: number;
	y: number;
};

export const getMovementDirection = (oldXPos: number, oldYPos: number, newXPost: number, newYPos: number): Direction => {
	if (newXPost > oldXPos && newYPos === oldYPos) {
		return Direction.RIGHT;
	}
	if (newXPost < oldXPos && newYPos === oldYPos) {
		return Direction.LEFT;
	}
	if (newYPos < oldYPos && newXPost === oldXPos) {
		return Direction.UP;
	}
	if (newYPos > oldYPos && newXPost === oldXPos) {
		return Direction.DOWN;
	}
};