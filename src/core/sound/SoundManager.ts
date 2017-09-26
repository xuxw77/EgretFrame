class SoundManager extends BaseClass {
	//最大音效数量 最多同时存在32个
	public static MAX_SOUND_EFFECT = 32;
	//播放中的音效
	private _soundEffectList: { [key: number]: SoundHandler; } = {};
	//背景音乐
	private _bgSound: SoundHandler = null;

	//背景音量
	private _bgVolume: number = 1;
	//音效音量
	private _effectVolume: number = 1;

	private constructor() {
		super();
		// gEmi.register(MSG.MESS_BG_SOUND_COMPLETE_NOTIFY, this._onBgSoundComplete, this);
	}

	/**
	 * 播放音效，若声音资源未加载，则会先加载后播放
	 * 返回SoundData hashCode
	 * @param key 声音资源key
	 * @param loops 播放次数
	 * @param completeCallBack 播放完成回调
	 * @param volume 音效大小，不传则默认为 全局音量
	 */
	public playSoundEffect(key: string, loops: number = 1, completeCallBack: Function = null, volume: number = null): number {
		let sound = new SoundHandler();
		sound.play(key, volume == null ? this._effectVolume : volume, loops, completeCallBack);
		this._soundEffectList[sound.hashCode] = sound;
		return sound.hashCode;
	}

	/**
	 * 播放单个背景音乐
	 */
	public playBgSound(key: string): void {
		let self = this;
		if (self._bgSound == null) {
			self._bgSound = new SoundHandler();
		} else {
			self._bgSound.stop();
		}
		self._bgSound.play(key, self._bgVolume, 0, () => {
			// gEmi.notify(new EventData(MSG.MESS_BG_SOUND_COMPLETE_NOTIFY, null));
		});
	}

	public stopBgSound(): void {
		let self = this;
		self._bgSound && self._bgSound.stop();
	}

	public continueBgSound(): void {
		let self = this;
		self._bgSound && self._bgSound.continue();
	}

	public removeBgSound(): void {
		let self = this;
		self._bgSound.stop();
		self._bgSound = null;
	}

	/**
	 * 设置背景音量 音量范围从 0（静音）至 1（最大音量）
	 */
	public set bgVolume(volume: number) {
		let self = this;
		self._bgVolume = volume;
		self._bgSound && (self._bgSound.volume = self._bgVolume);
	}

	public get bgVolume(): number {
		let self = this;
		return self._bgVolume;
	}

	/**
	 * 设置音效音量 音量范围从 0（静音）至 1（最大音量）
	 */
	public set effectVolume(volume: number) {
		let self = this;
		self._effectVolume = volume;
		for (let key in self._soundEffectList) {
			self._soundEffectList[key] && (self._soundEffectList[key].volume = self._effectVolume);
		}
	}

	public get effectVolume(): number {
		let self = this;
		return self._effectVolume;
	}

	public getSoundEffectByHashCode(hashCode: number): SoundHandler {
		let self = this;
		return self._soundEffectList[hashCode];
	}

	public removeSoundEffect(hashCode: number): void {
		let self = this;
		self._soundEffectList[hashCode] = null;
		delete self._soundEffectList[hashCode];
	}

	public stopAllEffect(): void {
		let self = this;
		for (let key in self._soundEffectList) {
			self._soundEffectList[key] && self._soundEffectList[key].stop();
		}
	}

	public continueAllEffect(): void {
		let self = this;
		for (let key in self._soundEffectList) {
			self._soundEffectList[key] && self._soundEffectList[key].continue();
		}
	}

	public removeAllEffect(): void {
		let self = this;
		self.stopAllEffect();
		self._soundEffectList = {};
	}

	public removeAllSound(): void {
		let self = this;
		self.removeAllEffect();
		self.removeBgSound();
	}

	private _onBgSoundComplete(): void {

	}
}