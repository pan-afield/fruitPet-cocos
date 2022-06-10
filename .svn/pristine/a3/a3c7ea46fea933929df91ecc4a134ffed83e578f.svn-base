import Config from "../config/config";
import HttpHelper from "../http/HttpHelper";
import MessageBoxManager from "../manager/MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog";

export default class NewUserActiveProxy {
    public constructor() {

    }

    /**
     * 获取当前游戏信息
     * @param para 
     */
    public ActiveTasks(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/NewUserActive/ActiveTasks",
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
    public GetActionRewards(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/NewUserActive/GetActionRewards",
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
                if (para.onSuccess) {
                    para.onSuccess.apply(para.thisObj, [data]);
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
    public Rank(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/NewUserActive/Rank",
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
    public ActSign(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/NewUserActive/ActSign",
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
    public GetRandRwarad(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/NewUserActive/GetRandRwarad",
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
