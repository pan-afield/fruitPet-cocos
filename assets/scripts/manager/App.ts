import AudioManager from "../audioManger/AudioManager";
import EventDispatcher from "../event/EventDispatcher";
import LEvent from "../event/LEvent";
import ActDrawProxy from "../proxy/ActDrawProxy";
import ConfigProxy from "../proxy/ConfigProxy";
import GameProxy from "../proxy/GameProxy";
import GiftCouponProxy from "../proxy/GiftCouponProxy";
import GoodsProxy from "../proxy/GoodsProxy";
import NewUserProxy from "../proxy/NewUserActiveProxy"
import PetPropProxy from "../proxy/PetPropProxy";
import PetProxy from "../proxy/PetProxy";
import UserBagProxy from "../proxy/UserBagProxy";
import UserProxy from "../proxy/UserProxy"; 
import ConfigManager from "./ConfigManager"; 
import GameDataManager from "./GameDataManager";  
import UIManager from "./UIManager";

// cc.dynamicAtlasManager.maxFrameSize = 0;

var checkAndSwitchBuffer = function () {
    const isIOS14Device = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent);
    if (isIOS14Device) {
        cc["MeshBuffer"].prototype.checkAndSwitchBuffer = function (vertexCount) {
            if (this.vertexOffset + vertexCount > 65535) {
                this.uploadData();
                this._batcher._flush();
            }
        };     
        cc["MeshBuffer"].prototype.forwardIndiceStartToOffset = function () {
            this.uploadData();
            this.switchBuffer();
        }  
    }
};


/**
 * 已经初始化的管理类好存放在这里,每次拿不用通过消耗方法来获得实例
 */
export default class App {
    public constructor() {
    }

    public static initFinish: boolean;
    /**☆ 登录通信*/
    public static UserProxy: UserProxy;
    /**☆ 配置通信*/
    public static ConfigProxy: ConfigProxy;
    /**☆ 抽奖通信*/
    public static ActDrawProxy: ActDrawProxy;
    /**☆ 宠物通信*/
    public static PetProxy: PetProxy;
    /**☆ 游戏通信*/
    public static GameProxy: GameProxy;
    /* 礼券通信 */
    public static GiftCouponProxy: GiftCouponProxy;
    /* 充值通信 */
    public static GoodsProxy: GoodsProxy;
    /* 新人通信 */
    public static NewUserProxy: NewUserProxy;
    /* 背包通信 */
    public static UserBagProxy: UserBagProxy;
    /* 道具通信 */
    public static PetPropProxy: PetPropProxy;
    /**☆ UI界面管理*/
    public static ui: UIManager;
     /**☆ 游戏数据管理*/
    public static gdata: GameDataManager; 
    /**游戏音乐 */
    public static audio:AudioManager;  
    
    public static init(): void {
        checkAndSwitchBuffer();
        if (App.initFinish) {
            return;
        } 
        App.ui = UIManager.ins;
        App.gdata = GameDataManager.ins; 
        App.audio = AudioManager.ins; 
        ConfigManager.init();
        this.initProxy();  
        
        if (/*cc.game.renderType == cc.game.RENDER_TYPE_WEBGL && */!cc.macro.CLEANUP_IMAGE_CACHE) {
            // 打开动态合图功能
            cc.dynamicAtlasManager.enabled = true;
            cc.dynamicAtlasManager.maxAtlasCount = 8;
            cc.dynamicAtlasManager.maxFrameSize = 1024;
            // cc.dynamicAtlasManager["update"] = LXDynamicAtlasManager.ins.update;
        }

        // SceneManager.ins.stageSize = cc.size(cc.view.getVisibleSize());
        cc.view.setResizeCallback(() => {
            let newSize: cc.Size = cc.size(cc.view.getVisibleSize());
            // SceneManager.ins.stageSize = newSize;
            // console.log("屏幕尺寸变化：" + cc.view.getVisibleSize());

            // UIUtil.adapteScreen(newSize);

            //通知窗口尺寸发生变化
            EventDispatcher.dispatch(LEvent.WINDOW_RESIZE);
        });
        App.initFinish = true;

        cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
    }

    /**
     * 场景关闭前需要关闭所有界面（从界面中移除）
     */
    private static beforeSceneLoad(): void {
        // App.ui.closeAll(true);
    }

    public static initProxy(){
        //通信  
        App.UserProxy = new UserProxy(); 
        App.PetProxy = new PetProxy();   
        App.GameProxy = new GameProxy();
        App.GiftCouponProxy = new GiftCouponProxy()
        App.GoodsProxy = new GoodsProxy()
        App.NewUserProxy = new NewUserProxy()
        App.UserBagProxy = new UserBagProxy()
        App.PetPropProxy = new PetPropProxy()
        App.ConfigProxy = new ConfigProxy()
        App.ActDrawProxy = new ActDrawProxy()
    } 
}
// App.init();
window["App"] = App;