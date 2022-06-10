// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StrategyView extends BaseUI {
    private closeBtn: cc.Node = null
    private content: cc.Node = null
    private scrollContent: cc.Node = null
    private viewContent:cc.Node;
    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.closeBtn = this.viewContent.getChildByName('icon_close')
        // this.content = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        // this.scrollContent = this.viewContent.getChildByName('scrollContent')
    }
    protected updateView(): void {
        // this.content.removeAllChildren()
        // let scrollContentCopy = cc.instantiate(this.scrollContent)
        // scrollContentCopy.active = true
        // this.content.addChild(scrollContentCopy)
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
    }
}
