import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ToastTip extends BaseUI {
    content: cc.Node
    protected _data: {
    };

    protected validateUI(): void {
        this.content = this.node.getChildByName('content')
    }

    protected updateView(): void {
        this.schedule(() => {
            this.content.rotation += 45
        }, 0.1)
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

    onDisable() {
        this.unscheduleAllCallbacks()
    }
}
