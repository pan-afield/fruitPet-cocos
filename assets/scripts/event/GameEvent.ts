/**
 * 事件类型
 */
export default class GameEvent {
    static UPDATE_FARM_USERINFO: string="UPDATE_FARM_USERINFO";
    static UPDATE_BUYSEED_COIN: string="UPDATE_BUYSEED_COIN";
    static INIT_SHOP: string="INIT_SHOP";
    static OPEN_FRUIT_RECORD: string="OPEN_FRUIT_RECORD";
    static DAY_SIGN: string="DAY_SIGN";
    static SUCCESS_RECHARGE: string="SUCCESS_RECHARGE";
    static UPDATE_RECHARGE_LIST: string="UPDATE_RECHARGE_LIST";

	public constructor() {
	}

	// 更新农场游戏消息
	public static UPDATA_FARM_GAME_INFO: string = "UPDATA_FARM_GAME_INFO";

	// 下单完成
	public static PLANT_END: string = "PLANT_END";


	// 开始新游戏
	public static START_NEW_GAME: string = "START_NEW_GAME";


	// 跳转主场景
	public static GO_TO_MAINSCENE: string = "GO_TO_MAINSCENE";

	// 前往农场主场景
	public static GO_TO_FRAMSCENE: string = "GO_TO_FRAMSCENE";
	// 进度条
	public static UPDATE_PROGRESS: string = "UPDATE_PROGRESS";
	// 买中回调
	public static GET_BUY_IN: string = "GET_BUY_IN";
	//更新用户信息
	public static UPDATE_USER_INFO: string = "UPDATE_USER_INFO";
	//更新用户信息
	public static UPDATE_PET_INFO: string = "UPDATE_PET_INFO";
	//隐藏签到图标
	public static HIDE_SIGN: string = "HIDE_SIGN";
	//鱼干获取
	public static OPEN_FISH: string = "OPEN_FISH";
	public static OPEN_LEVEL_LIST: string = "OPEN_LEVEL_LIST";
	public static SNAKE_VIEW: string = "SNAKE_VIEW";
	public static PET_PROP: string = "PET_PROP";
}