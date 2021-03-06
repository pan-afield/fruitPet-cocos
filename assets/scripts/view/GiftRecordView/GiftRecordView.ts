// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIConstant from "../../constant/UIConstant";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftRecordView extends BaseUI {

    private closeBtn: cc.Node = null;
    private viewContent: cc.Node;
    private scrollItem: cc.Node = null;
    private scrollContent: cc.Node = null;
    private userPic: cc.Node = null;
    private giftPoupon: cc.Node = null;
    private selectIcon: cc.Node = null;
    private convertBtn: cc.Node = null;
    private giftBtn: cc.Node = null;
    private convertList: Array<Object> = [];
    private giftList: Array<Object> = [];
    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.closeBtn = this.viewContent.getChildByName('icon_close')
        this.scrollItem = this.viewContent.getChildByName('scrollItem')
        this.scrollContent = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.userPic = this.viewContent.getChildByName('picMask').getChildByName('userPic')
        this.giftPoupon = this.viewContent.getChildByName('coin')
        this.selectIcon = this.viewContent.getChildByName('record_select')
        this.giftBtn = this.viewContent.getChildByName('giftTitle')
        this.convertBtn = this.viewContent.getChildByName('convertTitle')
    }
    protected updateView(): void {
        this.convertBtn.color = new cc.Color(51, 51, 51, 255)
        this.giftBtn.color = new cc.Color(255, 66, 67, 255)
        this.selectIcon.x = -180
        this.getConvertRecord()
        this.getGiftRecord()
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, this.userPic.getComponent(cc.Sprite))
        this.giftPoupon.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
    }
    protected initEvent(): void {
        this.convertBtn.on('click', this.chooseConvert, this)
        this.giftBtn.on('click', this.chooseGift, this)
        this.closeBtn.on("click", this.back, this);
    }
    protected removeEvent(): void {
        this.convertBtn.off('click', this.chooseConvert, this)
        this.giftBtn.off('click', this.chooseGift, this)
        this.closeBtn.off("click", this.back, this);
    }
    protected back() {
        this.close()
        this.scrollContent.removeAllChildren()
        App.ui.open(UIConstant.ConvertView)
    }
    protected onClose(): void {
        this.scrollContent.removeAllChildren()
    }
    protected getGiftRecord(): void {
        let onSuccess = (res) => {
            this.giftList = res.list
            // FramingManager.updateRecordList(res.list, this.getGiftItem, this)
            this.chooseGift()
        }
        App.GiftCouponProxy.GiftCouponLogs({ onSuccess, data: { page: 1, pagesize: 30 } })
    }
    protected getConvertRecord(): void {
        let onSuccess = res => {
            this.convertList = res.list
        }
        App.GiftCouponProxy.ConvertLog({ onSuccess, data: { page: 1, pagesize: 30, type: 0 } })
    }
    protected chooseGift(): void {
        this.convertBtn.color = new cc.Color(51, 51, 51, 255)
        this.giftBtn.color = new cc.Color(255, 66, 67, 255)
        this.selectIcon.x = -180
        this.scrollContent.removeAllChildren()
        // FramingManager.updateRecordList(this.giftList, this.getGiftItem, this)
        this.giftList.forEach((item: any) => {
            let scrollItemCopy = cc.instantiate(this.scrollItem)
            scrollItemCopy["item"] = item
            scrollItemCopy.active = true
            let info = scrollItemCopy.getChildByName('info')
            let time = scrollItemCopy.getChildByName('time')
            let number = scrollItemCopy.getChildByName('number')
            info.getComponent(cc.Label).string = item.source
            let writetime = Number(item.writetime.split('(')[1].split(')')[0])
            time.getComponent(cc.Label).string = UIUtil.dateFormat(writetime)
            if (item.updatenums >= 0) {
                number.getComponent(cc.RichText).string = `<color=#FF4243>+${item.updatenums}</c>`
            } else {
                number.getComponent(cc.RichText).string = `<color=#61B365>${item.updatenums}</c>`
            }
            this.scrollContent.addChild(scrollItemCopy)
        })
    }
    private getGiftItem(item): void {
        let scrollItemCopy = cc.instantiate(this.scrollItem)
        scrollItemCopy["item"] = item
        scrollItemCopy.active = true
        let info = scrollItemCopy.getChildByName('info')
        let time = scrollItemCopy.getChildByName('time')
        let number = scrollItemCopy.getChildByName('number')
        info.getComponent(cc.Label).string = item.source
        let writetime = Number(item.writetime.split('(')[1].split(')')[0])
        time.getComponent(cc.Label).string = UIUtil.dateFormat(writetime)
        if (item.updatenums >= 0) {
            number.getComponent(cc.RichText).string = `<color=#FF4243>+${item.updatenums}</c>`
        } else {
            number.getComponent(cc.RichText).string = `<color=#61B365>${item.updatenums}</c>`
        }
        this.scrollContent.addChild(scrollItemCopy)
    }
    protected chooseConvert(): void {
        this.convertBtn.color = new cc.Color(255, 66, 67, 255)
        this.giftBtn.color = new cc.Color(51, 51, 51, 255)
        this.selectIcon.x = 180
        this.scrollContent.removeAllChildren()
        // FramingManager.updateRecordList(this.convertList, this.getConvertItem, this)
        this.convertList.forEach((item: any) => {
            let scrollItemCopy = cc.instantiate(this.scrollItem)
            scrollItemCopy["item"] = item
            scrollItemCopy.active = true
            let info = scrollItemCopy.getChildByName('info')
            let time = scrollItemCopy.getChildByName('time')
            let number = scrollItemCopy.getChildByName('number')
            info.getComponent(cc.Label).string = item.Name
            let writetime = Number(item.Writetime.split('(')[1].split(')')[0])
            time.getComponent(cc.Label).string = UIUtil.dateFormat(writetime)
            if (item.Status === 1) {
                number.getComponent(cc.RichText).string = `<color=#FF4243>????????????</c>`
            } else if (item.Status === 0) {
                number.getComponent(cc.RichText).string = `<color=#666666>?????????</c>`
            } else {
                number.getComponent(cc.RichText).string = `<color=#666666>????????????</c>`
            }
            this.scrollContent.addChild(scrollItemCopy)
        })
    }
    private getConvertItem(item): void {
        let scrollItemCopy = cc.instantiate(this.scrollItem)
        scrollItemCopy["item"] = item
        scrollItemCopy.active = true
        let info = scrollItemCopy.getChildByName('info')
        let time = scrollItemCopy.getChildByName('time')
        let number = scrollItemCopy.getChildByName('number')
        info.getComponent(cc.Label).string = item.Name
        let writetime = Number(item.Writetime.split('(')[1].split(')')[0])
        time.getComponent(cc.Label).string = UIUtil.dateFormat(writetime)
        if (item.Status === 1) {
            number.getComponent(cc.RichText).string = `<color=#FF4243>????????????</c>`
        } else if (item.Status === 0) {
            number.getComponent(cc.RichText).string = `<color=#666666>?????????</c>`
        } else {
            number.getComponent(cc.RichText).string = `<color=#666666>????????????</c>`
        }
        this.scrollContent.addChild(scrollItemCopy)
    }
}
