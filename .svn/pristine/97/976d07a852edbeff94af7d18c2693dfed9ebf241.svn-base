import BaseUI from "../view/BaseUI";

const {ccclass, property} = cc._decorator;

/**
 * 热更新
 */
@ccclass
export default class UpdateView extends BaseUI {

    /** 内容 */
    @property(cc.Node)
    touchBg: cc.Node = null;

    /** 标题 */
    @property(cc.Asset)
    manifestUrl: cc.Asset = null;

    /** 内容 */
    @property(cc.Node)
    content: cc.Node = null;

    /** 标题 */
    @property(cc.Label)
    title: cc.Label = null;

    /** 按钮 - 关闭 */
    @property(cc.Button)
    btnClose: cc.Button = null;

    /** 文件进度条容器 */
    @property(cc.Node)
    panelFile: cc.Node = null;

    /** 文件大小进度条容器 */
    @property(cc.Node)
    panelByte: cc.Node = null;

    /** 进度条 - 文件 */
    @property(cc.ProgressBar)
    fileProgressBar: cc.ProgressBar = null;

    /** 进度条 - 文件大小 */
    @property(cc.ProgressBar)
    sizeProgressBar: cc.ProgressBar = null;

    /** 文件百分比 */
    @property(cc.Label)
    fileProgressLab: cc.Label = null;

    /** 文件大小百分比 */
    @property(cc.Label)
    sizeProgressLab: cc.Label = null;

    /** 富文本 - 实时信息 */
    @property(cc.RichText)
    msg: cc.RichText = null;

    /** 按钮组 */
    @property(cc.Node)
    panelButton: cc.Node = null;

    /** 按钮 - 检查更新 */
    @property(cc.Button)
    btnCheckUp: cc.Button = null;

    /** 按钮 - 更新 */
    @property(cc.Button)
    btnUpGrade: cc.Button = null;

    /** 按钮 - 重试 */
    @property(cc.Button)
    btnRetry: cc.Button = null;

    private _updating:boolean = false;
    private _canRetry:boolean = false;
    private _storagePath:string = '';

    private _am;
    private _checkListener;
    private _updateListener;

    private _failCount:number = 0;

    private versionCompareHandle:(versionA: string, versionB: string) => number;

    // LIFE-CYCLE CALLBACKS:

    protected validateUI(): void {
        this.msg.node.active = false;
    }

    // update (dt) {}

    protected initEvent():void
    {
        this.btnClose.node.on("click", this.onBtnClose, this);
        this.btnCheckUp.node.on("click", this.onBtnCheckUp, this);
        this.btnUpGrade.node.on("click", this.onBtnUpGrade, this);
        this.btnRetry.node.on("click", this.onBtnRetry, this);
    }

    protected removeEvent():void
    {
        this.btnClose.node.off("click", this.onBtnClose, this);
        this.btnCheckUp.node.off("click", this.onBtnCheckUp, this);
        this.btnUpGrade.node.off("click", this.onBtnUpGrade, this);
        this.btnRetry.node.off("click", this.onBtnRetry, this);
    }

    protected updateView():void
    {
        this.content.active = false;
        this.panelByte.active = false;
        this.panelButton.active = false;
        this.btnRetry.node.active = false;
        this.btnUpGrade.node.active = false;
        this.touchBg.opacity = 0;
        this.msg.string = "";

        this.checkUpdate();
    }

    private onBtnCheckUp():void
    {
        this.checkUpdate();
    }

    private onBtnUpGrade():void
    {
        this.panelFile.active = true;
        // this.panelByte.active = true;
        this.hotUpdate();
    }

    private onBtnRetry():void
    {
        this.retry();
    }

    private onBtnClose():void
    {
        this.close(true);
    }
    

    private checkCb(event):void {
        let needUpdate:boolean = false;
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.msg.string = "No local manifest file found, hot update skipped.";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.msg.string = "Fail to download manifest file, hot update skipped.";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.msg.string = "Already up to date with the latest remote version.";
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                let totalByte:number = this._am.getTotalBytes();
                let mBytes = (totalByte / 1000 / 1000).toFixed(2);
                this.msg.node.active = true;

                //不提示用户，直接更新
                // this.msg.string = i18n.t("hot_update_uptonewversion_tip", {totalBytes:mBytes + "mb"});// 'New version found, please try to update. (' + this._am.getTotalBytes() + ')';
                this.msg.string = "";
                this.btnCheckUp.node.active = false;

                // this.btnUpGrade.node.active = true;//不显示更新按钮，直接更新

                this.show();
                this.panelFile.active = false;
                this.panelByte.active = false;
                this.fileProgressBar.progress = 0;
                this.sizeProgressBar.progress = 0;
                needUpdate = true;
                break;
            default:
                return;
        }

        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;

        if(!needUpdate)
        {
            this.close();
        }else
        {
            this.onBtnUpGrade();
        }

        let checkUpdateCallBack:Function = this.data.checkUpdateCallBack;
        if(checkUpdateCallBack)
        {
            let checkUpdateCallObj:any = this.data.checkUpdateCallObj;
            if(checkUpdateCallObj)
            {
                checkUpdateCallBack.apply(checkUpdateCallObj, [needUpdate]);
            }else{
                checkUpdateCallBack(needUpdate);
            }
        }
    }

    private updateCb(event):void {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.msg.string = 'No local manifest file found, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.sizeProgressBar.progress = event.getPercent();
                this.fileProgressBar.progress = event.getPercentByFile();

                let totalByte:number = event.getTotalBytes();
                let mBytes = (totalByte / 1000 / 1000).toFixed(2);
                let downloadedBytes:number = event.getDownloadedBytes();
                let mDownloadedBytes = (downloadedBytes / 1000 / 1000).toFixed(2);

                this.fileProgressLab.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                // this.sizeProgressLab.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                this.sizeProgressLab.string = mDownloadedBytes + "M" + ' / ' + mBytes + "M";

                var msg = event.getMessage();
                if (msg) {
                    //this.msg.string = 'Updated file: ' + msg;
                    // cc.log(event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.msg.string = 'Fail to download manifest file, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.msg.string = 'Already up to date with the latest remote version.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.msg.string = 'Update finished. ' + event.getMessage();
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.msg.string = 'Update failed. ' + event.getMessage();
                this.panelButton.active = true;
                this.btnRetry.node.active = true;
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.msg.string = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.msg.string = event.getMessage();
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            for (var i = 0; i < newPaths.length; i++) {
                if (searchPaths.indexOf(newPaths[i]) == -1) {
                    Array.prototype.unshift.apply(searchPaths, [newPaths[i]]);
                }
            }
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    }

    private loadCustomManifest(customManifestStr:string):void {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            this.msg.string = 'Using custom manifest';
        }
    }

    private retry ():void {
        if (!this._updating && this._canRetry) {
            this.btnRetry.node.active = false;
            this._canRetry = false;
            
            this.msg.string = 'Retry failed Assets...';
            this._am.downloadFailedAssets();
        }
    }

    checkUpdate () {
        if (this._updating) {
            this.msg.string = 'Checking or updating ...';
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            var url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.msg.string = 'Failed to load local manifest ...';
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    }

    hotUpdate():void {
        this.msg.string = "正在更新...";
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this._am.loadLocalManifest(url);
            }

            this._failCount = 0;
            this._am.update();
            this.btnUpGrade.node.active = false;
            this._updating = true;
        }
    }

    show():void {
        if (this.content.active === false) {
            // this.touchBg.opacity = 125;
            this.content.active = true;
        }
    }

    onLoad(): void {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        cc.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = Number(vA[i]);
                var b = Number(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        };

        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);

        let that = this;
        // var panel = this.panel;
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                // that.msg.string = "Verification passed : " + relativePath;
                that.msg.string = "正在校验文件";
                return true;
            }
            else {
                // that.msg.string = "Verification passed : " + relativePath + ' (' + expectedMD5 + ')';
                that.msg.string = "正在校验文件";
                return true;
            }
        });

        this.msg.string = 'Hot update is ready, please check or directly update.';

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            this.msg.string = "Max concurrent tasks count have been limited to 2";
        }
        
        this.fileProgressBar.progress = 0;
        this.sizeProgressBar.progress = 0;
    }

    onDestroy(): void {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }

}
