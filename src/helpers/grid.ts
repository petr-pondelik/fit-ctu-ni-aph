import {MapTileType} from '../constants/constants';
import {RealPosition} from '../model/movement';
import {GridPosition} from '../model/game-struct';
import {GRID_SIZE} from '../constants/config';

export const isAccessibleTile = (type: MapTileType): boolean => {
	return type === MapTileType.FLOOR;
};

export const realPositionToGrid = (realPos: RealPosition): GridPosition => {
	return new GridPosition(Math.floor(realPos.y / GRID_SIZE), Math.floor(realPos.x / GRID_SIZE));
};

export const getDirections = (origin: GridPosition, destination: GridPosition) => {
	const xDir = origin.column === destination.column ? 0 : origin.column < destination.column ? 1 : -1;
	const yDir = origin.row === destination.row ? 0 : origin.row < destination.row ? 1 : -1;
	return {
		x: xDir,
		y: yDir
	};
};