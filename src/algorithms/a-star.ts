import EasyStar from 'easystarjs';
import {MapTileType} from '../constants/constants';

const easyStar = new EasyStar.js();
easyStar.setAcceptableTiles([
	MapTileType.FLOOR,
	MapTileType.IRON_GRID_0_0, MapTileType.IRON_GRID_0_1, MapTileType.IRON_GRID_1_0, MapTileType.IRON_GRID_1_1
]);
easyStar.enableDiagonals();

export default easyStar;