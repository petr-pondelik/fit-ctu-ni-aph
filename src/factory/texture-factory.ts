import * as PIXI from 'pixi.js';
import {Assets, GameObjectType, MapTileType} from '../constants/constants';
import {getAsset} from "../helpers/assets";

export default class TextureFactory {
	static create = (type: MapTileType|GameObjectType) => {
		const asset: Assets = getAsset(type);
		return PIXI.Texture.from(asset);
	}
}