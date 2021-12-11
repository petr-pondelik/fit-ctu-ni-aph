import * as ECS from '../../libs/pixi-ecs';
import {LevelData} from '../model/game-struct';
import {GRID_SIZE} from '../constants/config';
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
					.localPos(tile.getColumn() * GRID_SIZE, tile.getRow() * GRID_SIZE)
					.withName(`tile_${tile.getRow()}_${tile.getColumn()}`)
					.anchor(0.5);
				mazeContainerBuilder.withChild(tileBuilder);
			}

		}

		mazeContainerBuilder.build().pivot.set(GRID_SIZE/2, GRID_SIZE/2);
	}

}