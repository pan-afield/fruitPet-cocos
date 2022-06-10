declare namespace lx {
	/**
	 * 初始化
	 * @param conf
	 * @param callback
	 */
	function init(conf: object, callback: Function): void;

	/**
	 * Class
	 * @param object
	 */
	function Class(object: {
		/**
		 * 构造函数
		 */
		ctor?: Function;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 继承
		 */
		extends?: Function;
		/**
		 * 静态属性
		 */
		statics?: object;
		/**
		 * 属性
		 */
		properties?: object;
		/**
		 * 内存加密属性
		 */
		properties2?: object;
		/**
		 * 混合
		 */
		mixins?: Array<Function>;
	}): Function;

	/**
	 * Class
	 * @param object
	 */
	function Model<T extends lx.Event>(object: {
		/**
		 * 构造函数
		 */
		ctor?: Function;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 继承
		 */
		extends?: Function;
		/**
		 * 静态属性
		 */
		statics?: object;
		/**
		 * 属性(属性改变会发)
		 */
		properties?: object;
		/**
		 * 内存加密属性
		 */
		properties2?: object;
		/**
		 * 混合
		 */
		mixins?: Array<Function>;
	}): T;

	/**
	 * 配置
	 */
	namespace config {
		/**
		 * 游戏id
		 */
		var gameid: number;

		/**
		 * 版本
		 */
		var version: string;

		/**
		 * 渠道
		 */
		var channel: string;

		/**
		 * 平台
		 */
		var platform: string;

		/**
		 * 模式{development|production}
		 */
		var mode: string;

		/**
		 * 日志级别{trace|debug|info|warn|error|none}
		 * 输出大于等于当前日志等级的
		 */
		var logLevel: string;

		/**
		 * 云日志级别{trace|debug|info|warn|error|none}
		 * 输出大于等于当前日志等级的
		 */
		var cloudLogLevel: string;

		/**
		 * 会话过期时间(没有过期不需要调用第三方重新登录)
		 */
		var sessionExpireTime: number;

		/**
		 * 设置
		 * @param conf
		 */
		function set(conf: object): void;
	}

	/**
	 * 添加建议
	 * @param object
	 */
	function addSuggestInfo(object: { content?: string; extra?: string; success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * 登录账号
	 * @param object
	 */
	function login(object?: { params?: object; success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * 退出账号
	 * @param object
	 */
	function logout(object?: { params?: object; success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * 重置密码
	 * @param object
	 */
	function resetPwd(object?: {
		/**
		 * 1: 发送验证码 2: 校验验证码执行操作
		 */
		step: number;
		mobile: string;
		code?: string;
		success?: Function;
		fail?: Function;
		complete?: Function;
	}): void;

	/**
	 * 进入大区
	 * @param object
	 */
	function enter(object?: { areaid?: number; success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * trace
	 * @param args
	 */
	function trace(...args: Array<any>): void;

	/**
	 * debug
	 * @param args
	 */
	function debug(...args: Array<any>): void;

	/**
	 * log
	 * @param args
	 */
	function log(...args: Array<any>): void;

	/**
	 * info
	 * @param args
	 */
	function info(...args: Array<any>): void;

	/**
	 * warn
	 * @param args
	 */
	function warn(...args: Array<any>): void;

	/**
	 * error
	 * @param args
	 */
	function error(...args: Array<any>): void;

	/**
	 * 增加服务器错误
	 * @param message
	 * @param stack
	 */
	function addCloudError(message: string, stack?: string): void;

	/**
	 * 发送http请求
	 * @param object
	 */
	function request(object: {
		/**
		 * url
		 */
		url: string;
		/**
		 * header
		 */
		header?: object;
		/**
		 * data
		 */
		data?: object;
		/**
		 * json arrayBuffer blob text
		 */
		dataType?: string;
		/**
		 * post get
		 */
		method?: string;
		/**
		 * false true
		 */
		withCredentials?: boolean;
		timeout?: number;
		success?: Function;
		fail?: Function;
		complete?: Function;
	}): void;

	/**
	 * requestPayment
	 * @param object
	 */
	function requestPayment(object: { order: string; success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * 事件
	 */
	class Event {
		/**
		 * 注册监听
		 * @param name
		 * @param callback
		 * @param context
		 */
		on(name: string, callback: Function, context?: any): void;

		/**
		 * 注册监听(一次)
		 * @param name
		 * @param callback
		 * @param context
		 */
		once(name: string, callback: Function, context?: any): void;

		/**
		 * 取消监听
		 * @param name
		 * @param callback
		 * @param context
		 */
		off(name: string, callback: Function, context: any): void;

		/**
		 * 监听数量
		 * @param name
		 */
		count(name: string): number;

		/**
		 * 分发事件
		 * @param name
		 * @param parma
		 */
		emit(name: string, ...parma: any): void;

		/**
		 * 移除目标上的所有监听
		 * @param context
		 */
		targetOff(context: any): void;
	}

	/**
	 * 账号信息
	 */
	class AccountInfo {
		/**
		 * 账号
		 */
		account: number;

		/**
		 * 头像
		 */
		avatar: string;

		/**
		 * 昵称
		 */
		nick: string;

		/**
		 * 0: 未知 1: 男 2: 女
		 */
		gender: number;

		/**
		 * 当前登录大区
		 */
		areaid: number;

		/**
		 * 手机号码
		 */
		mobile: string;
	}

	/**
	 * 获取账号信息
	 */
	function getAccountInfoSync(): AccountInfo;

	/**
	 * 用户信息
	 */
	class UserInfo {
		/**
		 * 用户id
		 */
		userid: number;

		/**
		 * 头像
		 */
		avatar: string;

		/**
		 * 昵称
		 */
		nick: string;

		/**
		 * 0: 未知 1: 男 2: 女
		 */
		gender: number;

		/**
		 * 大区id
		 */
		areaid: number;

		/**
		 * 注册事件
		 */
		writetime: number;
	}

	/**
	 * 获取账号信息
	 */
	function getUserInfoSync(): UserInfo;

	/**
	 * 用户信息
	 */
	class AreaInfo {
		/**
		 * 大区id
		 */
		areaid: number;

		/**
		 * 大区名称
		 */
		name: string;

		/**
		 * 实际大区id
		 */
		linkid: number;

		/**
		 * 标签
		 */
		tag: number;

		/**
		 * 状态
		 */
		status: number;

		/**
		 * 扩展信息
		 */
		extra: string;

		/**
		 * 版本号
		 */
		version: string;
	}

	/**
	 * 获取账号信息
	 */
	function getAreaInfoSync(): AreaInfo;

	/**
	 * global
	 */
	namespace global {
		/**
		 * 全局事件
		 * 事件名           name					参数
		 * 内存数据修改		sys.memory.modify
		 * 绑定手机			sys.bindmobile			BindMobileContext
		 * 解绑手机			sys.unbindmobile		UnbindMobileContext
		 * 退出账号			user.quit				type(0: 默认 1: 登录信息过期 2: 重置密码)		params
		 * 登录账号			sys.login				LoginContext
		 */
		var event: lx.Event;
	}

	/**
	 * BindMobileContext
	 */
	class BindMobileContext {
		/**
		 * 关闭界面
		 */
		close(): void;

		/**
		 * 传入参数
		 */
		getParam(): object;

		/**
		 * 绑定
		 * @param object
		 */
		bind(object: {
			/**
			 * 1: 发送验证码 2: 校验验证码执行操作
			 */
			step: number;
			mobile: string;
			code?: string;
			success?: Function;
			fail?: Function;
			complete?: Function;
		}): void;
	}

	/**
	 * 绑定手机
	 * @param object
	 */
	function bindMobile(object?: { success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * 解绑手机
	 * @param object
	 */
	function unbindMobile(object?: { success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * UnbindMobileContext
	 */
	class UnbindMobileContext {
		/**
		 * 传入参数
		 */
		getParam(): object;

		/**
		 * close
		 */
		close(): void;

		/**
		 * 绑定
		 * @param object
		 */
		unbind(object: {
			/**
			 * 1: 发送验证码 2: 校验验证码执行操作
			 */
			step: number;
			code: string;
			success?: Function;
			fail?: Function;
			compelet?: Function;
		}): void;
	}

	/**
	 * LoginContext
	 */
	class LoginContext {
		/**
		 * 传入参数
		 */
		getParam(): object;

		/**
		 * close
		 */
		close(): void;

		/**
		 * 验证码登录
		 * @param object
		 */
		loginMobile(object: {
			/**
			 * 1: 发送验证码 2: 校验验证码执行操作
			 */
			step: number;
			mobile: string;
			code: string;
			success?: Function;
			fail?: Function;
			compelet?: Function;
		}): void;

		/**
		 * 密码登录
		 * @param object
		 */
		loginPwd(object: { mobile: string; password: string; success?: Function; fail?: Function; compelet?: Function }): void;
	}

	/**
	 * 解绑手机
	 * @param object
	 */
	function unbindmobile(object: { success?: Function; fail?: Function; complete?: Function }): void;

	/**
	 * setCache
	 * @param key
	 * @param data
	 * @param interval 毫秒
	 */
	function setCache(key: string, data: object, interval: number): boolean;

	/**
	 * getCache
	 * @param key
	 */
	function getCache(key: string): object;

	/**
	 * existCache
	 * @param key
	 */
	function existCache(key: string): boolean;

	/**
	 * removeCache
	 * @param key
	 */
	function removeCache(key: string): boolean;

	/**
	 * clearCache
	 */
	function clearCache(): boolean;

	/**
	 * 获取本地数据
	 * @param key
	 */
	function getStorageSync(key: string): object;

	/**
	 * 设置本地数据
	 * @param key
	 * @param value
	 */
	function setStorageSync(key: string, value: object): void;

	/**
	 * 移除本地数据
	 * @param key
	 */
	function removeStorageSync(key: string): void;

	/**
	 * 清理本地数据
	 */
	function clearStorageSync(): void;

	/**
	 * 获取会话数据
	 * @param key
	 */
	function getSessionData(key: string): object;

	/**
	 * 设置会话数据
	 * @param key
	 * @param value
	 */
	function setSessionData(key: string, value: object): void;

	/**
	 * 移除会话数据
	 * @param key
	 */
	function removeSessionData(key: string): void;

	/**
	 * 清理会话数据
	 */
	function clearSessionData(): void;

	/**
	 * path
	 */
	namespace path {
		/**
		 * 获取文件扩展名
		 * @param pathStr
		 */
		function extname(pathStr: string): string;

		/**
		 * 获取文件名
		 * @param path
		 */
		function filename(path: string): string;

		/**
		 * 拼接字符串为 Path
		 * @param args
		 */
		function join(...args: Array<string>): string;

		/**
		 * 根据链接获得域名
		 * @param url
		 */
		function domain(url: string): string;

		/**
		 * 格式化参数
		 * @param query
		 * @param encode  是否编码
		 */
		function toQueryString(query: object, encode?: boolean): string;

		/**
		 * 格式化参数
		 * @param query
		 * @param decode 是否解码
		 */
		function toQueryObject(query: string, decode?: boolean): object;

		/**
		 * 添加参数
		 * @param url
		 * @param query
		 * @param noEncode 不编码
		 */
		function addQuery(url: string, query: object | string, noEncode?: boolean): string;

		/**
		 * 获得参数
		 * @param url
		 * @param name
		 * @param noDecode 不解码
		 */
		function getQuery(url: string, name: string, noDecode?: boolean): string;
	}

	/**
	 * 获得cookie
	 * @param key
	 * @param domain
	 */
	function getCookie(key: string, domain?: string): string;

	/**
	 * 设置cookie
	 * @param key
	 * @param value
	 * @param expires 单位(天)
	 * @param domain
	 */
	function setCookie(key: string, value: string, expires?: number, domain?: string): void;

	/**
	 * 移除cookie
	 * @param key
	 * @param domain
	 */
	function removeCookie(key: string, domain?: string): void;

	/**
	 * 清除cookie
	 * @param domain
	 */
	function clearCookie(domain?: string): void;

	/**
	 * js
	 */
	namespace js {
		/**
		 * 是否为null|undefine
		 * @param obj
		 */
		function isNull(obj: any): boolean;

		/**
		 * 是否是数字
		 * @param obj
		 */
		function isNumber(obj: any): boolean;

		/**
		 * 是否是数组
		 * @param obj
		 */
		function isArray(obj: any): boolean;

		/**
		 * 是否是字符串
		 * @param obj
		 */
		function isString(obj: any): boolean;

		/**
		 * 是否为对象
		 * @param obj
		 */
		function isObject(obj: any): boolean;

		/**
		 * 是否为函数
		 * @param obj
		 */
		function isFunction(obj: any): boolean;

		/**
		 * 格式化字符串
		 * @param args
		 * cc.js.formatStr("a: %s, b: %s", a, b);
		 * cc.js.formatStr(a, b, c);
		 */
		function formatStr(...args: Array<string>): string;

		/**
		 * 是否有属性
		 * @param object
		 * @param path
		 */
		function has(object: object, path: string): boolean;

		/**
		 * 获得key集合
		 * @param object
		 */
		function keys(object: object): Array<object>;

		/**
		 * 获得value集合
		 * @param object
		 */
		function values(object: object): Array<object>;

		/**
		 * 赋值(仅赋值存在的属性且处于第一层)
		 * @param object
		 * @param value
		 */
		function set(object: object, value: object): void;

		/**
		 * 遍历所有属性赋值(深度遍历)
		 * @param object
		 */
		function cover(object: object, value: object): void;

		/**
		 * 浅拷贝对象
		 * @param object
		 */
		function copy(object: object): object;
	}

	/**
	 * utils
	 */
	namespace utils {
		
		/**
		 * obj->int
		 * @param num
		 * @param def
		 */
		function toInt(num: any, def?: number): number;

		/**
		 * obj --> float
		 * @param num
		 * @param def
		 */
		function toFloat(num: any, def?: number): number;

		/**
		 * 四舍五入
		 * @param num
		 * @param place
		 */
		function round(num: number, place: number): number;

		/**
		 * 随机数
		 * @param min
		 * @param max
		 */
		function random(min: number, max?: number): number;

		/**
		 * 格式化数字
		 * @param num
		 * @param length
		 * @example 1 -> 001
		 */
		function formatNumber(num: number, length: number): string;

		/**
		 * json ---> obj
		 * @param str
		 */
		function toJsonObj(str: string): object;

		/**
		 * obj ---> json
		 * @param obj
		 */
		function toJsonStr(obj: object): string;

		/**
		 * 通用错误消息
		 * @param code
		 * @param message
		 */
		function formatErrMsg(code: number, message: string): { code: number; message: string };

		/**
		 * 安全执行回调
		 * @param method
		 * @param args
		 */
		function safeCall(method: Function, ...args: Array<object>): void;

		/**
		 * 安全执行回调
		 * @param method
		 * @param args
		 */
		function safeApply(method: Function, args?: Array<object>): void;

		/**
		 * loadImage
		 * @param object
		 */
		function loadImage(object: { url: string; success?: Function; fail?: Function; complete?: Function }): void;
	}

	namespace encoder {
		namespace md5 {
			/**
			 * encode
			 * @param text
			 * @param salt
			 */
			function encode(text: string, salt?: string): string;
		}

		namespace base64 {
			/**
			 * encode
			 * @param text
			 */
			function encode(text: string): string;

			/**
			 * decode
			 * @param text
			 */
			function decode(text: string): string;

			/**
			 * encodeArr
			 * @param arr
			 */
			function encodeArr(arr: Array<number>): string;

			/**
			 * decodeArr
			 * @param text
			 */
			function decodeArr(text: string): Array<number>;
		}
	}
}
