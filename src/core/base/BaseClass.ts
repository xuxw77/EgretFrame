class BaseClass {
	public constructor() {
	}
	/**
     * 获取一个单例
     */
	public static getInstance(): any {
		let Self: any = this;
		if (Self._instance) {
			Self._instance = new Self();
		}
		return Self;
	}
}