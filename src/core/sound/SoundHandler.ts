class SoundHandler extends egret.HashObject {
	private _key: string;
	private _sound: egret.Sound;
	private _channel: egret.SoundChannel
	private _pos: number;
	private _loops: number;
	private _volume: number;
	private _completeCallBack: Function;

	private _playType: core.EmSoundStatus = core.EmSoundStatus.NOT;

	public constructor() {
		super();
	}

	/**
	 * 播放 (从头开始播放，如需从上次暂停出播放，请调用 continue 函数)
	 * @param key 资源key, 若资源未加载，需要传入url
	 * @param volume 音量大小
	 * @param loops 播放次数 0=循环播放 默认0
	 * @param completeCallBack 播放完成回调 可传null(不执行)
	 */
	public play(key: string, volume: number, loops: number = 0, completeCallBack: Function = null) {
		let self = this;
		self._pos = 0;
		self._key = key;
		self._loops = loops;
		self._volume = volume;
		self._completeCallBack = completeCallBack;
		self._sound = RES.getRes(key);
		self._sound == null ? self._onStartLoadingSound() : self._onPlaySound();
	}

	private async _onStartLoadingSound() {
		let self = this;
		await RES.getResAsync(self._key);
		self._sound = RES.getRes(self._key);
		self._onPlaySound();
	}

	/**
	 * 停止
	 */
	public stop(): void {
		let self = this;
		if (this._playType != core.EmSoundStatus.ING || self._channel == null) {
			return;
		}
		self._pos = self._channel.position;
		self._channel.stop();
		this._playType = core.EmSoundStatus.STOP;
	}

	/**
	 * 继续
	 */
	public continue(): void {
		let self = this;
		if (this._playType != core.EmSoundStatus.STOP) {
			return;
		}
		self._onPlaySound();
	}

	/**
	 * 设置音量
	 */
	public set volume(volume: number) {
		let self = this;
		self._volume = volume;
		if (self._playType == core.EmSoundStatus.ING) {
			self._channel.volume = volume;
		}
	}

	public get playType(): core.EmSoundStatus {
		return this._playType;
	}

	private _onSoundComplete(evt: egret.Event): void {
		let self = this;
		self._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this._onSoundComplete, this);

		// let completeCallBack = self._completeCallBack;
		// if (completeCallBack) {
		// 	completeCallBack.call();
		// }
		self._completeCallBack && self._completeCallBack();

		App.SoundManager.removeSoundEffect(self.hashCode);
	}

	private _onPlaySound(): void {
		let self = this;
		if (self._channel) {
			self._channel.stop();
		}
		self._channel = self._sound.play(self._pos, self._loops);
		self._channel.volume = self._volume;
		self._channel.addEventListener(egret.Event.SOUND_COMPLETE, this._onSoundComplete, this);

		this._playType = core.EmSoundStatus.ING;
	}
}