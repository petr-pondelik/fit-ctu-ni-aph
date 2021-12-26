import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {MovementVector, RealPosition} from '../movement';
import {GridPosition} from '../game-struct';
import {BLOCK_SIZE} from '../../constants/config';
import {realPositionToGrid} from '../../helpers/grid';
import {Messages} from '../../constants/constants';


export default class MonsterState extends ObservableState {

	private readonly _monsterId: number;
	private _gridPosition: GridPosition;
	private _realPosition: RealPosition;

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

	set position(gridPosition: GridPosition) {
		this._gridPosition = gridPosition;
		this._realPosition = new RealPosition(gridPosition.column * BLOCK_SIZE + BLOCK_SIZE/2, gridPosition.row * BLOCK_SIZE + BLOCK_SIZE/2);
	}

	applyMovement(vector: MovementVector) {
		this._realPosition.x += vector.x;
		this._realPosition.y += vector.y;
		this._gridPosition = realPositionToGrid(this._realPosition);
		this.sendMessage(Messages.STATE_CHANGE_MONSTER_POSITION);
	}

}