import GameConst from "../constant/GameConst";

/**
 * 音频管理
 */
export default class AudioManager {

    public resources: { [name: string]: any } = {};

    public resNameTable: string[] = [
        'BGM',
        'click',
        'open_treasure_boom',
        'open_treasure_normal',
        'interact',
        'feed_cat',
        'brid',
        'hoeing',
        'pig_attack',
        'upgrade',
    ];

    private effect: any;
    private sceneEffect: any;

    /** 最大音源数量 */
    private maxAudioSource: number = 20;

    /** 大厅背景音乐id */
    private homeBgMusicId: number;
    /** 大厅背景音乐名称 */
    private homeBgMusicKey: string;

    private static _instance: AudioManager;

    public constructor() {
        this.init();
    }

    public static get ins(): AudioManager {
        if (this._instance == null) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    private init(): void {

    }

    /**
     * 刷新资源
     */
    public updateRes(res: any): void {
        let item: any;
        let resNameTable: string[] = this.resNameTable;
        let name: string;
        for (let i: number = 0; i < resNameTable.length; i++) {
            name = resNameTable[i];
            item = res[name];
            if (name == "customAudio") {
                if (item && item.length > 0) {
                    for (let i: number = 0; i < item.length; i++) {
                        this.resources[item[i].name] = item[i];
                    }
                }
                continue;
            }
            if (item) {
                this.resources[name] = item;
            }
        }
    }

    public getRes(name: string): any {
        return this.resources[name];
    }

    /**
     * 使用audioEngine来播放音效
     * @param key 
     */
    public playFishEffect(key: number): void {
        if (!GameConst.soundEffect) {
            return;
        }

        let clip: cc.AudioClip = this.getRes(this.effect[key]);
        if (!clip) {
            return;
        }

        cc.audioEngine.playEffect(clip, false);
    }

    /**
     * 使用audioEngine来播放音效
     * @param name 
     */
    public playEffectByName(name: string): void {
        if (!GameConst.soundEffect) {
            return;
        }

        let clip: cc.AudioClip = this.getRes(name);
        // console.log("clip",clip);
        console.log(name);
        if (!clip) {
            return;
        }
        
        cc.audioEngine.playEffect(clip, false);
    }

    /**
     * 使用audioEngine播放场景背景音乐
     * @param id 
     */
    public playSceneMusic(id: number): void {
        if (!GameConst.music) {
            return;
        }

        let clip: cc.AudioClip = this.getRes(this.sceneEffect[id]);
        if (!clip) {
            return;
        }

        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }

        cc.audioEngine.playMusic(clip, true);
    }

    /**
     * 使用audioEngine播放场景背景音乐
     * @param id 
     */
    public playSceneMusicByName(name: string): void {
        if (!GameConst.music) {
            return;
        }

        let clip: cc.AudioClip = this.getRes(name);
        if (!clip) {
            return;
        }

        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }

        cc.audioEngine.playMusic(clip, true);
    }

    /**
     * 大厅背景音乐
     */
    public playHomeMusic(): void {
        if (!GameConst.music) {
            return;
        }
        if (cc.audioEngine.isMusicPlaying()) {
            return;
        }
        let clip: cc.AudioClip = this.getRes(this.homeBgMusicKey);
        if (!clip) {

            return;
        }
        this.homeBgMusicId = cc.audioEngine.playMusic(clip, true);
    }

    /**
     * 停止背景音乐
     */
    public stopMusic(): void {
        cc.audioEngine.stopMusic();
    }

    /**
     * 停止背景音乐
     */
    public stopAllMusic(): void {
        cc.audioEngine.stopAll();
    }

}