class GlobalData extends BaseClass{
	public serverTimeDifference: number;

	public constructor() {
		super();
	}

	public init(): void {
		let self = this;
		self.serverTimeDifference = 0;
	}
	
	public reset(): void {
		
	}
}