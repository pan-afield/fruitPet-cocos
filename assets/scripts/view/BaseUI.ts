import GameConst from "../constant/GameConst";
import EventDispatcher from "../event/EventDispatcher";
import LEvent from "../event/LEvent";

const { ccclass, property } = cc._decorator;

/**
 * 所有界面的父类
 */
@ccclass
export default class BaseUI extends cc.Component {

    protected _data: any;

    protected _initFinish: boolean = false;
    protected _initEventFinish: boolean = false;
    protected startFinish: boolean = false;

    private isUIValidated: boolean;

    /** 上次的位置 */
    private lastPos: cc.Vec3;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    __preload() {
        this.lastPos = this.node.position;
        this.doValidateUI();
        // EventDispatcher.addListener(LEvent.WINDOW_RESIZE, this.onWindowResize, this);
        // if(lx.config.platform != "native"){
        // this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPosChanged, this);
        // }
    }

    /**
     * 识别所有需要操作的节点或组件
     * 只执行一次
     */
    private doValidateUI(): void {
        if (this.isUIValidated) {
            return;
        }
        this.validateUI();
    }

    /**
     * 识别所有需要操作的节点或组件
     */
    protected validateUI(): void {
        //子类在这里更新所有节点句柄
        //如：this.item = this.node.getChildByName("item");
    }

    start() {
        this.startFinish = true;
        this.init();
    }

    // update (dt) {}

    onEnable() {
        this.init();
        // if(lx.config.platform != "native"){
        // this.node.parent.off(cc.Node.EventType.SIZE_CHANGED, this.onParentSizeChanged, this);
        // this.node.parent.on(cc.Node.EventType.SIZE_CHANGED, this.onParentSizeChanged, this);
        // this.node.parent.off(cc.Node.EventType.POSITION_CHANGED, this.onParentSizeChanged, this);
        // this.node.parent.on(cc.Node.EventType.POSITION_CHANGED, this.onParentSizeChanged, this);
        // }
        // this.onParentSizeChanged();
    }

    onDisable() {
        if (!this.isValid || !this.node) {
            return;
        }
        if (this._initEventFinish) {
            this.removeEvent();
        }
        this._initEventFinish = false;
        this._initFinish = false;
    }

    protected onParentSizeChanged(): void {
        if (this.node.opacity == 0) {
            return;
        }
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget && widget.isValid) {
            widget.updateAlignment();
        }

        let children: cc.Node[] = this.node.children;
        for (let i: number = 0; i < children.length; i++) {
            widget = children[i].getComponent(cc.Widget);
            if (widget && widget.isValid) {
                widget.updateAlignment();
            }
        }
    }

    /**
     * 初始化界面，初始化的依据是：每当data变更都应调用初始化，除非界面不处于激活状态，激活后也应调用初始化
     */
    private init(): void {
        if (!this.node.activeInHierarchy || !this.startFinish || this._initFinish) {
            return;
        }
        //这里根据data进行界面刷新
        this.updateView();
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget && widget.isValid) {
            widget.updateAlignment();
        }
        if (!this._initEventFinish) {
            this.initEvent();
            this._initEventFinish = true;
        }

        if (!this._initFinish) {
            this._initFinish = true;
            this.initFinish();
        }
    }

    protected updateView(): void {

    }

    protected initFinish(): void {

    }

    public set data(value: any) {
        this._data = value;
        //若当前界面处于激活状态，则只需刷新界面
        if (this.node.activeInHierarchy && this._initFinish) {
            this.updateView();
        } else//若当前界面处于关闭状态，则需重新初始化
        {
            this.init();
        }
    }

    public get data(): any {
        return this._data;
    }

    /**
     * 添加监听事件
     */
    protected initEvent(): void {

    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {

    }

    public close(removeFromParent: boolean = true): void {
        // if(lx.config.platform == "native")
        // {
        //     removeFromParent = true;
        // }
        if (!cc.isValid(this.node) ) {
            cc.warn("node不存在!!!");
        }
        //active方式关闭
        if (removeFromParent) {
            // this.node.active = false;
            this.node.removeFromParent(false);
            // this.node.destroy();
        } else {
            //opacity方式关闭 —— 由于active方式激活node时，会导致节点递归遍历渲染，层级复杂一点的界面在低配机将会有卡顿现象，因此使用透明度的方式进行界面的关闭/打开
            //此方式的缺点是难以管理
            this.node.opacity = 0;
            let widget: cc.Widget = this.node.getComponent(cc.Widget);
            if (widget && widget.isValid) {
                widget.enabled = false;
            }

            //移出屏幕外，防止触摸事件
            this.node.x = -GameConst.stageSize.width * 3 - this.node.width;

            if (this._initEventFinish) {
                this.removeEvent();
            }
            this._initEventFinish = false;
            this._initFinish = false;
        }

        // if(lx.config.platform == "native")
        // {
        //     removeFromParent = false;
        // }

        if (this._data && !((!this.node || this.isValid) && (removeFromParent == true))) {
            if (this._data.closeCallBack) {
                if (this._data.closeCallBackObj) {
                    this._data.closeCallBack.apply(this._data.closeCallBackObj);
                } else {
                    this._data.closeCallBack();
                }
                this._data.closeCallBack = null;
            }
            this._data.closeCallBack = null;
        }

        this.onClose();
    }

    public onOpacityOpen(): void {
        if (!this.node.activeInHierarchy || !this.startFinish || this._initFinish) {
            return;
        }
        let widget: cc.Widget = this.node.getComponent(cc.Widget);
        if (widget && widget.isValid) {
            widget.updateAlignment();
        }
        if (!this._initEventFinish) {
            this.initEvent();
            this._initEventFinish = true;
        }

        if (!this._initFinish) {
            this._initFinish = true;
            this.initFinish();
        }
    }

    protected onClose(): void {

    }

    onDestroy(): void {
        // EventDispatcher.removeListener(LEvent.WINDOW_RESIZE, this.onWindowResize, this);
    }

    protected onWindowResize(): void {
        if (this.node && this.node.opacity == 0) {
            let newX: number = -GameConst.stageSize.width * 3 - this.node.width;
            if (this.node.x != newX) {
                //移出屏幕外，防止触摸事件
                this.node.x = newX;
            }
        }
    }
    protected onPosChanged(): void {
        if (!this.node || this.node.opacity != 0) {
            return;
        }
        if (this.node && this.node.opacity == 0) {
            let newX: number = -GameConst.stageSize.width * 3 - this.node.width;
            if (this.node.x != newX) {
                //移出屏幕外，防止触摸事件
                this.node.x = newX;
            }
        }
    }

    public hide(): void {
        if (this.node && this.node.opacity == 0) {
            return;
        }
        this.lastPos = this.node.position;
        this.node.opacity = 0;
        let newX: number = -GameConst.stageSize.width * 3 - this.node.width;
        if (this.node.x != newX) {
            //移出屏幕外，防止触摸事件
            this.node.x = newX;
        }
    }

    public show(): void {
        if (this.node && this.node.opacity == 255) {
            return;
        }
        this.node.opacity = 255;
        this.node.position = this.lastPos;
    }

    public removeAlign(): void {
        let widght = this.node.getComponent(cc.Widget);
        if (widght && widght.isValid) {
            widght.isAlignLeft = false;
            widght.isAlignRight = false;
            widght.isAlignTop = false;
            widght.isAlignBottom = false;
        }
    }
}
