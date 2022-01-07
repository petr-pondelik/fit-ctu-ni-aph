import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {Vector2D, Position2D} from '../geometry';
import {Messages} from '../../constants/constants';


export default class MonsterState extends ObservableState {

	private readonly _monsterId: number;
	private _gridPosition: Position2D;
	private _realPosition: Position2D;

	constructor(scene: ECS.Scene, monsterId: number) {
		super(scene);
		this._monsterId = monsterId;
	}

	get monsterId(): number {
		return this._monsterId;
	}

	get gridPosition() {
		return this._gridPosition;
	}

	get realPosition() {
		return this._realPosition;
	}

	set position(gridPosition: Position2D) {
		this._gridPosition = gridPosition;
		this._realPosition = gridPosition.toReal();
	}

	applyMovement(vector: Vector2D) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = this._realPosition.toGrid();
		this.sendMessage(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

}