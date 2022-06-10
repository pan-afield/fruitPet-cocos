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
import FramingManager from "../../manager/FramingManager";
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";
import AlertDialog from "../dialog/AlertDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignView extends BaseUI {
    private closeBtn: cc.Node = null;
    private toConvert: cc.Node
    private signContent: cc.Node
    private itemContent: cc.Node
    private sevenDay: cc.Node
    private sevenLabel: cc.Node
    private sevenShadow: cc.Node
    private signBox: cc.Node
    private crruentTask

    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_close')
        this.toConvert = this.node.getChildByName('sign_btn')
        this.signContent = this.node.getChildByName('signContent')
        this.itemContent = this.node.getChildByName('itemContent')
        this.sevenDay = this.node.getChildByName('sevenDay')
        this.sevenShadow = this.node.getChildByName('sevenShadow')
        this.signBox = this.node.getChildByName('sign_box')
        this.sevenLabel = this.node.getChildByName('signday_bg').getChildByName('New Label')
    }
    protected updateView(): void {
        this.getTasks()
    }
    /* 签到 */
    protected signAward(event) {
        console.log("signAward", event, App.gdata.userInfo);
        if (event.node === this.signBox) {
            App.NewUserProxy.GetActionRewards({
                onSuccess: (res) => {
                    if (res.Result === 0) {
                        let award = ',恭喜获得' + UIUtil.toStone(res.Data.giftcoupon) + '礼券'
                        MessageBoxManager.showAlert({
                            type: AlertDialog.TYPE_2,
                            msg: res.Msg + award
                        });
                        EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                        this.close()
                        EventDispatcher.dispatch(GameEvent.HIDE_SIGN)
                    }
                }, data: { day: this.crruentTask[this.crruentTask.length - 1].day }
            })
        }
        this.signContent.children.forEach((item, index) => {
            if (event.node === item.getChildByName('sign_item')) {
                this.crruentTask.forEach((items, indexs) => {
                    if (indexs === index) {
                        if(this.crruentTask[indexs].status !== 1) return
                        App.NewUserProxy.GetActionRewards({
                            onSuccess: (res) => {
                                if (res.Result === 0) {
                                    let award = ',恭喜获得' + UIUtil.toStone(res.Data.giftcoupon) + '礼券'
                                    MessageBoxManager.showAlert({
                                        type: AlertDialog.TYPE_2,
                                        msg: res.Msg + award
                                    });
                                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                                    this.getTasks()
                                }
                            }, data: { day: items.day }
                        })
                    }
                })
            }
        })
    }
    /* 获取签到任务 */
    protected getTasks() {
        App.NewUserProxy.ActiveTasks({
            onSuccess: (res) => {
                this.crruentTask = res
                this.signContent.removeAllChildren()
                FramingManager.updateRecordList(res, this.taskItems, this);
            }
        })
    }
    protected taskItems(item, index) {
        if (index === 6) {
            if (item.status === 2) {
                this.sevenShadow.active = true
            } else if (item.status === 1) {
            }
            this.signBox.off('click', this.signAward, this)
            this.signBox.on('click', this.signAward, this)
            this.sevenDay.getComponent(cc.Label).string = item.giftcoupon >= 10000 ? `${item.giftcoupon / 10000}万礼券` : `${item.giftcoupon / 1000}千礼券`
            this.sevenLabel.getComponent(cc.Label).string = item.name
            return
        }
        if(!this.itemContent) return
        let itemCopy = cc.instantiate(this.itemContent)
        let award: cc.Node = itemCopy.getChildByName('sign_award')
        let day: cc.Node = itemCopy.getChildByName('signDay')
        let detail: cc.Node = itemCopy.getChildByName('sign_detail')
        let shadow: cc.Node = itemCopy.getChildByName('fruit_shadow')
        let box: cc.Node = itemCopy.getChildByName('sign_item')
        award.getComponent(cc.Label).string = item.giftcoupon >= 10000 ? `${item.giftcoupon / 10000}万礼券` : `${item.giftcoupon / 1000}千礼券`
        day.getComponent(cc.Label).string = item.name
        if (item.status === 0) {
            detail.active = true
        } else if (item.status === 2) {
            shadow.active = true
        } else if (item.status === 1) {
            // itemCopy.on('click', this.signAward, this)
        }
        box.off('click', this.signAward, this)
        box.on('click', this.signAward, this)
        itemCopy.active = true
        this.signContent.addChild(itemCopy)
    }
    protected toConvertView() {
        this.close()
        App.ui.open(UIConstant.ConvertView)
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
        this.toConvert.on('click', this.toConvertView, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
        this.toConvert.off('click', this.toConvertView, this)
    }

}
