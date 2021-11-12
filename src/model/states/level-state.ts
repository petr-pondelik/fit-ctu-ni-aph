import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import PlayerState from './player-state';
import {LevelData} from '../game-struct';
import {PlayerPosition} from '../movement';


export default class LevelState extends ObservableState {

	private readonly _levelData: LevelData;
	private readonly _playerState: PlayerState;

	constructor(scene: ECS.Scene, levelData: LevelData) {
		super(scene);
		this._levelData = levelData;
		this._playerState = new PlayerState(scene, new PlayerPosition(levelData.playerInitPos));
	}

	get levelData() {
		return this._levelData;
	}

	get playerState() {
		return this._playerState;
	}

	getMapTile(row: number, column: number) {
		if (column >= this._levelData.map.size.columns || row >= this._levelData.map.size.rows || column < 0 || row < 0) {
			throw new Error(`Coordinates outside bounds: [${column}, ${row}]`);
		}
		return this._levelData.map.tiles[row][column];
	}
}