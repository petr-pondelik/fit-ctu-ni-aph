import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {MovementVector, PlayerPosition} from '../movement';


export default class PlayerState extends ObservableState {

	private _position: PlayerPosition;

	constructor(scene: ECS.Scene, position: PlayerPosition) {
		super(scene);
		this._position = position;
	}

	get position() {
		return this._position;
	}

	applyMovement(vector: MovementVector) {
		// console.log('applyMovement');
		// console.log(vector);
		this._position.x += vector.x;
		this._position.y += vector.y;
		// console.log(this._position);
	}

}