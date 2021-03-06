
import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import BaseUI from "../BaseUI";
import UIUtil from "../../util/UIUtil"

const { ccclass, property } = cc._decorator;
@ccclass
export default class FishBagView extends BaseUI {
    private closeBtn: cc.Node
    private toUpgradeBtn: cc.Node
    private fishNum: cc.Node // 鱼干总数
    private fishQuestion: cc.Node
    private fishItem: cc.Node
    private fishContent: cc.Node
    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_close')
        this.toUpgradeBtn = this.node.getChildByName('bt')
        this.fishNum = this.node.getChildByName('fish_num').getChildByName('number')
        this.fishQuestion = this.node.getChildByName('fish_num').getChildByName('fish_question')
        this.fishContent = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.fishItem = this.node.getChildByName('scrollItem')
    }
    protected updateView(): void {
        this.fishNum.getComponent(cc.Label).string = App.gdata.userInfo.curProps
        this.getFishRecored()
    }
    protected openFishQuestion() {
        this.close()
        EventDispatcher.dispatch(GameEvent.OPEN_FISH, { from: 'fishBag' })
    }
    protected toUpgrade() {
        this.close()
        // App.ui.open(UIConstant.UpgradeView)
        // App.ui.open(UIConstant.UserInfoView)
        App.ui.open(UIConstant.FruitBagView)
    }
    protected getFishRecored() {
        this.fishContent.removeAllChildren()
        App.PetPropProxy.PropBatchLogs({
            onSuccess: (res) => {
                res.list.forEach((item) => {
                    if(!this.fishItem) return
                    let itemCopy = cc.instantiate(this.fishItem)
                    let label = itemCopy.getChildByName('label')
                    let time = itemCopy.getChildByName('time')
                    let num = itemCopy.getChildByName('num')
                    label.getComponent(cc.Label).string = item.remark
                    let resTime = Number(item.writetime.split('(')[1].split(')')[0])
                    time.getComponent(cc.Label).string = UIUtil.dateFormat(resTime, "YYYY-MM-DD HH:mm:ss")
                    if (item.nums > 0) {
                        num.getComponent(cc.Label).string = '+' + item.nums
                    } else {
                        num.color = cc.color(97, 179, 101, 1)
                        num.getComponent(cc.Label).string = item.nums
                    }
                    itemCopy.active = true
                    this.fishContent.addChild(itemCopy)
                })
            }, data: { pid: 1, page: 1, pagesize: 20 }
        })
    }
    protected backToBag() {
        this.close()
        // App.ui.open(UIConstant.FruitBagView)
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.backToBag, this)
        this.toUpgradeBtn.on('click', this.toUpgrade, this)
        this.fishQuestion.on('click', this.openFishQuestion, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.backToBag, this)
        this.toUpgradeBtn.off('click', this.toUpgrade, this)
        this.fishQuestion.off('click', this.openFishQuestion, this)
    }
}