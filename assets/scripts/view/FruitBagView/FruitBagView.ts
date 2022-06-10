import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitBagView extends BaseUI {

    private closeBtn: cc.Node = null;
    protected scrollContent: cc.Node = null;
    protected scrollItem: cc.Node = null
    protected bagHint: cc.Node = null
    protected fruitList: []
    protected feedBtn: cc.Node;
    private sellBtn: cc.Node
    private sellNum: cc.Node
    private total: number = 0;
    private selectedFruit: Object[] = []
    private selectedNum: number = 0
    private itemStr: string = ''
    private sellView: cc.Node
    private closeSell: cc.Node
    private sellPopupBtn: cc.Node
    private editbox: cc.Node
    private fruitNum: cc.Node
    private maxBtn: cc.Node
    private halfBtn: cc.Node
    private sellPopupNum: cc.Node
    private sellResultView: cc.Node
    private closeResult: cc.Node
    private confirnResult: cc.Node
    private cancelResult: cc.Node
    private resultText: cc.Node
    private allFruit: Object[] = []
    private maxNum: number = 0
    private cancelBtn: cc.Node
    private selAllBtn: cc.Node
    private short: cc.Node
    private sellViewMask: cc.Node
    private sellResultViewMask: cc.Node
    private sellResultConfirm: cc.Node
    private recordBtn: cc.Node

    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_close')
        this.recordBtn = this.node.getChildByName('bt_record')
        this.short = this.node.getChildByName('canUp').getChildByName('label')
        this.selAllBtn = this.node.getChildByName('btnAll')
        this.sellNum = this.node.getChildByName('sellNum')
        this.scrollItem = this.node.getChildByName('item')
        this.scrollContent = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.bagHint = this.node.getChildByName('allFruit')
        this.feedBtn = this.node.getChildByName("bt_upgrade");
        this.sellBtn = this.node.getChildByName("bt_sale");
        this.sellView = this.node.getChildByName("sellView");
        this.closeSell = this.sellView.getChildByName("icon_close");
        this.sellViewMask = this.sellView.getChildByName("mask");
        this.sellPopupBtn = this.sellView.getChildByName("bt_sell");
        this.cancelBtn = this.sellView.getChildByName("cancel");
        this.editbox = this.sellView.getChildByName("editbox");
        this.fruitNum = this.sellView.getChildByName("fruitNum");
        this.maxBtn = this.sellView.getChildByName("btn_max");
        this.halfBtn = this.sellView.getChildByName("btn_half");
        this.sellPopupNum = this.sellView.getChildByName("sellNum");
        this.sellResultView = this.node.getChildByName("sellResultView")
        this.sellResultViewMask = this.sellResultView.getChildByName("mask");
        this.closeResult = this.sellResultView.getChildByName("icon_close")
        this.confirnResult = this.sellResultView.getChildByName("bt_suer")
        this.cancelResult = this.sellResultView.getChildByName("cancel")
        this.resultText = this.sellResultView.getChildByName("resultText")
        this.sellResultConfirm = this.sellResultView.getChildByName("confirmBtn")
    }
    protected updateView(): void {
        // let onSuccess = (res) => {
        //     if (res.curProps < res.nextLevel.props) {
        //         this.feedBtn.getChildByName('label').color = cc.color(255, 255, 255)
        //         this.short.getComponent(cc.Label).string = `还差${(res.nextLevel.props - res.curProps)}水果升至下一级`
        //     } else {
        //         this.short.getComponent(cc.Label).string = `升最高获赠${UIUtil.toStone(res.maxLevelReward)}礼券`
        //         this.feedBtn.getChildByName('label').color = cc.color(255, 229, 195)
        //     }

        // }
        // App.UserProxy.getUserInfo({ onSuccess })

        this.getUserBag()
        this.sellNum.getComponent(cc.Label).string = '0'
        RES.setSpriteFrame(this.selAllBtn.getComponent(cc.Sprite), 'view/fruitBags/bt_sel')
        this.selAllBtn.getChildByName('label').getComponent(cc.Label).string = '取消全选'
        this.selAllBtn.getChildByName('label').x = -25
        // this.selectedFruit = []

    }
    protected initEvent(): void {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.close, this)
        this.editbox.on('text-changed', this.changeEditBox, this)
        this.recordBtn.on('click', this.openFish, this)
        this.feedBtn.on("click", this.feedCat, this);
        this.selAllBtn.on("click", this.selectAll, this);
        this.sellBtn.on("click", this.sellFruit, this);
        this.closeSell.on("click", this.sellFruitClose, this);
        this.cancelBtn.on("click", this.sellFruitClose, this);
        this.sellViewMask.on("click", this.sellFruitClose, this);
        this.maxBtn.on("click", this.toMax, this);
        this.halfBtn.on("click", this.toHalf, this);
        this.sellPopupBtn.on("click", this.sellCoin, this);
        this.closeResult.on("click", this.closeResultView, this);
        this.sellResultViewMask.on("click", this.closeResultView, this);
        this.sellResultConfirm.on("click", this.closeResultView, this);
        this.confirnResult.on("click", this.toFarm, this);
        this.cancelResult.on("click", this.coinRecord, this);
    }
    protected removeEvent(): void {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.close, this)
        this.editbox.off('text-changed', this.changeEditBox, this)
        this.recordBtn.off('click', this.openFish, this)
        this.feedBtn.off("click", this.feedCat, this);
        this.selAllBtn.off("click", this.selectAll, this);
        this.sellBtn.off("click", this.sellFruit, this);
        this.closeSell.off("click", this.sellFruitClose, this);
        this.cancelBtn.off("click", this.sellFruitClose, this);
        this.sellViewMask.off("click", this.sellFruitClose, this);
        this.maxBtn.off("click", this.toMax, this);
        this.halfBtn.off("click", this.toHalf, this);
        this.sellPopupBtn.off("click", this.sellCoin, this)
        this.closeResult.off("click", this.closeResultView, this);
        this.sellResultViewMask.off("click", this.closeResultView, this);
        this.sellResultConfirm.off("click", this.closeResultView, this);
        this.confirnResult.off("click", this.toFarm, this);
        this.cancelResult.off("click", this.coinRecord, this);
    }
    private openFish() {
        this.close()
        App.ui.open(UIConstant.FishBagView)
    }
    private closeResultView() {
        this.sellResultView.active = false
    }
    private toFarm() {
        if (cc.director.getScene().name === 'mainScene') {
            EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
        } else {
            this.sellResultView.active = false
            this.close()
        }
    }
    private coinRecord() {
        this.sellResultView.active = false
        this.close()
        App.ui.open(UIConstant.CoinRecordView)
    }
    /* 全选 */
    private selectAll(event) {
        if (event.node.getComponent(cc.Sprite).spriteFrame.name === 'bt_sel') { //反选
            RES.setSpriteFrame(event.node.getComponent(cc.Sprite), 'view/fruitBags/bt_nor')
            event.node.getChildByName('label').getComponent(cc.Label).string = '全选'
            this.selAllBtn.getChildByName('label').x = 25
            this.scrollContent.children.forEach(item => {
                item['data'].sel = false
                item.getChildByName('icon_sel').active = false
                // RES.setSpriteFrame(item.getChildByName('icon_sel').getComponent(cc.Sprite), 'view/fruitBags/bt_choose_nor')
            })
            this.selEmpty()
            this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>0</color>金币`
        } else {
            this.selectedNum = 0
            RES.setSpriteFrame(event.node.getComponent(cc.Sprite), 'view/fruitBags/bt_sel')
            event.node.getChildByName('label').getComponent(cc.Label).string = '取消全选'
            this.selAllBtn.getChildByName('label').x = -25
            this.scrollContent.children.forEach(item => {
                item['data'].sel = true
                item.getChildByName('icon_sel').active = true
                // RES.setSpriteFrame(item.getChildByName('icon_sel').getComponent(cc.Sprite), 'view/fruitBags/bt_choose_sel')
            })
            this.selectedFruit = JSON.parse(JSON.stringify(this.allFruit))
            this.selectedFruit.forEach((item: any) => {
                this.selectedNum += item.nums
            })
            this.maxNum = this.selectedNum
            this.sellNum.getComponent(cc.Label).string = UIUtil.toStone(this.maxNum * 10000)
            this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>${UIUtil.toStone(this.maxNum * 10000)}</color>金币`
            this.bagHint.getComponent(cc.RichText).string = `<b>果篮水果总量：<color=#FB6532>${this.maxNum}</color></b>`
        }
        console.log(this.selectedFruit);

    }
    /* 选空 */
    private selEmpty() {
        this.selectedFruit = []
        this.sellNum.getComponent(cc.Label).string = '0'
        this.selectedNum = 0
        this.total = 0
        this.itemStr = ''
    }
    /* 出售 */
    private sellCoin() {
        this.itemStr = ''
        if (this.selectedNum === 0) return
        this.selectedFruit.forEach((item: any) => {
            this.itemStr = this.itemStr + item.biid + ","
        })
        this.itemStr = this.itemStr.substring(0, this.itemStr.length - 1)
        let onSuccess = (res) => {
            this.sellFruitClose()
            this.sellResultView.active = true
            this.resultText.getComponent(cc.RichText).string = `成功将水果出售给农场主获得<color=#FA682C>${UIUtil.toStone(res.coin)}</color>金币！`
            EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
            EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
            this.getUserBag()
            this.selEmpty()
        }
        App.UserBagProxy.SealFruit({ onSuccess, data: { totalnums: this.selectedNum, items: this.itemStr } })
    }
    private toHalf() {
        this.selectedNum = +(this.maxNum / 2).toFixed()
        this.sellPopupNum.getComponent(cc.Label).string = UIUtil.toStone(this.selectedNum * 10000)
        this.editbox.getComponent(cc.EditBox).string = this.selectedNum + ""
    }
    private toMax() {
        this.selectedNum = this.maxNum
        this.sellPopupNum.getComponent(cc.Label).string = UIUtil.toStone(this.selectedNum * 10000)
        this.editbox.getComponent(cc.EditBox).string = this.selectedNum + ""
    }
    private sellFruit() {
        if (this.selectedNum === 0) return
        this.selectedNum = this.maxNum
        this.editbox.getComponent(cc.EditBox).string = this.selectedNum + ""
        this.sellView.active = true
        this.sellPopupNum.getComponent(cc.Label).string = UIUtil.toStone(this.selectedNum * 10000)
        this.fruitNum.getComponent(cc.Label).string = UIUtil.toStone(this.selectedNum)
    }
    private sellFruitClose() {
        this.selectedNum = this.maxNum
        this.sellView.active = false
    }
    private feedCat() {
        this.close()
        cc.director.loadScene("mainScene", function (e) {
            console.log("e", e)
            App.ui.open(UIConstant.UserInfoView)
        });
    }
    private changeEditBox() {
        if (!this.editbox.getComponent(cc.EditBox).string) {
            this.selectedNum = 0
            this.sellPopupNum.getComponent(cc.Label).string = '0'
            this.editbox.getComponent(cc.EditBox).string = '0'
            return
        }
        if (parseInt(this.editbox.getComponent(cc.EditBox).string) > this.maxNum) {
            this.editbox.getComponent(cc.EditBox).string = this.maxNum + ''
        }
        this.selectedNum = parseInt(this.editbox.getComponent(cc.EditBox).string)
        this.sellPopupNum.getComponent(cc.Label).string = UIUtil.toStone(this.selectedNum * 10000)
    }
    private chooseItem(event: cc.Button) {
        let node = event.target || event.node
        let data = node["data"]
        if (data["sel"]) {
            data["sel"] = false
            // RES.setSpriteFrame(node.getChildByName('icon_sel').getComponent(cc.Sprite), 'view/fruitBags/bt_choose_nor')
            node.getChildByName('icon_sel').active = false
            this.selectedFruit.forEach((item: any, index) => {
                if (item.biid === data.biid) {
                    this.selectedFruit.splice(index, 1)
                }
            })
            this.selectedNum -= data.nums
        } else {
            data["sel"] = true
            // RES.setSpriteFrame(node.getChildByName('icon_sel').getComponent(cc.Sprite), 'view/fruitBags/bt_choose_sel')
            node.getChildByName('icon_sel').active = true
            this.selectedFruit.push(data)
            this.selectedNum += data.nums
        }
        this.maxNum = this.selectedNum
        this.sellNum.getComponent(cc.Label).string = UIUtil.toStone(this.maxNum * 10000)
        console.log(this.selectedFruit);
        this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>${UIUtil.toStone(this.maxNum * 10000) || 0}</color>金币`
        if (this.selectedFruit.length === this.allFruit.length) {
            RES.setSpriteFrame(this.selAllBtn.getComponent(cc.Sprite), 'view/fruitBags/bt_sel')
            this.selAllBtn.getChildByName('label').getComponent(cc.Label).string = '取消全选'
            this.selAllBtn.getChildByName('label').x = -25
        } else {
            RES.setSpriteFrame(this.selAllBtn.getComponent(cc.Sprite), 'view/fruitBags/bt_nor')
            this.selAllBtn.getChildByName('label').getComponent(cc.Label).string = '全选'
            this.selAllBtn.getChildByName('label').x = 25
        }
    }
    private getUserBag() {
        this.allFruit = []
        this.selectedFruit = []
        this.total = 0
        this.selectedNum = 0
        this.maxNum = 0
        let onSuccess = (res) => {
            console.log(res);
            this.allFruit = res.list
            this.selectedFruit = JSON.parse(JSON.stringify(this.allFruit))
            this.scrollContent.removeAllChildren();
            if (res.list.length > 0) {
                FramingManager.updateRecordList(res.list, this.getItem, this);
            } else {
                this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>0</color>金币`
                this.bagHint.getComponent(cc.RichText).string = `<b>果篮水果总量：<color=#FB6532>0</color></b>`
            }
        }
        App.UserBagProxy.BagItemList({ onSuccess })
    }
    private getItem(item) {
        if (!this.scrollItem) return
        let itemCopy = cc.instantiate(this.scrollItem)
        let num = itemCopy.getChildByName('num')
        let fruit = itemCopy.getChildByName('fruit')
        let name = itemCopy.getChildByName('name')
        name.getComponent(cc.Label).string = item.name
        num.getComponent(cc.Label).string = item.nums + '个'
        this.total += item.nums
        this.selectedNum = this.total
        this.maxNum = this.selectedNum
        if (this.total) {
            this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>${UIUtil.toStone(this.total * 10000)}</color>金币`
            this.bagHint.getComponent(cc.RichText).string = `<b>果篮水果总量：<color=#FB6532>${this.total}</color></b>`
        } else {
            this.node.getChildByName('selected').getComponent(cc.RichText).string = `已选水果出售可获<color=#FB6532>0</color>金币`
            this.bagHint.getComponent(cc.RichText).string = `<b>果篮水果总量：<color=#FB6532>0</color></b>`
        }
        RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.biid}`)
        item["sel"] = true
        itemCopy["data"] = item
        this.scrollContent.addChild(itemCopy)
        itemCopy.off("click", this.chooseItem, this);
        itemCopy.on("click", this.chooseItem, this);
        itemCopy.active = true;
    }

}