import * as ECS from '../../libs/pixi-ecs';
import * as PIXI from 'pixi.js';
import {LevelData, MapTileType} from '../model/game-struct';
import {Assets} from '../constants/constants';
import {getTileAsset} from '../helpers';
import {SPRITE_SIZE} from '../constants/config';

export default class MazeBuilder {

	static prepare = (scene: ECS.Scene, levelData: LevelData) => {
		const mazeContainerBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName('maze')
			.withParent(scene.stage);

		for (const mazeRow of levelData.map) {

			for (const tile of mazeRow) {
				if (tile.type === MapTileType.EMPTY) {
					continue;
				}
				const tileAsset: Assets = getTileAsset(tile.type);
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(PIXI.Texture.from(tileAsset))
					.localPos(tile.column * SPRITE_SIZE, tile.row * SPRITE_SIZE)
					.withName(`tile_${tile.row}_${tile.column}`);

				mazeContainerBuilder.withChild(tileBuilder);
			}

		}

		return mazeContainerBuilder;
	}

}