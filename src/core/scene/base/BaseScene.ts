class BaseScene {
	private _layers: Array<egret.DisplayObjectContainer> = [];

	public constructor() {
	}
	/**
	 * 进入scene调用
	 */
	public onEnter(): void {

	}

	/**
	 * 退出scene调用
	 */
	public onExit(): void {
		App.ViewManager.reset();
		this.removeAllLayer();
	}

	public addLayer(layer: egret.DisplayObjectContainer): void {
		if (layer instanceof BaseUILayer) {
			App.StageUtils.getUIStage().addChild(layer);
		} else {
			App.StageUtils.getStage().addChild(layer);
		}
		this._layers.push(layer);
	}

	public addLayerAt(layer: egret.DisplayObjectContainer, idx: number): void {
		if (layer instanceof BaseUILayer) {
			App.StageUtils.getUIStage().addChildAt(layer, idx);
		} else {
			App.StageUtils.getStage().addChildAt(layer, idx);
		}
		this._layers.push(layer);
	}

	public removeLayer(layer: egret.DisplayObjectContainer): void {
		this.removeAllChildFromLayer(layer);
		App.DisplayUtils.removeFromParent(layer);
		App.ArrayUtils.removeItemFromArray(this._layers, layer);
	}

	public removeAllChildFromLayer(layer: egret.DisplayObjectContainer): void {
		layer && layer.removeChildren();
	}

	public removeAllLayer(): void {
		while (this._layers.length) {
			let layer = this._layers[0];
			this.removeLayer(layer);
		}
	}
}