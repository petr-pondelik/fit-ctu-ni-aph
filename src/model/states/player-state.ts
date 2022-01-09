import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {Vector2D, Position2D} from '../geometry';
import {Messages} from '../../constants/constants';
import {PLAYER_SPEED} from '../../constants/config';


export default class PlayerState extends ObservableState {

	private _gridPosition: Position2D;
	private _realPosition: Position2D;
	private _lastMove: Vector2D;
	private _speed: number;

	constructor(scene: ECS.Scene, gridPosition: Position2D) {
		super(scene);
		this._gridPosition = gridPosition;
		this._realPosition = gridPosition.toReal();
		this._speed = PLAYER_SPEED;
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

	get speed() {
		return this._speed;
	}

	set speed(speed) {
		this._speed = speed;
	}

	applyMovement(vector: Vector2D) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = this._realPosition.toGrid();
		this._lastMove = vector;
		this.sendMessage(Messages.STATE_CHANGE_PLAYER_POSITION, {x: this.gridPosition.x, y: this.gridPosition.y});
	}

}