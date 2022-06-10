import GameAudio from "../audioManger/GameAudio";
import Config from "../config/config";
import UIConstant from "../constant/UIConstant";
import EventDispatcher from "../event/EventDispatcher";
import GameEvent from "../event/GameEvent";
import App from "../manager/App";
import RES from "../res/RES";
import SilentLoader from "../res/SilentLoader";
import UIUtil from "../util/UIUtil";
import BaseScene from "./BaseScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class mainScene extends BaseScene {
    private newPeople: cc.Node
    private fishToFarm: cc.Node
    private fishView: cc.Node
    private closeFishBtn: cc.Node
    private car: cc.Node;
    private cat: cc.Node;
    private catLv: cc.Node
    private coin: cc.Label;
    private giftCoupon: cc.Label;
    private catLevel: cc.Label;
    private scrollItem: cc.Node;
    private scrollContent: cc.Node;
    private carGiftPos: Array<cc.Vec2> = [cc.v2(-183, -200), cc.v2(-256, -57), cc.v2(-180, 137), cc.v2(-30, 261), cc.v2(155, 70)];
    private foodScroll: cc.Node;
    private foodItem: cc.Node;
    private actionView: cc.Node;
    private actionIcon: cc.Node;
    private tipView: cc.Node;
    private eatActionFlag: boolean = true;
    private feedBackInfo = null;
    private closeTipViewBtn: cc.Node;
    private keyFeedBtn: cc.Node;
    private user: cc.Node;
    private gold: cc.Node;
    private gift: cc.Node;
    private strategyBtn: cc.Node;
    private convertBtn: cc.Node
    private addCoinBtn: cc.Node
    private farmBtn: cc.Node;
    private userHead: cc.Sprite;
    private shareBtn: cc.Node;
    private carTalk: cc.Node;
    private carBowl: cc.Node
    private addGoldText: cc.Node;
    private critInfo: cc.Node;
    private coinEf: sp.Skeleton;
    private sign: cc.Node
    private catVip: cc.Node
    private levelList: cc.Node
    private closeLevel: cc.Node
    private levelContent: cc.Node
    private levelItem: cc.Node
    private fishBag: cc.Node
    private treasureNum: cc.Node
    private fishNum: cc.Node
    private treasureIcon: cc.Node
    private daySign: cc.Node
    private levelHint: cc.Node
    private petInfoPass = { level: Number, process: Number, name: String, giftcouponout: Number }
    private catGrade: cc.Node
    private userMask: cc.Node
    private catProgress: cc.Node
    private catTalk: cc.Node
    private catLevelBtn: cc.Node
    private catLevel1: cc.Node
    private toTimer: cc.Node
    private feededView: cc.Node
    private feededClose: cc.Node
    private coinT: cc.Node
    private giftT: cc.Node
    private fishT: cc.Node
    private fruitAll: cc.Node
    private toLevelBtn: cc.Node
    private bagMore: cc.Node
    private fruitIcon: cc.Node
    private farmTime: cc.Node
    // private convertIcon:cc.Node
    private farmCountDown: Function
    private packUp: cc.Node
    private vipLv: cc.Node
    private lvText: cc.Node
    private drawIcon: cc.Node
    private noticeLabel: cc.Node

    protected validateUI(): void {

        console.log('validateUI');
        // this.convertIcon = this.node.getChildByName('icon_convert')
        this.packUp = this.node.getChildByName('packUp')
        this.drawIcon = this.node.getChildByName('drawIcon')
        this.catLv = this.node.getChildByName('cat').getChildByName('catLv')
        this.feededView = this.node.getChildByName('feededView')
        this.feededClose = this.feededView.getChildByName('mask')
        this.coinT = this.feededView.getChildByName('coinT')
        this.giftT = this.feededView.getChildByName('giftT')
        this.fishT = this.feededView.getChildByName('fishT')
        this.catLevelBtn = this.node.getChildByName('icon_catgrade')
        this.catLevel1 = this.catLevelBtn.getChildByName('lv')
        this.catTalk = this.node.getChildByName('img_talk')
        this.catGrade = this.node.getChildByName('catGrade')
        this.catLevel = this.node.getChildByName("catGrade").getChildByName("lv").getComponent(cc.Label);
        this.catProgress = this.node.getChildByName("catGrade").getChildByName("progressBar")
        this.levelHint = this.catGrade.getChildByName('level_hint')
        this.heartSpine = this.node.getChildByName('heart')
        this.daySign = this.node.getChildByName('daySign_icon')
        this.newPeople = this.node.getChildByName('newPeople_icon')
        this.sign = this.node.getChildByName('sign')
        this.carTalk = this.node.getChildByName('carTalk')
        this.carBowl = this.node.getChildByName('img_catbowl')
        this.addCoinBtn = this.node.getChildByName('icon_add')
        this.convertBtn = this.node.getChildByName('icon_exchange')
        this.strategyBtn = this.node.getChildByName('icon_strategy')
        this.user = this.node.getChildByName('user')
        this.catVip = this.node.getChildByName("user").getChildByName("v0")
        this.vipLv = this.node.getChildByName("user").getChildByName("vipLv")
        this.userMask = this.user.getChildByName('mask')
        this.userHead = this.node.getChildByName("user").getChildByName("mask").getChildByName("head").getComponent(cc.Sprite);
        this.gold = this.node.getChildByName('gold')
        this.gift = this.node.getChildByName('gift')
        this.car = this.node.getChildByName("car");
        this.coin = this.node.getChildByName("gold").getChildByName("gold_text").getComponent(cc.Label);
        this.giftCoupon = this.node.getChildByName("gift").getChildByName("gold_text").getComponent(cc.Label);
        this.scrollItem = this.node.getChildByName("scrollItem");
        this.scrollContent = this.node.getChildByName("scrollList").getChildByName("mask").getChildByName("content").getChildByName("content");
        this.foodScroll = this.node.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        this.foodItem = this.node.getChildByName("item");
        this.actionView = this.node.getChildByName("actionView");
        this.actionIcon = this.node.getChildByName("actionIcon");
        this.tipView = this.node.getChildByName("tipView");
        this.closeTipViewBtn = this.tipView.getChildByName("bt_sure");
        this.keyFeedBtn = this.node.getChildByName("bt_feed");
        this.farmBtn = this.node.getChildByName("icon_garden");
        this.shareBtn = this.node.getChildByName("icon_wechat_share")
        this.addGoldText = this.node.getChildByName("addGoldText");
        this.cat = this.node.getChildByName("cat");
        this.coinEf = this.node.getChildByName("coin_ef").getComponent(sp.Skeleton);
        this.critInfo = this.node.getChildByName("crit");
        this.fishView = this.node.getChildByName("getFishView")
        this.fishToFarm = this.fishView.getChildByName('bt_sure')
        this.closeFishBtn = this.fishView.getChildByName('icon_close')
        this.levelList = this.node.getChildByName('LevelListView')
        this.closeLevel = this.levelList.getChildByName('icon_close')
        this.levelContent = this.levelList.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.levelItem = this.levelList.getChildByName('scrollItem')
        this.fishBag = this.node.getChildByName('fish_icon')
        this.treasureIcon = this.node.getChildByName('treasure_icon')
        this.treasureNum = this.node.getChildByName('treasure_icon').getChildByName('label')
        this.fishNum = this.node.getChildByName('fish_icon').getChildByName('fishNumber')
        this.fruitAll = this.node.getChildByName('fruitNum').getChildByName('label')
        this.toLevelBtn = this.node.getChildByName('bt_main')
        this.bagMore = this.node.getChildByName('bagMore')
        this.fruitIcon = this.node.getChildByName('icon_fruit')
        this.toTimer = this.node.getChildByName('timer')
        this.farmTime = this.node.getChildByName('timer').getChildByName('label')
        this.lvText = this.node.getChildByName('lvBg').getChildByName('New Label')
        this.noticeLabel = this.node.getChildByName('noticeBox').getChildByName('moveContent').getChildByName('view').getChildByName('label')
        this.onWindowResize();
        this.initGame();
    }

    protected initEvent(): void {
        this.schedule(this.clickBowl, 3)
        this.catLevelBtn.on('click', this.openUserInfoView, this)
        this.drawIcon.on('click', this.openDraw, this)
        this.lvText.parent.on('click', this.openUserInfoView, this)
        this.packUp.on('click', this.packUpFun, this)
        // this.convertIcon.on('click', this.openConvert, this)
        this.catTalk.on('click', this.clickBowl, this)
        this.catGrade.on('click', this.openUserInfoView, this)
        this.daySign.on('click', this.getDaySign, this)
        this.fishBag.on(cc.Node.EventType.TOUCH_END, this.openFishBag, this)
        this.closeLevel.on('click', this.closeLevelList, this)
        this.newPeople.on('click', this.openNewPeople, this)
        this.fishToFarm.on('click', this.enterFarmScene, this)
        this.closeFishBtn.on('click', this.closeFish, this)
        this.car.on('click', this.clickCar, this)
        this.carBowl.on('click', this.clickBowl, this)
        this.convertBtn.on('click', this.openConvert, this)
        this.addCoinBtn.on('click', this.openRecharge, this)
        this.strategyBtn.on('click', this.openStrategy, this)
        this.gift.on('click', this.openGiftRecord, this)
        this.gold.on("click", this.openCoinRecord, this)
        this.user.on("click", this.openVIP, this)
        this.sign.on("click", this.openSign, this)
        this.closeTipViewBtn.on("click", this.BtnEvent, this);
        this.keyFeedBtn.on("click", this.BtnEvent, this);
        this.farmBtn.on("click", this.BtnEvent, this);
        this.shareBtn.on("click", this.shareMsg, this);
        this.treasureIcon.on('click', this.openTreasure, this)
        this.feededClose.on('click', this.feededViewClose, this)
        this.userMask.on('click', this.openSetting, this)
        this.toLevelBtn.on('click', this.openUserInfoView, this)
        this.bagMore.on('click', this.openBag, this)
        this.fruitIcon.on('click', this.openBag, this)
        this.toTimer.on('click', this.openFruitRecord, this)
        EventDispatcher.addListener(GameEvent.GO_TO_FRAMSCENE, this.enterFarmScene, this);
        EventDispatcher.addListener(GameEvent.OPEN_LEVEL_LIST, this.openLevelList, this);
        EventDispatcher.addListener(GameEvent.UPDATE_USER_INFO, this.getUserInfo, this);
        EventDispatcher.addListener(GameEvent.HIDE_SIGN, this.hideSign, this);
        EventDispatcher.addListener(GameEvent.OPEN_FISH, this.openFish, this);
        EventDispatcher.addListener(GameEvent.UPDATE_PET_INFO, this.getPetInfo, this);
        EventDispatcher.addListener(GameEvent.SNAKE_VIEW, this.snakeView, this);
        EventDispatcher.addListener(GameEvent.PET_PROP, this.getPetProp, this);
        EventDispatcher.addListener(GameEvent.DAY_SIGN, this.getDaySign, this);
        EventDispatcher.addListener(GameEvent.SUCCESS_RECHARGE, this.rechargeSuccess, this);
        EventDispatcher.addListener(GameEvent.OPEN_FRUIT_RECORD, this.openFruitRecord, this);
    }

    protected removeEvent(): void {
        this.unschedule(this.clickBowl)
        this.catLevelBtn.off('click', this.openUserInfoView, this)
        this.drawIcon.off('click', this.openDraw, this)
        this.lvText.parent.off('click', this.openUserInfoView, this)
        this.packUp.off('click', this.packUpFun, this)
        // this.convertIcon.off('click', this.openConvert, this)
        this.catTalk.off('click', this.clickBowl, this)
        this.catGrade.off('click', this.openUserInfoView, this)
        this.daySign.off('click', this.getDaySign, this)
        this.fishBag.off(cc.Node.EventType.TOUCH_END, this.openFishBag, this)
        this.closeLevel.off('click', this.closeLevelList, this)
        this.newPeople.off('click', this.openNewPeople, this)
        this.fishToFarm.off('click', this.enterFarmScene, this)
        this.closeFishBtn.off('click', this.closeFish, this)
        this.car.off('click', this.clickCar, this)
        this.sign.off("click", this.openSign, this)
        this.carBowl.off('click', this.clickBowl, this)
        this.convertBtn.off('click', this.openConvert, this)
        this.addCoinBtn.off('click', this.openRecharge, this)
        this.strategyBtn.off('click', this.openStrategy, this)
        this.gift.off('click', this.openGiftRecord, this)
        this.gold.off("click", this.openCoinRecord, this)
        this.user.off("click", this.openVIP, this)
        this.closeTipViewBtn.off("click", this.BtnEvent, this);
        this.keyFeedBtn.off("click", this.BtnEvent, this);
        this.farmBtn.off("click", this.BtnEvent, this);
        this.shareBtn.off("click", this.shareMsg, this);
        this.treasureIcon.off('click', this.openTreasure, this)
        this.feededClose.off('click', this.feededViewClose, this)
        this.userMask.off('click', this.openSetting, this)
        this.toLevelBtn.off('click', this.openUserInfoView, this)
        this.bagMore.off('click', this.openBag, this)
        this.fruitIcon.off('click', this.openBag, this)
        this.toTimer.off('click', this.openFruitRecord, this)
        EventDispatcher.removeListener(GameEvent.GO_TO_FRAMSCENE, this.enterFarmScene, this);
        EventDispatcher.removeListener(GameEvent.DAY_SIGN, this.getDaySign, this);
        EventDispatcher.removeListener(GameEvent.OPEN_LEVEL_LIST, this.openLevelList, this);
        EventDispatcher.removeListener(GameEvent.UPDATE_USER_INFO, this.getUserInfo, this);
        EventDispatcher.removeListener(GameEvent.HIDE_SIGN, this.hideSign, this);
        EventDispatcher.removeListener(GameEvent.OPEN_FISH, this.openFish, this);
        EventDispatcher.removeListener(GameEvent.UPDATE_PET_INFO, this.getPetInfo, this);
        EventDispatcher.removeListener(GameEvent.SNAKE_VIEW, this.snakeView, this);
        EventDispatcher.removeListener(GameEvent.PET_PROP, this.getPetProp, this);
        EventDispatcher.removeListener(GameEvent.SUCCESS_RECHARGE, this.rechargeSuccess, this);
        EventDispatcher.removeListener(GameEvent.OPEN_FRUIT_RECORD, this.openFruitRecord, this);
    }
    protected initFinish(): void {
        this.playStandAin();
        console.log(cc.audioEngine.isMusicPlaying());
        if (Config.gameFlag) {
            //@ts-ignore
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: '来乐讯梦幻乐园升级萌宠兑话费！',
                    // path: '/pages/share/share?id=123',
                    imageUrl: "https://mmocgame.qpic.cn/wechatgame/tYZ4qVIYZsGRnFEQ0yZ3vfjwicIY5h7C65OMwsurCokuriaQagkWZG9r90UJmFYMtx/0",
                    success: (res) => {
                        console.log("转发成功", res);
                    },
                    fail: (res) => {
                        console.log("转发失败", res);
                    }
                }
            })
            // @ts-ignore
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // @ts-ignore
            wx.onShow((res) => {
                console.log('onshow:', res);
                this.getUserInfo()
                this.getPetProp()
                EventDispatcher.dispatch(GameEvent.UPDATE_RECHARGE_LIST)
            })
        }
    }

    private initGame() {
        console.log('initGame');
        this.getUserInfo();
        this.getPetInfo()
        this.getNotice()
        // this.userHistoryAll();
        this.getLevelList()
        this.getPetProp()
        this.getUserBag()
        this.farmTimer()
        this.getTalkList()
        // this.tipViewInfo() 
    }
    private isPackUp: boolean = false
    /* 收起 */
    private packUpFun() {
        if (this.isPackUp) {
            this.isPackUp = false
            RES.setSpriteFrame(this.packUp.getComponent(cc.Sprite), 'mainScene/bt_fold')
            this.shareBtn.active = this.convertBtn.active = this.strategyBtn.active = this.daySign.active = this.fruitIcon.active = this.fruitAll.parent.active = true
            this.farmBtn.active = true
        } else {
            this.isPackUp = true
            RES.setSpriteFrame(this.packUp.getComponent(cc.Sprite), 'mainScene/bt_unfold')
            this.shareBtn.active = this.fruitAll.parent.active = this.fruitIcon.active = this.daySign.active = this.strategyBtn.active = this.convertBtn.active = false
            this.farmBtn.active = false
        }
    }
    private talkList0
    private talkList1
    private talkList2
    private getTalkList() {
        App.PetProxy.PetTalk({
            onSuccess: (res) => {

                this.talkList0 = res.Talks.filter(item => item.type === 0)
                this.talkList1 = res.Talks.filter(item => item.type === 1)
                this.talkList2 = res.Talks.filter(item => item.type === 2)
                console.log(this.talkList2);
            }
            , data: { type: -1 }
        })
    }
    private getNotice() {
        App.ConfigProxy.configNotice({
            onSuccess: (res) => {
                this.noticeLabel.getComponent(cc.Label).string = res.Notice
                // const width = this.noticeLabel.width
                // const initX = this.noticeLabel.x
                // console.log(width, initX);
                // let action = cc.sequence(cc.moveBy(1, -50, 0), cc.callFunc(() => {
                //     if (this.noticeLabel.x < initX - width) {
                //         this.noticeLabel.x = 225
                //     }
                // })).repeatForever()
                // this.noticeLabel.runAction(action)
            }
        })
    }
    /* 种植记录 */
    private openFruitRecord() {
        let that = this
        SilentLoader.canLoad = false;
        cc.director.loadScene("farmScene", function (e) {
            console.log("e", e)
            App.ui.open(UIConstant.FruitRecordView, null, { rid: that.farmRid })
            SilentLoader.canLoad = true;
        });
    }
    /* 背包 */
    private openBag() {
        App.ui.open(UIConstant.FruitBagView)
    }
    private hideSign() {
        this.sign.active = false
    }

    private closeLevelList() {
        this.levelList.active = false
        App.ui.open(UIConstant.UserInfoView)
    }
    private feededViewClose() {
        this.feededView.active = false
        this.coinT.active = false
        this.giftT.active = false
        this.fishT.active = false
    }
    /* 抽奖 */
    private openDraw() {
        App.ui.open(UIConstant.DrawView)
    }
    /* 设置 */
    private openSetting() {
        App.ui.open(UIConstant.SettingView)
    }
    /* VIP */
    private openVIP() {
        App.ui.open(UIConstant.VipPopupView)
    }
    /* 福袋 */
    private openTreasure() {
        App.ui.open(UIConstant.UpgradeView)
    }
    /* 鱼干背包 */
    private openFishBag() {
        App.ui.open(UIConstant.FishBagView)
    }
    /* 等级表 */
    private openLevelList() {
        this.levelList.active = true
    }
    //签到
    private openSign() {
        App.ui.open(UIConstant.SignView)
    }
    private fishPoint: {}
    private closeFish() {
        this.fishView.active = false
        if (!this.fishPoint) App.ui.open(UIConstant.UserInfoView)
        else App.ui.open(UIConstant.FishBagView)
    }
    private openFish(data) {
        console.log(data);
        this.fishPoint = data ? data : null
        this.fishView.active = true
    }
    /* 新人礼包 */
    private openNewPeople() {
        App.ui.open(UIConstant.NewPeopleView)
    }
    //兑换
    private openConvert() {
        App.ui.open(UIConstant.ConvertView)
    }
    //充值
    private openRecharge() {
        App.ui.open(UIConstant.RechargeView)
    }
    //攻略
    private openStrategy() {
        App.ui.open(UIConstant.StrategyView)
    }
    //礼券记录
    private openGiftRecord() {
        App.ui.open(UIConstant.ConvertView)
    }
    // 打开个人信息 
    private openUserInfoView() {
        App.ui.open(UIConstant.UserInfoView)
    }
    /**
     * 金币记录 */
    private openCoinRecord() {
        App.ui.open(UIConstant.CoinRecordView)
    }
    /**
     * 获取用户消息
     */
    private getUserInfo() {
        App.UserProxy.getUserInfo({
            onSuccess: this.getUserInfoMsg,
            thisObj: this
        })
    }

    /**
     * 获取宠物消息
     * 
     */
    private getPetInfo() {
        let onSuccess = (data) => {
            console.log("宠物消息", data);
            // this.sign.active = false
            // this.daySign.active = data.actDaySign.status ? false : true
            this.signInfo = data.actDaySign
            if (App.gdata.newPeople) {
                console.log('newman');
                App.ui.open(UIConstant.NewPeopleView)
            } else {
                console.log('oldman');
            }
            if (!data.actDaySign.status) { //未签到
                RES.setSpriteFrame(this.daySign.getComponent(cc.Sprite), 'mainScene/signin_today')
            } else {
                RES.setSpriteFrame(this.daySign.getComponent(cc.Sprite), 'mainScene/sign_tomorrow')
            }
            let oneItem
            if (data.actDaySign.day >= data.actDaySign.list[data.actDaySign.list.length - 1].day) {
                return oneItem = data.actDaySign.list[data.actDaySign.list.length - 1]
            } else {
                oneItem = data.actDaySign.list.find(item => {
                    if (!data.actDaySign.status)
                        return item.day === data.actDaySign.day
                    else
                        return item.day === data.actDaySign.day + 1
                })
            }
            this.daySign.getChildByName('label').getComponent(cc.Label).string = 'x' + oneItem.nums
            RES.setSpriteFrame(this.daySign.getChildByName('imgFruit').getComponent(cc.Sprite), `common/fruit/img_fruit_${oneItem.pid}`)
            // if (data.rewardPackage) {
            //     this.treasureNum.getComponent(cc.Label).string = data.rewardPackage
            //     this.treasureNum.parent.active = true
            // } else {
            //     this.treasureNum.parent.active = false
            // }
            // this.scrollContent.removeAllChildren();
            let length = data.clamelogs.length > 10 ? 10 : data.clamelogs.length;
            for (let i = 0; i < length; i++) {
                let nData = data.clamelogs[i];
                let node = cc.instantiate(this.scrollItem);
                let head = node.getChildByName("mask").getChildByName("head").getComponent(cc.Sprite);
                node.parent = this.scrollContent;
                node.getChildByName("msg").getComponent(cc.RichText).string = `${nData.content}`
                RES.loadHead(nData.headimg, head);
                node.active = true;

                if (i == length - 1) {
                    let self = this;
                    let j = 1;
                    let action = cc.sequence(cc.moveBy(1, 0, j * 56), cc.delayTime(2), cc.callFunc(function () {
                        // console.log("j",j)
                        if (j == length - 1) {
                            j = 1;
                            self.scrollContent.parent.setPosition(0, 28);
                        } else {
                            j++;
                        }
                    }.bind(this))).repeatForever();
                    this.scrollContent.parent.runAction(action);
                    console.log("开始滚动")
                }
            }
        }
        App.PetProxy.petInfo({
            onSuccess,
            thisObj: this
        })
    }
    /* 获取道具 */
    private getPetProp() {
        // App.PetPropProxy.PropInfo({
        //     onSuccess: (res) => {
        //         App.gdata.userInfo.curProps = res?.info?.nums
        //         if (res.info.nums >= 10000) {
        //             this.fishNum.getComponent(cc.Label).string = (res.info.nums / 10000).toFixed(0) + '万'
        //         } else {
        //             this.fishNum.getComponent(cc.Label).string = res.info.nums
        //         }
        //     }, data: { pid: 1 }
        // })
    }
    /**
     * 历史记录
     * 
     */
    private userHistoryAll() {
        App.GameProxy.userHistoryAll({
            onSuccess: this.userHistoryAllMsg,
            thisObj: this
        })
    }
    /**
     *  用户消息返回
     */
    private getUserInfoMsg(data) {
        console.log("用户消息", data);
        EventDispatcher.dispatch(GameEvent.UPDATE_BUYSEED_COIN)
        this.coin.string = UIUtil.toStone(data.coin);
        this.giftCoupon.string = UIUtil.toStone(data.giftcoupon)
        if (data.curProps > 9990000) {
            this.fruitAll.getComponent(cc.Label).string = `999万+`
        } else {
            let num
            if (data.curProps >= 10000) {
                num = (data.curProps / 10000).toFixed() + '万'
            } else {
                num = data.curProps
            }
            this.fruitAll.getComponent(cc.Label).string = `${num}`
        }
        this.catLevel.string = this.catLevel1.getComponent(cc.Label).string = this.catLv.getComponent(cc.Label).string = data.petInfo.level;
        this.lvText.getComponent(cc.Label).string = `萌宠喵喵 Lv${data.petInfo.level}`
        RES.setSpriteFrame(this.catVip.getComponent(cc.Sprite), `/common/vip/v${data.vipLevelInfo.level}@2x`)
        this.vipLv.getComponent(cc.Label).string = data.vipLevelInfo.level
        RES.loadHead(data.userinfo.headimg, this.userHead);
        if (data.nextLevel) {
            this.levelHint.active = data.curProps >= data.nextLevel.props ? true : false
            this.catProgress.getComponent(cc.ProgressBar).progress = data.curProps < data.nextLevel.props ? data.curProps / data.nextLevel.props : 1
        } else {
            this.levelHint.active = false
            this.catProgress.getComponent(cc.ProgressBar).progress = 1
        }
        if (data.petInfo.level < 5) {
            this.packUp.active = false
            this.farmBtn.active = false
            this.shareBtn.active = this.fruitAll.parent.active = this.fruitIcon.active = this.daySign.active = this.strategyBtn.active = this.convertBtn.active = false
        } else {
            this.packUp.active = true
            if (!this.isPackUp) {
                this.farmBtn.active = true
                this.shareBtn.active = this.fruitAll.parent.active = this.fruitIcon.active = this.daySign.active = this.strategyBtn.active = this.convertBtn.active = true
            }
        }
        if (data.petInfo.level <= 10) {
            const youngCatSpine = RES.getRes('youngCatSpine')
            const smallHeart = RES.getRes('smallHeart')
            this.heartSpine.getComponent(sp.Skeleton).skeletonData = smallHeart
            this.cat.getComponent(sp.Skeleton).skeletonData = youngCatSpine
            this.catLv.y = 88
            // this.lvText.parent.y = -60
        } else if (data.petInfo.level <= 20) {
            const normalCatSpine = RES.getRes('normalCatSpine')
            const middleHeart = RES.getRes('middleHeart')
            this.heartSpine.getComponent(sp.Skeleton).skeletonData = middleHeart
            this.cat.getComponent(sp.Skeleton).skeletonData = normalCatSpine
            this.catLv.y = 82
            // this.lvText.parent.y = -60
        } else {
            const bigHeart = RES.getRes('bigHeart')
            this.heartSpine.getComponent(sp.Skeleton).skeletonData = bigHeart
            const bigCatSpine = RES.getRes('bigCatSpine')
            this.cat.getComponent(sp.Skeleton).skeletonData = bigCatSpine
            this.catLv.y = 98
            // this.lvText.parent.y = -60
        }
        this.cat.getComponent(sp.Skeleton).animation = 'standby'
        this.cat.getComponent(sp.Skeleton).loop = true
    }
    private signInfo//签到
    /* 获取每日签到 */
    private getDaySign() {
        console.log('打开签到');
        App.ui.open(UIConstant.TodaySignView, null, this.signInfo)
    }


    private getLevelList() {
        App.PetProxy.getPetLevels({
            onSuccess: (res) => {
                res.levels.forEach((item) => {
                    let itemCopy = cc.instantiate(this.levelItem)
                    let level = itemCopy.getChildByName('level')
                    let fish = itemCopy.getChildByName('fish')
                    let treasure = itemCopy.getChildByName('treasure')
                    level.getComponent(cc.Label).string = item.level
                    fish.getComponent(cc.Label).string = `小鱼干X${item.props}`
                    treasure.getComponent(cc.Label).string = `最高${UIUtil.toStone(item.maxReward)}礼券`
                    itemCopy.active = true
                    this.levelContent.addChild(itemCopy)
                })
            }
        })
    }

    private playStandAin() {
        this.cat.getComponent(sp.Skeleton).setAnimation(0, "standby", true);
    }




    private BtnEvent(_target: cc.Button) {
        // App.gdata.playBtnClickMusic(); 
        switch (_target.node.uuid) {
            case this.closeTipViewBtn.uuid:
                this.tipView.active = false;
                break;
            case this.keyFeedBtn.uuid:

                // this.feedBackInfo = {odd:10}
                // this.eatAction();
                // return;
                this.keyFeedMsg();
                break;
            case this.farmBtn.uuid:
                this.enterFarmScene();
                break;
            default:
                break;
        }
    }

    /**
     * 
     * @param node 
     * @param pos 
     * @param callback 
     */
    private moveAction(node: cc.Node, startPos: cc.Vec2, endPos: cc.Vec2, callback?) {
        let bezier: cc.Vec2[] = [
            cc.v2(startPos.x, startPos.y),
            cc.v2((endPos.x + startPos.x) / 2 - 300, endPos.y + 300),
            cc.v2(endPos.x, endPos.y)
        ];
        let bezierAction = cc.bezierTo(1, bezier);
        let action = cc.sequence(cc.spawn(
            bezierAction,
            cc.scaleTo(1, 0.5)
        ), cc.callFunc(function () {
            node.destroy();
            node.removeFromParent();
            callback && callback.apply(this);
        }.bind(this))).easing(cc.easeIn(2));

        node.runAction(action);
    }

    /**
     * 喂养历史返回
     */
    private userHistoryAllMsg(data) {
        console.log("data", data);
        this.node.getChildByName("tip").active = data.total == 0 ? true : false;
        this.foodScroll.removeAllChildren();
        if (data.List.length === 0) {
            this.keyFeedBtn.children[0].active = false
            RES.setSpriteFrame(this.keyFeedBtn.getComponent(cc.Sprite), 'mainScene/bt_unfeed')
        } else {
            this.keyFeedBtn.children[0].active = true
            RES.setSpriteFrame(this.keyFeedBtn.getComponent(cc.Sprite), 'mainScene/bt_feed')
        }
        for (let i = 0; i < data.List.length; i++) {
            let nData = data.List[i];
            let node = cc.instantiate(this.foodItem);
            let icon = node.getChildByName("icon").getComponent(cc.Sprite);
            let count = node.getChildByName("count").getComponent(cc.Label);
            RES.setSpriteFrame(icon, `common/fruit/img_fruit_${nData.Nums}`);
            node.parent = this.foodScroll;
            count.string = `${UIUtil.toStone(nData.Outstone)}`;
            node["data"] = nData;
            node.off("click", this.feedInfo, this);
            node.on("click", this.feedInfo, this);
            node.active = true;
        }
    }
    /* 背包 */
    private getUserBag() {
        let onSuccess = (res) => {
            console.log(res);
            this.foodScroll.removeAllChildren();
            res.list.forEach(item => {
                let itemCopy = cc.instantiate(this.foodItem)
                let icon = itemCopy.getChildByName("icon").getComponent(cc.Sprite);
                let count = itemCopy.getChildByName("count").getComponent(cc.Label);
                RES.setSpriteFrame(icon, `common/fruit/img_fruit_${item.biid}`);
                count.string = `${UIUtil.toStone(item.nums)}`;
                this.foodScroll.addChild(itemCopy)
                itemCopy.off("click", this.openBag, this);
                itemCopy.on("click", this.openBag, this);
                itemCopy.active = true;
            })
        }
        App.UserBagProxy.BagItemList({ onSuccess })
    }
    /**
     * 喂养动画
     */
    private feedInfo(evt: cc.Button) {
        let node = evt.target || evt.node;
        let nData = node["data"];
        console.log("data", nData);
        if (!nData) return;
        if (!this.eatActionFlag) return;
        App.GameProxy.feed({
            onSuccess: function (data) {
                console.log("喂养返回", data);
                if (data.Props) {
                    this.getPetProp()
                }
                App.audio.playEffectByName('feed_cat')
                this.eatActionFlag = false;
                let actionNode = cc.instantiate(this.actionIcon);
                let icon = actionNode.getComponent(cc.Sprite);
                let pos = node.getChildByName("icon").convertToWorldSpaceAR(cc.Vec2.ZERO);
                let posEnd = this.node.getChildByName("img_catbowl").convertToWorldSpaceAR(cc.Vec2.ZERO);
                actionNode.parent = this.actionView;
                RES.setSpriteFrame(icon, `common/fruit/img_fruit_${nData.Nums}`);
                actionNode.setPosition(pos);
                this.feedBackInfo = data;
                actionNode.active = true;
                this.moveAction(actionNode, pos, posEnd, this.eatAction);
                this.feedTalk()
                // this.userHistoryAll();
                this.getUserBag()
            },
            thisObj: this,
            termid: nData.Termid
        })
    }

    private eatAction() {
        /* 吃完后动画 */
        let callBack = function () {
            this.node.getChildByName("img_catbowl").getChildByName("cat_food").active = false;
            if (this.feedBackInfo.Odds > 1) {
                this.coinEf.node.active = true;
                this.coinEf.setAnimation(0, "coin_ef", false);
                this.cat.getComponent(sp.Skeleton).setAnimation(0, "bomb", false);
                this.cat.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                    let name = event.data.name;
                    if (name == "ending") {
                        this.playStandAin();
                        this.coinEf.node.active = false;
                    }
                    console.log("name", name);
                });
                // 暴击
                this.critFun();
                // this.eatEndAction(10);
            } else {
                this.playStandAin();
                // this.eatEndAction(2);
            }
            this.getUserInfo();
            this.tipViewInfo();
            this.addGoldFun(this.feedBackInfo.Coin, this.gold)
            this.addGoldFun(this.feedBackInfo.GiftCoupon, this.gift)
            this.eatActionFlag = true;
        }
        // App.audio.playEffectByName('feed_cat')
        this.node.getChildByName("img_catbowl").getChildByName("cat_food").active = true;
        this.car.removeAllChildren();
        this.cat.getComponent(sp.Skeleton).setAnimation(0, "eat", false);
        this.cat.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
            let name = event.data.name;
            if (name == "ending") {
                callBack.apply(this);
            }
            console.log("name", name);
        });
    }

    private critFun() {
        let startPos = this.car.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let node = cc.instantiate(this.critInfo);
        node.getChildByName("text").getComponent(cc.Label).string = `X${this.feedBackInfo.Odds}B`;
        node.parent = this.actionView;
        node.active = true;
        node.setPosition(startPos);
        node.opacity = 0;
        node.setPosition(this.node.position);
        let callback = cc.callFunc(function () {
            node.removeFromParent();
            node.destroy();
        })
        node.runAction(cc.sequence(cc.callFunc(function () {
            node.opacity = 255;
        }), cc.scaleTo(0.1, 1.3), cc.delayTime(0.5), callback))

    }

    private eatEndAction(num: number = 2) {
        let endPos0 = this.node.getChildByName("gold").convertToWorldSpaceAR(cc.Vec2.ZERO);
        let endPos1 = this.node.getChildByName("gift").convertToWorldSpaceAR(cc.Vec2.ZERO);
        if (Config.gameFlag) {
            // @ts-ignore
            wx.vibrateShort()
        }

        let arr = [
            {
                url: "common/mainScene/t0",
                pos: cc.v2(208, 454),
                endPos: endPos0
            },
            {
                url: "common/mainScene/t1",
                pos: cc.v2(531, 458),
                endPos: endPos1
            },
            {
                url: "common/mainScene/t1",
                pos: cc.v2(379, 453),
                endPos: endPos1
            },
            {
                url: "common/mainScene/t1",
                pos: cc.v2(171, 359),
                endPos: endPos1
            },
            {
                url: "common/mainScene/t1",
                pos: cc.v2(340, 354),
                endPos: endPos1
            },
            {
                url: "common/mainScene/t0",
                pos: cc.v2(458, 369),
                endPos: endPos0
            },
            {
                url: "common/mainScene/t0",
                pos: cc.v2(570, 362),
                endPos: endPos0
            },
            {
                url: "common/mainScene/t0",
                pos: cc.v2(226, 272),
                endPos: endPos0
            },
            {
                url: "common/mainScene/t0",
                pos: cc.v2(370, 280),
                endPos: endPos0
            },
            {
                url: "common/mainScene/t1",
                pos: cc.v2(488, 273),
                endPos: endPos1
            },
        ]
        let startPos = this.car.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let callBack = function () {
            this.getUserInfo();
            this.tipViewInfo();
            this.addGoldFun(this.feedBackInfo.Coin, this.gold)
            this.addGoldFun(this.feedBackInfo.GiftCoupon, this.gift)
        }
        for (let i = 0; i < num; i++) {
            let node = cc.instantiate(this.actionIcon);
            let icon = node.getComponent(cc.Sprite);
            RES.setSpriteFrame(icon, arr[i].url);
            node.opacity = 0;
            node.scale = 1.8;
            node.parent = this.actionView;
            node.active = true;
            node.setPosition(startPos);
            node.runAction(cc.sequence(
                cc.spawn(cc.fadeTo(0.5, 255), cc.moveTo(0.5, arr[i].pos)),
                cc.delayTime(i * 0.1),
                cc.callFunc(function () {
                    if (i == num - 1) {
                        this.moveAction(node, startPos, arr[i].endPos, callBack);
                    } else {
                        this.moveAction(node, startPos, arr[i].endPos);
                    }

                }.bind(this))
            ))
        }
    }

    private tipViewInfo() {
        // this.tipView.getChildByName('fish').active = true
        // let text: cc.RichText = this.tipView.getChildByName("tip").getComponent(cc.RichText);
        // let fish: cc.RichText = this.tipView.getChildByName('fish').getComponent(cc.RichText);
        // this.tipView.active = true;
        // text.string = `招财猫吃饱喝足后伸了个懒腰 \n 掉落<color=#FF7C55>${this.feedBackInfo.Coin}</color>金币和<color=#FF7C55>${this.feedBackInfo.GiftCoupon}</color>礼券`;
        // fish.string = `（赠送<color=#FF7C55>${this.feedBackInfo.Props}</color>小鱼干）`
        // if (this.feedBackInfo.Props <= 0) {
        //     this.tipView.getChildByName('fish').active = false
        // }
        const endPosObj = { conT: cc.v2(-240, -150), giftT: cc.v2(0, -165), fishT: cc.v2(240, -150) }
        this.feededView.active = true
        console.log(this.feededView, this.feedBackInfo);

        const spine = this.feededView.getChildByName('spine')
        const coin = cc.instantiate(this.feededView.getChildByName('coin'))
        const gift = cc.instantiate(this.feededView.getChildByName('gift'))
        const fish = cc.instantiate(this.feededView.getChildByName('fish'))
        coin.active = true
        gift.active = true
        fish.active = true
        this.feededView.addChild(coin)
        this.feededView.addChild(gift)
        this.feededView.addChild(fish)
        const draw = this.feededView.getChildByName('draw')
        draw.getComponent(cc.RichText).string = `招财猫吃饱喝足后伸了个懒腰，掉落<color=#F6D027>${UIUtil.toStone(this.feedBackInfo.Coin)}金币</color>、<color=#F6D027>${UIUtil.toStone(this.feedBackInfo.GiftCoupon)}礼券</color>和<color=#F6D027>${this.feedBackInfo.Props}</color>小鱼干`
        spine.getComponent(sp.Skeleton).setAnimation(0, 'feed', false)
        spine.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
            if (event.data.name === 'explode') {
                this.coinT.getComponent(cc.RichText).string = `金币 X <color=#F6D027>${this.feedBackInfo.Coin}</color>`
                this.giftT.getComponent(cc.RichText).string = `礼券 X <color=#F6D027>${this.feedBackInfo.GiftCoupon}</color>`
                this.fishT.getComponent(cc.RichText).string = `小鱼干 X <color=#F6D027>${this.feedBackInfo.Props}</color>`
                coin.runAction(cc.sequence(cc.moveTo(0.5, endPosObj.conT), cc.callFunc(() => this.coinT.active = true)))
                gift.runAction(cc.sequence(cc.moveTo(0.5, endPosObj.giftT), cc.callFunc(() => this.giftT.active = true)))
                fish.runAction(cc.sequence(cc.moveTo(0.5, endPosObj.fishT), cc.callFunc(() => this.fishT.active = true)))
                console.log('explode', this.feedBackInfo);
            }
            if (event.data.name === 'ending') {
                spine.getComponent(sp.Skeleton).setAnimation(0, 'success', false)
            }
            console.log(event.data);
        })
    }
    private rechargeSuccess(data) {
        this.tipView.active = true;
        this.tipView.getChildByName('fish').active = false
        const title = this.tipView.getChildByName("title")
        title.getComponent(cc.Label).string = '购买成功'
        const text: cc.RichText = this.tipView.getChildByName("tip").getComponent(cc.RichText);
        text.string = `购买成功!赠送<color=#FF7C55>${UIUtil.toStone(data.coin)}</color>金币\nVIP经验+${data.vipCredits}`;
    }
    private keyFeedMsg() {
        if (!this.eatActionFlag) return;
        App.GameProxy.feedAll({
            onSuccess: (data) => {
                console.log("一键喂养返回消息", data);
                this.feedBackInfo = data;
                this.eatAction();
                this.feedTalk()
                this.getUserBag()
                if (data.Props) {
                    this.getPetProp()
                }
            },
            thisObj: this
        })
    }

    private enterFarmScene() {
        // App.ui.open(UIConstant.ToastTip)
        // cc.director.preloadScene("farmScene", null, (error) => {
        SilentLoader.canLoad = false;
        cc.director.loadScene("farmScene", function (e) {
            console.log("e", e)
            SilentLoader.canLoad = true;
        });
        // if (error) {
        //     console.log(error);
        // }
        // })
        // SilentLoader.canLoad = false;
        // cc.director.loadScene("loadingScene", function (e) {
        //     console.log("e", e)
        //     SilentLoader.canLoad = true;
        // });
    }

    private shareMsg() {


        // this.addGoldFun(10,this.giftCoupon.node)
        // return;
        // @ts-ignore
        wx.shareAppMessage({
            title: "与萌宠一起享受轻松悠闲的田园时光，还可获赠话费京东卡!",
            imageUrl: "https://h5.lexun.com/games/miniprogram/cocos/img/share.png",
        })
    }

    /**
     *金币动画
     */
    private addGoldFun(num: number, parent: cc.Node) {
        let node = cc.instantiate(this.addGoldText);
        node.getComponent(cc.Label).string = "+" + num;
        node.parent = this.node;
        node.active = true;
        node.opacity = 0;
        node.setPosition(parent.position);
        let callback = cc.callFunc(function () {
            node.removeFromParent();
            node.destroy();
        })
        node.runAction(cc.sequence(cc.callFunc(function () {
            node.opacity = 255;
        }), cc.spawn(
            cc.moveBy(1, 0, 100),
            cc.fadeOut(1)
        ), callback))
    }


    private clickBowl() {
        let carText = ['主人，我饿了喵!点击背包的水果喂我吧~', '主人，去果园种植，成熟后就可以喂给我啦!', '主人,听说UPS快递可以委托种植所有水果哦~',
            '主人，给我升级能获得很多礼券哦~', '礼券商城上新了！快去看看吧！',
            '野猪真讨厌，每次都会把水果踩烂！', '主人只要喂喂我，就有很多礼券送哦~', '主人，点击金币和礼券可以查看记录哦~']
        let randomNumber = Math.floor(Math.random() * this.talkList2.length)
        this.carTalk.getComponent(cc.Label).string = this.talkList2[randomNumber].content
    }
    private anni: Boolean = true //点击宠物防抖
    private heartSpine: cc.Node //爱心道具动画
    /* 宠物互动 */
    private clickCar() {
        // if (!this.anni) return
        // this.anni = false
        let carText = ['主人又来陪我玩了，好开心!', '新的一天，更加爱主人!', '看到主人，我现在浑身充满力量! ', '123,我们都是木头人,不许说话不许动。',
            '我最爱主人了! ', 'HI,主人最近过的怎么样?', '希望我能给主人带来好运', '主人每天都要开开心心呀!', '劳动最光荣，劳动最伟大!']
        let randomNumber = Math.floor(Math.random() * this.talkList1.length)
        this.carTalk.getComponent(cc.Label).string = this.talkList1[randomNumber].content
        App.ui.open(UIConstant.UserInfoView)
        return
        App.PetProxy.PetTease({
            onSuccess: (res) => {
                App.audio.playEffectByName('interact')
                this.cat.getComponent(sp.Skeleton).setAnimation(0, 'smile', false)
                this.heartSpine.active = true
                this.heartSpine.getComponent(sp.Skeleton).setAnimation(0, 'heart_fish', false)
                this.heartSpine.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                    if (event.data.name === 'ending') {
                        this.heartSpine.active = false
                        if (res.props) {
                            this.addGoldFun(res.props, this.fishBag)
                            this.getPetProp()
                        }
                        console.log(event.data.name);
                    }

                })
                this.cat.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                    if (event.data.name === 'ending') {
                        this.playStandAin()
                        this.scheduleOnce(() => {
                            this.anni = true
                        }, 3)
                        console.log(event.data.name);
                    }
                })
                console.log(res);
            }
        })
    }
    private feedTalk() {
        let carText = ['谢谢主人!让我给你喵一个吧?喵喵喵~', '我发誓只吃了八成饱，不信你摸摸我肚子。', '从来没有吃过这么多，主人对我真好~', '吃饱了，精神百倍。',
            '哇，太美味了，你对我真好!!', '吃饱了才有力气减肥，主人你说对不对']
        let randomNumber = Math.floor(Math.random() * this.talkList0.length)
        this.carTalk.getComponent(cc.Label).string = this.talkList0[randomNumber].content
    }
    private farmRid
    /* 农场倒计时 */
    private farmTimer() {
        this.unschedule(this.farmCountDown)
        App.GameProxy.farmGameInfo({
            onSuccess: (res) => {
                let second = res.Gameinfo.Countdown
                this.farmRid = res.Gameinfo.Period
                console.log(this.farmRid);

                if (second > 60) {
                    this.farmTime.getComponent(cc.Label).string = Math.floor(second / 60) + '分' + second % 60 + '秒' + '成熟'
                } else {
                    this.farmTime.getComponent(cc.Label).string = second + '秒' + '成熟'
                }
                this.farmCountDown = () => {
                    if (second === 0) {
                        this.unschedule(this.farmCountDown)
                        this.farmTimer()
                        return
                    }
                    second--
                    if (second > 60) {
                        this.farmTime.getComponent(cc.Label).string = Math.floor(second / 60) + '分' + second % 60 + '秒' + '成熟'
                    } else {
                        this.farmTime.getComponent(cc.Label).string = second + '秒' + '成熟'
                    }
                }
                this.schedule(this.farmCountDown, 1)
            }
        })
    }
    //抖动窗口
    snakeView() {
        this.node.getChildByName('mainCamera').runAction(cc.repeat(cc.sequence(cc.moveBy(0.1, cc.v2(0, 20)),
            cc.moveBy(0.1, cc.v2(0, -40)), cc.moveBy(0.1, cc.v2(0, 30)), cc.moveBy(0.1, cc.v2(0, -10))), 1))
    }
}