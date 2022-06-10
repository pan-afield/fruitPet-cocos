import App from "./App";

enum JSONINDEX{
    ENEMY, 
    WEAPON
}

/**json配置管理脚本 */
export default class ConfigManager{
    
    public constructor() {
    }
    
    public static init(){
        ConfigManager.jsonPath.forEach((element,_index)=>{
            cc.resources.load(element, cc.JsonAsset, function (err, res:any) { 
                if (res) {
                    ConfigManager.configData[ConfigManager.dataname[_index]] = res.json;
                }
            })
        })
    }

    private static jsonPath:string[] = [
        "ENEMY_JSON", 
        "WEAPON_JSON"
    ];

    private static dataname:string[] = [
        "enemy", 
        "weapon"
    ];

    public static configData:any[] = []; 

    public static getEnemyList(){
        return  ConfigManager.configData[ConfigManager.dataname[JSONINDEX.ENEMY]];
    } 

    public static getEnemyById(_id){
        return ConfigManager.configData[ConfigManager.dataname[JSONINDEX.ENEMY]][_id-1]; 
    }

    public static getWeaponList(){
        return  ConfigManager.configData[ConfigManager.dataname[JSONINDEX.WEAPON]];
    } 

    public static getWeaponInfoById(_id):weapon{
        return ConfigManager.configData[ConfigManager.dataname[JSONINDEX.WEAPON]][_id-1];
    } 

}

/**武器数据类型 */
export interface weapon{
    id:number;
    name:string;
    url:string;
    spine:string;
    wakan:number
} 