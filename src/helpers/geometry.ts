import {Position2D} from '../model/geometry';

export const euclideanDistance = (pos1: Position2D, pos2: Position2D) => {
	return Math.sqrt( (pos1.x - pos2.x)**2 + (pos1.y - pos2.y)**2);
};