import * as ECS from '../../libs/pixi-ecs';
import {LevelData, MapTileType} from '../model/game-struct';
import {Assets} from '../constants/constants';
import {getTileAsset} from '../helpers';
import {LevelFactory} from '../loaders/level-factory';
import {SPRITE_SIZE} from '../constants/config';
import * as PIXI from 'pixi.js';

export default class MazeBuilder {

	static prepare = (scene: ECS.Scene, levelData: LevelData) => {
		const mazeContainerBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName('maze')
			.withParent(scene.stage);
		console.log(mazeContainerBuilder);

		for (const mazeRow of levelData.map) {
			for (const tile of mazeRow) {
				// console.log(tile);
				const tileAsset: Assets = getTileAsset(tile.type);
				// console.log(tileAsset);
				// console.log(PIXI.Texture.from(tileAsset));
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(PIXI.Texture.from(tileAsset))
					.localPos(tile.column * SPRITE_SIZE, tile.row * SPRITE_SIZE)
					.withName(`tile_${tile.row}_${tile.column}`);
				// if (tile.type === MapTileType.FLOOR) {
				//
				// } else if (tile.type === MapTileType.WALL) {
				//
				// }
				mazeContainerBuilder.withChild(tileBuilder);
			}
		}

		return mazeContainerBuilder;
	}

}