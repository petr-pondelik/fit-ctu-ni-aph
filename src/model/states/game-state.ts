import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import LevelState from './level-state';
import {GameData, LevelConfig, LevelData} from '../game-struct';
import PlayerState from './player-state';

export default class GameState extends ObservableState {

	private _levelState: LevelState;
	private _playerState: PlayerState;
	private readonly _gameData: GameData;
	private _currentLevel: number;
	private gameRunning: boolean;

	constructor(scene: ECS.Scene, gameData: GameData) {
		super(scene);
		this._gameData = gameData;
		this._currentLevel = 0;
		this.gameRunning = false;
	}

	changeLevel(levelData: LevelData, index: number) {
		this._playerState = new PlayerState(this.scene, levelData.playerInitPos);
		this._levelState = new LevelState(this.scene, levelData);
		this._currentLevel = index;
	}

	get levelState() {
		return this._levelState;
	}

	get playerState() {
		return this._playerState;
	}

	get gameData() {
		return this._gameData;
	}

	get map() {
		return this._levelState.map;
	}

	get currentLevel(): number {
		return this._currentLevel;
	}

	set currentLevel(currentLevel) {
		this._currentLevel = currentLevel;
	}

	get config(): LevelConfig {
		return this._levelState.levelData.config;
	}

	resetGame() {
		this.gameRunning = false;
	}

}