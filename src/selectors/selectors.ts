import * as ECS from '../../libs/pixi-ecs';
import {GameData} from '../model/game-struct';
import {Attributes} from '../constants/constants';

export class Selectors {
	static gameDataSelector = (scene: ECS.Scene) => scene.getGlobalAttribute<GameData>(Attributes.GAME_DATA);
}