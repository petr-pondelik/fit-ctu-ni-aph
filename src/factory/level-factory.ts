import * as ECS from '../../libs/pixi-ecs';
import {
	GameData,
	Item, LevelConfig,
	LevelData,
	MapData,
	MapDimensions,
	MapTile,
	MonstersData, MonsterSeed,
} from '../model/game-struct';
import {LEVELS} from '../constants/levels';
import {Selectors} from '../helpers/selectors';
import MazeBuilder from '../builders/maze-builder';
import {BLOCK_SIZE, SCENE_HEIGHT, SCENE_RESOLUTION, SCENE_WIDTH} from '../constants/config';
import GameState from '../model/states/game-state';
import {Attributes, ItemType, MapTileType} from '../constants/constants';
import {Position2D} from '../model/geometry';
import LampLight from '../graphics/lamp-light';
import HudBuilder from '../builders/hud-builder';
import {SoundComponent} from '../components/sound-component';


export class LevelFactory {

	static createAllLevels = (): LevelData[] => {
		let res: LevelData[] = [];
		for (const level of LEVELS) {
			let size: MapDimensions = {
				rows: level.map.length,
				columns: level.map[0].length
			};
			let map: MapData = new MapData(level.map, [], size);
			let rowInx: number = 0;
			for (const r of level.map) {
				let row: MapTile[] = [], colInx: number = 0;
				for (const tileType of r) {
					row.push(new MapTile(tileType as MapTileType, rowInx, colInx++));
				}
				map.tiles.push(row);
				rowInx++;
			}
			let items: Item[] = [];
			for (const i of level.items) {
				items.push(new Item(new Position2D(i.position[0], i.position[1]), i.type as ItemType));
			}
			let monstersData = new MonstersData(level.monsters.length);
			for (const m of level.monsters) {
				monstersData.seeds.push(new MonsterSeed(m.positionSeed[0], m.positionSeed[1]));
			}
			res.push(
				new LevelData(
					level.name,
					map,
					items,
					new Position2D(level.playerInitPos[0], level.playerInitPos[1]),
					monstersData,
					new LevelConfig(level.levelConfig.monsterSpeedMin, level.levelConfig.monsterSpeedMax, level.levelConfig.monsterSpeedChange)
				)
			);
		}
		return res;
	};

	static loadLevel = (scene: ECS.Scene, index: number) => {
		this.clearScene(scene);
		const gameState: GameState = Selectors.gameStateSelector(scene);
		const gameData: GameData = Selectors.gameDataSelector(scene);
		const level: LevelData = gameData.levels[index];
		gameState.changeLevel(level, index);
		scene.addGlobalComponent(new SoundComponent());
		MazeBuilder.build(scene, gameState);
		let screenCenterX = (gameState.playerState.gridPosition.x * BLOCK_SIZE) - BLOCK_SIZE/2 - SCENE_WIDTH/(2 * SCENE_RESOLUTION);
		let screenCenterY = (gameState.playerState.gridPosition.y * BLOCK_SIZE) - BLOCK_SIZE/2 - SCENE_HEIGHT/(2 * SCENE_RESOLUTION);
		scene.stage.addChild(new LampLight(new Position2D(screenCenterX, screenCenterY), gameState.playerState.realPosition));
		scene.stage.pivot.x = screenCenterX;
		scene.stage.pivot.y = screenCenterY;
		HudBuilder.leftTop(scene, gameState).build();
		HudBuilder.leftBottom(scene, gameState).build();
		HudBuilder.rightBottom(scene, gameState).build();
	};

	static clearScene = (scene: ECS.Scene) => {
		const gameData = Selectors.gameDataSelector(scene);
		const gameState = Selectors.gameStateSelector(scene);
		scene.clearScene();
		// reassign global attributes, keyboard controller
		scene.stage.sortableChildren = true;
		scene.addGlobalComponentAndRun(new ECS.KeyInputComponent());
		scene.assignGlobalAttribute(Attributes.GAME_DATA, gameData);
		scene.assignGlobalAttribute(Attributes.GAME_STATE, gameState);
	}
}