import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import LevelState from './level-state';
import {GameData} from '../game-struct';

export default class GameState extends ObservableState {

	private _currentLevel: LevelState;
	private _gameData: GameData;

	constructor(scene: ECS.Scene, gameData: GameData) {
		super(scene);
		this._gameData = gameData;
	}

	set currentLevel(levelState: LevelState) {
		this._currentLevel = levelState;
	}

	get currentLevel() {
		return this._currentLevel;
	}

	get gameData() {
		return this._gameData;
	}

}