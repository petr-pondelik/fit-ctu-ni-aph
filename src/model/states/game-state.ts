import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import LevelState from './level-state';
import {LevelConfig, LevelData} from '../game-struct';
import PlayerState from './player-state';

export default class GameState extends ObservableState {

	private _levelState: LevelState;
	private _playerState: PlayerState;
	private _currentLevel: number;

	constructor(scene: ECS.Scene) {
		super(scene);
		this._currentLevel = 0;
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

	get map() {
		return this._levelState.map;
	}

	get currentLevel(): number {
		return this._currentLevel;
	}

	get config(): LevelConfig {
		return this._levelState.levelData.config;
	}

}