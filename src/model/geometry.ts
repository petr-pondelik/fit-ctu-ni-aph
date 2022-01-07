import {BLOCK_SIZE} from '../constants/config';

export class Position2D {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	isEqual(pos: Position2D) {
		return this.x === pos.x && this.y === pos.y;
	}

	toGrid = (): Position2D => {
		return new Position2D(Math.floor(this.x / BLOCK_SIZE), Math.floor(this.y / BLOCK_SIZE));
	}

	toReal = (): Position2D => {
		return new Position2D(this.x * BLOCK_SIZE + BLOCK_SIZE/2,this.y * BLOCK_SIZE + BLOCK_SIZE/2);
	}

	clone = (): Position2D => {
		return new Position2D(this.x, this.y);
	}
}

export type Vector2D = {
	x: number;
	y: number;
};
