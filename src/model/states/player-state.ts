import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {MovementVector, RealPosition} from '../movement';


export default class PlayerState extends ObservableState {

	private _position: RealPosition;

	constructor(scene: ECS.Scene, position: RealPosition) {
		super(scene);
		this._position = position;
	}

	get position() {
		return this._position;
	}

	applyMovement(vector: MovementVector) {
		this._position.x += vector.x;
		this._position.y += vector.y;
	}

}