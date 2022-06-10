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
export default class CoinRecord extends BaseUI {
    private viewContent: cc.Node;
    private closeBtn: cc.Node = null;
    private scrollItem: cc.Node = null;
    private scrollContent: cc.Node = null;
    private userPic: cc.Node = null;
    private coin: cc.Node = null;
    private addCoin: cc.Node
    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.closeBtn = this.viewContent.getChildByName('icon_close')
        this.scrollItem = this.viewContent.getChildByName('scrollItem')
        this.scrollContent = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.userPic = this.viewContent.getChildByName('picMask').getChildByName('userPic')
        this.coin = this.viewContent.getChildByName('coin')
        this.addCoin = this.viewContent.getChildByName('icon_add')
    }
    protected updateView(): void {
        this.getCoinRecord()
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, this.userPic.getComponent(cc.Sprite))
        this.coin.getComponent(cc.Label).string = '金币：' + App.gdata.userInfo.coin
    }
    protected initFinish(): void {
        if (!App.gdata.openShop) {
            this.addCoin.active = false
        }
    }
    protected getCoinRecord() {
        let onSuccess = (data) => {
            this.scrollContent.removeAllChildren()
            FramingManager.updateRecordList(data.list, this.getCoinRecordItem, this)
        }
        App.UserProxy.CoinLog({ onSuccess: onSuccess, data: { page: 1, pagesize: 100 } })
    }
    protected getCoinRecordItem(data) {
        if(!this.scrollItem) return
        let scrollItemCopy = cc.instantiate(this.scrollItem)
        scrollItemCopy.active = true
        scrollItemCopy["data"] = data
        let info = scrollItemCopy.getChildByName('info')
        let time = scrollItemCopy.getChildByName('time')
        let number = scrollItemCopy.getChildByName('number')
        info.getComponent(cc.Label).string = data.remark
        let writetime = Number(data.writetime.split('(')[1].split(')')[0])
        time.getComponent(cc.Label).string = UIUtil.dateFormat(writetime)
        if (data.coin >= 0) {
            number.getComponent(cc.RichText).string = `<color=#FA682C>+${data.coin}</c>`
        } else {
            number.getComponent(cc.RichText).string = `<color=#61B365>${data.coin}</c>`
        }
        this.scrollContent.addChild(scrollItemCopy)
    }
    private toAddCoin() {
        this.close()
        App.ui.open(UIConstant.RechargeView)
    }
    /**
* 增加监听事件
*/
    protected initEvent(): void {
        this.addCoin.on('click',this.toAddCoin,this)
        this.closeBtn.on("click", this.close, this);
    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {
        this.addCoin.off('click',this.toAddCoin,this)
        this.closeBtn.off("click", this.close, this);
    }
}
