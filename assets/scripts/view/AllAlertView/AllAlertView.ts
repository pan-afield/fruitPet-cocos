// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AllAlertView extends BaseUI {

    content: cc.Node;
    closeBtn: cc.Node;
    checkBtn: cc.Node;
    continue: cc.Node
    detail: cc.Node;
    closeStatus: Boolean = false;
    maskBtn: cc.Node
    topbg: cc.Node
    leftBtn: cc.Node
    rightBtn: cc.Node
    otherBtn: cc.Node
    continueBtn: cc.Node
    toPlant:cc.Node


    /**
     * 识别所有需要操作的节点或组件
     */
    protected validateUI(): void {
        this.content = this.node.getChildByName("content");
        this.closeBtn = this.node.getChildByName("popup_close");
        this.checkBtn = this.content.getChildByName("boarTip").getChildByName("bt_suer");
        this.continue = this.content.getChildByName('buySeed').getChildByName('bt')
        this.detail = this.content.getChildByName('buySeed').getChildByName('cancel')
        this.leftBtn = this.content.getChildByName('deficiency').getChildByName('leftBtn')
        this.rightBtn = this.content.getChildByName('deficiency').getChildByName('rightBtn')
        this.otherBtn = this.content.getChildByName('otherAward').getChildByName('bt_record')
        this.maskBtn = this.node.getChildByName('mask')
        this.topbg = this.node.getChildByName('bg_top')
        this.continueBtn = this.content.getChildByName('deficiency').getChildByName('contnue')
        this.toPlant = this.content.getChildByName('lessFruit').getChildByName('bt_record')
        //子类在这里更新所有节点句柄
        //如：this.item = this.node.getChildByName("item");
    }


    protected updateView(): void {
        let list: cc.Node[] = this.content.children;
        let data = this.data.data;
        list.forEach((node: cc.Node, index) => {
            node.active = false;
        })
        this.content.getChildByName(data.showKey).active = true;
        let node = this.content.getChildByName(data.showKey);
        switch (data.showKey) {
            case "buySeed":
                RES.setSpriteFrame(this.topbg.getComponent(cc.Sprite), 'common/btn/bg_toast_success')
                let cp = node.getChildByName("tip2").getComponent(cc.RichText);
                let time = 2;
                // let timeText = node.getChildByName("tip3").getComponent(cc.RichText);
                // timeText.string = `2S后自动关闭`;
                cp.string = `种植成功！消费${UIUtil.toStone(data.data.SpendCoin)}金币!`;

                EventDispatcher.dispatch(GameEvent.PLANT_END, 2);
                let callback = async function () {
                    await this.sleep(1000)
                    time -= 1;
                    // timeText.string = `${time}S后自动关闭`;
                    if (time == 0) {
                        // this.closeFun();
                        return;
                    }
                    callback();
                }.bind(this)
                callback && callback();
                break;
            case "boarTip":
                RES.setSpriteFrame(this.topbg.getComponent(cc.Sprite), 'common/btn/bg_toast_fail')
                let tip = node.getChildByName("tip1").getComponent(cc.RichText);
                tip.string = `野猪袭击了<color=#FF7C55>${data.data.Period}</c>果园，大家齐心抵抗，\n只有<color=#FF7C55>${data.data.Name}</c>幸免于难。`;
                this.scheduleOnce(() => {
                    if (!this.closeStatus) {
                        this.closeFun();
                    }
                    this.closeStatus = false
                    EventDispatcher.dispatch(GameEvent.START_NEW_GAME);
                }, 5)
                break;
            case "deficiency":
                if (!App.gdata.openShop) {
                    this.rightBtn.active = false
                    this.leftBtn.active = false
                    this.continueBtn.active = true
                    node.getChildByName('text').getComponent(cc.Label).string = '金币不足'
                    return
                }
                if (data.text) {
                    this.rightBtn.active = false
                    this.leftBtn.active = false
                    this.continueBtn.active = true
                    node.getChildByName('text').getComponent(cc.Label).string = data.text
                }
                if (data.text1) {
                    this.rightBtn.active = true
                    this.leftBtn.active = true
                    this.continueBtn.active = false
                    node.getChildByName('text').getComponent(cc.Label).string = data.text1
                }
                RES.setSpriteFrame(this.topbg.getComponent(cc.Sprite), 'common/btn/bg_toast_fail')
            case "otherAward":
                console.log(data);
                if (data.data) {
                    this.node.getChildByName('content').getChildByName('otherAward').getChildByName('msg').getComponent(cc.RichText).string = data.data
                } else if (data.msg) {
                    this.node.getChildByName('content').getChildByName('otherAward').getChildByName('msg').getComponent(cc.RichText).string = data.msg
                }
            case "lessFruit":
                this.node.getChildByName('content').getChildByName('lessFruit').getChildByName('label').getComponent(cc.Label).string = data.msg
        }
    }

    private sleep(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, interval);
        })
    }

    private closeFun() {
        let data = this.data.data;
        switch (data.showKey) {
            case "buySeed":
                this.close();
                break;
            case "boarTip":
                this.close();
                this.closeStatus = true
                // EventDispatcher.dispatch(GameEvent.START_NEW_GAME);
                //飞水果
                // EventDispatcher.dispatch(GameEvent.GET_BUY_IN, data.data)
                break;
            case "deficiency":
                this.close()
            case "otherAward":
                this.close()
            case "lessFruit":
                this.close()
        }
    }
    private toUpgrade() {
        this.close()
        if (this.data.data.okCallBack) {
            this.data.data.okCallBack()
        }
    }
    private toContinue() {
        this.close()
        App.ui.open(UIConstant.SeedShopView)
    }
    private checkDetail() {
        this.close()
        App.ui.close(UIConstant.SeedShopView)
        App.ui.open(UIConstant.FruitRecordView, null, { check: true })
    }
    private toFruitBag() {
        this.close()
        // App.ui.close(UIConstant.SeedShopView)
        App.ui.open(UIConstant.FruitBagView)
        // this.node.parent.active = false
    }
    private toRecharge() {
        this.close()
        // App.ui.close(UIConstant.SeedShopView)
        App.ui.open(UIConstant.RechargeView)
        // this.node.parent.active = false
    }
    private toPlantFun(){
        this.close()
        EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
    }
    /**
     * 添加监听事件
     */
    protected initEvent(): void {
        this.closeBtn.on("click", this.closeFun, this);
        this.checkBtn.on("click", this.closeFun, this);
        this.maskBtn.on("click", this.closeFun, this);
        this.continue.on("click", this.toContinue, this);
        this.detail.on("click", this.checkDetail, this);
        this.rightBtn.on("click", this.toRecharge, this);
        this.leftBtn.on("click", this.toFruitBag, this);
        this.otherBtn.on("click", this.toUpgrade, this);
        this.continueBtn.on("click", this.closeFun, this);
        this.toPlant.on("click", this.toPlantFun, this);
    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {
        this.closeBtn.off("click", this.closeFun, this);
        this.checkBtn.off("click", this.closeFun, this);
        this.maskBtn.off("click", this.closeFun, this);
        this.continue.off("click", this.toContinue, this);
        this.detail.off("click", this.checkDetail, this);
        this.rightBtn.off("click", this.toRecharge, this);
        this.leftBtn.off("click", this.toFruitBag, this);
        this.otherBtn.off("click", this.toUpgrade, this);
        this.continueBtn.off("click", this.closeFun, this);
        this.toPlant.off("click", this.toPlantFun, this);
    }
}
