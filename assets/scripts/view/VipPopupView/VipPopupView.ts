import UIConstant from "../../constant/UIConstant";
import App from "../../manager/App";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPopupView extends BaseUI {
    closeVipBtn: cc.Node;
    leftBtn: cc.Node;
    rightBtn: cc.Node;
    titleVip: cc.Node;
    vipContent: cc.Node;
    vipItem: cc.Node;
    VIPlevel: cc.Node
    progressText: cc.Node
    progressBar: cc.Node
    vipText: cc.Node
    levelsDesc: any;
    crruentLevel: any;
    headPic: cc.Node
    changeNum: number;
    continueBtn: cc.Node

    protected validateUI(): void {
        this.continueBtn = this.node.getChildByName('bt_suer')
        this.VIPlevel = this.node.getChildByName('VIPlevel')
        this.closeVipBtn = this.node.getChildByName('icon_close')
        this.leftBtn = this.node.getChildByName('btn_Left')
        this.rightBtn = this.node.getChildByName('btn_right')
        this.titleVip = this.node.getChildByName('title')
        this.vipContent = this.node.getChildByName('vipContent')
        this.vipItem = this.node.getChildByName('vipItem')
        this.progressText = this.node.getChildByName('progressText')
        this.progressBar = this.node.getChildByName('progressBar')
        this.vipText = this.node.getChildByName('vipText')
        this.headPic = this.node.getChildByName('head').getChildByName('pic')
    }
    protected updateView(): void {
        this.getVipInfo()
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, this.headPic.getComponent(cc.Sprite))
    }
    protected initFinish(): void {
        if (!App.gdata.openShop) {
            this.continueBtn.active = false
        }
    }
    protected toRecharge() {
        App.ui.open(UIConstant.RechargeView)
    }
    protected changeLevel(event) {
        console.log(this.changeNum);

        if (event.node === this.leftBtn) {
            if (this.changeNum === 0) return
            this.changeNum--
        } else if (event.node === this.rightBtn) {
            if (this.changeNum === 10) return
            this.changeNum++
        }
        this.getVipLevel(this.changeNum)
    }
    protected getVipLevel(level) {
        this.titleVip.getComponent(cc.Label).string = `VIP${level}????????????`
        this.vipContent.removeAllChildren()
        this.levelsDesc.forEach((item: any) => {
            if (item.level === level) {
                item.descriptions.forEach((items) => {
                    if (!this.vipItem) return
                    let itemCopy = cc.instantiate(this.vipItem)
                    itemCopy.getComponent(cc.Label).string = items
                    itemCopy.active = true
                    this.vipContent.addChild(itemCopy)
                })
            }
        })
    }
    protected getVipInfo() {
        let onSuccess = (res) => {
            this.levelsDesc = res.levels
            this.crruentLevel = res.levelInfo.level
            this.changeNum = this.crruentLevel
            this.vipText.getComponent(cc.RichText).string = `?????????${res.levelInfo.needcredits - res.levelInfo.curcredits}????????????`
            this.progressText.getComponent(cc.Label).string = `${res.levelInfo.curcredits}/${res.levelInfo.needcredits}`
            this.VIPlevel.getComponent(cc.Label).string = 'VIP' + res.levelInfo.level
            this.progressBar.getComponent(cc.ProgressBar).progress = res.levelInfo.process / 100
            this.getVipLevel(this.crruentLevel)
        }
        App.GoodsProxy.goodsList({ onSuccess, data: { page: 1, pagesize: 10 } })
    }
    protected initEvent(): void {
        this.closeVipBtn.on('click', () => {
            if (this.data) {
                App.ui.open(UIConstant.ConvertView)
            }
            this.close()
        }, this)
        this.leftBtn.on("click", this.changeLevel, this)
        this.rightBtn.on("click", this.changeLevel, this)
        this.continueBtn.on("click", this.toRecharge, this)
    }
    protected removeEvent(): void {
        this.closeVipBtn.off('click', () => {
            if (this.data) {
                App.ui.open(UIConstant.ConvertView)
            }
            this.close()
        }, this)
        this.leftBtn.off("click", this.changeLevel, this)
        this.rightBtn.off("click", this.changeLevel, this)
        this.continueBtn.off("click", this.toRecharge, this)
    }
}