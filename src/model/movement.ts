export class RealPosition {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export type MovementVector = {
	x: number;
	y: number;
};
