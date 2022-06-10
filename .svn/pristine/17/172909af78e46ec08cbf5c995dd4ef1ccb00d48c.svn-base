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
import FramingManager from "../../manager/FramingManager";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PetLevelView extends BaseUI {
    private closeBtn: cc.Node;
    private scrollView: cc.Node
    private item: cc.Node

    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('icon_close')
        this.scrollView = this.node.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.item = this.node.getChildByName('item')
    }
    protected updateView(): void {
        this.getPetLevel()
    }
    private getPetLevel() {
        this.scrollView.removeAllChildren()
        let onSuccess = (res) => {
            console.log(res);
            FramingManager.updateRecordList(res.levels, this.getItem, this);

        }
        App.PetProxy.getPetLevels({ onSuccess })
    }
    private getItem(item) {
        if(!this.item) return
        let itemCopy = cc.instantiate(this.item)
        let lv = itemCopy.getChildByName('lv')
        let fruit = itemCopy.getChildByName('fruit')
        let gift = itemCopy.getChildByName('gift')
        let feed = itemCopy.getChildByName('feed')
        lv.getComponent(cc.Label).string = item.level
        fruit.getComponent(cc.Label).string = UIUtil.toStone(item.maxuplevelspend)
        gift.getComponent(cc.Label).string = UIUtil.toStone(item.reward)
        feed.getComponent(cc.Label).string = UIUtil.toStone(item.props)
        itemCopy.active = true
        this.scrollView.addChild(itemCopy)
    }
    private closeLv() {
        this.close()
        App.ui.open(UIConstant.UserInfoView)
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.closeLv, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.closeLv, this)
    }
}
