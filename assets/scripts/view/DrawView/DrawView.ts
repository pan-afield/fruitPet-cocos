import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";


const { ccclass, property } = cc._decorator;
@ccclass
export default class DrawView extends BaseUI {
    private goodNums: number
    private backBtn: cc.Node
    private closeBtn: cc.Node
    private coin: cc.Node
    private gift: cc.Node
    private startBtn: cc.Node
    private recordBtn: cc.Node
    private oneBtn: cc.Node
    private tenBtn: cc.Node
    private myFruit: cc.Node
    private toFarm: cc.Node
    private leftNum: cc.Node
    private goodsList: cc.Node
    private oneDrawView: cc.Node
    private oneText: cc.Node
    private oneGift: cc.Node
    private oneCouponBg: cc.Node
    private oneSomeCoupon: cc.Node
    private oneContinue: cc.Node
    private oneclose: cc.Node
    private oneCongratulation: cc.Node
    private oneLeftNum: cc.Node
    private tenDrawView: cc.Node
    private tenAwardItem: cc.Node
    private tenAwardContent: cc.Node
    private closeTenView: cc.Node
    private tenViewGift: cc.Node
    private scrollItem: cc.Node
    private scrollContent: cc.Node
    private couponSpine: cc.Node
    private userBtn: cc.Node
    private coinBtn: cc.Node
    private giftBtn: cc.Node
    private iconAdd: cc.Node
    private shine1: cc.Node
    private shine2: cc.Node
    private timer
    private isMove: boolean

    protected validateUI(): void {
        this.backBtn = this.node.getChildByName('back_bg')
        this.closeBtn = this.node.getChildByName('icon_close')
        this.iconAdd = this.node.getChildByName('icon_add')
        this.scrollItem = this.node.getChildByName('scrollItem')
        this.scrollContent = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.startBtn = this.node.getChildByName('startBtn')
        this.oneBtn = this.node.getChildByName('oneBtn')
        this.tenBtn = this.node.getChildByName('tenBtn')
        this.recordBtn = this.node.getChildByName('recordBtn')
        this.goodsList = this.node.getChildByName('goodsList')
        this.leftNum = this.node.getChildByName('hint')
        this.toFarm = this.node.getChildByName('toFarm')
        this.myFruit = this.node.getChildByName('myFruit')
        this.coin = this.node.getChildByName('gold').getChildByName('gold_text')
        this.gift = this.node.getChildByName('gift').getChildByName('gift_text')
        this.oneDrawView = this.node.getChildByName('oneDraw')
        this.oneText = this.oneDrawView.getChildByName('awardText')
        this.oneGift = this.oneDrawView.getChildByName('gift').getChildByName('gift_text')
        this.oneCouponBg = this.oneDrawView.getChildByName('coupon_bg')
        this.couponSpine = this.oneDrawView.getChildByName('couponSpine')
        this.oneSomeCoupon = this.oneDrawView.getChildByName('some_coupon')
        this.oneContinue = this.oneDrawView.getChildByName('continue')
        this.oneclose = this.oneDrawView.getChildByName('mask')
        this.oneCongratulation = this.oneDrawView.getChildByName('text_congratulation')
        this.oneLeftNum = this.oneDrawView.getChildByName('leftNum')
        this.tenDrawView = this.node.getChildByName('tenDraw')
        this.tenAwardItem = this.tenDrawView.getChildByName('awardItem')
        this.tenAwardContent = this.tenDrawView.getChildByName('awardContent')
        this.closeTenView = this.tenDrawView.getChildByName('mask')
        this.tenViewGift = this.tenDrawView.getChildByName('gift').getChildByName('gift_text')
        this.userBtn = this.node.getChildByName('user')
        this.coinBtn = this.node.getChildByName('gold')
        this.giftBtn = this.node.getChildByName('gift')
        this.shine1 = this.node.getChildByName('img_shine1')
        this.shine2 = this.node.getChildByName('img_shine2')
    }
    protected updateView(): void {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.shine2.active = !this.shine2.active
        }, 400)
        this.tenAwardItem.active = false
        this.scrollItem.active = false
        this.getAwardList()
        this.getHistory()
    }
    protected initFinish(): void {
        const pic = this.node.getChildByName('user').getChildByName('mask').getChildByName('head')
        const vipLv = this.node.getChildByName('user').getChildByName('vipLv')
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, pic.getComponent(cc.Sprite))
        vipLv.getComponent(cc.Label).string = App.gdata.userInfo.vipLevelInfo.level
        this.coin.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.coin)
        this.gift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon)
        this.oneGift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon)
        this.tenViewGift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon)
        this.myFruit.getComponent(cc.RichText).string = `<color=#A65512>??????????????? </c><color=#FF772F>${UIUtil.toStone(App.gdata.userInfo.curProps)}</color>`
    }
    protected initEvent(): void {
        this.startBtn.on('click', this.startOneDarw, this)
        this.backBtn.on('click', this.close, this)
        this.closeBtn.on('click', this.close, this)
        this.toFarm.on('click', this.toFarmFun, this)
        this.recordBtn.on('click', this.toRecord, this)
        this.oneBtn.on('click', this.startOneDarw, this)
        this.tenBtn.on('click', this.startTenDarw, this)
        this.oneclose.on('click', this.closeOneDrawView, this)
        this.oneContinue.on('click', this.oneMoreTime, this)
        this.closeTenView.on('click', this.closeTenDrawView, this)
        this.userBtn.on('click', this.openSetting, this)
        this.coinBtn.on('click', this.openCoinRecord, this)
        this.giftBtn.on('click', this.openConvert, this)
        this.iconAdd.on('click', this.openRecharge, this)
    }
    protected removeEvent(): void {
        this.startBtn.off('click', this.startOneDarw, this)
        this.backBtn.on('click', this.close, this)
        this.closeBtn.on('click', this.close, this)
        this.toFarm.off('click', this.toFarmFun, this)
        this.recordBtn.off('click', this.toRecord, this)
        this.oneBtn.off('click', this.startOneDarw, this)
        this.tenBtn.off('click', this.startTenDarw, this)
        this.oneclose.off('click', this.closeOneDrawView, this)
        this.oneContinue.off('click', this.oneMoreTime, this)
        this.closeTenView.off('click', this.closeTenDrawView, this)
        this.userBtn.off('click', this.openSetting, this)
        this.coinBtn.off('click', this.openCoinRecord, this)
        this.giftBtn.off('click', this.openConvert, this)
        this.iconAdd.off('click', this.openRecharge, this)
    }
    private getHistory() {
        this.scrollContent.removeAllChildren()
        this.scrollContent.stopAllActions()
        App.ActDrawProxy.DrawDynamic({
            onSuccess: (res) => {
                res.dynamics.forEach((item, index) => {
                    const itemCopy = cc.instantiate(this.scrollItem)
                    itemCopy.active = true
                    const pic = itemCopy.getChildByName('mask').getChildByName('userPic')
                    const label = itemCopy.getChildByName('label')
                    RES.loadHead(item.headimg, pic.getComponent(cc.Sprite))
                    label.getComponent(cc.Label).string = `??????${item.nickname}??????${item.name}`
                    itemCopy.parent = this.scrollContent
                })
                let self = this;
                let j = 1;
                let action = cc.sequence(cc.moveBy(1, 0, 54), cc.delayTime(2), cc.callFunc(function () {
                    // console.log("j", j, self.scrollContent.position.y)
                    if (j == res.dynamics.length - 1) {
                        j = 1;
                        self.scrollContent.setPosition(0, 27);
                    } else {
                        j++;
                    }
                }.bind(this))).repeatForever();
                this.scrollContent.runAction(action);
            }
        })
    }
    private getAwardList() {
        App.ActDrawProxy.PrizeList({
            onSuccess: (res) => {
                console.log(res);
                this.goodNums = res.LeftNums
                this.leftNum.getComponent(cc.RichText).string = `??????????????????<b><size=26>${this.goodNums}</size></b>???`
                res.Prizes.forEach((item, index) => {
                    this.goodsList.children.forEach((items, indexs) => {
                        if (index === indexs) {
                            const node = items
                            node['item'] = item
                            node.getChildByName('name').getComponent(cc.Label).string = item.name
                            RES.loadHead(item.imgurl, node.getChildByName('picture').getComponent(cc.Sprite))
                        }
                    })
                })
            }
        })
    }
    private toFarmFun() {
        this.close()
        EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
    }
    private toRecord() {
        this.close()
        App.ui.open(UIConstant.DrawRecordView)
    }
    private setPic(index) {
        if (index) {
            RES.setSpriteFrame(this.goodsList.children[index - 1].getComponent(cc.Sprite), 'view/draw/img_bg_');
            RES.setSpriteFrame(this.goodsList.children[index].getComponent(cc.Sprite), 'view/draw/get_it');
        } else {
            RES.setSpriteFrame(this.goodsList.children[this.goodsList.children.length - 1].getComponent(cc.Sprite), 'view/draw/img_bg_');
            RES.setSpriteFrame(this.goodsList.children[index].getComponent(cc.Sprite), 'view/draw/get_it');
        }
    }
    private initList() {
        this.goodsList.children.forEach(item => {
            RES.setSpriteFrame(item.getComponent(cc.Sprite), 'view/draw/img_bg_');
        })
    }
    private startOneDarw() {
        if (this.isMove) {
            return
        }
        if (App.gdata.userInfo.curProps < 10000) {
            App.ui.open(UIConstant.AllAlertView, null, { data: { msg: '??????????????????1???????????????????????????????????????????????????????????????', showKey: 'lessFruit' } })
            return
        }
        this.isMove = true
        let onSuccess = (res) => {
            const resObj = res.Rewards[0]
            const hitOne = this.goodsList.children.findIndex((item: any) => {
                return item.item.name === resObj.name
            })
            // RES.setSpriteFrame(this.oneSomeCoupon.getComponent(cc.Sprite), resObj.imgurl)
            RES.loadHead(resObj.imgurl, this.oneSomeCoupon.getComponent(cc.Sprite))
            // const hitBg = this.node.getChildByName('moveContent').getChildByName('hitBg')
            let oneCricle = this.goodsList.children.length - 1
            let hitBgIndex = 0
            let bgSpeed = 500
            let timesStop = oneCricle * 5 + hitOne
            let timesStep = 0
            // hitBg.position = this.goodsList.children[hitBgIndex].position
            this.setPic(hitBgIndex);
            // hitBg.active = true
            const timeFun = (speed) => {
                let timer = setTimeout(() => {
                    if (timesStep < timesStop / 3 && bgSpeed > 50) {
                        bgSpeed = bgSpeed - 50
                    }
                    if (timesStop - timesStep < oneCricle) {
                        bgSpeed = bgSpeed + 100
                    }
                    timesStep++
                    hitBgIndex++
                    // hitBg.position = this.goodsList.children[hitBgIndex].position
                    this.setPic(hitBgIndex)
                    if (hitBgIndex === oneCricle) {
                        hitBgIndex = 0
                        clearInterval(timer)
                        setTimeout(() => {
                            // hitBg.position = this.goodsList.children[hitBgIndex].position
                            this.setPic(hitBgIndex)
                            timeFun(bgSpeed)
                        }, bgSpeed)
                        return
                    }
                    if (hitBgIndex === hitOne && timesStep === timesStop) {
                        clearInterval(timer)
                        setTimeout(() => {
                            if (resObj.nums > 10000) {
                                this.couponSpine.active = true //??????
                                this.oneCouponBg.active = false
                            } else {
                                this.couponSpine.active = false
                                this.oneCouponBg.active = true
                            }
                            if (resObj.type === 0) {
                                this.gift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon + resObj.nums)
                            } else {
                                this.coin.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.coin + resObj.nums)
                            }
                            this.isMove = false
                            this.oneDrawView.active = true
                            EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                        }, bgSpeed)
                        return
                    }
                    clearInterval(timer)
                    timeFun(bgSpeed)
                }, speed)
            }
            timeFun(bgSpeed)
            if (resObj && resObj.nums > 0) {
                this.oneDrawView.getChildByName('img_sorry').active = false
                this.oneDrawView.getChildByName('some_coupon').active = true
                this.oneDrawView.getChildByName('coupon_bg').active = true
                RES.setSpriteFrame(this.oneCongratulation.getComponent(cc.Sprite), 'view/draw/text_congratulation')
                RES.setSpriteFrame(this.oneDrawView.getChildByName('bg_award').getComponent(cc.Sprite), 'view/draw/bg_award')
                this.oneText.getComponent(cc.RichText).string = `????????????<size=40><color=#F6D027>${UIUtil.toStone(resObj.nums)}</color></size>??????`
                this.oneGift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon + resObj.nums)
            } else {
                this.oneDrawView.getChildByName('img_sorry').active = true
                this.oneDrawView.getChildByName('some_coupon').active = false
                this.oneDrawView.getChildByName('coupon_bg').active = false
                RES.setSpriteFrame(this.oneCongratulation.getComponent(cc.Sprite), 'view/draw/text_sorry_1pull')
                RES.setSpriteFrame(this.oneDrawView.getChildByName('bg_award').getComponent(cc.Sprite), 'view/draw/fail_bg')
                this.oneText.getComponent(cc.RichText).string = '???????????????~'
            }
            this.goodNums--
            this.leftNum.getComponent(cc.RichText).string = `??????????????????<b><size=26>${this.goodNums}</size></b>???`
            this.oneLeftNum.getComponent(cc.RichText).string = `??????????????????<b><size=26>${this.goodNums}</size></b>???`
            this.myFruit.getComponent(cc.RichText).string = `<color=#A65512>??????????????? </c><color=#FF772F>${UIUtil.toStone(App.gdata.userInfo.curProps - 10000)}</color>`
        }
        App.ActDrawProxy.DrawApply({ onSuccess, data: { times: 1 } })
    }
    private startTenDarw() {
        if (this.isMove) {
            return
        }
        if (App.gdata.userInfo.curProps < 100000) {
            App.ui.open(UIConstant.AllAlertView, null, { data: { msg: '??????????????????10???????????????????????????????????????????????????????????????', showKey: 'lessFruit' } })
            return
        }
        this.isMove = true
        let allCoin = 0, allCoupon = 0
        let onSuccess = (res) => {
            this.tenAwardContent.removeAllChildren()
            let oneCricle = this.goodsList.children.length - 1
            let hitBgIndex = 0
            let bgSpeed = 500
            let timesCricle = 1
            this.setPic(hitBgIndex)
            const timeFun = (speed) => {
                console.log(bgSpeed);

                let timer = setTimeout(() => {
                    hitBgIndex++
                    if (hitBgIndex < 5 && timesCricle === 1) {
                        bgSpeed = bgSpeed - 100
                    }
                    if (hitBgIndex > 3 && timesCricle === 3) {
                        bgSpeed = bgSpeed + 100
                    }
                    this.setPic(hitBgIndex)
                    if (hitBgIndex === oneCricle && timesCricle === 3) {
                        hitBgIndex = 0
                        clearInterval(timer)
                        setTimeout(() => {
                            this.setPic(hitBgIndex)
                            setTimeout(() => {
                                this.isMove = false
                                this.tenDrawView.active = true
                                this.coin.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.coin + allCoin)
                                this.gift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon + allCoupon)
                                EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                            }, bgSpeed)
                        }, bgSpeed)
                        return
                    }
                    if (hitBgIndex === oneCricle) {
                        timesCricle++
                        hitBgIndex = 0
                        setTimeout(() => {
                            this.setPic(hitBgIndex)
                            timeFun(bgSpeed)
                        }, bgSpeed)
                        return
                    }
                    timeFun(bgSpeed)
                }, speed)
            }
            timeFun(bgSpeed)
            res.Rewards.forEach((item, index) => {
                if (item.type === 0) {
                    allCoupon += item.nums
                } else {
                    allCoin += item.nums
                }
                const node = cc.instantiate(this.tenAwardItem)
                const label = node.getChildByName('label')
                const pic = node.getChildByName('pic')
                const smallPop = node.getChildByName('small_pop')
                const smallSpine = node.getChildByName('smallSpine')
                if (item.nums > 10000) {
                    smallPop.active = false
                    smallSpine.active = true
                } else {
                    smallPop.active = true
                    smallSpine.active = false
                }
                label.getComponent(cc.RichText).string = `<color=#F6D027>${UIUtil.toStone(item.nums)}</c>??????`
                RES.setSpriteFrame(pic.getComponent(cc.Sprite), item.imgurl)
                node.active = true
                node.parent = this.tenAwardContent
            })
            this.goodNums = this.goodNums - 10
            this.leftNum.getComponent(cc.RichText).string = `??????????????????<b><size=26>${this.goodNums}</size></b>???`
            this.oneLeftNum.getComponent(cc.RichText).string = `??????????????????<b><size=26>${this.goodNums}</size></b>???`
            this.tenDrawView.getChildByName('coin').getComponent(cc.RichText).string = `<color=#F6D027>${UIUtil.toStone(allCoin ? allCoin : 0)}</c>??????`
            this.tenDrawView.getChildByName('coupon').getComponent(cc.RichText).string = `<color=#F6D027>${UIUtil.toStone(allCoupon ? allCoupon : 0)}</c>??????`
            this.tenViewGift.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.giftcoupon + allCoupon)
            this.myFruit.getComponent(cc.RichText).string = `<color=#A65512>??????????????? </c><color=#FF772F>${UIUtil.toStone(App.gdata.userInfo.curProps - 100000)}</color>`
        }
        App.ActDrawProxy.DrawApply({ onSuccess, data: { times: 10 } })
    }
    private closeOneDrawView() {
        this.oneDrawView.active = false
        this.initList()
    }
    private closeTenDrawView() {
        this.tenDrawView.active = false
        this.initList()
    }
    private openSetting() {
        this.close()
        App.ui.open(UIConstant.SettingView)
    }
    private openCoinRecord() {
        this.close()
        App.ui.open(UIConstant.CoinRecordView)
    }
    private openRecharge() {
        this.close()
        App.ui.open(UIConstant.RechargeView)
    }
    private openConvert() {
        this.close()
        App.ui.open(UIConstant.ConvertView)
    }
    private oneMoreTime() {
        this.oneDrawView.active = false
        this.initList()
        this.startOneDarw()
    }
}