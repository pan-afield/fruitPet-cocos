import EventDispatcher from "../event/EventDispatcher";
import LEvent from "../event/LEvent";
import UIUtil from "../util/UIUtil";
import GameConst from "../constant/GameConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseScene extends cc.Component {

    protected _initFinish: boolean = false;
    protected startFinish: boolean = false;

    onLoad(): void {
        this.validateUI();
    }

    protected validateUI(): void {
        //子类在这里更新所有节点句柄
        //如：this.item = this.node.getChildByName("item");
    }

    start(): void {
        this.startFinish = true;
        this.init();
    }

    protected init(): void {
        this.initEvent();
        this._initFinish = true;
        this.initFinish();
    }

    protected initFinish(): void {

    }

    onEnable() {
        EventDispatcher.addListener(LEvent.WINDOW_RESIZE, this.onWindowResize, this);
    }

    onDisable() {
        this._initFinish = false;
        this.removeEvent();
        EventDispatcher.removeListener(LEvent.WINDOW_RESIZE, this.onWindowResize, this);
    }

    /**
     * 增加监听事件
     */
    protected initEvent(): void {

    }

    /**
     * 移除监听事件
     */
    protected removeEvent(): void {

    }

    /**
     * 屏幕尺寸发生变化
     */
    protected onWindowResize(): void {
        if (!this.isValid) {
            return;
        }
        this.node.setContentSize(GameConst.stageSize);
        UIUtil.adapteScreen(this.node);
    }
}