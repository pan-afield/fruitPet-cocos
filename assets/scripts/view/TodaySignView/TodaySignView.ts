import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";
import AlertDialog from "../dialog/AlertDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TodaySignView extends BaseUI {
    private title: cc.Node
    private closeBtn: cc.Node
    private signBtn: cc.Node
    private hint: cc.Node
    private fishNum: cc.Node
    private today: cc.Node
    private otherDay: cc.Node
    private yesAward: cc.Node
    private todayAward: cc.Node
    private content: cc.Node
    private item: cc.Node
    private mask: cc.Node
    private sevenDay: string[] = ['一', '二', '三', '四', '五', '六', '七']
    private fishLast: cc.Node
    private smallFruit: cc.Node
    private bigFruit: cc.Node
    private otherBigFruit: cc.Node
    private hint1: cc.Node
    protected validateUI(): void {
        this.title = this.node.getChildByName('img_signin')
        this.today = this.node.getChildByName('today')
        this.mask = this.node.getChildByName('mask')
        this.otherDay = this.node.getChildByName('otherDay')
        this.hint = this.node.getChildByName('otherDay').getChildByName('hint')
        this.hint1 = this.node.getChildByName('today').getChildByName('hint')
        this.closeBtn = this.today.getChildByName('icon_close')
        this.signBtn = this.today.getChildByName('signBtn')
        this.smallFruit = this.today.getChildByName('smallFruit')
        this.bigFruit = this.today.getChildByName('bigFruit')
        this.fishNum = this.today.getChildByName('fishNum')
        this.yesAward = this.otherDay.getChildByName('award').getChildByName('num')
        this.todayAward = this.otherDay.getChildByName('todayAward')
        this.content = this.otherDay.getChildByName('content')
        this.item = this.otherDay.getChildByName('item')
        this.fishLast = this.otherDay.getChildByName('fishLast')
        this.otherBigFruit = this.otherDay.getChildByName('img_bg').getChildByName('img_fish')
    }
    protected initFinish(): void {
        console.log(this.data);
        this.initData(this.data)
    }
    protected updateView(): void {

    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
        this.mask.on('click', this.close, this)
        this.signBtn.on('click', this.daySignAward, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
        this.mask.off('click', this.close, this)
        this.signBtn.off('click', this.daySignAward, this)
    }
    /* 初始数据 */
    initData(data) {
        this.fishNum.getComponent(cc.Label).string = data.reward
        if (data.status) {
            RES.setSpriteFrame(this.title.getComponent(cc.Sprite), 'view/todaySign/img_text')
            this.otherDay.active = true
            this.today.active = false
            this.hint1.getComponent(cc.Label).string = this.hint.getComponent(cc.Label).string = `明日可领取${data.list[data.day].name}`
            this.yesAward.getComponent(cc.Label).string = data.list[data.day].nums
            this.content.removeAllChildren()
            data.list.forEach((item, index) => {
                if (index === data.list.length - 1) {
                    if (!this.fishLast) return
                    let itemCopy = cc.instantiate(this.fishLast)
                    let pic1 = itemCopy.getChildByName('img_fish1')
                    let pic2 = itemCopy.getChildByName('img_fish2')
                    itemCopy.active = true
                    RES.setSpriteFrame(pic1.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                    RES.setSpriteFrame(pic2.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                    itemCopy.getChildByName('day').getComponent(cc.Label).string = `第${this.sevenDay[index]}天`
                    itemCopy.getChildByName('num').getComponent(cc.Label).string = `+ ${item.nums}`
                    this.content.addChild(itemCopy)
                    return
                }
                if (item.day === data.day) {
                    this.todayAward.getComponent(cc.RichText).string = `获得<color=#FF8739><b>${item.nums}</b></color>个${item.name}`
                    RES.setSpriteFrame(this.otherBigFruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                }
                if (!this.item) return
                let itemCopy = cc.instantiate(this.item)
                itemCopy.active = true
                let day = itemCopy.getChildByName('day')
                let num = itemCopy.getChildByName('num')
                let pic = itemCopy.getChildByName('img')
                RES.setSpriteFrame(pic.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                day.getComponent(cc.Label).string = `第${this.sevenDay[index]}天`
                num.getComponent(cc.Label).string = `+ ${item.nums}`
                if (item.day <= data.day) {
                    RES.setSpriteFrame(itemCopy.getChildByName('fish_one').getComponent(cc.Sprite), 'view/todaySign/fish_done')
                    itemCopy.getChildByName('done').active = true
                }
                this.content.addChild(itemCopy)
            })
        } else {
            RES.setSpriteFrame(this.title.getComponent(cc.Sprite), 'view/todaySign/img_signin')
            this.otherDay.active = false
            this.today.active = true
            this.hint1.getComponent(cc.Label).string = this.hint.getComponent(cc.Label).string = `连续签到${data.day}天签到奖励`
            data.list.forEach(item => {
                if (item.day === data.day) {
                    RES.setSpriteFrame(this.smallFruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                    RES.setSpriteFrame(this.bigFruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.pid}`)
                }
            })
        }
    }
    /* 领取签到 */
    daySignAward() {
        App.NewUserProxy.ActSign({
            onSuccess: (res) => {
                console.log(res);
                EventDispatcher.dispatch(GameEvent.PET_PROP)
                EventDispatcher.dispatch(GameEvent.UPDATE_PET_INFO)
                App.PetProxy.petInfo({
                    onSuccess: (res) => {
                        this.initData(res.actDaySign)
                    }
                })
            }
        })
    }
}