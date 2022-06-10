import ScrollViewHideItem from "../../circulatescroller/ScrollViewHideItem";
import RecycleScroller from "../../components/virtuallist/RecycleScroller";
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
import SeedShopView from "../SeedShopView/SeedShopView";
// import BuySeedViewItem from "./BuySeedViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuySeedView extends BaseUI {

    private content: cc.Node;
    private itemScroll: cc.Node;
    private item: cc.Node;
    goodList: Array<Object> = [];
    private closeBtn: cc.Node;
    gold: number = 0;
    seedText: cc.RichText;
    private titleNum: cc.RichText;
    lotNum: number = 1; // 份额
    private selectList: cc.Node[];
    expressId: number = 0;
    private checkBtn: cc.Node;
    private title: cc.Node;
    private title1: cc.Node;
    continueBuy;
    private seedKind: cc.Node
    private coin: cc.Node
    private hint: cc.Node
    private closeIcon: cc.Node
    private viewMask: cc.Node
    private toggleContainer: cc.Node
    private seed1
    private addCoin: cc.Node
    private totalContent: cc.Node
    /**
   * 识别所有需要操作的节点或组件
   */
    protected validateUI(): void {
        this.seed1 = this.node.getChildByName('content').getChildByName('seed1')
        this.content = this.node.getChildByName("content");
        this.viewMask = this.node.getChildByName("mask");
        this.itemScroll = this.content.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        this.item = this.content.getChildByName("item");
        this.closeBtn = this.content.getChildByName("cancel");
        this.closeIcon = this.content.getChildByName("icon_close");
        this.seedText = this.content.getChildByName("seed").getComponent(cc.RichText);
        this.titleNum = this.content.getChildByName("titleNum").getComponent(cc.RichText);
        this.selectList = this.content.getChildByName("selectlist").children;
        this.checkBtn = this.content.getChildByName("bt_suer");
        this.title = this.content.getChildByName('title')
        this.title1 = this.content.getChildByName('title1')
        this.seedKind = this.content.getChildByName('bg_title').getChildByName('New RichText')
        this.coin = this.content.getChildByName('coin')
        this.hint = this.content.getChildByName('tip1')
        this.toggleContainer = this.content.getChildByName('toggleContainer')
        this.addCoin = this.content.getChildByName('addCoin')
        this.totalContent = this.content.getChildByName('chooseTotal')
        // this.item.active = false
        // let ScrollView: RecycleScroller = this.content.getChildByName('scrollView').getComponent(RecycleScroller);
        // ScrollView.itemTemplate = this.item;
        // ScrollView.setDataRenderer(BuySeedViewItem);
    }

    protected updateView(): void {
        // console.log(this.data.data);
        this.goodList = this.data.data.selectFoodList;
        this.expressId = this.data.data.num;
        this.name = this.data.data.name
        this.continueBuy = this.data.data.continueBuy
        console.log("expressId", this.expressId)
        this.updateCoin();
        this.hint.getComponent(cc.Label).string = '点击按钮可增减金币总数'
        if (this.expressId) {
            this.titleNum.string = `请确认委托<color=#ED5B26>${this.name}</color>运送<color=#ED5B26>${App.gdata.farmGameInfo.Period}号</color>果园的种子种植`
            this.title.getComponent(cc.Label).string = this.name + '快递'
            this.title1.getComponent(cc.Label).string = '组合详情'
            this.gold = 1000000;//总价
            this.lotNum = Math.floor(this.gold / this.goodList.length);//单价
        } else {
            this.titleNum.string = `请确认您运送<color=#ED5B26>${App.gdata.farmGameInfo.Period}号</color>果园的种子清单:`
            this.title.getComponent(cc.Label).string = '购买种子'
            this.title1.getComponent(cc.Label).string = '种子详情'
            this.gold = 1000000;//总价
            this.lotNum = Math.floor(this.gold / this.goodList.length);//单价
        }
        // this.lotNum = 10000
        this.gold = this.lotNum * this.goodList.length
        if (this.continueBuy) {
            this.gold = 0
        }
        this.seedKind.getComponent(cc.RichText).string = `购买 <color=#ED5B26>${this.goodList.length}类</color>种子`
        this.getViewInfo();
        //
        this.title.color = cc.color(226, 143, 80)
        this.title1.color = cc.color(252, 249, 232)
        this.node.getChildByName('content').getChildByName('bg4').active = true
        this.node.getChildByName('content').getChildByName('bg1').active = false
        // this.node.getChildByName('content').getChildByName('bg5').active = true
        this.node.getChildByName('content').getChildByName('seed').active = true
        this.node.getChildByName('content').getChildByName('selectlist').active = true
        this.node.getChildByName('content').getChildByName('bt_suer').active = true
        this.node.getChildByName('content').getChildByName('tip1').active = true
        this.node.getChildByName('content').getChildByName('scrollView').active = false
        this.node.getChildByName('content').getChildByName('shopCar').active = true
        this.node.getChildByName('content').getChildByName('seed').active = true
        this.node.getChildByName('content').getChildByName('seed1').active = false
        this.node.getChildByName('content').getChildByName('hintbg').active = true
        this.node.getChildByName('content').getChildByName('tip1bg').active = true
        this.node.getChildByName('content').getChildByName('chooseTotal').active = true
    }
    private updateCoin() {
        this.coin.getComponent(cc.Label).string = UIUtil.toStone(App.gdata.userInfo.coin);
    }

    private toShop() {
        this.close()
        App.ui.open(UIConstant.RechargeView)
    }
    /**
     * 添加监听事件
     */
    protected initEvent(): void {
        EventDispatcher.addListener(GameEvent.UPDATE_BUYSEED_COIN, this.updateCoin, this)
        this.closeBtn.on("click", this.closeCanel, this);
        this.addCoin.on("click", this.toShop, this);
        this.viewMask.on("click", this.close, this);
        this.closeIcon.on("click", this.close, this);
        this.checkBtn.on("click", this.checkFun, this);
        this.selectList.forEach((node: cc.Node, index) => {
            node.on("click", this.addLotInfo, this);
        })
        this.toggleContainer.children.forEach(item => {
            item.on('click', this.exchangeToggle, this)
        })
        this.totalContent.children.forEach(item => {
            item.on('click', this.chooseTotal, this)
        })
    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {
        EventDispatcher.removeListener(GameEvent.UPDATE_BUYSEED_COIN, this.updateCoin, this)
        this.closeBtn.off("click", this.closeCanel, this);
        this.addCoin.on("click", this.toShop, this);
        this.viewMask.off("click", this.close, this);
        this.closeIcon.off("click", this.close, this);
        this.checkBtn.off("click", this.checkFun, this);
        this.selectList.forEach((node: cc.Node, index) => {
            node.off("click", this.addLotInfo, this);
        })
        this.toggleContainer.children.forEach(item => {
            item.off('click', this.exchangeToggle, this)
        })
        this.totalContent.children.forEach(item => {
            item.off('click', this.chooseTotal, this)
        })
    }
    /* 切换 */
    private exchangeToggle(event) {
        let node = event.target || event.node
        if (node === this.toggleContainer.children[0]) {
            console.log(1);
            this.title.color = cc.color(226, 143, 80)
            this.title1.color = cc.color(252, 249, 232)
            this.node.getChildByName('content').getChildByName('bg4').active = true
            this.node.getChildByName('content').getChildByName('bg1').active = false
            // this.node.getChildByName('content').getChildByName('bg5').active = true
            this.node.getChildByName('content').getChildByName('seed').active = true
            this.node.getChildByName('content').getChildByName('selectlist').active = true
            this.node.getChildByName('content').getChildByName('bt_suer').active = true
            this.node.getChildByName('content').getChildByName('tip1').active = true
            this.node.getChildByName('content').getChildByName('scrollView').active = false
            this.node.getChildByName('content').getChildByName('shopCar').active = true
            this.node.getChildByName('content').getChildByName('seed').active = true
            this.node.getChildByName('content').getChildByName('seed1').active = false
            this.node.getChildByName('content').getChildByName('hintbg').active = true
            this.node.getChildByName('content').getChildByName('tip1bg').active = true
            this.node.getChildByName('content').getChildByName('chooseTotal').active = true
        } else {
            console.log(2);
            this.title.color = cc.color(252, 249, 232)
            this.title1.color = cc.color(226, 143, 80)
            this.node.getChildByName('content').getChildByName('bg4').active = false
            // this.node.getChildByName('content').getChildByName('bg5').active = false
            this.node.getChildByName('content').getChildByName('seed').active = false
            this.node.getChildByName('content').getChildByName('selectlist').active = false
            this.node.getChildByName('content').getChildByName('bt_suer').active = false
            this.node.getChildByName('content').getChildByName('tip1').active = false
            this.node.getChildByName('content').getChildByName('scrollView').active = true
            this.node.getChildByName('content').getChildByName('bg1').active = true
            this.node.getChildByName('content').getChildByName('shopCar').active = false
            this.node.getChildByName('content').getChildByName('seed').active = false
            this.node.getChildByName('content').getChildByName('seed1').active = true
            this.node.getChildByName('content').getChildByName('hintbg').active = false
            this.node.getChildByName('content').getChildByName('tip1bg').active = false
            this.node.getChildByName('content').getChildByName('chooseTotal').active = false
        }
    }
    private chooseTotal(event) {
        const node = event.target || event.node
        console.log(node);
        switch (node.name) {
            case 'nums_1':
                if (1000000 > App.gdata.userInfo.coin) {
                    App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                        data: {
                            showKey: "deficiency",
                            text1: '本次购买需要1万金币，金币不足，可前往果篮出售水果或前往充值获得！'
                        }
                    })
                    return
                }
                this.gold = 1000000
                this.lotNum = Math.floor(this.gold / this.goodList.length);
                break;
            case 'nums_10':
                if (10000000 > App.gdata.userInfo.coin) {
                    App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                        data: {
                            showKey: "deficiency",
                            text1: '本次购买需要1千万金币，金币不足，可前往果篮出售水果或前往充值获得！'
                        }
                    })
                    return
                }
                this.gold = 10000000
                this.lotNum = Math.floor(this.gold / this.goodList.length);
                break;
            case 'nums_100':
                if (100000000 > App.gdata.userInfo.coin) {
                    App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                        data: {
                            showKey: "deficiency",
                            text1: '本次购买需要1亿金币，金币不足，可前往果篮出售水果或前往充值获得！'
                        }
                    })
                    return
                }
                this.gold = 100000000
                this.lotNum = Math.floor(this.gold / this.goodList.length);
                break;
            case 'nums_500':
                if (500000000 > App.gdata.userInfo.coin) {
                    App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                        data: {
                            showKey: "deficiency",
                            text1: '本次购买需要5亿金币，金币不足，可前往果篮出售水果或前往充值获得！'
                        }
                    })
                    return
                }
                this.gold = 500000000
                this.lotNum = Math.floor(this.gold / this.goodList.length);
                break;

            default:
                break;
        }
        if (this.continueBuy) {
            this.itemScroll.children.forEach(item => {
                item['Instone'] = Math.floor(this.lotNum)
                const num = item.getChildByName("num")
                num.getComponent(cc.Label).string = UIUtil.toStone(item['Instone'])
                // this.gold += item['Instone']
            })
            this.seed1.getComponent(cc.RichText).string = this.seedText.string =
                `总共使用<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>购买`;
        } else {
            this.itemScroll.children.forEach((node, index) => {
                let num = node.getChildByName("num").getComponent(cc.Label);
                num.string = UIUtil.toStone(this.lotNum);
                // this.gold += this.lotNum;
            })
            this.seed1.getComponent(cc.RichText).string = this.seedText.string =
                `单类种子购买${UIUtil.toStone(this.lotNum)}金币,\n总共使用<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>购买`;
        }
    }
    private addLotInfo(evt: cc.Button) {
        let node: cc.Node = evt.target || evt.node;
        let name = +node.name;//倍数
        let nodeList: cc.Node[] = this.itemScroll.children;
        let afterGold = 0
        if (this.continueBuy) {
            nodeList.forEach(item => {
                afterGold += Math.floor(item['Instone'] * name)
            })
        } else {
            let onePrice = Math.floor(this.lotNum * name)
            nodeList.forEach(() => {
                afterGold += onePrice;
            })
        }
        if (afterGold > App.gdata.userInfo.coin) {
            App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                data: {
                    showKey: "deficiency",
                    text1: '本次购买需要'+UIUtil.toStone(afterGold)+'金币，金币不足，可前往果篮出售水果或前往充值获得！'
                }
            })
            return
        }
        if (afterGold > 10000000000) {
            App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                data: {
                    showKey: "deficiency",
                    text: '单次金额不能超过100亿'
                }
            })
            return
        }
        console.log(afterGold);

        this.gold = 0;
        if (!name) return;
        if (this.continueBuy) {
            nodeList.forEach(item => {
                item['Instone'] = Math.floor(item['Instone'] * name)
                const num = item.getChildByName("num")
                num.getComponent(cc.Label).string = UIUtil.toStone(item['Instone'])
                this.gold += item['Instone']
            })
            this.seed1.getComponent(cc.RichText).string = this.seedText.string = `总共使用<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>购买`;
        } else {
            // let changeNum = this.lotNum
            this.lotNum = Math.floor(this.lotNum * name) //翻倍单个
            // if (changeNum * this.goodList.length < 100000) {
            //     this.lotNum = Math.floor(100000 / this.goodList.length);
            //     this.gold = 100000;
            // } else {
            //     this.lotNum = changeNum;
            // }
            nodeList.forEach((node, index) => {
                let num = node.getChildByName("num").getComponent(cc.Label);
                num.string = UIUtil.toStone(this.lotNum);
                this.gold += this.lotNum;
            })
            this.seed1.getComponent(cc.RichText).string = this.seedText.string = `单类种子购买${UIUtil.toStone(this.lotNum)}金币,\n总共使用<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>购买`;
        }
        // if (this.gold >= 20000000000 || this.gold <= 10000) {
        //     this.content.getChildByName('warning').active = true
        // } else {
        //     this.content.getChildByName('warning').active = false
        // }
        console.log("lotNum", this.lotNum);
    }

    private getViewInfo() {
        if (this.goodList.length == 0) return;
        console.log("goodList", this.goodList);
        this.itemScroll.removeAllChildren();
        FramingManager.updateRecordList(this.goodList, this.getSeedsInfoItem, this);
        // let dataList = [];
        // for (let i: number = 0; i < this.goodList.length; i++) {
        //     dataList.push({
        //         view: this,
        //         data: this.goodList[i]
        //     });
        // }
        // let ScrollView: RecycleScroller = this.content.getChildByName('scrollView').getComponent(RecycleScroller);
        // ScrollView.dataProvider = dataList;
    }
    private getSeedsInfoItem(data, index) {
        if (!this.item) return
        let node = cc.instantiate(this.item);
        // node.getComponent(ScrollViewHideItem).view = this.content.getChildByName('scrollView').getChildByName('view')
        // node.getComponent(ScrollViewHideItem).content = this.content.getChildByName('scrollView').getChildByName('view').getChildByName('content')
        let icon = node.getChildByName("icon").getComponent(cc.Sprite);
        let name = node.getChildByName("name").getComponent(cc.Label);
        let num = node.getChildByName("num").getComponent(cc.Label);
        node.active = true;
        if (data.Nums !== undefined) {
            RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Nums}`);
        } else {
            RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Num}`);
        }
        if (!this.expressId && !this.continueBuy) {
            name.string = `${data.Num}-${data.Name}`;
        } else {
            name.string = data.Name
        }
        node.parent = this.itemScroll;
        if (this.continueBuy) {
            node["Instone"] = data.Instone
            num.string = UIUtil.toStone(data.Instone);
            this.gold += data.Instone
            this.seed1.getComponent(cc.RichText).string = this.seedText.string = `共需消耗<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>`;
        } else {
            num.string = UIUtil.toStone(this.lotNum);
            if (this.goodList.length - 1 == index) {
                this.gold = this.goodList.length * this.lotNum
                this.seed1.getComponent(cc.RichText).string = this.seedText.string = `单类种子购买${UIUtil.toStone(this.lotNum)}金币,\n共需消耗<color=#ED5B26>${UIUtil.toStone(this.gold)}金币</color>`;
            }
        }
    }
    private closeCanel() {
        this.close()
        App.ui.open(UIConstant.SeedShopView)
    }
    private checkFun() {
        let termid = App.gdata.farmGameInfo.Rid;
        if (this.continueBuy) {
            console.log('再来一单');
            let applyArr: string[] = []
            let applyInfo: string = ''
            this.goodList.forEach((item: any, index) => {
                this.itemScroll.children.forEach((items: cc.Node, indexs) => {
                    if (index === indexs) {
                        applyArr.push(`${item.Nums}:${items['Instone']}`)
                    }
                })
            })
            applyInfo = applyArr.join(',')
            console.log(applyInfo);
            App.GameProxy.CustomeApply({
                data: {
                    termid,
                    applyInfo: applyInfo
                },
                onSuccess: (data) => {
                    if (data.Result === -4) {
                        App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                            data: {
                                showKey: "deficiency",
                                data: data.Data
                            }
                        })
                        this.close();
                    }
                    if (data.Result === -1) {
                        App.ui.open(UIConstant.AllAlertView, this.node, {
                            data: {
                                showKey: "otherAward",
                                data: data.Msg
                            }
                        })
                    }
                    if (data.Result === 0) {
                        // this.node.parent.active = false
                        App.ui.open(UIConstant.AllAlertView, null, {
                            data: {
                                showKey: "buySeed",
                                data: data.Data
                            }
                        })
                        this.close();
                        EventDispatcher.dispatch(GameEvent.INIT_SHOP)
                        EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                    }

                }
            })
            return
        }
        if (this.expressId) {
            App.GameProxy.applyByExpress({
                data: {
                    termid: termid,
                    expressid: this.expressId,
                    amount: this.lotNum
                },
                onSuccess: (data) => {
                    if (data.Result === -4) {
                        App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                            data: {
                                showKey: "deficiency",
                                data: data.Data
                            }
                        })
                        this.close();
                    } else if (data.Result === 0) {
                        this.node.parent.active = false
                        App.ui.open(UIConstant.AllAlertView, null, {
                            data: {
                                showKey: "buySeed",
                                data: data.Data
                            }
                        })
                        this.close();
                        EventDispatcher.dispatch(GameEvent.INIT_SHOP)
                        EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                    } else {
                        App.ui.open(UIConstant.AllAlertView, this.node, {
                            data: {
                                showKey: "otherAward",
                                data: data.Msg
                            }
                        })
                    }

                },
                thisObj: this
            })
        } else {
            let nums = "";
            this.goodList.forEach((data: any, index) => {
                if (index == this.goodList.length - 1) {
                    nums = nums + data.Num
                } else {
                    nums = nums + data.Num + ","
                }
            })
            console.log(this.goodList, nums);
            App.GameProxy.apply({
                data: {
                    termid: termid,
                    nums: nums,
                    amount: this.lotNum
                },
                onSuccess: (data) => {
                    if (data.Result === -4) {
                        App.ui.open(UIConstant.AllAlertView, this.node.parent, {
                            data: {
                                showKey: "deficiency",
                                data: data.Data
                            }
                        })
                        this.close();
                    }
                    if (data.Result === 0) {
                        this.node.parent.active = false
                        App.ui.open(UIConstant.AllAlertView, null, {
                            data: {
                                showKey: "buySeed",
                                data: data.Data
                            }
                        })
                        this.close();
                        EventDispatcher.dispatch(GameEvent.INIT_SHOP)
                        EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                    }
                    if (data.Result === -1) {
                        App.ui.open(UIConstant.AllAlertView, this.node, {
                            data: {
                                showKey: "otherAward",
                                data: data.Msg
                            }
                        })
                    }

                },
                thisObj: this
            })
        }
    }
}
