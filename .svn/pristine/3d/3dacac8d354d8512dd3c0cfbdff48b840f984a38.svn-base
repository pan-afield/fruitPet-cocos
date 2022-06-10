import RES from "../res/RES";
import BaseUI from "../view/BaseUI";
import ViewResConfig from "../res/ViewResConfig";
import UIUtil from "../util/UIUtil";
import UIConstant from "../constant/UIConstant";
import App from "./App";
import MessageBoxManager from "./MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog";

/**
 * UI界面管理，显示界面、关闭界面、弹窗
 */
export default class UIManager {

    protected static _instance: UIManager;

    private uiCaches: { [id: string]: cc.Node[] };

    public constructor() {
        this.init();
    }

    public static get ins(): UIManager {
        if (this._instance == null) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    private init() {
        this.uiCaches = {};
    }


    /**
     * 打开界面
     * 打开某个界面前，需加载其 预制文件、依赖的plist文件和其它媒体文件。加载顺序为：预制文件 -> plist文件和其它媒体文件。
     * plist文件和其它媒体文件被放在同一个组中，@see
     * @param panelId
     * @param parent
     * @param data
     */
    public open(panelId: string, parent?: cc.Node, data?: any, options?: {
        pos?: cc.Vec2;
        prebId?: string;
        uiComp?: any;  //挂载的脚本组件
        completeCallFun?: any;//界面创建完成后的回调函数
        completeCallObj?: any;//界面创建完成后的回调this对象
        forceNew?: boolean;//是否强制创建新节点
        needGroups?: string | string[];//需要的其它资源组
        concurrent?: number;
        _name?: string;
    }): void {
        if (!App.gdata.openShop && panelId==="RechargeView") {
            MessageBoxManager.showAlert({
                type: AlertDialog.TYPE_2,
                msg: 'IOS暂不支持'
            });
            return
        }
        if (!options) {
            options = {};
        }
        if (!cc.director.getScene()) {
            lx.warn("获取当前场景失败!!!");
        }
        options["currentSceneName"] = cc.director.getScene().name;
        console.log("打开的资源" + panelId);
        let resConfig: any = ViewResConfig.config[panelId];
        if (!resConfig) {
            this.doOpen(panelId, parent, data, options);
            return;
        }

        let uiCom: any = resConfig.uiComponent;
        if (uiCom) {
            options.uiComp = uiCom;
        }

        // 通过本地地址去获取预制体资源
        let url: string = resConfig.url;
        if (url) {
            let uiPrefab: cc.Prefab = cc.resources.get(url, cc.Prefab) as any;
            if (uiPrefab && cc.isValid(uiPrefab)) {
                this.doOpen(panelId, parent, data, options);
            } else {
                RES.loadRes(url, cc.Prefab, function (err, res) {
                    this.doOpen(panelId, parent, data, options);
                }, this, { showTip: resConfig.showTips });
            }
        }
    }

    protected doOpen(panelId: string, parent?: cc.Node, data?: any, options?: {
        pos?: cc.Vec2 | cc.Vec3;
        prebId?: string;
        uiComp?: any;   //挂载的脚本组件
        completeCallFun?: Function;//界面创建完成后的回调函数
        completeCallObj?: any;//界面创建完成后的回调this对象
        currentSceneName?: string;//当前的场景名称
        forceNew?: boolean;//是否强制创建新节点
        _name?: string;
    }): void {
        let currentScene = cc.find("Canvas/popupView") || cc.director.getScene();
        //场景已切换则不允许打开界面
        if (options.currentSceneName != currentScene.name && !cc.find("Canvas/popupView")) {
            return;
        }

        if (!parent || !parent.isValid || (!(parent instanceof cc.Scene) && !parent.active)) {
            // cc.warn("尝试在不存在或未激活的节点上打开界面，界面id：" + panelId);
            // return;
            parent = currentScene;
        }
        //从ui管理器的缓存中创建界面
        let uiNode: cc.Node;
        let uiNode_temp: cc.Node;
        let uiNodes: cc.Node[] = this.uiCaches[panelId];  //ui管理器里面缓存的界面节点
        if (uiNodes && !options.forceNew) {
            if (uiNodes.length > 0) {
                for (let i: number = 0; i < uiNodes.length; i++) {
                    //同一界面只允许同时打开一个（暂定）
                    uiNode_temp = uiNodes[i];
                    if (!uiNode_temp.isValid) {
                        uiNodes.splice(i, 1);
                        i--;
                        continue;
                    }

                    uiNode = uiNode_temp;
                    break;
                }
            }
        } else {
            uiNodes = [];
            this.uiCaches[panelId] = uiNodes;
        }

        // 从预制体中创建界面节点
        if (!uiNode) {
            let prebId: string = panelId;
            if (options && options.prebId) {
                prebId = options.prebId;
            }

            let uiPrefabs: cc.Prefab;

            let resConfig: any = ViewResConfig.config[panelId];
            if (resConfig && resConfig.url) {
                uiPrefabs = cc.resources.get(resConfig.url) as any;
            } else {
                uiPrefabs = RES.getRes(prebId);
            }
            if (!uiPrefabs) {
                cc.error("没找到界面的预制资源，界面id:" + panelId + ", 预制资源id:" + prebId);
                return;
            }
            uiNode = cc.instantiate(uiPrefabs);
            if (!options.forceNew) {
                uiNodes.push(uiNode);
            }
        }

        // 挂载脚本组件
        let uiCom: BaseUI;
        if (options && options.uiComp) {
            let oldUIComps: BaseUI[] = uiNode.getComponents(BaseUI);
            if (oldUIComps && oldUIComps.length > 0) {
                for (let i: number = 0; i < oldUIComps.length; i++) {
                    if (oldUIComps[i] instanceof options.uiComp) {
                        if (!oldUIComps[i].isValid || uiCom) {
                            oldUIComps[i].destroy();
                        } else {
                            uiCom = oldUIComps[i];
                        }
                    }
                }
            }
            if (!uiCom) {
                uiCom = uiNode.addComponent(options.uiComp);
            }
        } else {
            uiCom = uiNode.getComponent(BaseUI);
        }
        uiNode.opacity = 255;
        uiCom.data = data;
        if (!parent.isValid) {
            uiCom.close();
            return;
        }

        if (uiNode.parent !== parent) {
            uiNode.parent = parent;//先添加到父节点，再将active设为true，否则无法触发引擎的递归activateNode
        }

        //重排顺序
        // UIUtil.sortChilrenZindex(parent, uiNode);

        if (options && options.pos) {
            uiNode.position = options.pos as cc.Vec3;
        } else {
            uiNode.position = cc.Vec3.ZERO;
        }

        let widget: cc.Widget = uiNode.getComponent(cc.Widget);
        if (widget && widget.isValid) {
            widget.enabled = true;
        }

        if (!uiNode.active) {
            uiNode.active = true;
        }

        // uiCom.onOpacityOpen();

        if (options && options._name && options._name != "") {
            uiNode.name = options._name;
        }

        if (options && options.completeCallFun) {
            if (options.completeCallObj) {
                options.completeCallFun.apply(options.completeCallObj, [uiNode]);
            } else {
                options.completeCallFun(uiNode);
            }
        }
    }

    /**
     * 关闭界面
     * @param panelId
     */
    public close(panelId: string, removeFromParent: boolean = false): void {
        let uiNodes: cc.Node[] = this.uiCaches[panelId];
        if (uiNodes) {
            let uiNode: cc.Node;
            let uiCom: BaseUI;
            for (let i: number = 0; i < uiNodes.length; i++) {
                uiNode = uiNodes[i];
                if (!uiNode.activeInHierarchy) {
                    continue;
                }
                uiCom = uiNode.getComponent(BaseUI);
                if (uiCom) {
                    uiCom.close(removeFromParent);
                }
                // uiNode.active = false;//先将active设为false，再从父节点中移除，否则无法触发引擎的递归deActivateNode
                // uiNode.removeFromParent(false);//cleanup设为false，否则再次启用时，组件都会变得不可用
            }
        }
    }

    /**
     * 关闭所有界面
     * @param removeFromParent 是否从父控件中移除
     */
    public closeAll(removeFromParent: boolean = false): void {
        let uiNodes: cc.Node[];
        let uiNode: cc.Node;
        let uiCom: BaseUI;
        for (var panelId in this.uiCaches) {
            uiNodes = this.uiCaches[panelId];
            if (uiNodes) {
                for (let i: number = 0; i < uiNodes.length; i++) {
                    uiNode = uiNodes[i];
                    if (!uiNode.isValid) {
                        continue;
                    }
                    uiCom = uiNode.getComponent(BaseUI);
                    if (!uiCom.isValid) {
                        continue;
                    }
                    if (uiCom) {
                        uiCom.close(removeFromParent);
                    }
                    // uiNode.active = false;//先将active设为false，再从父节点中移除，否则无法触发引擎的递归deActivateNode
                    // uiNode.removeFromParent(false);//cleanup设为false，否则再次启用时，组件都会变得不可用
                }
            }
        }
    }

    /**
     * 根据名字获取界面
     */
    public getNodeByID(panelId: string) {
        let tempNode: cc.Node;
        if (this.uiCaches[panelId]) {
            //默认拿最后开启的界面
            tempNode = this.uiCaches[panelId][this.uiCaches[panelId].length - 1];

            if (!tempNode.isValid) {
                console.log("该界面不存在");
                return null;
            }
        } else {
            // console.log("该界面不存在")
            return null;
        }
        return tempNode;
    }
}