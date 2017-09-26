class StageUtils extends BaseClass {
	private _uiStage: eui.UILayer;

	public constructor() {
		super();
		let self = this;
		if (self._uiStage == null) {
			self._uiStage = new eui.UILayer();
			self._uiStage.touchEnabled = false;
			this.getStage().addChild(self._uiStage);
		}

		self.getStage().touchEnabled = false;
	}

    /**
     * 获取游戏的高度
     */
	public getHeight(): number {
		return this.getStage().stageHeight;
	}

    /**
     * 获取游戏宽度
     */
	public getWidth(): number {
		return this.getStage().stageWidth;
	}

    /**
     * 设置同时可触发几个点击事件，默认为2
     */
	public setMaxTouches(value: number): void {
		this.getStage().maxTouches = value;
	}

    /**
     * 设置帧频
     */
	public setFrameRate(value: number): void {
		this.getStage().frameRate = value;
	}

    /**
     * 设置适配方式
     */
	public setScaleMode(value: string): void {
		this.getStage().scaleMode = value;
	}

	public getStage(): egret.Stage {
		return egret.MainContext.instance.stage;
	}

	public getUIStage(): eui.UILayer {
		return this._uiStage;
	}
}