import EasyStar from 'easystarjs';
import {MapTileType} from '../constants/constants';

const easyStar = new EasyStar.js();
easyStar.setAcceptableTiles(MapTileType.FLOOR);
easyStar.enableDiagonals();

export default easyStar;