import SDKConfig from "../config/SDKCofig";
import EventDispatcher from "../event/EventDispatcher";
import StorageProvider from "../localStorage/StorageProvider";
import App from "../manager/App";
import JsPattern from "../union/JsPattern";
import AlertDialog from "../view/dialog/AlertDialog";

/**
 * 通信器入口
 */
export default class HttpHelper {

    /** 使用的平台ID */
    public static platformId: number = 7;
    public static httpPostRequest(url: string, successCallBack?: Function, failCallBack?: Function, header?: any, dataType?: string, data?: any): void {
        HttpHelper.request({
            url: url,
            header: header,
            method: "POST",
            data: data || {},
            dataType: dataType ? dataType : "arraybuffer",
            withCredentials: true,//不需要保存认证信息
            success: successCallBack,
            fail: failCallBack,
        });
    }

    public static httpGetRequest(url: string, successCallBack?: Function, failCallBack?: Function, header?: any, tip?,): void {
        //执行http登录请求
        // JsPattern.lx.request({
        HttpHelper.request({
            url: url,
            header: header,
            method: "GET",
            dataType: "text",
            withCredentials: true,//不需要保存认证信息
            success: successCallBack,
            fail: failCallBack,
        });
    }

    /**
     * http 请求
     * @method request
     * @param {Object} object
     * @return {Object} {function: aboart}
     */
    public static request(object, forceNew?: boolean) {
        // object.data._ver =  App.gdata.pbversion;

        var url = object.url,
            header = object.header,
            data = object.data || {},
            dataType = object.dataType || "json",
            isPost = object.method && object.method.toLowerCase() == "post",
            withCredentials = object.withCredentials,
            timeout = Number(object.timeout),
            success = object.success,
            fail = object.fail,
            complete = object.complete,
            method;

        let token = StorageProvider.getItem("token") || "";

        if (!forceNew) {
            data._ts = new Date().getTime();
        }

        var onSuccess = function (data) {
            success && success.apply(this, arguments);
            complete && complete.apply(this);
        };
        var fArgs = null;
        var onFail = function (data) {
            if (!fArgs) {
                setTimeout(function () {
                    fail && fail.apply(this, fArgs);
                    complete && complete.apply(this);
                }.bind(this));
            }
            fArgs = arguments;
        };
        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
            xhr.ontimeout = function () {
                onFail(HttpHelper.formaErrorMsg(-2, "network request timeout"));
                onFail(HttpHelper.formaErrorMsg(-2, "服务器连接超时，请重试！"));
            };
            xhr.onerror = function () {
                onFail(HttpHelper.formaErrorMsg(-3, "network request error"));
            };
            xhr.onabort = function () {
                onFail(HttpHelper.formaErrorMsg(-5, "network request abort"));
            };
            xhr.addEventListener('error',(e)=>{console.log(e)})
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        data = dataType.toLowerCase() === "json" ? HttpHelper.toJsonObj(xhr.response) : xhr.response;
                        onSuccess(data);
                        return;
                    } else {
                        console.log(url);
                    }
                    // onFail(HttpHelper.formaErrorMsg(-1, "network request failure"));
                }
            };
            var str = '';
            var adopt = url.indexOf('?') > -1 ? '&' : '?';
            if (typeof data === 'object' && isPost) {
                for (var keys in data) {
                    if (data.hasOwnProperty(keys) == true) {
                        str += keys + '=' + data[keys] + '&'
                    }
                }
                str = str.substring(0, str.length - 1);
                url += (adopt + str);
            }


            if (!isPost) {
                var url: any = HttpHelper.addQuery(url, data);
                method = "GET";
            } else {
                data = HttpHelper.toQueryString(data, true);
                method = "POST";
            }
            xhr.withCredentials = true;
            xhr.open(method, url, true);
            timeout && (xhr.timeout = timeout);
            dataType && (xhr.responseType = dataType);
            // withCredentials && (xhr.withCredentials = true);
            if (header) {
                for (var name in header) xhr.setRequestHeader(name, header[name]);
            }
            xhr.setRequestHeader('token', token);
            if (isPost) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(data);
            } else {
                xhr.send();
            }
        } catch (ex) {
            var msg = "network request exception";
            ex && (msg += ex.message);
            onFail(HttpHelper.formaErrorMsg(-4, msg));
        }
        return xhr;
    }

    public static addQuery(e: string, t, r?): string {
        e = e ? e.trim() : "";
        if (!(t = HttpHelper.isString(t) ? t : this.toQueryString(t, !r))) {
            return e;
        }
        if (e.indexOf("?") >= 0) {
            3082860755
            var i = e[e.length - 1];
            e += "?" === i || "&" === i ? t : "&" + t
        } else {
            e += "?" + t;
        }
        return e;
    }

    public static toQueryString(e, t): string {
        if (HttpHelper.isString(e)) {
            return e;
        }
        if (!HttpHelper.isObject(e)) {
            return "";
        }
        for (var r = "", i = HttpHelper.keys(e), o = i.length, a = 0; a < o; a++) {
            var s = i[a];
            r += s + "=" + (t ? encodeURIComponent(e[s]) : e[s]),
                a + 1 < o && (r += "&")
        }
        return r;
    }

    public static isString(e): boolean {
        return "string" == typeof e || e instanceof String
    }

    public static isObject(e): boolean {
        var t = typeof e;
        return "function" === t || "object" === t && !!e
    }

    public static keys(e): any[] {
        if (!this.isObject(e)) {
            return [];
        }
        var t = [];
        for (var n in e) {
            this.has(e, n) && t.push(n);
        }
        return t;
    }

    public static has(e, t): boolean {
        return null != e && Object.prototype.hasOwnProperty.call(e, t)
    }

    public static toJsonObj(e): string {
        try {
            return e && HttpHelper.isString(e) ? JSON.parse(e) : e
        } catch (t) {
            return e
        }
    }

    public static formaErrorMsg(e?: any, t?: any): any {
        return {
            code: e || 0,
            message: t || ""
        };
    }

    /**
     * 初始化平台SDK
     */
    public static initPlatformSDK(callBack?: Function, callBackObj?: any): void {
        SDKConfig.initLXSDK(callBack, callBackObj);
    }

}