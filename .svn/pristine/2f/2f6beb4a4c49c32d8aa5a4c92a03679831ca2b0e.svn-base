import Config from "../config/config";
import HttpHelper from "../http/HttpHelper";
import MessageBoxManager from "../manager/MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog";

export default class ConfigProxy {
    public constructor() {

    }
    public configInfo(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Config/Info",
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
    public configNotice(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Config/Notice",
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
}