import RecycleScroller from "../../components/virtuallist/RecycleScroller";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";
import PigAttackViewItem from "./PigAttackViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PigAttackView extends BaseUI {
    protected viewContent: cc.Node = null
    private closeBtn: cc.Node = null;
    attackItem: cc.Node = null
    scrollContent: cc.Node = null
    scrollView: cc.Node
    protected attackText: cc.Node = null;
    private historyList = []
    private loadPage: number = 1
    private totalPage

    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.closeBtn = this.viewContent.getChildByName('popup_close')
        this.attackItem = this.viewContent.getChildByName('attackItem')
        this.scrollContent = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.scrollView = this.viewContent.getChildByName('scrollview')
        this.attackText = this.attackItem.getChildByName('attackText')

        this.attackItem.active = false
        let ScrollView: RecycleScroller = this.viewContent.getChildByName('scrollview').getComponent(RecycleScroller);
        ScrollView.itemTemplate = this.attackItem;
        ScrollView.setDataRenderer(PigAttackViewItem);
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
        this.scrollView.on('scroll-to-bottom', this.scrollLoad, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
        this.scrollView.off('scroll-to-bottom', this.scrollLoad, this)
    }
    protected updateView(): void {
        this.loadPage = 1
        this.gameHistory(this.loadPage)
    }
    private scrollLoad() {
        const page = ++this.loadPage
        let onSuccess = (res) => {
            if (res.list.length === 0) return
            const addList = res.list.filter((item) => {
                return item.GameEnd
            })
            this.historyList.push(...addList)
            this.updateHistory(this.historyList)

        }
        App.GameProxy.GameHistory({ onSuccess, data: { page, pagesize: 30 } })
    }
    private gameHistory(page) {
        this.updateHistory(this.historyList)
        let onSuccess = (res) => {
            this.totalPage = res.total
            this.historyList = res.list.filter((item) => {
                return item.GameEnd
            })
            this.updateHistory(this.historyList)
            // FramingManager.updateRecordList(this.historyList, this.getItem, this)
        }
        App.GameProxy.GameHistory({ onSuccess, data: { page, pagesize: 30 } })
    }
    private updateHistory(historyList) {

        let dataList = [];
        for (let i: number = 0; i < historyList.length; i++) {
            dataList.push({
                view: this,
                data: historyList[i]
            });
        }
        let ScrollView: RecycleScroller = this.viewContent.getChildByName('scrollview').getComponent(RecycleScroller);
        ScrollView.dataProvider = dataList;
        const index = (this.loadPage - 1) * 30
        if (index > 0) ScrollView.scrollToItem(index)
    }
    private getItem(item) {
        if (!this.attackItem) return
        let attackItemCopy = cc.instantiate(this.attackItem)
        const name = attackItemCopy.getChildByName('name')
        const odds = attackItemCopy.getChildByName('odds')
        const rank = attackItemCopy.getChildByName('rank')
        attackItemCopy.active = true
        name.getComponent(cc.Label).string = item.Name
        odds.getComponent(cc.Label).string = item.Odds
        rank.getComponent(cc.Label).string = item.Period + '号'
        RES.setSpriteFrame(attackItemCopy.getChildByName('success_fruit').getChildByName('fruitPic').getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Nums}`)
        this.scrollContent.addChild(attackItemCopy)
    }
}