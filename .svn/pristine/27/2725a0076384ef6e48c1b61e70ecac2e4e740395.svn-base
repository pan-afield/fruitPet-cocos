import RecycleScroller from "../../components/virtuallist/RecycleScroller";
import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import SilentLoader from "../../res/SilentLoader";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";
import AlertDialog from "../dialog/AlertDialog";
import FruitRecordViewItem from "./FruitRecordViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitRecordView extends BaseUI {
    private gameEnd: Boolean
    private timeX: string
    private viewContent: cc.Node = null
    private closeBtn: cc.Node = null
    protected fruitItem: cc.Node = null
    protected scrollView: cc.Node = null
    protected normalView: cc.Node = null
    protected detailView: cc.Node = null
    private continueBuy: cc.Node
    private title: cc.Node
    private seedsList: cc.Node
    protected goToHomeBtn: cc.Node;
    totalAward: Number = 0;
    protected fruitList = []
    private rid: number
    private toGetCoin: cc.Node
    private viewBg: cc.Node
    private viewPopupBg: cc.Node
    private normoalCirlce: cc.Node
    // private isToday: boolean = false
    private normalTopBg: cc.Node
    private awardsView: cc.Node
    private toFruitBtn: cc.Node
    private fruitMask: cc.Node
    private toast: cc.Node
    toPlantView
    closePlant
    confirmPlant
    maskPlant

    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.awardsView = this.node.getChildByName('awardsView')
        this.toPlantView = this.node.getChildByName('toPlantView')
        this.viewBg = this.viewContent.getChildByName('bg')
        this.viewPopupBg = this.viewContent.getChildByName('popup_bg')
        this.closeBtn = this.viewContent.getChildByName('popup_close')
        this.title = this.viewContent.getChildByName('title')
        this.normalView = this.viewContent.getChildByName('normal')
        this.detailView = this.viewContent.getChildByName('detail')
        this.fruitItem = this.normalView.getChildByName('fruitItem')
        this.normalTopBg = this.normalView.getChildByName('bg_top')
        this.normoalCirlce = this.normalView.getChildByName('isToday').getChildByName('img_bg')
        this.scrollView = this.normalView.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.goToHomeBtn = this.normalView.getChildByName("bt_sure")
        this.continueBuy = this.detailView.getChildByName('total_info').getChildByName('continueBuy')
        this.toGetCoin = this.detailView.getChildByName('attack_info').getChildByName('bt_sale')
        this.toFruitBtn = this.awardsView.getChildByName('toFruit')
        this.fruitMask = this.awardsView.getChildByName('mask')
        this.toast = this.awardsView.getChildByName('bt_toast')
        this.closePlant = this.toPlantView.getChildByName('icon_close')
        this.confirmPlant = this.toPlantView.getChildByName('bt_record')
        this.maskPlant = this.toPlantView.getChildByName('mask')

        this.fruitItem.active = false;
        let ScrollView: RecycleScroller = this.normalView.getChildByName('scrollview').getComponent(RecycleScroller);
        ScrollView.itemTemplate = this.fruitItem;
        ScrollView.setDataRenderer(FruitRecordViewItem);
    }
    protected initEvent(): void {
        this.fruitMask.on('click', this.closeAward, this)
        this.toast.on('click', this.closeAward, this)
        this.closeBtn.on('click', this.clickClose, this)
        this.toFruitBtn.on('click', this.toFruitFun, this)
        this.normoalCirlce.on('click', this.checkToday, this)
        this.goToHomeBtn.on("click", this.goToHomeFun, this);
        this.continueBuy.on("click", this.contiueToBuy, this)
        this.toGetCoin.on("click", this.goToBags, this)
        this.closePlant.on("click", this.closePlantFun, this)
        this.maskPlant.on("click", this.closePlantFun, this)
        this.confirmPlant.on("click", this.toShop, this)
        EventDispatcher.addListener(GameEvent.UPDATE_PROGRESS, this.updateProgress, this)
    }
    protected removeEvent(): void {
        this.unschedule(this.getOtherAwards)
        this.toast.off('click', this.closeAward, this)
        this.fruitMask.off('click', this.closeAward, this)
        this.closeBtn.off('click', this.clickClose, this)
        this.toFruitBtn.off('click', this.toFruitFun, this)
        this.normoalCirlce.off('click', this.checkToday, this)
        this.goToHomeBtn.off("click", this.goToHomeFun, this);
        this.continueBuy.off("click", this.contiueToBuy, this)
        this.closePlant.off("click", this.closePlantFun, this)
        this.maskPlant.off("click", this.closePlantFun, this)
        this.confirmPlant.off("click", this.toShop, this)
        this.scrollView.children.forEach((item) => {
            item.off('click', this.checkDetail, this)
        })
        this.toGetCoin.off("click", this.goToBags, this)
        EventDispatcher.removeListener(GameEvent.UPDATE_PROGRESS, this.updateProgress, this)
    }
    /* 关闭获奖 */
    private closeAward() {
        this.awardsView.active = false
    }
    /* 去种水果 */
    private toFruitFun() {
        this.awardsView.active = false
        this.close()
        App.ui.open(UIConstant.SeedShopView)
    }
    /* 查看今日 */
    private checkToday() {
        if (App.gdata.isToday) {
            App.gdata.isToday = false
            RES.setSpriteFrame(this.normoalCirlce.getComponent(cc.Sprite), 'view/farmRecord/img_bg1')
            this.normoalCirlce.getChildByName('img_cirlce').x = -21
            this.getUserHistory(0)
        } else {
            App.gdata.isToday = true
            RES.setSpriteFrame(this.normoalCirlce.getComponent(cc.Sprite), 'view/farmRecord/img_bg')
            this.normoalCirlce.getChildByName('img_cirlce').x = 21
            this.getUserHistory(1)
        }
        console.log(App.gdata.isToday, this.fruitList);
    }
    private getHistoryItem(item): void {
        if (!this.fruitItem) return
        let fruitItemCopy = cc.instantiate(this.fruitItem)
        fruitItemCopy.active = true
        fruitItemCopy.on('click', this.checkDetail, this)
        // let fruitShadow = fruitItemCopy.getChildByName('fruit_shadow')
        // let fruitHadFeed = fruitItemCopy.getChildByName('img_hadfeed')
        let fruitPic = fruitItemCopy.getChildByName('fruitPic')
        let fruitNumber = fruitItemCopy.getChildByName('number')
        let fruitLife = fruitItemCopy.getChildByName('bg_life').getChildByName('life')
        let fruitPeriod = fruitItemCopy.getChildByName('period')
        let fruitBg = fruitItemCopy.getChildByName('fruit_record_bg')
        let btnCheck = fruitItemCopy.getChildByName('btn_Check')
        let lifeBg = fruitItemCopy.getChildByName('bg_life')
        let fruitRank = fruitItemCopy.getChildByName('fruitRank')
        let time = fruitItemCopy.getChildByName('time')
        let checkText = btnCheck.getChildByName('check')
        let running = fruitItemCopy.getChildByName('running')
        let unplant = fruitItemCopy.getChildByName('unplant')

        // if (item.Status !== 2) { //2已喂养 0 枯苗 -1未成熟 1未喂养
        //     // fruitShadow.active = false
        //     fruitHadFeed.active = false
        // }
        fruitRank.getComponent(cc.Label).string = item.ResultNums
        if (item.Status === 0) {

            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_perish')
            // RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_fail')
            checkText.getComponent(cc.Label).string = '枯苗'
            checkText.color = cc.color(168, 94, 38)
            RES.setSpriteFrame(lifeBg.getComponent(cc.Sprite), 'view/farmRecord/bg_life_perishpng')
            // fruitNumber.getComponent(cc.Label).string = '金币 ---'
            fruitLife.getComponent(cc.RichText).string = `<color=#A85E26>生命${item.ResultOdds}</color>`
            fruitPeriod.getComponent(cc.Label).string = `${item.Period}号果园`
            RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), 'view/farmRecord/status_6')
        } else if (item.Status === -1) {
            time.active = true
            running.active = true
            unplant.active = true
            lifeBg.active = false
            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_green')
            fruitPeriod.getComponent(cc.Label).string = `${item.Period}号果园`
            if (item.Instone) {
                // time.getChildByName('label').getComponent(cc.Label).string = this.timeX
                // RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_underway')
                // fruitRank.getComponent(cc.Label).string = '---'
                // fruitNumber.getComponent(cc.Label).string = '金币 ---'
                unplant.getChildByName('label').getComponent(cc.Label).string = '已种植'
                checkText.getComponent(cc.Label).string = '未成熟'
                RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `common/kindof_one/status_3`)
            } else {
                unplant.getChildByName('label').getComponent(cc.Label).string = '未种植'
                checkText.getComponent(cc.Label).string = '前往种植'
                RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `view/farmRecord/img_palnt`)
            }
        } else {
            RES.setSpriteFrame(lifeBg.getComponent(cc.Sprite), 'view/farmRecord/img_vitality')
            fruitItemCopy.getChildByName('awards_popue').active = true
            fruitItemCopy.getChildByName('number').active = true
            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_red')
            RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_img_sel')
            checkText.getComponent(cc.Label).string = item.ResultName
            running.active = true
            running.getChildByName('label').getComponent(cc.Label).string = '成功'
            RES.setSpriteFrame(running.getComponent(cc.Sprite), 'view/farmRecord/bg_successing')
            let num: number | string
            UIUtil.toStone(item.Outstone) + ''
            if (item.Outstone < 10000) {
                num = item.Outstone
            } else if (item.Outstone < 100000000) {
                num = (item.Outstone / 10000).toFixed() + '万'
            } else {
                num = (item.Outstone / 100000000).toFixed() + '亿'
            }
            fruitNumber.getComponent(cc.Label).string = `+${num}`
            fruitLife.getComponent(cc.RichText).string = `<color=#2A9647>生命${item.ResultOdds}</color>`
            fruitPeriod.getComponent(cc.Label).string = `${item.Period}号果园`
            RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.ResultNums}`)
        }
        if (item.Status === 1) {
            this.totalAward = this.totalAward + item.Outstone
        }
        this.scrollView.addChild(fruitItemCopy)
    }
    private getOtherAwards() {
        let onSuccess = (res) => {
            if (res.reward) {
                RES.setSpriteFrame(this.awardsView.getChildByName('fruit').getComponent(cc.Sprite), `common/bigFruit/img_fruit_${res.reward.Pid}`)
                this.awardsView.getChildByName('num').getComponent(cc.Label).string = res.reward.Nums
                this.awardsView.getChildByName('name').getComponent(cc.RichText).string = `您未参与本次种植，系统随机\n赠送<color=#FA682C> ${res.reward.Name} x ${res.reward.Nums}</color>`
                this.scheduleOnce(() => {
                    this.awardsView.active = true
                }, 10)
                EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
            }
        }
        App.NewUserProxy.GetRandRwarad({ onSuccess, data: { type: 0 } })
    }
    protected getUserHistory(flag: number): void {
        this.updateFruitList(this.fruitList);
        let onSuccess = (res) => {
            this.fruitList = res.List;
            // FramingManager.updateRecordList(res.List, this.getHistoryItem, this)
            this.updateFruitList(this.fruitList);
        }
        App.GameProxy.userHistory({ onSuccess, data: { page: 1, pagesize: 20, flag } });
    }

    private updateFruitList(fruitList): void {
        if (!fruitList) {
            return;
        }
        let dataList = [];
        for (let i: number = 0; i < fruitList.length; i++) {
            dataList.push({
                view: this,
                data: fruitList[i]
            });
        }
        let seedShopScroll1View: RecycleScroller = this.normalView.getChildByName('scrollview').getComponent(RecycleScroller);
        seedShopScroll1View.dataProvider = dataList;
    }

    private toDouble(num: number) {
        return num >= 10 ? num : "0" + num;
    }
    private curRid
    protected updateProgress(data) { //农场进度信息
        if (this.curRid !== data.Gameinfo.Period && this.curRid) {
            if (App.gdata.isToday) {
                this.getUserHistory(1)
            } else {
                this.getUserHistory(0)
            }
        }
        this.curRid = data.Gameinfo.Period
        if (data.Gameinfo.Countdown > 60) {
            this.timeX = this.toDouble(Math.floor(data.Gameinfo.Countdown / 60)) + "分" + this.toDouble(data.Gameinfo.Countdown % 60) + "秒"
        } else {
            this.timeX = data.Gameinfo.Countdown + "秒";
        }
        if (this.scrollView.children[0]) {
            this.scrollView.children[0].getChildByName('time').getChildByName('label').getComponent(cc.Label).string = this.timeX + "成熟"
        }
        if (!this.gameEnd) {
            let attackInfo = this.detailView.getChildByName('attack_info').getChildByName('text')
            attackInfo.getComponent(cc.RichText).string = `<color=#A3894C>前方危险！野猪还有${this.timeX}入侵！</c>`
        }
    }
    private initNormal() {
        this.title.getComponent(cc.Label).string = '种植记录'
        this.normalView.active = true
        this.detailView.active = false
    }
    private initDetail() {
        this.title.getComponent(cc.Label).string = '种植详情'
        this.normalView.active = false
        this.detailView.active = true
    }
    //查看详情
    checkDetail(event) {
        this.scrollView.children.forEach((item, index) => {
            if (event.node === item) {
                this.fruitList.forEach((items, indexs) => {
                    if (index === indexs) {
                        if (items.Status === -1 && !items.Instone) {
                            // this.close()
                            // MessageBoxManager.showAlert({
                            //     type: AlertDialog.TYPE_2,
                            //     msg: '每个果园最终只有一类水果能成功存活！您当期未种植，立即前往购买种子！',
                            //     okCallBack: () => { App.ui.open(UIConstant.SeedShopView) },
                            //     okLabel: '去买种子'
                            // });
                            this.toPlantView.active = true
                            return
                        }
                        this.initDetail()
                        let termid = items.Termid
                        let onSuccess = (res) => {
                            this.gameEnd = res.GameEnd
                            this.seedsList = res.Seeds
                            this.rid = res.Rid
                            let attackHead = this.detailView.getChildByName('head_info')
                            attackHead.getComponent(cc.Label).string = `第${res.Period}号果园记录`
                            let attackInfo = this.detailView.getChildByName('attack_info').getChildByName('text')
                            let attackFruit = this.detailView.getChildByName('attack_info').getChildByName('img_wildpig')
                            if (!res.GameEnd && this.timeX) {
                                attackInfo.getComponent(cc.RichText).string = `<color=#A3894C>前方危险！野猪还有${this.timeX}入侵！</c>`
                                this.detailView.getChildByName('attack_info').getChildByName('bg_text2').active = true
                                attackInfo.y = 34
                                // 前方危险！野猪还有X分X秒入侵！
                                RES.setSpriteFrame(attackFruit.getComponent(cc.Sprite), `view/pigAttack/img_wildpig`)
                            } else {
                                attackInfo.y = 5
                                this.detailView.getChildByName('attack_info').getChildByName('bg_text2').active = false
                                // attackInfo.getComponent(cc.RichText).string = `<color=#A3894C>野猪袭击了<color=#FF7C55>${res.Period}号</color>果园,只有<color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>幸免于难。</c>`
                                RES.setSpriteFrame(attackFruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${res.Nums}`)
                                console.log(items, res);
                                // if(items.Status === 1){
                                //     attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>存活！尽早喂食哦~</c>`
                                // }else if(items.Status === 2){
                                //     attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>存活！喂食已获赠<color=#FF7C55>${res.Reward.Giftcoupon}</color>礼券、<color=#FF7C55>${res.Reward.Coin}</color>金币和<color=#FF7C55>${res.Reward.Props}</color>小鱼干</c>`
                                // }else if(items.Status === 0){
                                //     attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>存活！您本次未种植该水果！</c>`
                                // }
                                if (items.Status === 0) {
                                    attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>存活！您本次未种植该水果！</c>`
                                } else {
                                    attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${items.ResultOdds})</b></color>存活！您在该果园收获<color=#FF7C55>${res.Props}</color>个${res.Name.split('-')[1]},已放置在果篮！</c>`
                                }
                            }
                            let scrollContent = this.detailView.getChildByName('plante_info').getChildByName('scrollview').getChildByName('view').getChildByName('content')
                            let scrollItem = this.detailView.getChildByName('plante_info').getChildByName('scrollitem')
                            scrollContent.removeAllChildren()
                            let totalNumber: number = 0
                            res.Seeds.forEach(element => {
                                if (!scrollItem) return
                                let scrollItemCopy = cc.instantiate(scrollItem)
                                scrollItemCopy.active = true
                                let littleFruitPic = scrollItemCopy.getChildByName('littleFruit')
                                let littleFruitName = scrollItemCopy.getChildByName('fruitName')
                                let littleFruitNums = scrollItemCopy.getChildByName('buyNums')
                                RES.setSpriteFrame(littleFruitPic.getComponent(cc.Sprite), `common/fruit/img_fruit_${element.Nums}`)
                                littleFruitName.getComponent(cc.Label).string = element.Name
                                littleFruitNums.getComponent(cc.Label).string = UIUtil.toStone(element.Instone)
                                totalNumber = element.Instone + totalNumber
                                if (element.Nums === res.Nums && res.GameEnd) {
                                    littleFruitNums.color = littleFruitName.color = cc.color(255, 124, 85)
                                }
                                scrollContent.addChild(scrollItemCopy)
                            });
                            let littleFruitTotal = this.detailView.getChildByName('total_info').getChildByName('total_number')
                            littleFruitTotal.getComponent(cc.Label).string = UIUtil.toStone(totalNumber)
                        }
                        App.GameProxy.userBuySeedsList({ onSuccess: onSuccess, data: { termid } })
                    }
                })
            }
        })
    }
    //点击关闭
    protected clickClose() {
        if (this.normalView.active) {
            this.close()
        } else {
            this.initNormal()
        }
    }
    protected updateView(): void {
        console.log(this.data, App.gdata.isToday);
        this.scheduleOnce(this.getOtherAwards, 10)
        this.initNormal()
        if (App.gdata.isToday) {
            this.getUserHistory(1)
            RES.setSpriteFrame(this.normoalCirlce.getComponent(cc.Sprite), 'view/farmRecord/img_bg')
            this.normoalCirlce.getChildByName('img_cirlce').x = 21
        } else {
            this.getUserHistory(0)
            RES.setSpriteFrame(this.normoalCirlce.getComponent(cc.Sprite), 'view/farmRecord/img_bg1')
            this.normoalCirlce.getChildByName('img_cirlce').x = -21
        }
        if (this.data?.check) {
            this.initDetail()
            this.scheduleOnce(() => {
                this.checkFirst()
            }, 0.1)
        }
    }
    private checkFirst() {
        const Item = this.fruitList[0]
        // debugger
        let termid = Item.Termid
        let onSuccess = (res) => {
            this.gameEnd = res.GameEnd
            this.seedsList = res.Seeds
            this.rid = res.Rid
            let attackHead = this.detailView.getChildByName('head_info')
            attackHead.getComponent(cc.Label).string = `第${res.Period}号果园记录`
            let attackInfo = this.detailView.getChildByName('attack_info').getChildByName('text')
            let attackFruit = this.detailView.getChildByName('attack_info').getChildByName('img_wildpig')
            if (!res.GameEnd) {
                this.detailView.getChildByName('attack_info').getChildByName('bg_text2').active = true
                attackInfo.y = 34
                attackInfo.getComponent(cc.RichText).string = `<color=#A3894C>前方危险！野猪还有${this.timeX}入侵！</c>`
                RES.setSpriteFrame(attackFruit.getComponent(cc.Sprite), `view/pigAttack/img_wildpig`)
            } else {
                attackInfo.y = 5
                this.detailView.getChildByName('attack_info').getChildByName('bg_text2').active = false
                this.detailView.getChildByName('attack_info').getChildByName('hint').active = false
                RES.setSpriteFrame(attackFruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${res.Nums}`)
                console.log(Item, res);
                if (Item.Status === 0) {
                    attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${Item.ResultOdds})</b></color>存活！您本次未种植该水果！</c>`
                } else {
                    attackInfo.getComponent(cc.RichText).string = `<color=#A3894C><color=#FF7C55><b>${res.Name}(生命:${Item.ResultOdds})</b></color>存活！\n收获<color=#FF7C55>${res.Props}</color>个水果</c>`
                }
            }
            let scrollContent = this.detailView.getChildByName('plante_info').getChildByName('scrollview').getChildByName('view').getChildByName('content')
            let scrollItem = this.detailView.getChildByName('plante_info').getChildByName('scrollitem')
            scrollContent.removeAllChildren()
            let totalNumber: number = 0
            res.Seeds.forEach(element => {
                if (!scrollItem) return
                let scrollItemCopy = cc.instantiate(scrollItem)
                scrollItemCopy.active = true
                let littleFruitPic = scrollItemCopy.getChildByName('littleFruit')
                let littleFruitName = scrollItemCopy.getChildByName('fruitName')
                let littleFruitNums = scrollItemCopy.getChildByName('buyNums')
                RES.setSpriteFrame(littleFruitPic.getComponent(cc.Sprite), `common/fruit/img_fruit_${element.Nums}`)
                littleFruitName.getComponent(cc.Label).string = element.Name
                littleFruitNums.getComponent(cc.Label).string = UIUtil.toStone(element.Instone)
                totalNumber = element.Instone + totalNumber
                if (element.Nums === res.Nums && res.GameEnd) {
                    littleFruitNums.color = littleFruitName.color = cc.color(255, 124, 85)
                }
                scrollContent.addChild(scrollItemCopy)
            });
            let littleFruitTotal = this.detailView.getChildByName('total_info').getChildByName('total_number')
            littleFruitTotal.getComponent(cc.Label).string = UIUtil.toStone(totalNumber)
        }
        App.GameProxy.userBuySeedsList({ onSuccess: onSuccess, data: { termid } })
    }
    private goToBags() {
        this.close()
        App.ui.open(UIConstant.FruitBagView)
    }
    private goToHomeFun() {
        EventDispatcher.dispatch(GameEvent.GO_TO_MAINSCENE)
    }
    private contiueToBuy() {
        this.close()
        console.log(this.seedsList);

        App.ui.open(UIConstant.BuySeedView, null, {
            data: {
                selectFoodList: this.seedsList,
                num: '',
                name: '',
                continueBuy: true,
                rid: this.rid
            }
        })
    }
    private closePlantFun() {
        this.toPlantView.active = false
    }
    private toShop() {
        this.toPlantView.active = false
        this.close()
        App.ui.open(UIConstant.SeedShopView)
    }
    private farmCountDown
    private farmTime: cc.Node
    /* 农场倒计时 */
    private farmTimer() {
        this.unschedule(this.farmCountDown)
        App.GameProxy.farmGameInfo({
            onSuccess: (res) => {
                let second = res.Gameinfo.Countdown
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
}