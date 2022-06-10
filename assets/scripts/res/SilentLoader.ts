// import ViewResConfig from "./ViewResConfig";
import RES from "./RES";
import ViewResConfig from "./ViewResConfig";
// import UIConstant from "../constant/UIConstant";

/**
 * 资源静默加载装置
 * 管理资源在后台静默加载
 * 1、优先级为最低，其它资源在加载时不能执行加载；
 * 2、其它资源加载时如果正在加载，需要暂停；
 * 3、若没有其它资源正在加载，需要启动加载；
 * 4、静默加载不可以加载大资源，否则解码会导致卡顿。
 */
export default class SilentLoader {

    /**
     * 静默加载组
     * 注：以下分组按照优先级从上到下依次排列
     */
    public static silentGroups: any = [
        ViewResConfig.config.MainScene.group
    ];

    /** 动态添加不需要静默加载的组 */
    private static excludeGroups: string[] = [];

    /** 当前是否处于加载状态中（占用中） */
    private static isLoading: boolean;

    /** 当前加载中的组 */
    private static currentLoadingGroup: any;

    /** 当前加载中的文件 */
    private static currentLoadGroudItems: string[];

    /** 当前是否可以执行加载 */
    private static _canLoad: boolean;

    /** 当前被外部中断 如果为false， 将无视_canLoad */
    // private static canbeInterrupt:boolean = false;

    public static get canLoad(): boolean {
        return SilentLoader._canLoad;
    }

    public static set canLoad(value: boolean) {
        if (SilentLoader._canLoad && value) {
            return;
        }
        SilentLoader._canLoad = value;
        if (SilentLoader._canLoad/* && isNaN(App.gdata.roomType)*/)//游戏场景内禁止加载
        {
            //将并发下载数设置为1
            cc.macro.DOWNLOAD_MAX_CONCURRENT = 1;

            //上次的组还没加载完继续加载
            if (SilentLoader.currentLoadGroudItems && SilentLoader.currentLoadGroudItems.length > 0) {
                SilentLoader.loadGroupItem(SilentLoader.currentLoadingGroup);
                return;
            }
            //上次的组已经加载完，启动下一组加载
            SilentLoader.isLoading = false;
            SilentLoader.exeLoad();
        } else {
            //还原默认并发下载数
            cc.macro.DOWNLOAD_MAX_CONCURRENT = RES.cocos_DOWNLOAD_MAX_CONCURRENT;
        }
    }

    /**
     * 加载组资源，并且每加载完一个就回调一个指定函数
     * @see /assets/resources/ResConfig.json
     */
    public static exeLoad(): void {
        if (SilentLoader.isLoading) {
            return;
        }
        SilentLoader.doLoadGroup();
    }

    /**
     * 执行组加载
     */
    public static doLoadGroup(): void {
        if (!SilentLoader._canLoad) {
            //还原默认并发下载数
            cc.macro.DOWNLOAD_MAX_CONCURRENT = RES.cocos_DOWNLOAD_MAX_CONCURRENT;
            return;
        }
        SilentLoader.isLoading = true;
        if (SilentLoader.silentGroups.length == 0) {
            SilentLoader.isLoading = false;
            //还原默认并发下载数
            cc.macro.DOWNLOAD_MAX_CONCURRENT = RES.cocos_DOWNLOAD_MAX_CONCURRENT;
            return;
        }
        let groupName: string | string[] = SilentLoader.silentGroups.shift();

        if (SilentLoader.currentLoadGroudItems) {
            SilentLoader.currentLoadGroudItems.splice(0, SilentLoader.currentLoadGroudItems.length);
        }
        let needToLoad: boolean = false;
        let groupItems: string[] = [];
        if (typeof groupName == "string") {
            //排除不需要加载的组
            if (this.excludeGroups.indexOf(groupName) < 0) {
                needToLoad = RES.isGroupLoaded(groupName) ? false : true;
                groupItems = RES.groups[groupName];
            }
        } else {
            let tempNames: string[];
            if (!groupName || groupName.length <= 0) {
                return;
            }
            for (let i: number = 0; i < groupName.length; i++) {
                //排除不需要加载的组
                if (this.excludeGroups.indexOf(groupName[i]) > -1) {
                    continue;
                }

                tempNames = RES.groups[groupName[i]];

                if (!tempNames || tempNames.length == 0) {
                    continue;
                }
                for (let j: number = 0; j < tempNames.length; j++) {
                    if (!tempNames[j] || tempNames[j].trim() == "") {
                        continue;
                    }
                    groupItems.push(tempNames[j]);
                }
                if (!RES.isGroupLoaded(groupName[i])) {
                    needToLoad = true;
                }
            }
        }

        if (!needToLoad) {
            SilentLoader.isLoading = false;
            //加载下一组
            this.doLoadGroup();
            return;
        }
        SilentLoader.currentLoadingGroup = groupName;
        SilentLoader.currentLoadGroudItems = groupItems.concat();
        SilentLoader.loadGroupItem(groupName);
    }

    /**
     * 加载单个文件
     * @param groupName
     * @param callBack
     * @param thisObj
     * @param callBackParams
     */
    public static loadGroupItem(groupName: string | string[]): void {
        if (!SilentLoader._canLoad) {
            //还原默认并发下载数
            cc.macro.DOWNLOAD_MAX_CONCURRENT = RES.cocos_DOWNLOAD_MAX_CONCURRENT;
            return;
        }
        if (SilentLoader.currentLoadGroudItems.length == 0) {
            SilentLoader.isLoading = false;
            //加载下一组
            this.doLoadGroup();
            return;
        }
        let itemName: string = SilentLoader.currentLoadGroudItems.shift();
        let itemData: {
            name: string;
            type: string;
            url: string;
        } = RES.groupResources[itemName];

        if (!itemData) {
            return;
        }
        //过滤不需要主动加载的资源
        if (RES.unloadResourceType.indexOf(itemData.type) >= 0) {
            SilentLoader.loadGroupItem(groupName);
            return;
        }
        //去掉后缀名
        let name: string = itemData.name.substring(0, itemData.name.lastIndexOf("_"));
        let url: string = itemData.url.substring(0, itemData.url.lastIndexOf("."));
        // console.log("url----:", url);
        let callFun: Function = function (err, res) {
            if (res) {
                RES.addRes(name, res);
            }
            SilentLoader.loadGroupItem(groupName);
        };
        RES.loadRes(url, RES.getTypeFromString(itemData.type), callFun);
    }

    public static addExcludeGroups(groupName: string | string[]): void {
        
        if (typeof groupName == "string") {
            if (this.excludeGroups.indexOf(groupName) < 0) {
                this.excludeGroups.push(groupName);
            }
        } else {
            for (let i: number = 0; i < groupName.length; i++) {
                if (this.excludeGroups.indexOf(groupName[i]) < 0) {
                    this.excludeGroups.push(groupName[i]);
                }
            }
        }
    }
}
