import * as ECS from '../../../libs/pixi-ecs';
import ObservableState from './observable-state';
import {Item, LevelData} from '../game-struct';
import MonsterState from './monster-state';
import {Position2D} from '../geometry';


export default class LevelState extends ObservableState {

	private readonly _levelData: LevelData;
	private readonly _monstersState: MonsterState[] = [];
	private _itemsState: Item[] = [];

	constructor(scene: ECS.Scene, levelData: LevelData) {
		super(scene);
		this._levelData = levelData;
		for (let i = 0; i < levelData.monsters.amount; i++) {
			this._monstersState.push(new MonsterState(scene, i));
		}
		for (const item of levelData.items) {
			this._itemsState.push(item);
		}
	}

	get levelData() {
		return this._levelData;
	}

	get monstersState() {
		return this._monstersState;
	}

	get map() {
		return this._levelData.map;
	}

	getItem(position: Position2D): Item|undefined {
		return this._itemsState.find((item) => {
			return item.position.x === position.x && item.position.y === position.y;
		});
	}
}