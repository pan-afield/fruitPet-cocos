import DataRenderer from "../DataRenderer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestDataRenderer extends DataRenderer {
    /**
     * 数据发生变化
     */
    public onDataChanged():void
    {
        this.node.getChildByName("Label").getComponent(cc.Label).string = this._data;
    }
}