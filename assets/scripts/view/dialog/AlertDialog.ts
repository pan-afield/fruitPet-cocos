import UIConstant from "../../constant/UIConstant";
import App from "../../manager/App";
import BaseUI from "../BaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AlertDialog extends BaseUI {

    /** 有取消、确定按钮 */
    public static TYPE_1:number = 1;
    /** 只有确定按钮 */
    public static TYPE_2:number = 2;

    /**
     * @param type 警告框类型
     * @param msg 警告框内容
     * @param okCallBack 点击 确定 时执行的动作
     * @param cancelCallBack 点击 取消 时执行的动作
     * @param callBackObj 回调函数的执行者（this）
     * @param okLabel 确定 按钮的显示文本
     * @param cancelLabel 取消 按钮的显示文本
     */
    protected _data:{
        title?:string;
        type?:number;
        msg?:string;
        okCallBack?:Function;
        cancelCallBack?:Function;
        callBackObj?:any
        okLabel?:string
        cancelLabel?:string
    };

    public panel_front:cc.Node;
    public content:cc.Node;
    public btnPanel:cc.Node;
    public scrollview:cc.Node;
    public msg:cc.RichText;
    public itemSprite:cc.Sprite;
  

    public btnCancel:cc.Button;
    public btnOk:cc.Button;
    public title:cc.Label;
    public mask:cc.Node
    public closeBtn:cc.Node

    protected validateUI():void
    {
        this.panel_front = this.node.getChildByName("panel_front");
        this.closeBtn = this.panel_front.getChildByName("icon_close");
        this.content = this.panel_front.getChildByName("content");
        this.btnPanel = this.panel_front.getChildByName("btnPanel");
        this.scrollview = this.content.getChildByName("scrollview");
        this.msg = this.scrollview.getChildByName("view").getChildByName("content").getChildByName("msg").getComponent(cc.RichText);
        this.btnOk = this.btnPanel.getChildByName("btnOk").getComponent(cc.Button);
        this.btnCancel = this.btnPanel.getChildByName("btnCancel").getComponent(cc.Button);
        this.title = this.panel_front.getChildByName("title").getComponent(cc.Label);
        this.mask = this.node.getChildByName('mask')

    }

    protected updateView():void
    {
        this.btnOk.node.active = true;
        this.btnCancel.node.active = true;

        if(!this.data || !this._data.msg)
        {
            return;
        }
        let type:number = this._data.type;
        if(!isNaN(type))
        {
            if(type == AlertDialog.TYPE_1)
            {
                this.btnOk.node.active = true;
                this.btnCancel.node.active = true;
            }else if(type == AlertDialog.TYPE_2)
            {
                this.btnOk.node.active = true;
                this.btnCancel.node.active = false;
            }
        }

        let okStr:string = "确定";
        // let cancelStr:string = "取消";
        
        if(this._data.okLabel && this._data.okLabel != "")
        {
            okStr = this._data.okLabel;
        }
        this.btnOk.node.getChildByName("text").getComponent(cc.Label).string = okStr;
        // if(this._data.cancelLabel && this._data.cancelLabel != "")
        // {
        //     cancelStr = this._data.cancelLabel;
        // }
        // this.btnCancel.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cancelStr;

        this.msg.string = this._data.msg;

        this.title.string = this._data.title?this._data.title:"温馨提示";
    }
    
    protected initFinish():void
    {
        this.scheduleOnce(this.updatePos, 0.05);
        // this.updatePos();
    }

    public updatePos():void
    {
        let content:cc.Node = this.scrollview.getChildByName("view").getChildByName("content");
        content.getComponent(cc.Widget).updateAlignment();
        content.position = cc.v3(0, 0);
    }

    /**
     * 添加监听事件
     */
    protected initEvent():void
    {
        this.btnCancel.node.on("click", this.onBtnCancel, this);
        this.btnOk.node.on("click", this.onBtnOk, this);
        this.mask.on("click", this.close, this);
        this.closeBtn.on("click", this.close, this);
    }

    /**
     * 移除监听事件
     */
    protected removeEvent():void
    {
        this.btnCancel.node.off("click", this.onBtnCancel, this);
        this.btnOk.node.off("click", this.onBtnOk, this);
        this.mask.off("click", this.close, this);
        this.closeBtn.off("click", this.close, this);
    }

    private onBtnCancel():void
    {
        // App.gdata.playBtnClickMusic();
        if(this._data.cancelCallBack)
        {
            if(this._data.callBackObj)
            {
                this._data.cancelCallBack.apply(this._data.callBackObj);
            }else
            {
                this._data.cancelCallBack();
            }
        }
        this.close();
    }
    private onBtnOk():void
    {
        // App.gdata.playBtnClickMusic();
        if(this._data.okCallBack)
        {
            if(this._data.callBackObj)
            {
                this._data.okCallBack.apply(this._data.callBackObj);
            }else
            {
                this._data.okCallBack();
            }
        }
        this.close();
    }
}
