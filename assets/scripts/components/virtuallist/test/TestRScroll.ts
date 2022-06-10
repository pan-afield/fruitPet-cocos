// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import RecycleScroller from "../RecycleScroller";
import TestDataRenderer from "./TestDataRenderer";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TestRScroll extends cc.Component {

    @property({
        type:RecycleScroller
    })
    scroller: RecycleScroller = null;

    @property({
        type:cc.Prefab
    })
    itemTempl: cc.Prefab = null;

    @property({
        type:cc.Button
    })
    btnAdd: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.scroller.itemTemplate = this.itemTempl;
        this.scroller.setDataRenderer(TestDataRenderer);
        this.scroller.dataProvider = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    }

    // update (dt) {}

    onEnable(){
        if(this.btnAdd)
        {
            this.btnAdd.node.on("click", this.onBtnAdd, this);
        }
    }

    private onBtnAdd():void
    {
        // this.scroller.addItem(25);
        // this.scroller.insertItem(25, 23);
        this.scroller.removeItem(22);
    }
}
