import * as ECS from '../../../libs/pixi-ecs';
import {Messages} from '../../constants/constants';

/**
 * Base class for a mutable state that can send notification upon modification
 */
export default class ObservableState {
	protected scene: ECS.Scene;

	constructor(scene: ECS.Scene) {
		this.scene = scene;
	}

	public sendMessage(type: Messages, data?: any) {
		this.scene.sendMessage(new ECS.Message(type, null, null, data));
	}
}