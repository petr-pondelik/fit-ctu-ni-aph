import ObservableState from './observable-state';
import {MovementVector, RealPosition} from '../movement';


export default class MonsterState extends ObservableState {

	private _position?: RealPosition;

	get position() {
		return this._position;
	}

	set position(position) {
		this._position = position;
	}

	applyMovement(vector: MovementVector) {
		this._position.x += vector.x;
		this._position.y += vector.y;
	}

}