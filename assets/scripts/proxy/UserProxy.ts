import Config from "../config/config";
import EventDispatcher from "../event/EventDispatcher";
import GameEvent from "../event/GameEvent";
import HttpHelper from "../http/HttpHelper";
import App from "../manager/App";
import MessageBoxManager from "../manager/MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog"; 

/**
 * 主线剧情通信
 */
 export default class UserProxy {
    public constructor() {

    }
    public login(para: {
        code:string
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/User/Login",
            data: {
                code:para.code
            },
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                if (data.Result != 0) {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.msg
                    });
                    return;
                }
                if (para.onSuccess) {
                    para.onSuccess.apply(para.thisObj, [data.Data]);
                }
            }.bind(this),
            fail: function (data) {
                if (para.onFail) {
                    para.onFail.apply(para.thisObj);
                } else {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.Msg
                    });
                }
            }.bind(this)
        });
    }

    public getUserInfo(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/User/GetUserInfo",
            data: null,
            method: "GET",
            success: function (data) {
                if (!data) {
                    return;
                }
                if (data.Result != 0) {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.Msg
                    });
                    return;
                }
                App.gdata.userInfo = data.Data
                EventDispatcher.dispatch(GameEvent.UPDATA_FARM_GAME_INFO,data.Data);
                if (para.onSuccess) {
                    para.onSuccess.apply(para.thisObj, [data.Data]);
                }
            }.bind(this),
            fail: function (data) {
                if (para.onFail) {
                    para.onFail.apply(para.thisObj);
                } else {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }
    public CoinLog(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/User/CoinLog",
            data: para.data,
            method: "GET",
            success: function (data) {
                if (!data) {
                    return;
                }
                if (data.Result != 0) {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.Msg
                    });
                    return;
                }
                if (para.onSuccess) {
                    para.onSuccess.apply(para.thisObj, [data.Data]);
                }
            }.bind(this),
            fail: function (data) {
                if (para.onFail) {
                    para.onFail.apply(para.thisObj);
                } else {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }

    public addUserInfo(para: {
        data:any,
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function, 
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/User/AddUserInfo",
            data: para.data,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                if (data.Result != 0) {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.Msg
                    });
                    return;
                }
                App.gdata.userInfo = data.Data
                if (para.onSuccess) {
                    para.onSuccess.apply(para.thisObj, [data.Data]);
                }
            }.bind(this),
            fail: function (data) {
                if (para.onFail) {
                    para.onFail.apply(para.thisObj);
                } else {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_2,
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }
}
 