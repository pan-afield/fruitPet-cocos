// import MessageBoxManager from "../manager/MessageBoxManager";
import SilentLoader from "./SilentLoader";

/**
 * 资源管理
 */
export default class RES {

    /** 已经加载的资源 */
    public static resources: { [name: string]: cc.Asset } = {};

    /**
     * 根据资源类型描述获取类对象
     * @param name
     */
    public static getTypeFromString(name: string): any {
        switch (name) {
            case "cc.SpriteAtlas":
                return cc.SpriteAtlas;
            case "cc.Prefab":
                return cc.Prefab;
            case "cc.Texture2D":
                return cc.Texture2D;
            case "sp.SkeletonData":
                return sp.SkeletonData;
            case "dragonBones.DragonBonesAsset":
                return dragonBones.DragonBonesAsset;
            case "dragonBones.DragonBonesAtlasAsset":
                return dragonBones.DragonBonesAtlasAsset;
            case "cc.JsonAsset":
                return cc.JsonAsset;
            case "cc.SpriteFrame":
                return cc.SpriteFrame;
            case "cc.Font":
                return cc.Font;
            case "cc.ParticleAsset":
                return cc.ParticleAsset;
            case "cc.TextAsset":
                return cc.TextAsset;
            default:
                lx.warn("不存在", name);
                return;
        }
    }

    /**
     * 不需要主动加载的资源类型
     * 图集纹理、骨骼纹理数据描述json
     */
    public static unloadResourceType: string[] = ["plistTexture", "skeJson"]

    /**
     * 资源名称表
     */
    public static resNameTable: string[] = [
        "loginCarPlist",
        "carStantPlist",
        "carEatPlist",
        "normalCatSpine",
        "youngCatSpine",
        'bigCatSpine',
        "smallHeart",
        "middleHeart",
        'bigHeart'
    ];

    public static groups: any = {};
    public static groupResources: any = {};

    /** 已经使用过的SpriteFrame */
    private static spriteFrames: { [id: string]: cc.SpriteFrame } = {};
    /** 已经使用过的BMFont */
    private static bmFonts: { [id: string]: cc.Font } = {};

    public constructor() {
    }

    /** 解析ResConfig.js */
    public static analysisResConfig(jsonObj: any): void {
        if (!jsonObj) {
            return;
        }

        if (!jsonObj) {
            return;
        }

        /** 拆分ResConfig里面的group组 */
        let groups: any[] = jsonObj.groups;
        for (let i: number = 0; i < groups.length; i++) {
            RES.groups[groups[i].name] = groups[i].keys.split(",");
        }

        /** ResConfig里面的resources */
        let resources: any[] = jsonObj.resources;
        for (let i: number = 0; i < resources.length; i++) {
            RES.groupResources[resources[i].name] = resources[i];
        }
    }

    /**
     * 刷新资源
     * @param res
     */
    public static updateRes(res: any): void {
        let item: any;
        let resNameTable: string[] = RES.resNameTable;
        let name: string;
        for (let i: number = 0; i < resNameTable.length; i++) {
            name = resNameTable[i];
            item = res[name];
            if (name == "customRes") {
                if (item && item.length > 0) {
                    for (let i: number = 0; i < item.length; i++) {
                        RES.addRes(item[i].name, item[i]);
                    }
                }
                continue;
            }
            if (item/* && item instanceof cc.RawAsset*/) {
                RES.addRes(name, item);
            }
        }
    }

    /** 把加载的资源存进resources数组里面，方便获取 */
    public static addRes(name: string, res: any): void {
        RES.resources[name] = res;
    }

    /**
     * 由于SpriteFrame可能存在于图集中，不能单纯使用getResByName获取，所以提供此方法获取贴图资源，此方法会遍历所有单图或图集数据 来寻找对应的资源
     * @param name
     */
    public static getSpriteFrame(name: string, altlasName?: string, sprite?: cc.Sprite): cc.SpriteFrame {
        let item: any;
        let tempSprite: cc.SpriteFrame;

        if (altlasName) {
            for (var index in RES.resources) {
                item = RES.resources[index];
                if (item instanceof cc.SpriteAtlas && (item.name == altlasName || item.name == altlasName + "_plist")) {
                    tempSprite = item.getSpriteFrame(name);
                    return tempSprite;
                }
            }
            //没找到指定图集，尝试从服务器加载
            RES.loadFile(altlasName + "_plist", function () {
                if (sprite && sprite.isValid) {
                    sprite.spriteFrame = RES.getSpriteFrame(name);
                }
            }, this);
        }
        let oldSpF: cc.SpriteFrame = RES.spriteFrames[name];
        if (!cc.isValid(oldSpF)) {
            delete RES.spriteFrames[name];
            oldSpF = null;
        }
        if (oldSpF) {
            return oldSpF;
        }

        for (var index in RES.resources) {
            item = RES.resources[index];
            if (!item.isValid) {
                continue;
            }
            if (item instanceof cc.SpriteFrame && index == name) {
                RES.spriteFrames[name] = item;
                return item;
            } else if (item instanceof cc.SpriteAtlas) {
                tempSprite = item.getSpriteFrame(name);
                if (tempSprite) {
                    RES.spriteFrames[name] = tempSprite;
                    return tempSprite;
                }
            }
        }
        cc.warn("RES.getSpriteFrame未找到对应的贴图：" + name);
        return null;
    }

    /**
     * 动态设置SpriteFrame
     * @param sprite 
     * @param url 
     * @param spfKey 当spfKey存在时，url加载的是图集
     * @param callBack 
     */
    public static setSpriteFrame(sprite: cc.Sprite, url: string, spfKey?: string, callBack?: Function): void {
        var spf = cc.resources.get(url, cc.SpriteFrame) as cc.SpriteFrame;
        if (spf && cc.isValid(spf)) {
            if (cc.isValid(sprite)) {
                sprite.spriteFrame = spf;
                callBack && callBack();
            }
            return;
        }
        RES.loadRes(url, spfKey ? cc.SpriteAtlas : cc.SpriteFrame, function (err, res) {
            if (err) {
                return;
            }
            if (cc.isValid(sprite)) {
                sprite.spriteFrame = spfKey ? (res as cc.SpriteAtlas).getSpriteFrame(spfKey) : res;
                callBack && callBack();
            }
        }, this);
    }

    /**
     * 根据路径获取本地图片，返回一个精灵帧
     * @param url 
     */
    public static getSpriteFrameByURL(url: string): cc.SpriteFrame {
        var spf = cc.resources.get(url, cc.SpriteFrame) as cc.SpriteFrame;

        RES.loadRes(url, cc.SpriteFrame, function (err, res) {
            if (err) {
                return;
            }
        }, this);
        return spf;
    }

    /**
     * 获取位图字体
     * @param name 字体名称
     *  */
    public static getBmFont(name: string): cc.Font {
        let font: cc.Font = RES.bmFonts[name];
        if (font) {
            return font;
        }

        let item: any;
        for (var index in RES.resources) {
            item = RES.resources[index];
            if (item instanceof cc.Font && index == name) {
                RES.bmFonts[name] = item;
                return item;
            }
        }
        return null;
    }

    /**
     * 加载具体某个文件
     * 注意：加载某个具体文件时，fileName 需指定文件后缀名，具体格式为“文件名_后缀名”， 如fishbg_png、fishbg1_jpg
     * @param fileName 如fishbg_png、fishbg1_jpg
     * @param callBack
     * @param thisObj
     * @param callBackParams
     */
    public static loadFile(fileName: string, callBack?: Function, thisObj?: any, callBackParams?: any[]): void {
        let oldRes = RES.resources[fileName];
        if (oldRes) {
            if (oldRes.isValid) {
                if (callBack) {
                    if (thisObj) {
                        callBack.apply(thisObj, [RES.resources[fileName]].concat(callBackParams));
                    } else {
                        callBack(RES.resources[fileName], callBackParams);
                    }
                }
                return;
            } else {
                delete RES.resources[fileName];
            }
        }
        let itemData: {
            name: string;
            type: string;
            url: string;
        } = RES.groupResources[fileName];

        //去掉后缀名
        let url: string = itemData.url.substring(0, itemData.url.lastIndexOf("."));

        let callFun: Function = function (err, res) {
            if (res) {
                // RES.resources[fileName] = res;
                RES.addRes(fileName, res);
            }
            if (callBack) {
                if (thisObj) {
                    callBack.apply(thisObj, [RES.resources[fileName]].concat(callBackParams));
                } else {
                    callBack(RES.resources[fileName], callBackParams);
                }
            }
        };
        RES.loadRes(url, RES.getTypeFromString(itemData.type), callFun);
    }

    /**
     * 交给cc.loader.loadRes进行最终加载，cc.loader.loadRes会自动识别已加载过的资源，从而避免重复加载
     * @param url
     * @param type 如：cc.SpriteFrame
     * @param callBack
     * @param thisObj
     */
    public static loadRes(url: string, type: typeof cc.Asset, callBack?: Function, thisObj?: any, options?: {
        showTip?: boolean;
        tipParent?: cc.Node;
        tipMsg?: string;
        tipPos?: cc.Vec2;
        concurrent?: number;
    }): void {
        // cc.error("--------------------执行加载：" + url)
        let showTip: boolean = false;
        let tipParent: cc.Node = null;
        let tipMsg: string = "正在加载...";
        let tipPos: cc.Vec2 = null;
        let concurrent: number;
        if (options) {
            if (options.showTip == true) {
                showTip = true;
            }
            tipParent = options.tipParent;
            if (options.tipMsg) {
                tipMsg = options.tipMsg;
            }
            if (options.tipPos) {
                tipPos = options.tipPos;
            }
            concurrent = options.concurrent;
        }
        if (showTip) {
            //显示加载提示
            // MessageBoxManager.showLoadingTip({
            //     msg: tipMsg,
            //     isModel: false
            // }, tipParent, tipPos);
        }
        cc.resources.load(url, type, function (err, res) {
            if (err) {
                cc.warn("--------------------加载完成：" + url + ", 错误码：" + err);
            }
            if (showTip) {
                // MessageBoxManager.hideLoadingTip();
            }
            if (callBack) {
                if (thisObj) {
                    callBack.apply(thisObj, [err, res]);
                } else {
                    callBack(err, res);
                }
            }
        });
    }

    /**
     * 根据名称获取资源
     * @param name
     */
    public static getRes(name: string): any {
        let res = RES.resources[name];
        return res;
    }

    //当前加载中的文件
    private static currentLoadGroudItems: string[];

    //当前排队等待加载的组（为保证网络顺畅和UI稳定，不能并行加载多个组）
    private static groupQueue: any[] = [];

    //当前是否处于加载状态中（占用中）
    private static isLoading: boolean;

    /** 下载任务的最大并发数限制 - 这是一个重要的指标，并发数太多会导致游戏掉帧，所以静默加载时保证游戏稳定帧数，需要将cc.macro.DOWNLOAD_MAX_CONCURRENT = 1 */
    public static cocos_DOWNLOAD_MAX_CONCURRENT: number = 64;

    /**
     * 判断某个组是否已经加载过
     * @param groupName
     */
    public static isGroupLoaded(groupName: string | string[]): boolean {
        if (!groupName) {
            return true;
        }
        let groupItems: string[] = [];
        if (typeof groupName == "string") {
            groupItems = RES.groups[groupName];
        } else {
            let tempNames: string[];
            for (let i: number = 0; i < groupName.length; i++) {
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
            }
        }

        if (!groupItems) {
            return true;
        }

        let itemName: string;
        let itemData: {
            name: string;
            type: string;
            url: string;
        };
        // let name:string;
        let url: string;
        let asset: cc.Asset;
        for (let i: number = 0; i < groupItems.length; i++) {
            itemName = groupItems[i];
            itemData = RES.groupResources[itemName];
            //过滤不需要主动加载的资源
            if (RES.unloadResourceType.indexOf(itemData.type) < 0) {
                //去掉后缀名
                url = itemData.url.substring(0, itemData.url.lastIndexOf("."));

                asset = cc.loader.getRes(url, RES.getTypeFromString(itemData.type));
                if (!asset || !asset.isValid) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 释放组资源
     * @param groupName
     */
    public static releaseGroup(groupName: string | string[]): void {
        let groupItems: string[] = [];
        if (typeof groupName == "string") {
            groupItems = RES.groups[groupName];
            //标记为未加载
            // RES.groupLoadedFlag[groupName] = false;
        } else {
            let tempNames: string[];
            for (let i: number = 0; i < groupName.length; i++) {
                //标记为未加载
                // RES.groupLoadedFlag[groupName[i]] = false;

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
            }
        }

        let itemName: string;
        let itemData: {
            name: string;
            type: string;
            url: string;
        };
        let name: string;
        let url: string;
        for (let i: number = 0; i < groupItems.length; i++) {
            itemName = groupItems[i];
            itemData = RES.groupResources[itemName];
            //过滤不需要主动加载的资源
            if (RES.unloadResourceType.indexOf(itemData.type) < 0) {
                //去掉后缀名
                url = itemData.url.substring(0, itemData.url.lastIndexOf("."));
                cc.loader.releaseRes(url, RES.getTypeFromString(itemData.type));

                //删除本地文件
                // PlatformHelper.deleteFile(cc.url.raw("resources/" + itemData.url));

                // if(cc.loader.getRes(url, RES.getTypeFromString(itemData.type)))
                // {
                // 	cc.loader.releaseRes(url, RES.getTypeFromString(itemData.type));
                // }

                name = itemData.name.substring(0, itemData.name.lastIndexOf("_"));
                if (RES.resources[name]) {
                    delete RES.resources[name];
                }
                if (RES.spriteFrames[name]) {
                    delete RES.spriteFrames[name];
                }
                if (RES.bmFonts[name]) {
                    delete RES.bmFonts[name];
                }

                name = itemData.name.substring(0, itemData.name.lastIndexOf("_")) + "." + itemData.name.substring(itemData.name.lastIndexOf("_") + 1, itemData.name.length);
                if (RES.resources[name]) {
                    delete RES.resources[name];
                }
                if (RES.spriteFrames[name]) {
                    delete RES.spriteFrames[name];
                }
                if (RES.bmFonts[name]) {
                    delete RES.bmFonts[name];
                }
            }
        }

        //通知静默加载器不要加载这些组
        SilentLoader.addExcludeGroups(groupName);
    }

    /**
     * 加载头像
     * @param img 
     */
    public static loadHead(img: string, node: cc.Sprite) {

        (function (_goodsImg, _imgpath) {
            // cc.loader.load({
            //     url: _imgpath,
            //     type: "png"
            // }, function (err, texture) {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     if (!cc.isValid(self)) {
            //         return;
            //     }
            //     if (_imgpath != img) {
            //         return;
            //     }
            //     _goodsImg.spriteFrame = new cc.SpriteFrame(texture);
            // });
            if (!_imgpath) return null;
            cc.assetManager.loadRemote(_imgpath, { ext: '.png' }, (err, texture: any) => {
                // callback(err, texture)
                _goodsImg.spriteFrame = new cc.SpriteFrame(texture);
            });
        })(node, img);
    }
}
