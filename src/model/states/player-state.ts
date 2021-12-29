import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {Vector2D, Position2D} from '../geometry';
import {GridPosition} from '../game-struct';
import {BLOCK_SIZE} from '../../constants/config';
import {realPositionToGrid} from '../../helpers/grid';
import {Messages} from '../../constants/constants';


export default class PlayerState extends ObservableState {

	private _gridPosition: GridPosition;
	private _realPosition: Position2D;
	private _lastMove: Vector2D;

	constructor(scene: ECS.Scene, gridPosition: GridPosition) {
		super(scene);
		this._gridPosition = gridPosition;
		this._realPosition = new Position2D(gridPosition.column * BLOCK_SIZE + BLOCK_SIZE/2, gridPosition.row * BLOCK_SIZE + BLOCK_SIZE/2);
	}

	get gridPosition() {
		return this._gridPosition;
	}

	get realPosition() {
		return this._realPosition;
	}

	get lastMove() {
		return this._lastMove;
	}

	applyMovement(vector: Vector2D) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = realPositionToGrid(this._realPosition);
		this._lastMove = vector;
		this.sendMessage(Messages.STATE_CHANGE_PLAYER_POSITION);
	}

}