class DisplayUtils extends BaseClass {

	/**
	 * 从父级移除child
	 */
	public removeFromParent(child: egret.DisplayObject): boolean {
		if (child && child.parent) {
			child.parent.removeChild(child);
			return true;
		}
		return false;
	}
}