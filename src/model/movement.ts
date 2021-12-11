import {GridPosition} from './game-struct';
import {SPRITE_SIZE} from '../constants/config';


export class RealPosition {
	x: number;
	y: number;

	constructor(mapPosition: GridPosition) {
		this.x = mapPosition.column * SPRITE_SIZE;
		this.y = mapPosition.row * SPRITE_SIZE;
	}
}

export type MovementVector = {
	x: number;
	y: number;
};
