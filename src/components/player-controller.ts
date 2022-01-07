import * as ECS from '../../libs/pixi-ecs';
import {Vector2D} from '../model/geometry';
import {Selectors} from '../helpers/selectors';
import {adjustMovementByObstacles} from '../helpers/grid';


export default class PlayerController extends ECS.Component {

	vector: Vector2D = new Vector2D(0, 0);

	move() {
		if (this.vector.x !== 0 || this.vector.y !== 0) {
			let levelState = Selectors.levelStateSelector(this.scene);
			let playerState = levelState.playerState;
			let newX = this.owner.position.x + this.vector.x;
			let newY = this.owner.position.y + this.vector.y;
			let surroundingTiles = levelState.map.getSurrounding(newX, newY);
			this.vector = adjustMovementByObstacles(surroundingTiles, this.owner, this.vector);
			if (this.vector.getSize() !== 0) {
				this.vector.normalizeDiagonalSize();
				playerState.applyMovement(this.vector);
			}
		}
	}

}