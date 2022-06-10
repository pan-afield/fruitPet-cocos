import GameConst from "../../constant/GameConst";
import App from "../../manager/App";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingView extends BaseUI {
    setClose: cc.Node;
    toggleSound: cc.Node;
    toggleMusic: cc.Node;
    service: cc.Node;

    protected validateUI(): void {
        this.setClose = this.node.getChildByName('popup_close')
        this.toggleSound = this.node.getChildByName('toggleSound')
        this.toggleMusic = this.node.getChildByName('toggleMusic')
        this.service = this.node.getChildByName('service')
    }
    protected initFinish(): void {

    }
    protected updateView(): void {
        this.loadSetInfo()
    }
    protected initEvent(): void {
        this.setClose.on('click', this.close, this)
        this.toggleMusic.on('toggle', this.setVioce, this)
        this.toggleSound.on('toggle', this.setVioce, this)
        this.service.on('click', this.openService, this)
    }
    protected removeEvent(): void {
        this.setClose.off('click', this.close, this)
        this.toggleMusic.off('toggle', this.setVioce, this)
        this.toggleSound.off('toggle', this.setVioce, this)
        this.service.off('click', this.openService, this)
    }
    /* 音乐音效控制 */
    private setVioce(event) {
        if (event.node === this.toggleMusic) { //isChecked点击后的状态
            if (this.toggleMusic.getComponent(cc.Toggle).isChecked) {
                GameConst.music = true
                App.audio.playSceneMusicByName('BGM')
            } else {
                GameConst.music = false
                cc.audioEngine.stopMusic()
            }
        } else {
            if (this.toggleSound.getComponent(cc.Toggle).isChecked) {
                // cc.audioEngine.resumeAllEffects()
                GameConst.soundEffect = true
            } else {
                // cc.audioEngine.pauseAllEffects()
                GameConst.soundEffect = false
            }
        }
    }
    //加载设置
    private loadSetInfo() {
        const head = this.node.getChildByName('head').getChildByName('pic')
        const nick = this.node.getChildByName('nick')
        const ID = this.node.getChildByName('ID')
        this.toggleMusic.getComponent(cc.Toggle).isChecked = GameConst.music
        this.toggleSound.getComponent(cc.Toggle).isChecked = GameConst.soundEffect
        console.log(GameConst.music, GameConst.soundEffect);
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, head.getComponent(cc.Sprite))
        nick.getComponent(cc.Label).string = '昵称: ' + App.gdata.userInfo.userinfo.nick
        ID.getComponent(cc.Label).string = 'ID: ' + App.gdata.userInfo.userinfo.UserId
    }
    private openService() {
        // @ts-ignore
        wx.openCustomerServiceConversation({})
    }
}