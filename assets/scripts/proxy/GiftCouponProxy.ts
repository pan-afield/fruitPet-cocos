import Config from "../config/config";
import HttpHelper from "../http/HttpHelper";
import MessageBoxManager from "../manager/MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog";


export default class GiftCouponProxy {
    public GiftCouponLogs(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/GiftCoupon/GiftCouponLogs",
            data: para.data,
            method: "GET",
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
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }
    public ConvertLog(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/GiftCoupon/ConvertLog",
            data: para.data,
            method: "GET",
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
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }
    public getGiftList(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/GiftCoupon/GiftList",
            data: para.data,
            method: "GET",
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
                        msg: data.message
                    });
                }
            }.bind(this)
        });
    }
    public convertGift(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/GiftCoupon/ConvertGift",
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
}