import UIConstant from "../../constant/UIConstant";
import App from "../../manager/App";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;
@ccclass
export default class DrawRecordView extends BaseUI {
    closeBtn: cc.Node
    scrollItem: cc.Node
    scrollContent: cc.Node
    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_close')
        this.scrollItem = this.node.getChildByName('scrollItem')
        this.scrollContent = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
    }
    protected updateView(): void {
        this.scrollItem.active = false
        this.getRecordList()
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.backToDraw, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.backToDraw, this)
    }
    private getRecordList() {
        this.scrollContent.removeAllChildren()
        App.ActDrawProxy.DrawLogs({
            onSuccess: (res) => {
                res.Logs.forEach(item => {
                    const node = cc.instantiate(this.scrollItem)
                    node.active = true
                    node.getChildByName('time').getComponent(cc.Label).string = UIUtil.dateFormat(item.dateflag.split('(')[1].split(')')[0])
                    node.getChildByName('gift').getComponent(cc.Label).string = `+${item.name}`
                    node.parent = this.scrollContent
                })
            }
            , data: { page: 1, pagesize: 30 }
        })
    }
    private backToDraw() {
        this.close()
        App.ui.open(UIConstant.DrawView)
    }
}
