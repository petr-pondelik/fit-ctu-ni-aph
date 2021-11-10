import * as ECS from '../../libs/pixi-ecs';
import {MovementVector} from '../model/movement';


export default class PlayerController extends ECS.Component {

	vector: MovementVector = { x: 0, y: 0 }

	move() {
		// console.log(this.vector);
		this.scene.stage.pivot.x += this.vector.x;
		this.scene.stage.pivot.y += this.vector.y;
		this.owner.position.x += this.vector.x;
		this.owner.position.y += this.vector.y;
	}

}