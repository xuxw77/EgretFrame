class RandomUtils extends BaseClass {
    /**
     * 获取一个区间的随机数
     * @param start 起点
     * @param end 结束
     */
	public limit(start: number, end: number): number {
		start = Math.min(start, end);
		end = Math.max(start, end);
		let range: number = end - start;
		return start + Math.random() * range;
	}

    /**
     * 在一个数组中随机获取一个元素
     */
	public randomArray(arr: Array<any>): any {
		let index: number = Math.floor(Math.random() * arr.length);
		return arr[index];
	}
}