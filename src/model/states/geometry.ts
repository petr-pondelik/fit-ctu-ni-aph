import {GridPosition} from '../game-struct';

export const euclideanDistance = (pos1: GridPosition, pos2: GridPosition) => {
	return Math.sqrt( (pos1.row - pos2.row)**2 + (pos1.column - pos2.column)**2);
};
