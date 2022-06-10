import JsPattern from "../union/JsPattern";  
import Config, { ChannelConfig } from "./config";

var loadScript = function (url:string, complete: Function) {
    var snode = document.createElement("script");
    snode.async = true;
    snode.src = url;
    var loaded = function () {
        document.body.removeChild(snode);
        snode.removeEventListener("load", loaded, false);
        complete && complete();
    };
    snode.addEventListener("load", loaded, false);
    document.body.appendChild(snode);
};

/**
 * SDK设置
 */
export default class SDKConfig {
    /**
     * 初始化所有必须的第三方脚本
     */ 

    public static initAllNeedScript(callBack ? : Function, callBackObj ? : any): void {
        var complete = function () {
            if (callBackObj) {
                callBack.apply(callBackObj);
            } else {
                callBack();
            }
        }
        if (typeof JsPattern.lx != "undefined") {
            complete();
            return;
        } 
        var url = "https://h5.lexun.com/api_v2/lexun/sdk/v3/lxgame-sdk.js?_r=" + Math.random().toString().substring(2, 10);
        loadScript(url, complete);
    } 

    public static initLXSDK(callBack ? : Function, callBackObj ? : any): void {
        var config = {
            gameid: 2000,
            version: Config.APP_VERSION,
            disableCookie: true,
            logLevel: Config.Log_Level,
            mode: "production",
            payment:4
        };
        var channel = "lxgame";
        var cconfig = ChannelConfig[channel];
        for (var key in cconfig) {
            config[key] = cconfig[key];
        }
        console.log("-------------lx.init-----start--------", channel);
        JsPattern.lx.init(config);
        (function () {
            console.log("-------------lx.init-----end--------");
            if (callBack) {
                if (callBackObj) {
                    callBack.apply(callBackObj);
                } else {
                    callBack();
                }
            }
        })();
    }
}