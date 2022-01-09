import * as ECS from '../../libs/pixi-ecs';
import {Containers} from '../constants/constants';
import {Item} from '../model/game-struct';
import TextureFactory from '../factory/texture-factory';
import {BLOCK_SIZE} from '../constants/config';
import {Container} from '../../libs/pixi-ecs';
import {ItemCollector} from '../components/item-collector';

export class ItemsBuilder {

	static items = (scene: ECS.Scene, items: Item[]): ECS.Builder => {
		const mazeItemsBuilder = new ECS.Builder(scene)
			.asContainer()
			.withName(Containers.ITEMS)
			.withParent(scene.stage.getChildByName(Containers.MAZE) as Container);

		for (const item of items) {
			const itemBuilder = new ECS.Builder(scene)
				.asSprite(TextureFactory.createItemTexture(item.type))
				.localPos(item.position.x * BLOCK_SIZE, item.position.y * BLOCK_SIZE)
				.anchor(0.5)
				.withComponent(new ItemCollector());
			mazeItemsBuilder.withChild(itemBuilder);
		}

		return mazeItemsBuilder;
	}
}