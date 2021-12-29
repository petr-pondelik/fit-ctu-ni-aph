import * as ECS from '../../libs/pixi-ecs';
import {BLOCK_SIZE} from '../constants/config';


export default abstract class AbstractCollision extends ECS.Component {

	hasCollided(targetX: number, targetY: number): boolean {
		const ownerPos = this.owner.position;
		const diffX = Math.abs(ownerPos.x - targetX);
		const diffY = Math.abs(ownerPos.y - targetY);
		return diffX < BLOCK_SIZE / 2 && diffY < BLOCK_SIZE / 2;
	}

	protected abstract _action(): void;

}