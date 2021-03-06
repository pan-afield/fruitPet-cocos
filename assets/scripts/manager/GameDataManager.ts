
import mainScene from "../scene/mainScene";
import App from "./App";

/**玩家信息数据类型 */
interface USERDATATYPE {

}
interface GAMEKEY {
    pkey: string;
    pstring: string;
}
/**
 * 游戏数据管理
 */
export default class GameDataManager {
    
    private static _instance: GameDataManager;
    public userData: any;
    public farmGameInfo: any;  // 农场游戏信息
    public userInfo: any; //用户基本信息
    public isToday: boolean = false
    public newPeople: boolean
    public gamescene: mainScene;
    public openShop: boolean;
    newAward: any;
    public constructor() {
        this.init();
    }

    public static get ins(): GameDataManager {
        if (this._instance == null) {
            this._instance = new GameDataManager();
        }
        return this._instance;
    }

    private init(): void {
        this.initData();
    }

    public initData(): void {
        this.farmGameInfo = null;
        this.userData = null;
        this.userInfo = null;
    }
}