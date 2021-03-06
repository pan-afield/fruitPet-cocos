/**
 * 游戏设置
 */
export default class Config {
	public static APP_VERSION: string = "1.0.0.0";
	public static APP_VERSION_CODE: number = 30;
	// 版本审核标识 审核中为true 通过后置回false
	public static APP_CHECK: boolean = false;

	public static DEFAULT_GAME: number = 3100;
	public static CURRENT_GAME: number = Config.DEFAULT_GAME;

	/**
	 * 日志级别{trace|debug|info|warn|error|none}  Todo: 打包发布为warn
	 */
	// public static Log_Level: string = "info";
	public static gameFlag: number = 0;        	 		// 0 测试环境   1 打包

 
	// public static linkURL = "https://h5.lexun.com/games/FruitMiniGameAPI" // 正式地址 
	public static linkURL = "http://f8.lexun.com/lkl" //测试地址
} 
