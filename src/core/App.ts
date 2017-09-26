class App {
	/**
	 * 全局配置
	 */
	public static GlobalConfig: any = null;

	/**
	 * ProtoFile
	 */
	public static ProtoFile: any = null;

	/**
	 * ProtoConfig
	 */
	public static ProtoConfig: any = null;

	/**
	 * 全局数据
	 */
	public static get GlobalData(): GlobalData {
		return GlobalData.getInstance();
	}

	/**
	 * 声音管理
	 */
	public static get SoundManager(): SoundManager {
		return SoundManager.getInstance();
	}

	/**
	 * 计时器管理
	 */
	public static get TimerManager(): TimerManager {
		return TimerManager.getInstance();
	}

	/**
	 * Scene管理
	 */
	public static get SceneManager(): SceneManager {
		return SceneManager.getInstance();
	}

	/**
	 * Controller管理
	 */
	public static get ControllerManager(): ControllerManager {
		return ControllerManager.getInstance();
	}

	/**
	 * View管理
	 */
	public static get ViewManager(): ViewManager {
		return ViewManager.getInstance();
	}

	//------------------------- utils ------------------------------//
	public static get NumberUtils(): NumberUtils {
		return NumberUtils.getInstance();
	}

	public static get StringUtils(): StringUtils {
		return StringUtils.getInstance();
	}

	public static get RandomUtils(): RandomUtils {
		return RandomUtils.getInstance();
	}

	public static get DisplayUtils(): DisplayUtils {
		return DisplayUtils.getInstance();
	}

	public static get ObjectPool(): ObjectPool {
		return ObjectPool.getInstance();
	}

	public static get StageUtils(): StageUtils {
		return StageUtils.getInstance();
	}

	public static get ArrayUtils(): ArrayUtils {
		return ArrayUtils.getInstance();
	}
	//------------------------- utils ------------------------------//

	public static init(): void {
		App.GlobalData.init();
	}

	public static reset(): void {
		App.GlobalData.reset();
	}
}