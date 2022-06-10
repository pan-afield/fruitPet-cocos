/**
 * 用于在ts中调用js模块
 */
 export default class JsPattern {

    private static _lxUtils:any;

    public constructor() {
    }

    /**
     * 获取lx模块
     */
    public static get lx():any
    {
        return window["lx"];
    }

    /**
     * 获取_lx模块
     */
    public static get _lx():any
    {
        return window["_lx"];
    }

    public static set lxUtils(value:any)
    {
        this._lxUtils = value;
    }

    public static get lxUtils():any
    {
        return window["lxUtils"];//this._lxUtils;
    }

}