/**
 * 本地数据管理
 */
 export default class StorageProvider {
    /**
	 * 保存数据
	 * @param key 识别的键值
	 * @param value 数据
	 */
	public static setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    
	/**
	 * 读取数据
	 * @param key 识别的键值
	 */
	public static getItem(key: string): string {
		var sValue: string = localStorage.getItem(key);;
		return sValue;
    }
    
	/**
	 * 删除数据
	 * @param key 识别的键值
	 */
	public static removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}