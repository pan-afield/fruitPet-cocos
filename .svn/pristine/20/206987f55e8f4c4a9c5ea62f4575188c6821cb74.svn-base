import EventDispatcher from "../event/EventDispatcher";
import RES from "./RES";
import SilentLoader from "./SilentLoader";

const { ccclass, property } = cc._decorator;

/**
 * 资源配置组件 加载ResConfig.json里面的资源,静默加载使用
 */
@ccclass
export default class ResConfig extends cc.Component {

    @property({
        type: cc.JsonAsset
    })
    ResConfig: cc.JsonAsset = null;

    /**
     * 子游戏名称，所有子游戏的资源组都会被加上前缀用于防止重定义
     */
    @property()
    subName: string = "";

    onLoad() {
        RES.analysisResConfig(this.ResConfig.json);
        SilentLoader.canLoad = true;
        this.node.active = false;
        this.node.removeFromParent(true);
        this.destroy();
    }
}


