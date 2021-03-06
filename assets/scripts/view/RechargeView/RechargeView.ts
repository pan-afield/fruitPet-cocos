// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from "../../config/config"
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";
import AlertDialog from "../dialog/AlertDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargeView extends BaseUI {
    private rewardCoin: cc.Node
    private payView: cc.Node;
    private payViewClose: cc.Node;
    private catFoods: cc.Node;
    private foodsPrice: cc.Node;
    private payBtn: cc.Node;
    private viewContent: cc.Node = null
    private userPic: cc.Node = null;
    private coin: cc.Node = null;
    private closeBtn: cc.Node;
    private scrollItem: cc.Node;
    private scrollContent: cc.Node
    private gooodsList: []
    private currentObj;
    private vipPopup: cc.Node;
    private closeVipBtn: cc.Node;
    private leftBtn: cc.Node;
    private rightBtn: cc.Node;
    private titleVip: cc.Node
    private vipContent: cc.Node
    private vipItem: cc.Node
    private vipBtn: cc.Node
    private expProgress: cc.Node
    private vipLevel: cc.Node
    private numProgress: cc.Node
    private vipIcon: cc.Node
    private expTips: cc.Node
    private levelsDesc: []
    private crruentLevel: number
    private changeNum: number
    private goodsName: cc.Node
    private another: cc.Node
    private payViewMask: cc.Node

    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.closeBtn = this.viewContent.getChildByName('icon_close')
        this.userPic = this.viewContent.getChildByName('picMask').getChildByName('userPic')
        this.coin = this.viewContent.getChildByName('coin')
        this.scrollItem = this.viewContent.getChildByName('scrollItem')
        this.scrollContent = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.payView = this.viewContent.getChildByName('payView')
        this.payViewClose = this.payView.getChildByName('img_Popup').getChildByName('icon_cancel')
        this.catFoods = this.payView.getChildByName('img_Popup').getChildByName('cats_foods')
        this.foodsPrice = this.payView.getChildByName('img_Popup').getChildByName('recharge_price')
        this.payBtn = this.payView.getChildByName('img_Popup').getChildByName('btn_payment')
        this.rewardCoin = this.payView.getChildByName('img_Popup').getChildByName('rewardCoin')
        this.vipPopup = this.viewContent.getChildByName('vipPopup')
        this.vipBtn = this.viewContent.getChildByName('btn_vip')
        this.closeVipBtn = this.vipPopup.getChildByName('icon_close')
        this.leftBtn = this.vipPopup.getChildByName('btn_Left')
        this.rightBtn = this.vipPopup.getChildByName('btn_right')
        this.titleVip = this.vipPopup.getChildByName('title')
        this.vipContent = this.vipPopup.getChildByName('vipContent')
        this.vipItem = this.vipPopup.getChildByName('vipItem')
        this.expProgress = this.viewContent.getChildByName('progressBar')
        this.numProgress = this.viewContent.getChildByName('progress')
        this.expTips = this.viewContent.getChildByName('expTips')
        this.vipLevel = this.viewContent.getChildByName('vipLevel').getChildByName('label')
        this.vipIcon = this.viewContent.getChildByName('vipIcon')
        this.goodsName = this.payView.getChildByName('img_Popup').getChildByName('goodsName')
        this.another = this.payView.getChildByName('img_Popup').getChildByName('another')
        this.payViewMask = this.payView.getChildByName('payViewMask')
    }
    protected updateView(): void {
        this.getGoodsList()
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, this.userPic.getComponent(cc.Sprite))
    }
    protected initFinish(): void {
    }
    protected openVipPopup() {
        this.vipPopup.active = true
        this.getVipLevel(this.crruentLevel)
        this.changeNum = this.crruentLevel
    }
    protected closeVipPopup() {
        this.vipPopup.active = false
    }
    protected closePayView(): void {
        this.payView.active = false
    }
    protected changeLevel(event) {
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
    private wxPay(): void {
        console.log(this.currentObj.rid);

        // @ts-ignore
        wx.getSystemInfo({

            success: (res) => {
                console.log(res.model)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                console.log(res.language)
                console.log(res.version)
                console.log(res.platform)
                if (res.platform === 'ios') {
                    App.ConfigProxy.configInfo({
                        onSuccess: (res) => {
                            if (res.ShowIphoneCharge) {
                                // @ts-ignore
                                wx.openCustomerServiceConversation({
                                    sessionFrom: `goodid:${this.currentObj.rid}`,
                                    showMessageCard: true,
                                    sendMessageTitle: '????????????????????????????????????',
                                    sendMessagePath: `goodid=${this.currentObj.rid}`,//??????????????????
                                    sendMessageImg: 'https://h5.lexun.com/games/miniprogram/cocos/img/share.png',
                                    sucess: (res) => {
                                        console.log('???????????????', res);
                                        this.payView.active = false
                                    }
                                })
                            } else {

                            }
                        }
                    })
                    console.log('ios');


                } else {
                    console.log('android');

                    App.GoodsProxy.userPay({
                        onSuccess: (res) => {
                            console.log(res);
                            if (res.Result === -5) {
                                if (Config.gameFlag) {
                                    // @ts-ignore
                                    wx.requestMidasPayment({
                                        mode: 'game', env: 0, offerId: '1450033580',
                                        currencyType: 'CNY',
                                        platform: 'android',
                                        buyQuantity: this.currentObj.price,//????????????
                                        success: (res) => {
                                            console.log(res);
                                            App.GoodsProxy.userPay({
                                                onSuccess: (res) => {
                                                    // MessageBoxManager.showAlert({
                                                    //     type: AlertDialog.TYPE_2,
                                                    //     msg: res.Msg
                                                    // });
                                                    this.payView.active = false
                                                    EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                                                    EventDispatcher.dispatch(GameEvent.SUCCESS_RECHARGE, res.Data)
                                                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                                                    EventDispatcher.dispatch(GameEvent.PET_PROP)
                                                    this.getGoodsList()
                                                }, data: { goodid: this.currentObj.rid }
                                            })
                                        },
                                        fail: (res) => {
                                            console.log('?????????', res);
                                        },
                                        compelte: (res) => {
                                            console.log('any:', res);
                                        }
                                    })
                                }
                            }
                        }, data: { goodid: this.currentObj.rid }
                    })
                }
            }
        })

    }
    /* ???????????? */
    private toPay(event): void {
        this.scrollContent.children.forEach((item, index) => {
            if (event.node === item) {
                this.gooodsList.forEach((items: any, indexs) => {
                    if (index === indexs) {
                        this.currentObj = items
                        // RES.setSpriteFrame(this.catFoods.getComponent(cc.Sprite), `view/recharge/cats_foods${index + 1}@2x`)
                        if (items.coin !== items.realcoin) {
                            this.rewardCoin.getComponent(cc.Label).string = `[??????]${UIUtil.toStone(items.realcoin)}??????`
                        } else {
                            this.rewardCoin.getComponent(cc.Label).string = `${UIUtil.toStone(items.realcoin)}??????`
                        }
                        RES.loadHead(items.img, this.catFoods.getComponent(cc.Sprite))
                        this.foodsPrice.getComponent(cc.Label).string = `???${items.price}`
                        this.goodsName.getComponent(cc.Label).string = items.name
                        // let anoAward = ''
                        // items.items.forEach(item => {
                        //     anoAward = anoAward + item.name + '+' + item.nums + '???'
                        // })
                        // this.another.getComponent(cc.Label).string = `${anoAward.split('???')[0]}`
                        this.another.getComponent(cc.Label).string = `VIP??????+${items.credits}`
                        this.payView.active = true
                        return
                    }
                })
            }
        })
    }
    /* ???????????? */
    protected getGoodsList() {
        let onSuccess = (res) => {
            this.levelsDesc = res.levels
            this.gooodsList = res.list
            this.crruentLevel = res.levelInfo.level
            this.coin.getComponent(cc.Label).string = res.coin
            this.expTips.getComponent(cc.Label).string = `?????????${res.levelInfo.needcredits - res.levelInfo.curcredits}????????????`
            this.numProgress.getComponent(cc.Label).string = `${res.levelInfo.curcredits}/${res.levelInfo.needcredits}`
            this.vipLevel.getComponent(cc.Label).string = 'VIP' + res.levelInfo.level
            RES.setSpriteFrame(this.vipIcon.getComponent(cc.Sprite), `common/vip/v${res.levelInfo.level}@2x`)
            this.expProgress.getComponent(cc.ProgressBar).progress = res.levelInfo.process / 100
            console.log(this.expProgress.getComponent(cc.ProgressBar).progress);
            this.scrollContent.removeAllChildren()
            res.list.forEach((item: any, index) => {
                if (!this.scrollItem) return
                let scrollItemCopy = cc.instantiate(this.scrollItem)
                let vipExp = scrollItemCopy.getChildByName('Vip')
                let award = scrollItemCopy.getChildByName('award')
                let price = scrollItemCopy.getChildByName('price')
                let recommend = scrollItemCopy.getChildByName('goods_icon')
                let goodsImg = scrollItemCopy.getChildByName('img_goods')
                let name = scrollItemCopy.getChildByName('goodsName')
                let double = scrollItemCopy.getChildByName('double')
                double.active = item.coin !== item.realcoin
                vipExp.getComponent(cc.Label).string = `?????????+${item.credits}`
                name.getComponent(cc.Label).string = item.name
                award.getComponent(cc.Label).string = `??????${UIUtil.toStone(item.coin)}??????`
                price.getComponent(cc.Label).string = '???' + item.price
                RES.loadHead(item.img, goodsImg.getComponent(cc.Sprite))
                // RES.setSpriteFrame(goodsImg.getComponent(cc.Sprite), `view/recharge/cats_foods${index + 1}@2x`)
                if (item.name === '????????????') recommend.active = true
                scrollItemCopy.active = true
                scrollItemCopy.on('click', this.toPay, this)
                this.scrollContent.addChild(scrollItemCopy)
            });
        }
        App.GoodsProxy.goodsList({ onSuccess, data: { page: 1, pagesize: 10 } })
    }
    /**
* ??????????????????
*/
    protected initEvent(): void {
        this.closeBtn.on("click", this.close, this);
        this.payViewClose.on("click", this.closePayView, this);
        this.payViewMask.on("click", this.closePayView, this);
        this.payBtn.on("click", this.wxPay, this);
        this.closeVipBtn.on("click", this.closeVipPopup, this)
        this.vipBtn.on('click', this.openVipPopup, this)
        this.leftBtn.on("click", this.changeLevel, this)
        this.rightBtn.on("click", this.changeLevel, this)
        EventDispatcher.addListener(GameEvent.UPDATE_RECHARGE_LIST, this.getGoodsList, this)
    }

    /**
     * ??????????????????
     */
    protected removeEvent(): void {
        EventDispatcher.removeListener(GameEvent.UPDATE_RECHARGE_LIST, this.getGoodsList, this)
        this.leftBtn.off("click", this.changeLevel, this)
        this.rightBtn.off("click", this.changeLevel, this)
        this.closeBtn.off("click", this.close, this);
        this.payViewClose.off("click", this.closePayView, this);
        this.payViewMask.off("click", this.closePayView, this);
        this.payBtn.off("click", this.wxPay, this);
        this.closeVipBtn.off("click", this.closeVipPopup, this)
        this.vipBtn.off('click', this.openVipPopup, this)
        this.scrollContent.children.forEach((item) => {
            item.off('click', this.toPay, this)
        })
    }

}
