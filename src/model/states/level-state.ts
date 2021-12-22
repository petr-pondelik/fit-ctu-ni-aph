import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import PlayerState from './player-state';
import {GridPosition, LevelData, MapTile} from '../game-struct';
import MonsterState from './monster-state';


export default class LevelState extends ObservableState {

	private readonly _levelData: LevelData;
	private readonly _playerState: PlayerState;
	private readonly _monstersStates: Array<MonsterState> = [];

	constructor(scene: ECS.Scene, levelData: LevelData) {
		super(scene);
		this._levelData = levelData;
		this._playerState = new PlayerState(scene, levelData.playerInitPos);
		for (let i = 0; i < levelData.monstersAmount; i++) {
			this._monstersStates.push(new MonsterState(scene));
		}
	}

	get levelData() {
		return this._levelData;
	}

	get playerState() {
		return this._playerState;
	}

	getMapTile(position: GridPosition) {
		if (position.column >= this._levelData.map.size.columns || position.row >= this._levelData.map.size.rows || position.column < 0 || position.row < 0) {
			throw new Error(`Coordinates outside bounds: [${position.column}, ${position.row}]`);
		}
		return this._levelData.map.tiles[position.row][position.column];
	}
}