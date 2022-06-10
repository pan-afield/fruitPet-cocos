import RES from "../res/RES";
import UIConstant from "../constant/UIConstant";
import LoadingTip from "../view/dialog/LoadingTip"; 
import App from "./App";
import UIUtil from "../util/UIUtil";

export default class MessageBoxManager {
    private static uiCaches: { [id: string]: cc.Node[] } = {};

    /**
     * 关闭界面
     * @param panelId
     */
    public close(panelId: string): void {
        let uiNodes: cc.Node[] = MessageBoxManager.uiCaches[panelId];
        if (uiNodes) {
            let uiNode: cc.Node;
            for (let i: number = 0; i < uiNodes.length; i++) {
                uiNode = uiNodes[i];
                uiNode.removeFromParent(false);
            }
        }
    }

    /**
     * 显示转圈圈的加载框
     * @param msg 显示的文本信息
     * @param isModel 是否为模态窗口，默认为true
     * @param parent 父节点， 可选参数，不传入父节点时直接获取当前场景节点作为父节点
     */
    public static showLoadingTip(data?: {
        msg?: string;
        isModel?: boolean;
    }, parent?: cc.Node, pos?: cc.Vec2 | cc.Vec3): LoadingTip {
        let uiNode: cc.Node;
        let uiNode_temp: cc.Node;
        let uiNodes: cc.Node[] = MessageBoxManager.uiCaches[UIConstant.LoadingTip];
        if (uiNodes) {
            if (uiNodes.length > 0) {
                for (let i: number = 0; i < uiNodes.length; i++) {
                    //同一界面只允许同时打开一个（暂定）
                    uiNode_temp = uiNodes[i];
                    if (!uiNode_temp.isValid) {
                        uiNodes.splice(i, 1);
                        i--;
                        continue;
                    }
                    if (uiNode_temp.active && uiNode_temp.parent) {
                        uiNode_temp.removeFromParent(false);
                    }
                    uiNode = uiNode_temp;
                    break;
                }
            }
        } else {
            uiNodes = [];
            MessageBoxManager.uiCaches[UIConstant.LoadingTip] = uiNodes;
        }

        if (!uiNode) {
            let uiPrefabs: cc.Prefab = RES.getRes(UIConstant.LoadingTip);
            if (!uiPrefabs) {
                cc.error("没找到界面的预制资源，界面id:" + UIConstant.LoadingTip + ", 预制资源id:" + UIConstant.LoadingTip);
                return;
            }
            uiNode = cc.instantiate(uiPrefabs);
            uiNodes.push(uiNode);
        }

        if (!parent) {
            parent = cc.director.getScene();
        }
        let uiCom: LoadingTip = uiNode.getComponent(LoadingTip);
        uiCom.data = data;
        if (pos) {
            uiNode.position = pos as cc.Vec3;
        }
        uiNode.parent = parent;

        //重排顺序
        UIUtil.sortChilrenZindex(parent, uiNode);

        uiNode.opacity = 255;
        let widget: cc.Widget = uiNode.getComponent(cc.Widget);
        if (widget && widget.isValid) {
            widget.enabled = true;
        }

        // uiNode.scale = 0.5;

        if (!uiNode.active) {
            uiNode.active = true;
        }

        uiCom.onOpacityOpen();

        // uiNode.active = true;
        return uiCom;
    }

    public static hideLoadingTip(removeFromParent: boolean = false): void {
        let uiNodes: cc.Node[] = this.uiCaches[UIConstant.LoadingTip];
        if (uiNodes) {
            let uiNode: cc.Node;
            let uiCom: LoadingTip;
            for (let i: number = 0; i < uiNodes.length; i++) {
                uiNode = uiNodes[i];
                // uiNode.active = false;//先将active设为false，再从父节点中移除，否则无法触发引擎的递归deActivateNode
                // uiNode.removeFromParent(false);//cleanup设为false，否则再次启用时，组件都会变得不可用
                if (!uiNode.isValid) {
                    continue;
                }

                uiCom = uiNode.getComponent(LoadingTip);
                if (!uiCom.isValid) {
                    continue;
                }
                if (uiCom) {
                    uiCom.close(removeFromParent);
                }
            }
        }
    }

    /**
     * 显示警告窗
     * @param data
     * @param type 警告框类型
     * @param msg 警告框内容
     * @param okCallBack 点击 确定 时执行的动作
     * @param cancelCallBack 点击 取消 时执行的动作
     * @param callBackObj 回调函数的执行者（this）
     * @param okLabel 确定 按钮的显示文本
     * @param cancelLabel 取消 按钮的显示文本
     * @param parent
     */
    public static showAlert(data?: {
        type?: number;
        msg?: string;
        okCallBack?: Function;
        cancelCallBack?: Function;
        callBackObj?: any
        okLabel?: string
        cancelLabel?: string
    }, parent?: cc.Node, options?: {
        pos?: cc.Vec2;
        prebId?: string;
        uiComp?: any;
        completeCallFun?: any;//界面创建完成后的回调函数
        completeCallObj?: any;//界面创建完成后的回调this对象
    }): void {
        App.ui.open(UIConstant.AlertDialog, parent, data, options);
    }
    /**
     * 关闭警告窗
     */
    public static closeAlert(): void {
        App.ui.close(UIConstant.AlertDialog);
        // console.log("关闭警告框");
    } 

}