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
export default class NewPeopleView extends BaseUI {
    private closeBtn: cc.Node;
    private checkBtn: cc.Node;
    private buySeed: cc.Node
    private toConvert: cc.Node
    private coupon: cc.Node
    private coin: cc.Node
    private Coin: cc.Node
    private Coupon: cc.Node

    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('Mask')
        this.checkBtn = this.node.getChildByName('bt_strategy')
        this.buySeed = this.node.getChildByName('buySeed')
        this.toConvert = this.node.getChildByName('toConvert')
        this.coin = this.node.getChildByName('img_gold').getChildByName('RichText')
        this.coupon = this.node.getChildByName('img_coupon').getChildByName('RichText')
        this.Coin = this.node.getChildByName('coin')
        this.Coupon = this.node.getChildByName('coupon')
    }
    protected updateView(): void {
        if (App.gdata.newAward) {
            this.coin.getComponent(cc.RichText).string = `金币 x <color=#F6D027>${UIUtil.toStone(App.gdata.newAward.coin)}</color>`
            this.coupon.getComponent(cc.RichText).string = `礼券 x <color=#F6D027>${UIUtil.toStone(App.gdata.newAward.giftCoupon)}</color>`
            this.Coin.getComponent(cc.Label).string = App.gdata.newAward.coin
            this.Coupon.getComponent(cc.Label).string = App.gdata.newAward.giftCoupon
        }
    }
    private toGiftConvert() {
        this.outClose()
        App.ui.open(UIConstant.ConvertView)
    }
    private toBuySeed() {
        this.outClose()
        EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
        App.ui.open(UIConstant.SeedShopView)
    }
    protected toStrategy() {
        this.outClose()
        App.ui.open(UIConstant.StrategyView)
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.outClose, this)
        this.checkBtn.on('click', this.toStrategy, this)
        this.buySeed.on('click', this.toBuySeed, this)
        this.toConvert.on('click', this.toGiftConvert, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.outClose, this)
        this.checkBtn.off('click', this.toStrategy, this)
        this.buySeed.off('click', this.toBuySeed, this)
        this.toConvert.off('click', this.toGiftConvert, this)
    }
    private outClose() {
        this.close()
        App.gdata.newPeople = false
    }
}
