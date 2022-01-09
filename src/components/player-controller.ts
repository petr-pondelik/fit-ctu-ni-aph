import * as ECS from '../../libs/pixi-ecs';
import {Vector2D} from '../model/geometry';
import {Selectors} from '../helpers/selectors';
import {adjustMovementByObstacles} from '../helpers/grid';
import PlayerState from '../model/states/player-state';


export default class PlayerController extends ECS.Component {

	playerState: PlayerState;
	vector: Vector2D = new Vector2D(0, 0);

	move() {
		if (this.vector.x !== 0 || this.vector.y !== 0) {
			let gameState = Selectors.gameStateSelector(this.scene);
			let newX = this.owner.position.x + this.vector.x;
			let newY = this.owner.position.y + this.vector.y;
			let surroundingTiles = gameState.map.getSurrounding(newX, newY);
			this.vector = adjustMovementByObstacles(surroundingTiles, this.scene, this.owner, this.vector);
			if (this.vector.getSize() !== 0) {
				this.vector.normalizeDiagonalSize();
				this.playerState.applyMovement(this.vector);
			}
		}
	}

}