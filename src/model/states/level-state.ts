import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import PlayerState from './player-state';
import {LevelData} from '../game-struct';
import MonsterState from './monster-state';


export default class LevelState extends ObservableState {

	private readonly _levelData: LevelData;
	private readonly _playerState: PlayerState;
	private readonly _monstersState: MonsterState[] = [];

	constructor(scene: ECS.Scene, levelData: LevelData) {
		super(scene);
		this._levelData = levelData;
		this._playerState = new PlayerState(scene, levelData.playerInitPos);
		for (let i = 0; i < levelData.monsters.amount; i++) {
			this._monstersState.push(new MonsterState(scene));
		}
	}

	get levelData() {
		return this._levelData;
	}

	get playerState() {
		return this._playerState;
	}

	get monstersState() {
		return this._monstersState;
	}

	get map() {
		return this._levelData.map;
	}
}