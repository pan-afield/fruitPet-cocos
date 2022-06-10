import Config from "../config/config";
import UIConstant from "../constant/UIConstant";
import EventDispatcher from "../event/EventDispatcher";
import GameEvent from "../event/GameEvent";
import HttpHelper from "../http/HttpHelper";
import App from "../manager/App";
import MessageBoxManager from "../manager/MessageBoxManager";
import AlertDialog from "../view/dialog/AlertDialog";

export default class PetProxy {
    public constructor() {

    }

    /**
     * 获取当前游戏信息
     * @param para 
     */
    public farmGameInfo(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/CurInfo",
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
                App.gdata.farmGameInfo = data.Data.Gameinfo;
                EventDispatcher.dispatch(GameEvent.UPDATA_FARM_GAME_INFO, data.Data);
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

    public userHistoryAll(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/UserHistoryAll",
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

    public feed(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        termid: number
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/Feed",
            data: {
                termid: para.termid
            },
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

    public feedAll(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/FeedAll",
            data: null,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                if (data.Result != 0) {
                    MessageBoxManager.showAlert({
                        type: AlertDialog.TYPE_1,
                        msg: data.Msg,
                        cancelLabel: "取消",
                        okCallBack: function () {
                            EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
                        },
                        okLabel: "前往果园"

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
    public getSeedsInfo(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/GetSeedsInfo",
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
    public GameHistory(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/GameHistory",
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
    public userHistory(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/UserHistory",
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
    public userBuySeedsList(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        data?
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/UserBuySeedsList",
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

    public getExpress(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/GetExpress",
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

    public applyByExpress(para: {
        data: Object
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/ApplyByExpress",
            data: para.data,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                // if (data.Result != 0 && data.Result != -4) {
                //     MessageBoxManager.showAlert({
                //         type: AlertDialog.TYPE_2,
                //         msg: data.Msg
                //     });
                //     return;
                // }
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

    public apply(para: {
        data: Object
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/Apply",
            data: para.data,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                // if (data.Result != 0 && data.Result != -4) {
                //     MessageBoxManager.showAlert({
                //         type: AlertDialog.TYPE_2,
                //         msg: data.Msg
                //     });
                //     return;
                // }
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
    public ReApply(para: {
        data: Object
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/ReApply",
            data: para.data,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                // if (data.Result != 0 && data.Result != -4) {
                //     MessageBoxManager.showAlert({
                //         type: AlertDialog.TYPE_2,
                //         msg: data.Msg
                //     });
                //     return;
                // }
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
    public CustomeApply(para: {
        data: Object
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/CustomeApply",
            data: para.data,
            method: "POST",
            success: function (data) {
                if (!data) {
                    return;
                }
                // if (data.Result != 0 && data.Result != -4) {
                //     MessageBoxManager.showAlert({
                //         type: AlertDialog.TYPE_2,
                //         msg: data.Msg
                //     });
                //     return;
                // }
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

    public MyPlant(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/MyPlant",
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

    public getResult(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
        termid: number
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/GetResult",
            data: {
                termid: para.termid
            },
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

    public seedLogs(para: {
        onSuccess?: Function,
        thisObj?: any,
        onFail?: Function,
    }): void {
        HttpHelper.request({
            url: Config.linkURL + "/Game/SeedLogs",
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
