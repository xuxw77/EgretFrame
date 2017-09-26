class NumberUtils extends BaseClass {

	public parseInt(num: number | string): number {
		// return +num | 0;
		// return ~~num;
		let n = parseInt(num + "");
		if (isNaN(n)) {
			return 0;
		}
		return n;
	}
}