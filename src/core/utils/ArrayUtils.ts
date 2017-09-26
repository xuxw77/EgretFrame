class ArrayUtils extends BaseClass {

	public removeItemFromArray(arr: Array<any>, item: any): void {
		let idx = arr.indexOf(item);
		idx > -1 && arr.splice(idx, 1);
	}
}