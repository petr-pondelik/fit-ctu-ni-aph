import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {MovementVector, RealPosition} from '../movement';
import {GridPosition} from '../game-struct';
import {GRID_SIZE} from '../../constants/config';
import {realPositionToGrid} from '../../helpers/grid';


export default class MonsterState extends ObservableState {

	private _gridPosition: GridPosition;
	private _realPosition: RealPosition;

	get gridPosition() {
		return this._gridPosition;
	}

	set position(gridPosition: GridPosition) {
		this._gridPosition = gridPosition;
		this._realPosition = new RealPosition(gridPosition.column * GRID_SIZE + GRID_SIZE/2, gridPosition.row * GRID_SIZE + GRID_SIZE/2);
	}

	applyMovement(vector: MovementVector) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = realPositionToGrid(this._realPosition);
	}

}