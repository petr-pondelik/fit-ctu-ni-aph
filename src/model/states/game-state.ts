import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import LevelState from './level-state';
import {GameData} from '../game-struct';
import EasyStar, {js} from 'easystarjs';

export default class GameState extends ObservableState {

	aStar: js;

	private _currentLevel: LevelState;
	private _gameData: GameData;

	constructor(scene: ECS.Scene, gameData: GameData) {
		super(scene);
		this._gameData = gameData;
		this._currentLevel = new LevelState(scene, gameData.levels[0]);
		// this.aStar.setGrid(this._currentLevel)
	}

	get currentLevel() {
		return this._currentLevel;
	}

	get gameData() {
		return this._gameData;
	}

}