import * as ECS from '../../libs/pixi-ecs';
import {MovementVector} from '../model/movement';
import {MONSTER_SPEED} from '../constants/config';


export default class MonsterBehavior extends ECS.Component {

	onInit() {
		console.log('MonsterBehavior INIT');
	}

	onMessage(msg: ECS.Message) {
		// TODO
	}

	onUpdate(delta: number, absolute: number) {
		// TODO
		let movement: MovementVector = {
			x: MONSTER_SPEED * delta,
			y: 0
		};
		this.owner.position.x += movement.x;
		this.owner.position.y += movement.y;
	}

}