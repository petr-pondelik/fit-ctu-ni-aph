import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import LevelState from './level-state';
import {GameData} from '../game-struct';

export default class GameState extends ObservableState {

	private _levelState: LevelState;
	private readonly _gameData: GameData;
	private _currentLevel: number;
	private gameRunning: boolean;

	constructor(scene: ECS.Scene, gameData: GameData) {
		super(scene);
		this._gameData = gameData;
		this._currentLevel = 0;
		this.gameRunning = false;
	}

	set levelState(levelState: LevelState) {
		this._levelState = levelState;
	}

	get levelState() {
		return this._levelState;
	}

	get gameData() {
		return this._gameData;
	}

	get currentLevel(): number {
		return this._currentLevel;
	}

	set currentLevel(currentLevel) {
		this._currentLevel = currentLevel;
	}

	resetGame() {
		this.gameRunning = false;
	}

}