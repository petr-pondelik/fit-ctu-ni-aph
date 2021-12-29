import * as PIXI from 'pixi.js';
import {Assets, GameObjectType, MapTileType} from '../constants/constants';
import {getObjectAsset, getTileOffset} from '../helpers/assets';
import {Position2D} from '../model/geometry';
import {BLOCK_SIZE} from '../constants/config';

export default class TextureFactory {
	static createTileTexture = (type: MapTileType) => {
		const offset: Position2D = getTileOffset(type);
		let texture = PIXI.Texture.from(Assets.SPRITESHEET);
		texture = texture.clone();
		texture.frame = new PIXI.Rectangle(offset.x, offset.y, BLOCK_SIZE, BLOCK_SIZE);
		return texture;
	}
	static createObjectTexture = (type: GameObjectType) => {
		const asset: Assets = getObjectAsset(type);
		return PIXI.Texture.from(asset);
	}
}