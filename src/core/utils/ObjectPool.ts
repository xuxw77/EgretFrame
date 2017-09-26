class ObjectPool extends BaseClass {
	private _content: any = {};
	private _objs: Array<any>;

	public constructor() {
		super();
		this._objs = new Array<any>();
	}

    /**
     * 取出一个对象
     * @param refKey 对象class
     * @param args 参数
     *
     */
	public pop(refKey: string, ...args: any[]): any {
		let self = this;
		if (!self._content[refKey]) {
			self._content[refKey] = [];
		}

		let list: Array<any> = self._content[refKey];
		if (list.length) {
			return list.pop();
		} else {
			let classZ: any = egret.getDefinitionByName(refKey);
			let argsLen: number = args.length;
			let obj: any;
			obj = new classZ(args);
			obj.ObjectPoolKey = refKey;
			return obj;
		}
	}

    /**
     * 取出一个对象
     */
	public popWithExtraKey(refKey: string, extraKey: any): any {
		if (!this._content[refKey]) {
			this._content[refKey] = [];
		}

		let obj: any;
		let list: Array<any> = this._content[refKey];
		if (list.length) {
			for (let i = 0; i < list.length; i++) {
				if (list[i].extraKey == extraKey) {
					obj = list[i];
					list.splice(i, 1);
					break;
				}
			}
		}
		if (!obj) {
			let classZ: any = egret.getDefinitionByName(refKey);
			obj = new classZ(extraKey);
			obj.extraKey = extraKey;
			obj.ObjectPoolKey = refKey;
		}
		return obj;
	}

    /**
     * 放入一个对象
     */
	public push(obj: any): boolean {
		if (obj == null) {
			return false;
		}

		let refKey: any = obj.ObjectPoolKey;
		//保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
		if (!this._content[refKey]) {
			return false;
		}

		this._content[refKey].push(obj);
		return true;
	}

    /**
     * 清除所有对象
     */
	public clear(): void {
		this._content = {};
	}

    /**
     * 清除某一类对象
     * @param refKey Class
     * @param clearFuncName 清除对象需要执行的函数
     */
	public clearClass(refKey: string, clearFuncName: string = null): void {
		let self = this;
		let list: Array<any> = self._content[refKey];
		while (list && list.length) {
			let obj: any = list.pop();
			if (clearFuncName) {
				obj[clearFuncName]();
			}
			obj = null;
		}
		self._content[refKey] = null;
		delete self._content[refKey];
	}

    /**
     * 缓存中对象统一执行一个函数
     * @param refKey Class
     * @param dealFuncName 要执行的函数名称
     */
	public dealFunc(refKey: string, dealFuncName: string): void {
		let list: Array<any> = this._content[refKey];
		if (list == null) {
			return;
		}

		for (let i = 0, len = list.length; i < len; i++) {
			let item = list[i];
			item[dealFuncName] && item[dealFuncName]();
		}
	}
}