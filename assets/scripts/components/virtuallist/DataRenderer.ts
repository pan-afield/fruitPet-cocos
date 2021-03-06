const {ccclass, property} = cc._decorator;

/**
 * 所有UI组件的基类
 * 实现了组件的显示/隐藏、打开/关闭、事件监听、数据设置、界面刷新等机制
 */
@ccclass
export default class DataRenderer extends cc.Component {

    protected _data:any;

    public dataIndex:number = 0;

    public set data(value:any)
    {
        this._data = value;
        if(!this.isValid)
        {
            return;
        }

        this.onDataChanged();
    }

    public get data():any
    {
        return this._data;
    }

    /**
     * 数据发生变化
     */
    protected onDataChanged():void
    {

    }
}