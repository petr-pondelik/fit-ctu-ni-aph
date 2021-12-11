import * as ECS from '../../libs/pixi-ecs';
import {LevelData} from '../model/game-struct';
import {SPRITE_SIZE} from '../constants/config';
import TextureFactory from '../factory/texture-factory';
import {Containers, MapTileType} from '../constants/constants';

export default class MazeBuilder {

	static build = (scene: ECS.Scene, levelData: LevelData) => {
		const mazeContainerBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName(Containers.MAZE)
			.withParent(scene.stage);

		for (const tilesRow of levelData.map.tiles) {

			for (const tile of tilesRow) {
				if (tile.type === MapTileType.EMPTY) {
					continue;
				}
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(TextureFactory.create(tile.type))
					.localPos(tile.column * SPRITE_SIZE, tile.row * SPRITE_SIZE)
					.withName(`tile_${tile.row}_${tile.column}`);
				mazeContainerBuilder.withChild(tileBuilder);
			}

		}

		mazeContainerBuilder.build();
	}

}