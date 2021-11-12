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

		for (const tilesRow of levelData.map.tiles) {

			for (const tile of tilesRow) {
				if (tile.type === MapTileType.EMPTY) {
					continue;
				}
				const tileAsset: Assets = getTileAsset(tile.type);
				let texture = PIXI.Texture.from(tileAsset);
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(texture)
					.localPos(tile.column * SPRITE_SIZE, tile.row * SPRITE_SIZE)
					.withName(`tile_${tile.row}_${tile.column}`);
				mazeContainerBuilder.withChild(tileBuilder);
			}

		}

		return mazeContainerBuilder;
	}

}