import {MapTile} from '../model/game-struct';
import {Containers, MapTileType} from '../constants/constants';
import * as ECS from '../../libs/pixi-ecs';
import TextureFactory from '../factory/texture-factory';
import {BLOCK_SIZE} from '../constants/config';
import LevelCompletionChecker from '../components/level-completion-checker';

export default class TilesBuilder {

	static build = (scene: ECS.Scene, tiles: MapTile[][]) => {
		const mazeContainerBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName(Containers.MAZE)
			.withParent(scene.stage)
			.withComponents([
				new LevelCompletionChecker()
			]);

		for (const tilesRow of tiles) {
			for (const tile of tilesRow) {
				if (tile.type === MapTileType.EMPTY) {
					continue;
				}
				const tileBuilder = new ECS.Builder(scene)
					.asSprite(TextureFactory.createTileTexture(tile.type))
					.localPos(tile.getColumn() * BLOCK_SIZE, tile.getRow() * BLOCK_SIZE)
					.withName(`TILE_${tile.getRow()}_${tile.getColumn()}`)
					.anchor(0.5);
				mazeContainerBuilder.withChild(tileBuilder);
			}
		}

		mazeContainerBuilder.build().pivot.set(BLOCK_SIZE/2, BLOCK_SIZE/2);
	}

}