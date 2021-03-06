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
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import SilentLoader from "../../res/SilentLoader";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserInfoView extends BaseUI {
    private todayFeed: cc.Node
    private gradeBtn: cc.Node
    private closeBtn: cc.Node;
    private openFishBtn: cc.Node;
    private serviceBtn: cc.Node;
    private openUpgradeBtn: cc.Node
    private levelList: cc.Node
    private userLevel: cc.Node
    private userFish: cc.Node
    private vipLevel: cc.Node
    private levelFish: cc.Node
    private levelFishText: cc.Node
    private levelTitle: cc.Node
    private upAward: cc.Node
    private progressBar: cc.Node
    private lvPro: cc.Node
    private getFish: cc.Node
    private short: cc.Node
    private award: cc.Node
    private awardAll: cc.Node
    private levelAllBtn: cc.Node
    private settingView: cc.Node
    private daySign: cc.Node
    private planteTo: cc.Node
    private closeSetting: cc.Node
    private getFruit: cc.Node
    private levelFishText1: cc.Node
    private coin: cc.Node
    private coupon: cc.Node
    private allView: cc.Node
    private imgPopup: cc.Node
    private bgFrame: cc.Node
    private shortNum: number
    private toFarm: cc.Node
    private hintMsg: cc.Node
    private farmTime
    private img_title: cc.Node
    private userInfo

    protected validateUI(): void {
        this.todayFeed = this.node.getChildByName('todayFeed')
        this.gradeBtn = this.node.getChildByName('btn_Grade')
        this.farmTime = this.node.getChildByName('topBg').getChildByName('label')
        this.settingView = this.node.getChildByName('settingView')
        this.img_title = this.node.getChildByName('img_My fruit@2x')
        this.imgPopup = this.node.getChildByName('img_Popup')
        this.bgFrame = this.node.getChildByName('bg_frame')
        this.allView = this.node.getChildByName('all')
        this.closeSetting = this.settingView.getChildByName('popup_close')
        this.daySign = this.settingView.getChildByName('cancel')
        this.planteTo = this.settingView.getChildByName('bt_suer')
        this.hintMsg = this.settingView.getChildByName('msg')
        this.levelAllBtn = this.node.getChildByName('all').getChildByName('btn_UpgradeAll')
        this.getFruit = this.node.getChildByName('getFruit')
        this.award = this.node.getChildByName('award')
        this.awardAll = this.node.getChildByName('all').getChildByName('awardAll')
        this.short = this.node.getChildByName('short')
        this.progressBar = this.node.getChildByName('progressBar')
        this.lvPro = this.node.getChildByName('lvPro')
        this.upAward = this.node.getChildByName('upAward')
        this.closeBtn = this.node.getChildByName('popup_close')
        this.openFishBtn = this.node.getChildByName('icon_explain')
        this.serviceBtn = this.node.getChildByName('bt_sure')
        this.openUpgradeBtn = this.node.getChildByName('btn_upgrade')
        this.levelList = this.node.getChildByName('btn_Grade@2x')
        this.userLevel = this.node.getChildByName('UserLevel')
        this.userFish = this.node.getChildByName('UserFish')
        this.vipLevel = this.node.getChildByName('img_Grade').getChildByName('vipLevel')
        this.levelFish = this.node.getChildByName('levelFish')
        this.levelFishText = this.node.getChildByName('levelFishText')
        this.levelFishText1 = this.node.getChildByName('all').getChildByName('levelFishText1')
        this.levelTitle = this.node.getChildByName('levelTitle')
        this.getFish = this.node.getChildByName('btn_get')
        this.coin = this.node.getChildByName('coin')
        this.coupon = this.node.getChildByName('coupon')
        this.toFarm = this.node.getChildByName('toFarm')
    }
    protected updateView(): void {
        this.shortNum = 0
        this.getUserInfo()
        this.farmTimer()
    }
    /* ???????????? */
    private farmRecord() {
        EventDispatcher.dispatch(GameEvent.OPEN_FRUIT_RECORD)
    }
    protected openLevel() {
        this.close()
        EventDispatcher.dispatch(GameEvent.OPEN_LEVEL_LIST)
    }
    private openSet() {
        this.settingView.active = true
    }
    private closeSet() {
        this.settingView.active = false
    }
    protected daySignTo() {
        this.close()
        EventDispatcher.dispatch(GameEvent.DAY_SIGN)
    }
    protected plante() {
        this.close()
        EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
    }
    protected openFish() {
        this.close()
        // EventDispatcher.dispatch(GameEvent.OPEN_FISH)
        App.ui.open(UIConstant.FishBagView)
    }
    protected smallFishView() {
        this.close()
        EventDispatcher.dispatch(GameEvent.OPEN_FISH)
    }
    protected openUpgrade() {
        if (this.shortNum) {
            // MessageBoxManager.showAlert({
            //     type: 1,
            //     msg: `????????????\n?????????<color=#FA682C>${this.shortNum}</color=#FA682C>???????????????\n????????????????????????????????????`,
            //     okLabel: '????????????',
            //     okCallBack: () => { EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE) }
            // })
            // this.hintMsg.getComponent(cc.RichText).string = `????????????\n?????????<color=#FA682C>${this.shortNum}</color=#FA682C>???????????????\n????????????????????????????????????`
            // this.openSet()
            let onSuccess = (res) => {
                if (res.reward) {
                    MessageBoxManager.showAlert({
                        type: 2,
                        msg: `???????????????????????????????????????\n?????? <color=#FA682C>${res.reward.Name}x${res.reward.Nums}</color>`,
                        okLabel: '????????????',
                        okCallBack: () => { EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE) }
                    })
                    this.getUserInfo()
                } else {
                    MessageBoxManager.showAlert({
                        type: 2,
                        msg: `????????????\n?????????<color=#FA682C>${this.shortNum}</color=#FA682C>???????????????\n????????????????????????????????????`,
                        okLabel: '????????????',
                        okCallBack: () => { EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE) }
                    })
                }
            }
            App.NewUserProxy.GetRandRwarad({ onSuccess, data: { type: 1 } })
            return
        }
        this.close()
        if (this.userInfo.petInfo.level >= this.userInfo.realMaxLevel) {
            App.PetProxy.PetLevelUp({
                onSuccess: (res) => {
                    App.audio.playEffectByName('open_treasure_boom')
                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                    App.ui.open(UIConstant.UpgradeView, null, { data: res })
                }, data: { flag: 0 }
            })
            return
        }
        App.ui.open(UIConstant.AllAlertView, null,
            {
                data: {
                    showKey: 'otherAward',
                    msg: `??????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.nextLevel.props)}</color>??????\n??????????????????LV${this.userInfo.nextLevel.level}???\n????????????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.nextLevel.reward)}</color>??????`,
                    okCallBack: () => {
                        App.PetProxy.PetLevelUp({
                            onSuccess: (res) => {
                                App.audio.playEffectByName('open_treasure_boom')
                                EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                                App.ui.open(UIConstant.UpgradeView, null, { data: res })
                            }, data: { flag: 0 }
                        })
                    }
                }
            })
    }
    protected openUpgrade1() {
        this.close()
        const msg = this.userInfo.realMaxLevel >= this.userInfo.maxLevel ?
            `??????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.maxLevelNeedProps)}</color>??????\n??????????????????LV${this.userInfo.maxLevel}???\n
            ????????????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.maxLevelReward)}</color>?????????`
            :
            `<color=#FA682C>?????????????????????????????????LV${this.userInfo.realMaxLevel}</color>\n??????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.realMaxLevelNeedProps)}</color>??????\n??????????????????LV${this.userInfo.realMaxLevel}???\n????????????????????????<color=#FA682C>${UIUtil.toStone(this.userInfo.realMaxLevelReward)}</color>??????`
        if (this.userInfo.petInfo.level >= this.userInfo.realMaxLevel) {
            App.PetProxy.PetLevelUp({
                onSuccess: (res) => {
                    App.audio.playEffectByName('open_treasure_boom')
                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                    App.ui.open(UIConstant.UpgradeView, null, { data: res })
                }, data: { flag: 1 }
            })
            return
        }
        App.ui.open(UIConstant.AllAlertView, null,
            {
                data: {
                    showKey: 'otherAward',
                    msg,
                    okCallBack: () => {
                        App.PetProxy.PetLevelUp({
                            onSuccess: (res) => {
                                App.audio.playEffectByName('open_treasure_boom')
                                EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                                App.ui.open(UIConstant.UpgradeView, null, { data: res, level: App.gdata.userInfo.petInfo.level })
                            }, data: { flag: 1 }
                        })
                    }
                }
            })
    }
    protected getUserInfo() {
        let onSuccess = (res) => {
            console.log(res);
            this.userInfo = res
            this.coin.getComponent(cc.Label).string = UIUtil.toStone(res.coin)
            this.coupon.getComponent(cc.Label).string = UIUtil.toStone(res.giftcoupon)
            this.userFish.getComponent(cc.Label).string = `${UIUtil.toStone(res.curProps)}`
            this.vipLevel.getComponent(cc.Label).string = `LV${res.petInfo.level}`
            if (res.nextLevel) {
                if (res.curProps < res.nextLevel.props) {
                    this.shortNum = res.nextLevel.props - res.curProps
                    this.levelTitle.getComponent(cc.RichText).string = `?????????<color=#FA682C>${UIUtil.toStone(res.nextLevel.props - res.curProps)}</color>???????????????<color=#FA682C>LV${res.nextLevel.level}</color>`
                    this.levelFishText.getComponent(cc.RichText).string = `<b>??????LV${res.nextLevel.level}???<color=#FF4A00>${UIUtil.toStone(res.nextLevel.props)}??????</color></b>`
                    this.award.getComponent(cc.Label).string = `?????????${res.nextLevel.props / 10000}?????????/?????????`
                    this.levelFishText1.getComponent(cc.RichText).string = `<b>??????LV${res.maxLevel}???<color=#FF4A00>${res.maxLevelReward}??????</b></color>`
                    this.awardAll.getComponent(cc.Label).string = `?????????${res.maxLevelReward / 10000}?????????/?????????`
                    this.allView.active = false
                    RES.setSpriteFrame(this.imgPopup.getComponent(cc.Sprite), 'view/userInfo/bg_Popup01@2x')
                    RES.setSpriteFrame(this.bgFrame.getComponent(cc.Sprite), 'view/userInfo/img_frame02@2x')
                    this.toFarm.y = -380
                    this.gradeBtn.y = -460
                    this.todayFeed.y = -460
                } else {
                    if (res.maxLevel === res.nextLevel.level) {
                        this.allView.active = false
                        this.toFarm.y = -380
                        this.gradeBtn.y = -460
                        this.todayFeed.y = -460
                        RES.setSpriteFrame(this.imgPopup.getComponent(cc.Sprite), 'view/userInfo/bg_Popup01@2x')
                        RES.setSpriteFrame(this.bgFrame.getComponent(cc.Sprite), 'view/userInfo/img_frame02@2x')
                    } else {
                        this.allView.active = true
                        this.toFarm.y = -513
                        this.gradeBtn.y = -590
                        this.todayFeed.y = -590
                        RES.setSpriteFrame(this.imgPopup.getComponent(cc.Sprite), 'view/userInfo/bg_Popup@2x')
                        RES.setSpriteFrame(this.bgFrame.getComponent(cc.Sprite), 'view/userInfo/img_frame03@2x')
                    }
                    this.levelTitle.getComponent(cc.RichText).string = `??????????????????????????????<color=#FA682C>LV${res.maxLevel}</color>`
                    this.levelFishText.getComponent(cc.RichText).string = `<b>??????LV${res.nextLevel.level}???<color=#FF4A00>${UIUtil.toStone(res.nextLevel.props)}??????</color></b>`
                    this.award.getComponent(cc.Label).string = `?????????${res.nextLevel.props / 10000}?????????/?????????`
                    this.levelFishText1.getComponent(cc.RichText).string = `<b>??????LV${res.maxLevel}???<color=#FF4A00>${UIUtil.toStone(res.maxLevelReward)}??????</color></b>`
                    this.awardAll.getComponent(cc.Label).string = `?????????${res.maxLevelReward / 10000}?????????/?????????`
                }
            }
            this.todayFeed.getComponent(cc.RichText).string = '?????????????????????0/100'
        }
        App.UserProxy.getUserInfo({ onSuccess: onSuccess })
    }
    private farmCountDown
    /* ??????????????? */
    private farmTimer() {
        this.unschedule(this.farmCountDown)
        App.GameProxy.farmGameInfo({
            onSuccess: (res) => {
                let second = res.Gameinfo.Countdown
                if (second > 60) {
                    this.farmTime.getComponent(cc.Label).string = Math.floor(second / 60) + '???' + second % 60 + '???' + '??????'
                } else {
                    this.farmTime.getComponent(cc.Label).string = second + '???' + '??????'
                }
                this.farmCountDown = () => {
                    if (second === 0) {
                        this.unschedule(this.farmCountDown)
                        this.farmTimer()
                        return
                    }
                    second--
                    if (second > 60) {
                        this.farmTime.getComponent(cc.Label).string = Math.floor(second / 60) + '???' + second % 60 + '???' + '??????'
                    } else {
                        this.farmTime.getComponent(cc.Label).string = second + '???' + '??????'
                    }
                }
                this.schedule(this.farmCountDown, 1)
            }
        })
    }
    private openFruitBag() {
        this.close()
        App.ui.open(UIConstant.FruitBagView)
    }
    private openLvList() {
        this.close()
        App.ui.open(UIConstant.PetLevelView)
    }
    protected initEvent(): void {
        this.levelList.on('click', this.openLevel, this)
        this.closeSetting.on('click', this.closeSet, this)
        this.img_title.on('click', this.openFruitBag, this)
        this.getFruit.on('click', this.openSet, this)
        this.daySign.on('click', this.daySignTo, this)
        this.planteTo.on('click', this.plante, this)
        this.toFarm.on('click', this.plante, this)
        this.openUpgradeBtn.on('click', this.openUpgrade, this)
        this.levelAllBtn.on('click', this.openUpgrade1, this)
        this.openFishBtn.on('click', this.openFish, this)
        this.getFish.on('click', this.smallFishView, this)
        this.serviceBtn.on('click', this.openService, this)
        this.closeBtn.on('click', this.close, this)
        this.gradeBtn.on('click', this.openLvList, this)
        this.farmTime.parent.on('click', this.farmRecord, this)
    }
    protected removeEvent(): void {
        this.getFruit.off('click', this.openSet, this)
        this.closeSetting.off('click', this.closeSet, this)
        this.img_title.on('click', this.openFruitBag, this)
        this.levelList.off('click', this.openLevel, this)
        this.daySign.off('click', this.daySignTo, this)
        this.planteTo.off('click', this.plante, this)
        this.toFarm.off('click', this.plante, this)
        this.openUpgradeBtn.off('click', this.openUpgrade, this)
        this.levelAllBtn.off('click', this.openUpgrade1, this)
        this.openFishBtn.off('click', this.openFish, this)
        this.getFish.off('click', this.smallFishView, this)
        this.serviceBtn.off('click', this.openService, this)
        this.closeBtn.off('click', this.close, this)
        this.gradeBtn.off('click', this.openLvList, this)
        this.farmTime.parent.off('click', this.farmRecord, this)
    }
    private openService() {
        // @ts-ignore
        wx.openCustomerServiceConversation({})
    }
}
