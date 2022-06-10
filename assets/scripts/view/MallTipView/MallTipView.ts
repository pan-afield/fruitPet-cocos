// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MallTipView extends BaseUI {

    closeBtn: cc.Node
    continueBtn: cc.Node
    msgText: cc.Node
    okFun: Function = () => { }
    okLabel: cc.Node

    /**
     * 识别所有需要操作的节点或组件
     */
    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_clsoe')
        this.continueBtn = this.node.getChildByName('btn_gift')
        this.msgText = this.node.getChildByName('msg')
        this.okLabel = this.node.getChildByName('okLabel')
        //子类在这里更新所有节点句柄
        //如：this.item = this.node.getChildByName("item");
    }


    protected updateView(): void {
        const { data, okCallBack, okLabel } = this.data
        if (okCallBack) this.okFun = okCallBack
        else this.okFun = () => { }
        this.msgText.getComponent(cc.RichText).string = `${data.msg}`
        if (okLabel) this.okLabel.getComponent(cc.Label).string = `${okLabel}`
        else this.okLabel.getComponent(cc.Label).string = '确定'
    }

    private toContinue() {
        this.close()
        this.okFun()
    }
    /**
     * 添加监听事件
     */
    protected initEvent(): void {
        this.continueBtn.on('click', this.toContinue, this)
        this.closeBtn.on('click', this.close, this)
    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {
        this.continueBtn.off('click', this.toContinue, this)
        this.closeBtn.off('click', this.close, this)
    }
}
