// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import BaseScene from "./BaseScene";
import RES from "../res/RES";
import App from "../manager/App";
import UIConstant from "../constant/UIConstant";
import EventDispatcher from "../event/EventDispatcher";
import GameEvent from "../event/GameEvent";
import AnimeManager from "../manager/AnimeManager";
import SilentLoader from "../res/SilentLoader";
import Config from "../config/config";
import GameAudio from "../audioManger/GameAudio";
import UIUtil from "../util/UIUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class farmScene extends BaseScene {
    private seedNums: cc.Label;
    private attackHint: cc.Node;
    private progressBar: cc.ProgressBar;
    private timer;
    public plantState: number = 1;
    private blockList = {};
    private plantedFruit: Array<Object> = [];
    private orchardNumber: cc.RichText;
    private btnOptions: cc.Node = null
    private buySeedBtn: cc.Node = null
    private pigAttackBtn: cc.Node = null
    private fruitRecordBtn: cc.Node = null
    private fruitBagBtn: cc.Node = null
    private userVipBtn: cc.Node
    private userMaskBtn: cc.Node
    private giftBtn: cc.Node
    private goldBtn: cc.Node
    private rechargeBtn: cc.Node
    private buyBulldeBtn: cc.Node;
    private pigSpine: sp.Skeleton;
    private farmerSpine: sp.Skeleton;
    private carBtn: cc.Node;
    private blockInfo: cc.Node;
    private smokeList: cc.Node;
    private imgPlate: cc.Node;
    private fruitAwards: cc.Node
    private scrollContent: cc.Node
    private scrollItem: cc.Node
    private gameRid;
    private nextRid;
    private fruitRankBtn: cc.Node
    private resultView: cc.Node
    private resRid: cc.Node
    private resName: cc.Node
    private resAward: cc.Node
    private resMask: cc.Node
    private resResultBig: cc.Node
    private resResultSmall: cc.Node
    private resAwardNum: cc.Node
    private loseView: cc.Node
    private loseRid: cc.Node
    private loseName: cc.Node
    private loseMask: cc.Node
    private loseResultBig: cc.Node
    private fruitAll: cc.Node
    private vipLv: cc.Node
    private tipView: cc.Node
    private closeTipViewBtn: cc.Node

    protected validateUI(): void {
        this.tipView = this.node.getChildByName("tipView");
        this.closeTipViewBtn = this.tipView.getChildByName("bt_sure");
        this.fruitAll = this.node.getChildByName('fruitAll').getChildByName('label')
        this.resultView = this.node.getChildByName('resultView')
        this.resRid = this.resultView.getChildByName('num')
        this.resName = this.resultView.getChildByName('name')
        this.resAward = this.resultView.getChildByName('award')
        this.resMask = this.resultView.getChildByName('mask')
        this.resAwardNum = this.resultView.getChildByName('awardNum')
        this.resResultBig = this.resultView.getChildByName('imgBig')
        this.resResultSmall = this.resultView.getChildByName('imgSmall')

        this.loseView = this.node.getChildByName('loseView')
        this.loseRid = this.loseView.getChildByName('num')
        this.loseName = this.loseView.getChildByName('name')
        this.loseMask = this.loseView.getChildByName('mask')
        this.loseResultBig = this.loseView.getChildByName('imgBig')

        this.scrollItem = this.node.getChildByName('scrollItem')
        this.scrollContent = this.node.getChildByName('planteInfo').getChildByName('mask').getChildByName('content').getChildByName('content')
        this.userVipBtn = this.node.getChildByName('user')
        this.userMaskBtn = this.node.getChildByName('user').getChildByName('mask')
        this.giftBtn = this.node.getChildByName('gift')
        this.goldBtn = this.node.getChildByName('gold')
        this.rechargeBtn = this.node.getChildByName('icon_add')
        this.fruitRankBtn = this.node.getChildByName('fruitRankBtn')
        let block = this.node.getChildByName("block");
        block.children.forEach((node: cc.Node, index) => {
            this.blockList[index] = node;
        })
        this.btnOptions = this.node.getChildByName('farmOptions')
        this.buySeedBtn = this.btnOptions.getChildByName('buySeed')
        this.pigAttackBtn = this.btnOptions.getChildByName('pigAttack')
        this.fruitRecordBtn = this.btnOptions.getChildByName('fruitRecord')
        this.fruitBagBtn = this.btnOptions.getChildByName('fruitBag')
        this.seedNums = this.node.getChildByName("seedNums").getComponent(cc.Label);
        this.attackHint = this.node.getChildByName("attackHint");
        this.orchardNumber = this.node.getChildByName("img_plate").getChildByName("preiods").getComponent(cc.RichText);
        this.progressBar = this.node.getChildByName("pigProgress").getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.buyBulldeBtn = this.node.getChildByName("icon_plant");
        this.pigSpine = this.node.getChildByName("pig_01").getComponent(sp.Skeleton);
        this.farmerSpine = this.node.getChildByName("farmer01").getComponent(sp.Skeleton);
        this.carBtn = this.node.getChildByName("car");
        this.blockInfo = this.node.getChildByName("block");
        this.smokeList = this.node.getChildByName("smoke");
        this.imgPlate = this.node.getChildByName('img_plate')
        this.fruitAwards = this.node.getChildByName("acitonView").getChildByName('fruitAwards')
        this.butterflyLeft = this.node.getChildByName('butterflyLeft')
        this.butterflyRight = this.node.getChildByName('butterflyRight')
        this.vipLv = this.node.getChildByName("user").getChildByName("vipLv")

        this.initGame();
    }
    /* ???????????? */
    private closeLose() {
        this.loseView.active = false
    }
    /* ???????????? */
    private openResult() {
        this.resultView.active = true
    }
    /* ???????????? */
    private closeResult() {
        this.resultView.active = false
    }
    //??????
    private openConvert() {
        App.ui.open(UIConstant.ConvertView)
    }
    //??????
    private openRecharge() {
        App.ui.open(UIConstant.RechargeView)
    }
    /* ???????????? */
    private openCoinRecord() {
        App.ui.open(UIConstant.CoinRecordView)
    }
    /* VIP */
    private openVIP() {
        App.ui.open(UIConstant.VipPopupView)
    }
    /* ?????? */
    private openSetting() {
        App.ui.open(UIConstant.SettingView)
    }
    /* ????????? */
    private openRank() {
        App.ui.open(UIConstant.FruitRankView)
    }
    public openSeepShop(event): void {

        if (event.currentTarget === this.buySeedBtn || event.currentTarget === this.buyBulldeBtn || event.currentTarget === this.blockInfo) {
            App.ui.open(UIConstant.SeedShopView)
        } else if (event.currentTarget === this.pigAttackBtn) {
            App.ui.open(UIConstant.PigAttackView)
        } else if (event.currentTarget === this.fruitRecordBtn) {
            App.ui.open(UIConstant.FruitRecordView, null, { rid: this.gamePeriod })
        } else {

            //  //  test
            //     this.getResuleInfoMsg(5);
            //     // this.seedLogsInfo();
            //     return;
            App.ui.open(UIConstant.FruitBagView)
        }
    }
    // LIFE-CYCLE CALLBACKS:
    private initGame() {
        this.getFarmGameInfo();
        this.getMyPlantInfo(1);
        this.seedLogsInfo();
        this.loadUserInfo()
    }
    protected initFinish(): void {
        console.log(cc.audioEngine.isMusicPlaying());
        if (Config.gameFlag) {
            //@ts-ignore
            wx.onShareAppMessage(function () {
                // ?????????????????????????????????
                return {
                    title: '?????????????????????????????????????????????',
                    // path: '/pages/share/share?id=123',
                    imageUrl: "https://mmocgame.qpic.cn/wechatgame/tYZ4qVIYZsGRnFEQ0yZ3vfjwicIY5h7C65OMwsurCokuriaQagkWZG9r90UJmFYMtx/0",
                    success: (res) => {
                        console.log("????????????", res);
                    },
                    fail: (res) => {
                        console.log("????????????", res);
                    }
                }
            })
            // @ts-ignore
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            })
        }
        AnimeManager.playSequenceAnime(this.carBtn, cc.v2(0, 0), "carStantPlist", {
            speed: 0.7,
            wrapMode: cc.WrapMode.Loop
        })
        this.schedule(() => {
            App.audio.playEffectByName('brid')
        }, 20)
    }


    private getFarmGameInfo() {
        App.GameProxy.farmGameInfo({
            onSuccess: this.gameInfo,
            thisObj: this
        })
        clearInterval(this.timer);
        this.timer = setInterval(this.getFarmGameInfo.bind(this), 1000)
    }

    private getMyPlantInfo(state: number) {
        this.plantState = state;
        App.GameProxy.MyPlant({
            onSuccess: this.myPlantInfo,
            thisObj: this
        })
    }

    private seedLogsInfo() {
        App.GameProxy.seedLogs({
            onSuccess: function (data) {
                console.log("data", data);
                this.scrollContent.removeAllChildren();
                this.scrollContent.parent.stopAllActions();
                this.scrollContent.parent.setPosition(cc.v2(0, 28))
                let length = data.length > 10 ? 10 : data.length;
                for (let i = 0; i < length; i++) {
                    let nData = data[i];
                    let node = cc.instantiate(this.scrollItem);
                    let head = node.getChildByName("mask").getChildByName("head").getComponent(cc.Sprite);
                    node.parent = this.scrollContent;
                    node.getChildByName("msg").getComponent(cc.Label).string = `${nData.Nick} ????????????${nData.Name}`;
                    RES.loadHead(nData.HeadImg, head);
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
                        console.log("????????????")
                    }
                }
            },
            thisObj: this
        })
    }

    /**
     * ??????????????????
     */
    private myPlantInfo(data: Array<object>) {
        console.log("??????????????????", data);
        this.plantedFruit = data
        if (data.length == 0) {
            for (let idx in this.blockList) {
                this.blockList[idx].getComponent("Plant").stateInfo(1);
            }
            return
        };
        data.forEach((info: any, index) => {
            switch (this.plantState) {
                case 1:
                    this.blockList[info.Nums].getComponent("Plant").stateInfo(3);
                    break;
                case 2:
                    let state = this.blockList[info.Nums].getComponent("Plant").state;
                    if (state == 1) {
                        this.blockList[info.Nums].getComponent("Plant").stateInfo(2);
                    }
                    break;
            }
        })

    }
    private gamePeriod
    private gameInfo(data) {
        // console.log("????????????", data) 
        if (this.gameRid !== data.Gameinfo.Rid && this.gameRid) {
            this.attackHint.getComponent(cc.RichText).string = `<b><color=#A46F2E><outline color=#FEF9DF width=1>??????!????????????<color=#E01212>0???</color>??????!?????????????????????</outline></c></b>`
            this.nextRid = data.Gameinfo.Rid
            clearInterval(this.timer);
            this.getResuleInfo(this.gameRid)
            return
        }
        let toTime: string = ""
        this.gameRid = data.Gameinfo.Rid
        this.seedNums.string = data.Gameinfo.Instone;
        this.progressBar.progress = data.Gameinfo.Process / 100;
        this.orchardNumber.string = `???${data.Gameinfo.Period}?????????`;
        this.gamePeriod = data.Gameinfo.Period
        if (data.Gameinfo.Countdown > 60) {
            toTime = this.toDouble(Math.floor(data.Gameinfo.Countdown / 60)) + "???" + this.toDouble(data.Gameinfo.Countdown % 60) + "???"
        } else {
            toTime = data.Gameinfo.Countdown + "???";
        }
        this.attackHint.getComponent(cc.RichText).string = `<b><color=#A46F2E><outline color=#FEF9DF width=1>??????!????????????<color=#E01212>${toTime}</color>??????!?????????????????????</outline></c></b>`

        EventDispatcher.dispatch(GameEvent.UPDATE_PROGRESS, data)
    }
    private toDouble(num: number) {
        return num >= 10 ? num : "0" + num;
    }


    /**
     * ????????????
     */

    private getResuleInfo(termid) {
        App.GameProxy.getResult({
            termid: termid,
            onSuccess: this.getResuleInfoMsg,
            thisObj: this
        })
    }

    /**?????????????????? */
    private async getResuleInfoMsg(data) {
        console.log("data", data);
        if (!data) {
            await this.sleep(1000);
            this.getResuleInfo(this.gameRid);
            return;
        } else {
            this.gameRid = this.nextRid
        }

        App.audio.playEffectByName('pig_attack')
        let targetNum = data.Nums;
        let callback = () => {
            this.pigSpine.node.active = true;
            this.pigSpine.setAnimation(0, "move", false);
            this.pigSpine.setEventListener((trackIndex, event) => {
                this.pigSpine.node.active = false;
                let name = event.data.name;
                if (name == "ending") {
                    for (let idx in this.blockList) {
                        let state = this.blockList[idx].getComponent("Plant").state;
                        let id = this.blockList[idx].getComponent("Plant").id;
                        if ((state == 2 || state == 3) && id != targetNum) {
                            this.blockList[idx].getComponent("Plant").stateInfo(4);
                        }
                    }
                    RES.setSpriteFrame(this.resResultBig.getComponent(cc.Sprite), `common/bigFruit/img_fruit_${data.Nums}`)
                    RES.setSpriteFrame(this.resResultSmall.getComponent(cc.Sprite), `common/fruit/img_fruit_${data.Nums}`)
                    RES.setSpriteFrame(this.loseResultBig.getComponent(cc.Sprite), `common/bigFruit/img_fruit_${data.Nums}`)
                    this.scheduleOnce(() => {
                        if (data.Props) {
                            this.resultView.active = true
                            this.resName.getComponent(cc.Label).string = data.Name
                            this.resRid.getComponent(cc.Label).string = data.Period
                            this.resAward.getComponent(cc.Label).string = '+' + UIUtil.toStone(data.Props)
                            // RES.setSpriteFrame(this.resResultBig.getComponent(cc.Sprite), `common/bigFruit/img_fruit_${data.Nums}`)
                            // RES.setSpriteFrame(this.resResultSmall.getComponent(cc.Sprite), `common/fruit/img_fruit_${data.Nums}`)
                            // if (data.Props < 10000) {
                            this.resAwardNum.getComponent(cc.Label).string = `+${data.Props}`
                            // } else if (data.Props < 100000000) {
                            // this.resAwardNum.getComponent(cc.Label).string = `+${data.Props / 10000}W`
                            // } else {
                            //     this.resAwardNum.getComponent(cc.Label).string = `+${data.Props / 100000000}Y`
                            // }
                            this.scheduleOnce(() => { this.resultView.active = false, this.startNewGame() }, 5)
                            console.log(data.Props);

                        } else {
                            // App.ui.open(UIConstant.AllAlertView, null, {
                            //     data: {
                            //         showKey: "boarTip",
                            //         data: data
                            //     }
                            // })
                            this.loseView.active = true
                            this.loseName.getComponent(cc.Label).string = data.Name
                            this.loseRid.getComponent(cc.Label).string = data.Period
                            // RES.setSpriteFrame(this.loseResultBig.getComponent(cc.Sprite), `common/bigFruit/img_fruit_${data.Nums}`)
                            this.scheduleOnce(() => { this.loseView.active = false, this.startNewGame() }, 5)
                        }
                    }, 1)
                }
            });
        }
        let smoke = this.smokeList.children;
        this.smokeList.active = true;
        smoke[0].getComponent(cc.Animation).play("smoke1");
        smoke[1].getComponent(cc.Animation).play("smoke2");
        smoke[1].getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, () => {
            console.log("????????????");
            this.smokeList.active = false;
            callback()
        });
    }
    /**
     * 
     * @param node 
     * @param pos 
     * @param callback 
     */
    private moveAction(node: cc.Node, startPos: cc.Vec2, endPos: cc.Vec2, callback?) {
        // let bezier: cc.Vec2[] = [
        //     cc.v2(startPos.x, startPos.y),
        //     cc.v2((endPos.x + startPos.x) / 2 - 300, endPos.y + 300),
        //     cc.v2(endPos.x, endPos.y)
        // ];
        let bezierAction = cc.moveTo(1, cc.v2(endPos.x, endPos.y));
        let action = cc.sequence(cc.spawn(
            bezierAction,
            cc.scaleTo(0.8, 0.8)
        ), cc.callFunc(() => {
            this.fruitRecordBtn.getComponent(cc.Animation).play('bag')
            this.fruitAwards.active = false
            // callback()
        })).easing(cc.easeInOut(1));

        node.runAction(action);
    }
    /* ???????????? */
    private getBuyIn(data) {
        this.plantedFruit.some((item: any, index) => {
            if (item.Nums === data.Nums) {
                console.log('??????', this.blockList[data.Nums]);
                let fruitPosition = this.blockList[data.Nums].convertToWorldSpaceAR(cc.Vec2.ZERO)
                let bagPosition = this.fruitRecordBtn.convertToWorldSpaceAR(cc.Vec2.ZERO)
                this.fruitAwards.setPosition(fruitPosition)
                RES.setSpriteFrame(this.fruitAwards.getComponent(cc.Sprite), `common/fruit/img_fruit_${data.Nums}`)
                this.fruitAwards.active = true
                this.moveAction(this.fruitAwards, fruitPosition, bagPosition)
                return true
            }
        })
    }
    /**
     * ?????????????????????
     */
    private startNewGame() {
        App.audio.playEffectByName('hoeing')
        this.farmerSpine.node.active = true;
        this.farmerSpine.setAnimation(0, "dig", false);//??????
        this.farmerSpine.setEventListener((trackIndex, event) => {
            this.farmerSpine.node.active = false;
            let name = event.data.name;
            if (name == "ending") {
                for (let idx in this.blockList) {
                    this.blockList[idx].getComponent("Plant").stateInfo(1);
                }
                this.initGame();
            }
        });
    }

    private sleep(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, interval);
        })
    }

    private goMainScene() {
        clearInterval(this.timer);
        // App.ui.open(UIConstant.ToastTip)
        // SilentLoader.canLoad = false;
        // cc.director.preloadScene("mainScene", null, () => {
        cc.director.loadScene("mainScene", function (e) {
            console.log("e", e)
            SilentLoader.canLoad = true;
        });
        // })
    }

    private openAttcak() {
        App.ui.open(UIConstant.PigAttackView)
    }

    private loadUserInfo() {
        let onSuccess = (res) => {
            EventDispatcher.dispatch(GameEvent.UPDATE_BUYSEED_COIN)
            if (res.curProps > 9990000) {
                this.fruitAll.getComponent(cc.Label).string = `999???+`
            } else {
                let num
                if (res.curProps >= 10000) {
                    num = (res.curProps / 10000).toFixed() + '???'
                } else {
                    num = res.curProps
                }
                this.fruitAll.getComponent(cc.Label).string = `${num}`
            }
            this.goldBtn.getChildByName('gold_text').getComponent(cc.Label).string = UIUtil.toStone(res.coin);
            this.giftBtn.getChildByName('gift_text').getComponent(cc.Label).string = UIUtil.toStone(res.giftcoupon)
            RES.setSpriteFrame(this.userVipBtn.getChildByName('v0').getComponent(cc.Sprite), `/common/vip/v${res.vipLevelInfo.level}@2x`)
            this.vipLv.getComponent(cc.Label).string = res.vipLevelInfo.level
            RES.loadHead(res.userinfo.headimg, this.userMaskBtn.getChildByName('head').getComponent(cc.Sprite));
        }
        App.UserProxy.getUserInfo({
            onSuccess
        })
    }

    //?????????
    private butterflyLeft: cc.Node;
    private butterflyRight: cc.Node;
    private butterflyInit() {
        let random1 = Math.floor(Math.random() * 10) + 10
        let random2 = Math.floor(Math.random() * 10) + 20
        this.schedule(() => {
            random1 = Math.floor(Math.random() * 10) + 10
            this.butterflyRight.getComponent(sp.Skeleton).setAnimation(0, 'butterlfy', false)
        }, random1)
        this.schedule(() => {
            random2 = Math.floor(Math.random() * 10) + 20
            this.butterflyLeft.getComponent(sp.Skeleton).setAnimation(0, 'butterlfy', false)
        }, random2)
    }
    private rechargeSuccess(data) {
        this.tipView.active = true;
        this.tipView.getChildByName('fish').active = false
        const title = this.tipView.getChildByName("title")
        title.getComponent(cc.Label).string = '????????????'
        const text: cc.RichText = this.tipView.getChildByName("tip").getComponent(cc.RichText);
        text.string = `????????????!??????<color=#FF7C55>${UIUtil.toStone(data.coin)}</color>??????\nVIP??????+${data.vipCredits}`;
    }
    private closeTipView() {
        this.tipView.active = false
    }
    /**
 * ??????????????????
 */
    protected initEvent(): void {
        this.giftBtn.on('click', this.openConvert, this)
        this.rechargeBtn.on('click', this.openRecharge, this)
        this.goldBtn.on('click', this.openCoinRecord, this)
        this.userVipBtn.on("click", this.openVIP, this)
        this.userMaskBtn.on('click', this.openSetting, this)
        this.resMask.on('click', this.closeResult, this)
        this.loseMask.on('click', this.closeLose, this)
        this.butterflyInit()
        EventDispatcher.addListener(GameEvent.UPDATE_FARM_USERINFO, this.loadUserInfo, this)
        EventDispatcher.addListener(GameEvent.GET_BUY_IN, this.getBuyIn, this);
        EventDispatcher.addListener(GameEvent.PLANT_END, this.getMyPlantInfo, this);
        EventDispatcher.addListener(GameEvent.START_NEW_GAME, this.startNewGame, this);
        EventDispatcher.addListener(GameEvent.GO_TO_MAINSCENE, this.goMainScene, this);
        this.buyBulldeBtn.on(cc.Node.EventType.TOUCH_START, this.openSeepShop, this);
        this.blockInfo.on(cc.Node.EventType.TOUCH_START, this.openSeepShop, this);
        EventDispatcher.addListener(GameEvent.SUCCESS_RECHARGE, this.rechargeSuccess, this);
        this.closeTipViewBtn.on("click", this.closeTipView, this);
        this.carBtn.on("click", this.goMainScene, this);
        this.fruitRankBtn.on("click", this.openRank, this);
        this.imgPlate.on("click", this.openAttcak, this)
        this.btnOptions.children.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, this.openSeepShop, this)
        })
    }
    /** */
    protected removeEvent(): void {
        this.rechargeBtn.off('click', this.openRecharge, this)
        this.giftBtn.off('click', this.openConvert, this)
        this.goldBtn.off('click', this.openCoinRecord, this)
        this.userVipBtn.off("click", this.openVIP, this)
        this.userMaskBtn.off('click', this.openSetting, this)
        this.resMask.off('click', this.closeResult, this)
        this.loseMask.off('click', this.closeLose, this)
        EventDispatcher.removeListener(GameEvent.UPDATE_FARM_USERINFO, this.loadUserInfo, this)
        EventDispatcher.removeListener(GameEvent.GET_BUY_IN, this.getBuyIn, this);
        EventDispatcher.removeListener(GameEvent.PLANT_END, this.getMyPlantInfo, this);
        EventDispatcher.removeListener(GameEvent.START_NEW_GAME, this.startNewGame, this);
        EventDispatcher.removeListener(GameEvent.GO_TO_MAINSCENE, this.goMainScene, this);
        EventDispatcher.removeListener(GameEvent.SUCCESS_RECHARGE, this.rechargeSuccess, this);
        this.buyBulldeBtn.off(cc.Node.EventType.TOUCH_START, this.openSeepShop, this);
        this.blockInfo.off(cc.Node.EventType.TOUCH_START, this.openSeepShop, this);
        this.closeTipViewBtn.on("click", this.closeTipView, this);
        this.carBtn.off("click", this.goMainScene, this);
        this.fruitRankBtn.off("click", this.openRank, this);
        this.imgPlate.off("click", this.openAttcak, this)
        this.btnOptions.children.forEach((item, index) => {
            item.off(cc.Node.EventType.TOUCH_START, this.openSeepShop, this)
        })
        clearInterval(this.timer)
        this.unscheduleAllCallbacks()
    }
}
