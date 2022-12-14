import * as ECS from '../../libs/pixi-ecs';
import {GameData} from '../model/game-struct';
import {Attributes} from '../constants/constants';
import GameState from '../model/states/game-state';

export class Selectors {
	static gameDataSelector = (scene: ECS.Scene) => scene.getGlobalAttribute<GameData>(Attributes.GAME_DATA);
	static gameStateSelector = (scene: ECS.Scene) => scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE);
	static levelStateSelector = (scene: ECS.Scene) => scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE).levelState;
	static playerStateSelector = (scene: ECS.Scene) => scene.getGlobalAttribute<GameState>(Attributes.GAME_STATE).playerState;
}