import BaseUI from "../BaseUI";

const {ccclass, property} = cc._decorator;

/**
 * 转圈加载窗
 */
@ccclass
export default class LoadingTip extends BaseUI {

    protected _data:{
        msg?:string;
        isModel?:boolean;
    };

    /** 模态背景（如果此窗口为模态窗，则激活此节点，否则隐藏） */
    public modelBg:cc.Node;

    public content:cc.Node;
    public loadIcon:cc.Node;
    /** 文本 */
    public msg:cc.Label;

    protected validateUI():void
    {
        this.modelBg = this.node.getChildByName("modelBg");
        this.content = this.node.getChildByName("content");
        this.loadIcon = this.content.getChildByName("ct").getChildByName("loadIcon");
        this.msg = this.content.getChildByName("ct").getChildByName("tipBg").getChildByName("msg").getComponent(cc.Label);
    }

    protected updateView():void
    {
        // this.loadIcon.runAction(cc.repeatForever(cc.rotateBy(1, 360)));

        if(this._data)
        {
            this.msg.string = this._data.msg;
            if(this._data.isModel != false)
            {
                this.modelBg.active = true;
            }else
            {
                this.modelBg.active = true;
            }
        }
    }

    public setMsg(value:string):void
    {
        this.msg.string = value;
    }

    /**
     * 添加监听事件
     */
    protected initEvent():void
    {
    }

    /**
     * 移除监听事件
     */
    protected removeEvent():void
    {
        if(this.loadIcon)
        {
            this.loadIcon.stopAllActions();
        }
    }

}
