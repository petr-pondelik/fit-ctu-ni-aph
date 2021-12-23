import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {MovementVector, RealPosition} from '../movement';
import {GridPosition} from '../game-struct';
import {GRID_SIZE} from '../../constants/config';
import {realPositionToGrid} from '../../helpers/grid';


export default class PlayerState extends ObservableState {

	private _gridPosition: GridPosition
	private _realPosition: RealPosition;

	constructor(scene: ECS.Scene, gridPosition: GridPosition) {
		super(scene);
		this._gridPosition = gridPosition;
		this._realPosition = new RealPosition(gridPosition.column * GRID_SIZE + GRID_SIZE/2, gridPosition.row * GRID_SIZE + GRID_SIZE/2);
	}

	get gridPosition() {
		return this._gridPosition;
	}

	get realPosition() {
		return this._realPosition;
	}

	applyMovement(vector: MovementVector) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = realPositionToGrid(this._realPosition);
	}

}