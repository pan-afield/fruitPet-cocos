import App from "../manager/App";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameAudio extends cc.Component {
    @property({
        type: cc.AudioClip
    })
    BGM: cc.AudioClip = null;//背景音乐
    @property({
        type: cc.AudioClip
    })
    click: cc.AudioClip = null;//背景音乐
    @property({
        type: cc.AudioClip
    })
    open_treasure_normal:cc.AudioClip = null;;//普通福袋打开
    @property({
        type: cc.AudioClip
    })
    open_treasure_boom:cc.AudioClip = null;;//普通福袋打开
    @property({
        type: cc.AudioClip
    })
    interact:cc.AudioClip = null;;//互动
    @property({
        type: cc.AudioClip
    })
    feed_cat:cc.AudioClip = null;;//喂养
    @property({
        type: cc.AudioClip
    })
    brid:cc.AudioClip = null;;//鸟叫
    @property({
        type: cc.AudioClip
    })
    hoeing:cc.AudioClip = null;;//锄地
    @property({
        type: cc.AudioClip
    })
    pig_attack:cc.AudioClip = null;;//野猪入侵
    @property({
        type: cc.AudioClip
    })
    upgrade:cc.AudioClip = null;;//升级


    start () {
        // App.audio.updateRes(this);
        // this.node.removeFromParent();
        // this.destroy();
    }

    public setRes(){
        App.audio.updateRes(this);
        this.node.removeFromParent();
        this.destroy();
    }
}
