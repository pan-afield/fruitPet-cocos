import App from "../../manager/App";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitRankView extends BaseUI {
    private closeBtn: cc.Node
    private scrollItem: cc.Node
    private myRanking: cc.Node
    private scrollview: cc.Node
    private time: cc.Node
    private rule: cc.Node
    private plante: cc.Node
    private day: number
    protected validateUI(): void {
        this.plante = this.node.getChildByName('bg_box02@2x').getChildByName('img_title@2x').getChildByName('plante')
        this.scrollItem = this.node.getChildByName('scrollItem')
        this.closeBtn = this.node.getChildByName('icon_close')
        this.myRanking = this.node.getChildByName('myRanking')
        this.scrollview = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.time = this.node.getChildByName('time')
        this.rule = this.node.getChildByName('rule')
    }
    protected updateView(): void {
        console.log('updateView');
        
        this.day = 0
        this.getRankList(this.day)
    }
    protected initFinish(): void {

    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
        this.rule.on('click', this.changeList, this)

    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
        this.rule.off('click', this.changeList, this)
    }
    private getRankList(day) {
        if (day) {
            this.plante.getComponent(cc.Label).string = '昨日已种植'
            this.rule.getChildByName('New Label').getComponent(cc.Label).string = '查看今日'
        } else {
            this.plante.getComponent(cc.Label).string = '已种植'
            this.rule.getChildByName('New Label').getComponent(cc.Label).string = '查看昨日'
        }
        let onSuccess = (res) => {
            this.scrollview.removeAllChildren()
            this.myRanking.removeAllChildren()
            res.list.forEach(item => {
                if(!this.scrollItem) return
                const itemCopy = cc.instantiate(this.scrollItem)
                itemCopy.active = true
                const icon = itemCopy.getChildByName('icon')
                const ranking = itemCopy.getChildByName('ranking')
                const user = itemCopy.getChildByName('user')
                const planted = itemCopy.getChildByName('planted')
                const award = itemCopy.getChildByName('award')
                if (item.No > 3) {
                    ranking.active = true
                    ranking.getComponent(cc.Label).string = item.No
                } else {
                    icon.active = true
                    RES.setSpriteFrame(icon.getComponent(cc.Sprite), `view/fruitRank/icon_0${item.No}`)
                }
                user.getComponent(cc.Label).string = item.Nick
                planted.getComponent(cc.Label).string = UIUtil.toStone(item.Instone)
                award.getComponent(cc.Label).string = 'X' + item.Reward
                this.scrollview.addChild(itemCopy)
            })
            if(!this.scrollItem) return
            const itemCopy = cc.instantiate(this.scrollItem)
            itemCopy.active = true
            itemCopy.y = -10
            const icon = itemCopy.getChildByName('icon')
            const ranking = itemCopy.getChildByName('ranking')
            const line = itemCopy.getChildByName('line')
            line.active = false
            const user = itemCopy.getChildByName('user')
            const planted = itemCopy.getChildByName('planted')
            const award = itemCopy.getChildByName('award')
            if (res.mine.No > 3) {
                ranking.active = true
                ranking.getComponent(cc.Label).string = res.mine.No
            } else {
                icon.active = true
                RES.setSpriteFrame(icon.getComponent(cc.Sprite), `view/fruitRank/icon_0${res.mine.No}`)
            }
            user.getComponent(cc.Label).string = res.mine.Nick
            planted.getComponent(cc.Label).string = UIUtil.toStone(res.mine.Instone)
            award.getComponent(cc.Label).string = 'X' + res.mine.Reward
            this.myRanking.addChild(itemCopy)
        }
        App.NewUserProxy.Rank({ onSuccess, data: { flag: day } })
    }
    private getRankItem() {

    }

    private changeList() {
        if (this.day) {
            this.day = 0
            this.getRankList(0)
        } else {
            this.day = 1
        this.getRankList(1)
        }
    }
}