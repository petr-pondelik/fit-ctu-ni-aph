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

export class Vector2D {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	isDiagonal = (): boolean => {
		return this.x !== 0 && this.y !== 0;
	}

	normalizeDiagonalSize = () => {
		if (this.isDiagonal()) {
			const c = Math.sqrt(2);
			this.x = this.x / c;
			this.y = this.y / c;
		}
	}

	getSize = (): number => {
		return Math.sqrt(this.x**2 + this.y**2);
	}
}
