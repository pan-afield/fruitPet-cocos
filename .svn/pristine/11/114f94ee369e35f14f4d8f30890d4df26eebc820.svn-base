import UIConstant from "../../constant/UIConstant";
import RES from "../../res/RES";
import ViewResConfig from "../../res/ViewResConfig";
import UIUtil from "../../util/UIUtil";
import ToastTip from "./ToastTip";

/**
 * UI界面管理，显示界面、关闭界面、弹窗
 */
export default class Toast {

    private static toastTip:cc.Node;

    private static closeDelay:cc.Action;

    private static uiCaches: { [id: string]: cc.Node } = {};
 
    private static uiPrefabs: any;

	public constructor() {
	}


    /**
     * 打开界面
     * @param panelId 
     * @param parent 
     * @param data 
     * @returns 返回打开的界面节点
     */
    public static launch(msg:string, delay:number = 1, parent?:cc.Node, pos?:cc.Vec2, tag?: boolean):void
    {
        if(!parent)
        { 
            parent = cc.find("Canvas");
        }
        if(!parent)
        {
            return;
        }
        let resConfig: any = ViewResConfig.config[UIConstant.ToastTip];
        RES.loadRes(resConfig.url, cc.Prefab, function (err, res) {
            this.uiPrefabs = res.data;
            if(tag){
                return this.showLaunch(msg, parent, pos);
            } else {
                return this.doLaunch(msg, delay, parent, pos);
            };
        }, this);

        

        // if(tag){
        //     RES.loadGroup(resConfig.group, this.showLaunch, this, [msg, parent, pos], {showTip: false});
        // } else {
        //     RES.loadGroup(resConfig.group, this.doLaunch, this, [msg, delay, parent, pos], {showTip: false});
        // }
    }
    public static doLaunch(msg:string, delay:number = 1, parent?:cc.Node, pos?:cc.Vec2 | cc.Vec3):void
    {
        if(!parent)
        {
            parent = cc.find("Canvas");
        }
        if(!parent || !parent.isValid)
        {
            return;
        }

        if(!Toast.toastTip || !Toast.toastTip.isValid)
        {
            Toast.toastTip = cc.instantiate(this.uiPrefabs)
        }
        Toast.toastTip.addComponent(ToastTip);

        if(Toast.closeDelay)
        {
            if(Toast.toastTip.active)
            {
                Toast.toastTip.stopAction(Toast.closeDelay);
            }
            Toast.closeDelay = null;
        }

        Toast.toastTip.opacity = 255;

        if(Toast.toastTip.parent)
        {
            Toast.toastTip.removeFromParent(false);
        }

        if(pos)
        {
            Toast.toastTip.position = pos as cc.Vec3;
        }
        
        Toast.toastTip.parent = parent;
        UIUtil.sortChilrenZindex(parent, Toast.toastTip);
        Toast.toastTip.active = true;

        let tipFrame:cc.Node = Toast.toastTip.getChildByName("tipFrame"); 
        tipFrame.active = true; 
        let msgLabel:cc.Label = tipFrame.getChildByName("msg").getComponent(cc.Label);
        msgLabel.string = msg;

        let act:cc.ActionInterval = cc.fadeOut(1);
        let callBack:Function = function(){
            Toast.closeDelay = null;
            if(Toast.toastTip && Toast.toastTip.isValid && Toast.toastTip.parent)
            {
                Toast.toastTip.removeFromParent(false);
            }
            if(Toast.toastTip && !Toast.toastTip.isValid)
            {
                Toast.toastTip = null;
            }
        };

        Toast.closeDelay = cc.sequence(cc.delayTime(delay), act, cc.callFunc(callBack));
        Toast.toastTip.runAction(Toast.closeDelay);
    }

    public static showLaunch(msg:string, parent?:cc.Node, pos?:cc.Vec2 | cc.Vec3): void {
        if(!parent)
        {
            parent = cc.find("Canvas");
        }
        if(!parent || !parent.isValid)
        {
            return;
        }

        let toastTip: cc.Node = Toast.uiCaches[UIConstant.ToastTip];

        if(!toastTip || !toastTip.isValid)
        {
            toastTip = cc.instantiate(this.uiPrefabs)
            toastTip.addComponent(ToastTip);
            if(pos)
            {
                toastTip.position = pos as cc.Vec3;
            }
            Toast.uiCaches[UIConstant.ToastTip] = toastTip;
        }

        toastTip.parent = parent;
        UIUtil.sortChilrenZindex(parent, toastTip);
        toastTip.opacity = 255;
        toastTip.active = true;

        let tipFrame:cc.Node = toastTip.getChildByName("tipFrame");
        let tipLayout: cc.Node = toastTip.getChildByName("tipLayout");
        let number: cc.Label = tipLayout.getChildByName("number").getComponent(cc.Label);
        number.string = msg;
        tipFrame.active = false;
        tipLayout.active = true;
    }

    public static hideLaunch(): void {
        let toastTip: cc.Node = Toast.uiCaches[UIConstant.ToastTip];
        if (toastTip) {
            let act:cc.ActionInterval = cc.fadeOut(1);
            let callBack:Function = function(){
                if(toastTip && toastTip.isValid && toastTip.parent)
                {
                    toastTip.removeFromParent(false);
                }
                if(toastTip && !toastTip.isValid)
                {
                    toastTip = null;
                }
                Toast.uiCaches[UIConstant.ToastTip] = null;
            };
            let closeDelay = cc.sequence(act, cc.callFunc(callBack));
            toastTip.runAction(closeDelay);
        }
    }
}