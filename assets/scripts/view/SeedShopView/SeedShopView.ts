// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import RecycleScroller from "../../components/virtuallist/RecycleScroller";
import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";
import SeedShopViewItem0 from "./SeedShopViewItem0";
import SeedShopViewItem1 from "./SeedShopViewItem1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SeedShopView extends BaseUI {


    protected seedBox: cc.Node = null;
    protected closeBtn: cc.Node = null;
    protected currentShop = null;
    private seedShopScrollOne: cc.Node;
    public seedShopScrollTwo: cc.Node;
    protected allSeed = [];
    private toggleList: cc.Node[];
    private type: number = 0;
    public selectFoodList: Array<Object> = [];
    seedNums: cc.Label;
    private boxItem: cc.Node;
    private settlement: cc.Node;
    private coinNum: cc.Label;
    private pigHit: cc.Node
    private progress: cc.Node
    private wyCoin: cc.Node
    private scrollItem0: cc.Node
    private scrollItem1: cc.Node
    public fruitItem: cc.Node
    private ranking: cc.Node
    private lifeRank: cc.Node
    private seedsList = null
    private rankingList
    private expressList = null
    private toRecord: cc.Node


    protected validateUI(): void {
        this.toRecord = this.node.getChildByName('bt_record')
        this.scrollItem0 = this.node.getChildByName('scrollItem0')
        this.scrollItem1 = this.node.getChildByName('scrollItem1')
        this.fruitItem = this.node.getChildByName('fruitItem')
        this.closeBtn = this.node.getChildByName('close')
        this.seedBox = this.node.getChildByName("normalSeed");
        this.seedShopScrollOne = this.node.getChildByName("seedShopScroll0");
        this.ranking = this.seedShopScrollOne.getChildByName('bg_titile1').getChildByName('ranking')
        this.lifeRank = this.seedShopScrollOne.getChildByName('bg_titile1').getChildByName('life')
        this.seedShopScrollTwo = this.node.getChildByName("seedShopScroll1")
        this.toggleList = this.node.getChildByName("toggleContainer").children;
        this.seedNums = this.node.getChildByName("currentSelSeed").getChildByName("seedNums").getComponent(cc.Label);
        this.boxItem = this.node.getChildByName("boxItem");
        this.settlement = this.node.getChildByName("toCheck");
        this.coinNum = this.node.getChildByName("wyCoin").getChildByName("text").getComponent(cc.Label);
        this.pigHit = this.node.getChildByName('pigHit')
        this.progress = this.node.getChildByName('progressBar')
        this.wyCoin = this.node.getChildByName('wyCoin');

        this.scrollItem1.active = false;
        let seedShopScroll1View: RecycleScroller = this.seedShopScrollTwo.getComponent(RecycleScroller);
        seedShopScroll1View.itemTemplate = this.scrollItem1;
        seedShopScroll1View.setDataRenderer(SeedShopViewItem1);
        this.scrollItem0.active = false;
        let seedShopScroll0View: RecycleScroller = this.seedShopScrollOne.getComponent(RecycleScroller);
        seedShopScroll0View.itemTemplate = this.scrollItem0;
        seedShopScroll0View.setDataRenderer(SeedShopViewItem0);

        // window["sss"] = this;


    }

    protected updateView(): void {
        this.selectFoodList = []
        this.seedNums.string = `${this.selectFoodList.length}???`
        this.type == 1 ? this.getExpress() : this.getSeedsInfo();
        this.settlement.active = !this.type ? true : false;
        this.getUserInfo();
        console.log(this.selectFoodList);

    }
    /* ?????????????????? */
    private goToRecord() {
        this.close()
        App.ui.open(UIConstant.FruitRecordView)
    }
    private openCoin() {
        this.close()
        App.ui.open(UIConstant.CoinRecordView)
    }
    private toDouble(num: number) {
        return num >= 10 ? num : "0" + num;
    }
    protected updateProgress(data) {
        let toTime: string = ""
        this.progress.getComponent(cc.ProgressBar).progress = data.Gameinfo.Process / 100
        if (data.Gameinfo.Countdown > 60) {
            toTime = this.toDouble(Math.floor(data.Gameinfo.Countdown / 60)) + "???" + this.toDouble(data.Gameinfo.Countdown % 60) + "???"
        } else {
            toTime = data.Gameinfo.Countdown + "???";
        }
        this.pigHit.getComponent(cc.RichText).string = `<color=#F9DAA7>??????!????????????<b><color=F76135>${toTime}</color></b>??????!?????????????????????</c>`
    }
    private numRankingChange: boolean = true //??????
    /* ???????????? */
    protected numRanking() {
        this.rankingList = JSON.parse(JSON.stringify(this.seedsList))
        if (this.numRankingChange) {
            this.numRankingChange = false
            this.rankingList.reverse()
        } else {
            this.numRankingChange = true
        }
        // this.seedShopScrollOne.getChildByName("view").getChildByName("scrollContent").removeAllChildren();
        // FramingManager.updateRecordList(this.rankingList, this.getSeedsInfoItem, this);
        let dataList = [];
        for (let i: number = 0; i < this.rankingList.length; i++) {
            dataList.push({
                view: this,
                data: this.rankingList[i]
            });
        }
        let seedShopScroll1View: RecycleScroller = this.seedShopScrollOne.getComponent(RecycleScroller);
        seedShopScroll1View.dataProvider = dataList;

    }
    private lifeRankingChange: boolean = true //??????
    /* ???????????? */
    protected lifeRanking() {
        this.rankingList = JSON.parse(JSON.stringify(this.seedsList))
        for (let i = 0; i < this.rankingList.length - 1; i++) {
            for (let j = 0; j < this.rankingList.length - 1 - i; j++) {
                if (this.rankingList[j].Odds > this.rankingList[j + 1].Odds) {
                    let temp = this.rankingList[j]
                    this.rankingList[j] = this.rankingList[j + 1]
                    this.rankingList[j + 1] = temp
                }
            }
        }
        if (this.lifeRankingChange) {
            this.lifeRankingChange = false
            this.rankingList.reverse()
        } else {
            this.lifeRankingChange = true
        }

        // this.seedShopScrollOne.getChildByName("view").getChildByName("scrollContent").removeAllChildren();
        // FramingManager.updateRecordList(this.rankingList, this.getSeedsInfoItem, this);
        let dataList = [];
        for (let i: number = 0; i < this.rankingList.length; i++) {
            dataList.push({
                view: this,
                data: this.rankingList[i]
            });
        }
        let seedShopScroll1View: RecycleScroller = this.seedShopScrollOne.getComponent(RecycleScroller);
        seedShopScroll1View.dataProvider = dataList;
    }
    protected getSeedsInfo() {
        // this.seedShopScrollOne.getChildByName("view").getChildByName("scrollContent").removeAllChildren();
        App.GameProxy.getSeedsInfo({
            onSuccess: function (data) {
                console.log("data", data);
                this.seedsList = data
                // FramingManager.updateRecordList(data, this.getSeedsInfoItem, this);
                let dataList = [];
                for (let i: number = 0; i < this.seedsList.length; i++) {
                    dataList.push({
                        view: this,
                        data: this.seedsList[i]
                    });
                }
                let seedShopScroll1View: RecycleScroller = this.seedShopScrollOne.getComponent(RecycleScroller);
                seedShopScroll1View.dataProvider = dataList;
            },
            thisObj: this
        })
        this.seedShopScrollOne.active = true;
        this.seedShopScrollTwo.active = false;
    }
    private getSeedsInfoItem(data, index) {
        if (!this.scrollItem0) return
        let node = cc.instantiate(this.scrollItem0);
        let name = node.getChildByName("name").getComponent(cc.Label);
        let odd = node.getChildByName("life").getComponent(cc.Label);
        let num = node.getChildByName("ranking").getComponent(cc.Label);
        let icon = node.getChildByName("fruit").getComponent(cc.Sprite);
        node.parent = this.seedShopScrollOne.getChildByName("view").getChildByName("scrollContent");
        num.string = data.Num;
        odd.string = data.Odds;
        name.string = data.Name;
        RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Num}`);
        node["data"] = data;
        node.off("click", this.selectFood, this);
        node.on("click", this.selectFood, this);
        node.active = true;
    }

    private getExpress() {
        // this.seedShopScrollTwo.getChildByName("view").getChildByName("scrollContent").removeAllChildren();
        if (!this.expressList) {
            // let dataList = [];
            // for (let i: number = 0; i < this.expressList.length; i++) {
            //     dataList.push({
            //         view: this,
            //         data: this.expressList[i]
            //     });
            // }
            // let seedShopScroll1View: RecycleScroller = this.seedShopScrollTwo.getComponent(RecycleScroller);
            // seedShopScroll1View.dataProvider = dataList;
            // FramingManager.updateRecordList(this.expressList, this.getExpressItem, this);
            let that = this;
            App.GameProxy.getExpress({
                onSuccess: function (data) {
                    console.log("data", data);
                    that.expressList = data;
                    let dataList = [];
                    for (let i: number = 0; i < that.expressList.length; i++) {
                        dataList.push({
                            view: that,
                            data: that.expressList[i]
                        });
                    }
                    let seedShopScroll1View: RecycleScroller = that.seedShopScrollTwo.getComponent(RecycleScroller);
                    seedShopScroll1View.dataProvider = dataList;
                    //FramingManager.updateRecordList(data, this.getExpressItem, this);
                },
                thisObj: this
            })
        }
        this.seedShopScrollOne.active = false;
        this.seedShopScrollTwo.active = true;
    }
    /* ?????? */
    private extend(event: cc.Button) {
        console.log('??????', event);
        const node = event.target || event.node
        const data = node["data"]
        if (data.NumArr.length <= 6) return
        const bag = node.getChildByName('bg').getChildByName('contentBag')
        const more = node.getChildByName('more').getChildByName('icon_unfold')
        bag.removeAllChildren()
        if (data.extend) {
            data.extend = false
            RES.setSpriteFrame(more.getComponent(cc.Sprite), 'view/seedShop/icon_unfold')
            data.NumArr.forEach((item, index) => {
                if (index >= 7) return
                if (!this.fruitItem) return
                const fruitCopy = cc.instantiate(this.fruitItem)
                const fruit = fruitCopy.getChildByName('fruit')
                const ranking = fruitCopy.getChildByName('ranking')
                RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
                ranking.getComponent(cc.Label).string = item.Num
                fruitCopy.active = true
                bag.addChild(fruitCopy)
            })
        } else {
            data.extend = true
            RES.setSpriteFrame(more.getComponent(cc.Sprite), 'view/seedShop/icon_fold')
            data.NumArr.forEach((item, index) => {
                if (!this.fruitItem) return
                const fruitCopy = cc.instantiate(this.fruitItem)
                const fruit = fruitCopy.getChildByName('fruit')
                const ranking = fruitCopy.getChildByName('ranking')
                RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
                ranking.getComponent(cc.Label).string = item.Num
                fruitCopy.active = true
                bag.addChild(fruitCopy)
            })
        }
    }
    private getExpressItem(data, index) {
        if (!this.scrollItem1) return
        const itemCopy = cc.instantiate(this.scrollItem1);
        const btn = itemCopy.getChildByName('bg').getChildByName('btn').getChildByName('bt_buy')
        const bg = itemCopy.getChildByName('bg').getChildByName('box').getChildByName('bg_express').getChildByName('fruitBox')
        const name = itemCopy.getChildByName('bg').getChildByName('name').getChildByName('name')
        const bag = itemCopy.getChildByName('bg').getChildByName('contentBag')
        const more = itemCopy.getChildByName('more').getChildByName('icon_unfold')
        if (data.NumArr.length >= 14) {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_big')
        } else if (data.NumArr.length >= 7) {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_middle')
        } else {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_small')
        }
        name.getComponent(cc.Label).string = `${data.Name} (??????${data.NumArr.length}?????????)`;
        bag.removeAllChildren()
        data.NumArr.forEach((item, index) => {
            if (index >= 7) return
            if (!this.fruitItem) return
            const fruitCopy = cc.instantiate(this.fruitItem)
            const fruit = fruitCopy.getChildByName('fruit')
            const ranking = fruitCopy.getChildByName('ranking')
            RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
            ranking.getComponent(cc.Label).string = item.Num
            fruitCopy.active = true
            bag.addChild(fruitCopy)
        })
        data["extend"] = false
        itemCopy.active = true;
        btn["data"] = data
        itemCopy["data"] = data
        itemCopy.off("click", this.extend, this);
        itemCopy.on("click", this.extend, this);
        btn.off("click", this.selectExpress, this);
        btn.on("click", this.selectExpress, this);
        this.seedShopScrollTwo.getChildByName("view").getChildByName("scrollContent").addChild(itemCopy);
    }

    selectFood(evt: cc.Button) {
        let node: cc.Node = evt.target || evt.node;
        let icon: cc.Sprite = node.getChildByName("bg_nor").getComponent(cc.Sprite);
        let checkIcon: cc.Sprite = node.getChildByName("select").getComponent(cc.Sprite);
        let data = node["data"];
        if (this.selectFoodList.indexOf(data) != -1) {
            let ids = this.selectFoodList.indexOf(data);
            this.selectFoodList.splice(ids, 1);
            RES.setSpriteFrame(icon, `view/seedShop/bg_nor`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_nor`);
        } else {
            this.selectFoodList.push(data);
            RES.setSpriteFrame(icon, `view/seedShop/bg_sel`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_sel`);
        }
        this.seedNums.string = `${this.selectFoodList.length}???`
        console.log("this.selectFoodList", this.selectFoodList)
    }

    private selectExpress(evt: cc.Button) {
        let node = evt.target || evt.node;
        let data = node["data"];
        if (!data) return;
        this.selectFoodList = data.NumArr;
        this.settlementInfo(null, data.Num, data.Name);
    }
    /* ???????????? */
    private plantRecord() {
        console.log('132');

    }
    private toggle(evt: cc.Toggle) {
        this.selectFoodList = []
        this.seedNums.string = `${this.selectFoodList.length}???`
        let node = evt.target || evt.node;
        let type = node["type"];
        if (this.type == type) return;
        this.type = type;
        type == 1 ? this.getExpress() : this.getSeedsInfo();
        this.settlement.active = !this.type ? true : false
    }
    private closeShop() {
        this.close()
        this.selectFoodList = []
    }
    /* ???????????? */
    private initShop() {
        this.selectFoodList = []
        this.updateView()
    }
    /**
* ??????????????????
*/
    protected initEvent(): void {
        EventDispatcher.addListener(GameEvent.UPDATE_BUYSEED_COIN, this.updateCoin, this)
        EventDispatcher.addListener(GameEvent.UPDATE_PROGRESS, this.updateProgress, this)
        EventDispatcher.addListener(GameEvent.INIT_SHOP, this.initShop, this)
        this.closeBtn.on("click", this.closeShop, this);
        this.toRecord.on("click", this.goToRecord, this);
        this.ranking.on("click", this.numRanking, this);
        this.lifeRank.on("click", this.lifeRanking, this);
        this.wyCoin.on("click", this.openCoin, this);
        this.settlement.on("click", this.settlementInfo, this);
        this.toggleList.forEach((item, index) => {
            item["type"] = index;
            item.on("toggle", this.toggle, this);
        })
    }

    /**
     * ??????????????????
     */
    protected removeEvent(): void {
        EventDispatcher.removeListener(GameEvent.UPDATE_BUYSEED_COIN, this.updateCoin, this)
        EventDispatcher.removeListener(GameEvent.UPDATE_PROGRESS, this.updateProgress, this)
        EventDispatcher.removeListener(GameEvent.INIT_SHOP, this.initShop, this)
        this.closeBtn.off("click", this.closeShop, this);
        this.toRecord.off("click", this.goToRecord, this);
        this.ranking.off("click", this.numRanking, this);
        this.lifeRank.off("click", this.lifeRanking, this);
        this.wyCoin.off("click", this.openCoin, this);
        this.settlement.off("click", this.settlementInfo, this);
        this.toggleList.forEach((item, index) => {
            item["type"] = index;
            item.off("toggle", this.toggle, this);
        })
    }

    public settlementInfo(evt: cc.Button, num?: number, name?) {
        if (this.selectFoodList.length == 0) return;
        App.ui.open(UIConstant.BuySeedView, this.node, {
            data: {
                selectFoodList: this.selectFoodList,
                num: num || 0,
                name: name || '',
            },
            // closeCallBack:function(){
            //     App.ui.open(UIConstant.SeedShopView)
            // }
        });
        // this.selectFoodList = [];
        // this.close();
    }
    private updateCoin() {
        this.coinNum.string = UIUtil.toStone(App.gdata.userInfo.coin);
    }
    private getUserInfo() {
        App.UserProxy.getUserInfo({
            onSuccess: (data) => {
                this.coinNum.string = UIUtil.toStone(data.coin);
            },
            thisObj: this
        })
    }
}

