// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameAudio from "../audioManger/GameAudio";
import Config from "../config/config";
import UIConstant from "../constant/UIConstant";
import StorageProvider from "../localStorage/StorageProvider";
import AnimeManager from "../manager/AnimeManager";
import App from "../manager/App";
import SilentLoader from "../res/SilentLoader";
import BaseScene from "./BaseScene";



const { ccclass, property } = cc._decorator;

@ccclass
export default class loadingScene extends BaseScene {

    @property(cc.Node)
    progressBar: cc.Node = null;
    @property(cc.Node)
    proText: cc.Node = null;

    private startGame: cc.Node;
    private carImg: cc.Node;
    private text1: cc.Node;
    private text2: cc.Node;
    private Alogin: cc.Node
    private isAndroid = cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID
    private isIOS = cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS
    protected validateUI(): void {
        //子类在这里更新所有节点句柄
        //如：this.item = this.node.getChildByName("item");
        this.startGame = this.node.getChildByName("startgame");
        this.carImg = this.node.getChildByName("car")
        this.text1 = this.node.getChildByName("text");
        this.text2 = this.node.getChildByName("text1");
        this.Alogin = this.node.getChildByName("Alogin");
    }
    __preload() {
        App.init();
    }

    start(): void {
        super.start();
        let that = this;

        if (cc.sys.isNative) {
            App.ui.open(UIConstant.UpdateView, null, {
                isModel: true,
                checkUpdateCallBack: function (needUpdate) {
                    if (!needUpdate) {
                        that.loadingGame();
                    }
                },
                checkUpdateCallObj: this
            });
            return;
        }
        this.loadingGame();
    }

    protected initEvent(): void {
        this.startGame.on("click", this.getUserInfo, this);
        this.Alogin.on("click", this.wxLogin, this);
    }
    protected removeEvent(): void {
        this.startGame.off("click", this.getUserInfo, this);
        this.Alogin.off("click", this.wxLogin, this);
    }


    protected initFinish(): void {
        App.gdata.openShop = true
        if (Config.gameFlag) {   // 1 微信环境
            this.getShopConfig();
        }

        this.addBtnAudioEffect()
        this.node.getChildByName('audio').getComponent(GameAudio).setRes()
        App.audio.playSceneMusicByName('BGM')
        //plist图集动画
        AnimeManager.playSequenceAnime(this.carImg, cc.v2(0, 0), "loginCarPlist", {
            wrapMode: cc.WrapMode.Loop
        })


        this.text1.active = true;
        this.text2.active = false;
        this.scheduleOnce(function () {
            this.text1.active = false;
            this.text2.active = true;
        }, 1)
    }

    public loadingGame(): void {
        let self = this;



        cc.director.preloadScene("mainScene", this.onProgress.bind(this), (error) => {
            SilentLoader.canLoad = false;
            if (error) {
                console.log(error);
            } else {
                // cc.director.loadScene("mainScene"); 
                self.loginDefault();
            }
        })
    }
    public onProgress(completedCount: number, totalCount: number, item: any) {
        let percent = completedCount / totalCount;
        this.progressBar.getComponent(cc.ProgressBar).progress = percent;
        this.proText.getComponent(cc.Label).string = "稍等一会，加载中(" + Math.floor(percent * 100) + "%)";
    }

    /**
     * 登录
     */
    private loginDefault(): void {

        let onSuccess = function (data) {
            console.log("登录返回消息", data);
            StorageProvider.setItem("token", data.token);
            if (!data.userinfo) {
                App.gdata.newPeople = true
                this.progressBar.active = false;
                this.startGame.active = true;
                this.getUserInfo();
            } else {
                App.gdata.newPeople = false
                this.enterGame();
            }

        }
        let self = this;
        if (Config.gameFlag) {   // 1 微信环境
            // @ts-ignore
            wx.login({
                success(res) {
                    if (res.code) {
                        //发起网络请求
                        // @ts-ignore
                        App.UserProxy.login({
                            code: res.code,
                            onSuccess: onSuccess,
                            thisObj: self,
                            onFail: (data) => {
                                console.log("登录失败", data);
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        } else {
            App.gdata.newPeople = false
            this.enterGame();
        }
    }
    private wxLogin() {
        console.log("wxLogin");
        if (this.isAndroid) {
            //调用Java代码进行微信登录
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "weixin_login", "(Ljava/lang/String;)V", "weixin_login");
        }
    }

    /**
     * 接收native微信授权的code
     * @param errCode 
     */
    private wxLoginResult(errCode) {
        console.log("wxLoginResultcode=" + errCode)
        if (this.isAndroid) {

        }
    }
    private enterGame() {
        if (Config.gameFlag) {
            console.log = function () { };
            console.warn = function () { }
        }
        SilentLoader.canLoad = false;
        cc.director.loadScene("mainScene", function (e) {
            console.log("e", e)
            SilentLoader.canLoad = true;
        });
    }

    private getUserInfo() {
        let self = this;
        console.log("getUserInfo");
        let frameSize = cc.view.getFrameSize();
        // @ts-ignore
        let btnAuthorize = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 0,
                top: 0,
                width: frameSize.width,
                height: frameSize.height,
                lineHeight: 0,
                backgroundColor: '',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })

        btnAuthorize.onTap((uinfo) => {
            console.log("onTap uinfo: ", uinfo);
            let userInfo = uinfo.userInfo;
            if (userInfo) {
                console.log("wxLogin auth success");
                let data = {
                    avatarUrl: userInfo.avatarUrl,
                    city: userInfo.city,
                    country: userInfo.country,
                    gender: userInfo.gender, //性别 0：未知、1：男、2：女
                    language: userInfo.language || "",
                    nickName: userInfo.nickName,
                    province: userInfo.province
                }
                App.UserProxy.addUserInfo({
                    data: data,
                    onSuccess: function (res) {
                        App.gdata.newAward = { giftCoupon: res.giftcoupon, coin: res.coin }
                        btnAuthorize.destroy();
                        self.enterGame();
                    },
                    thisObj: self
                })
                // @ts-ignore
                wx.showToast({ title: "授权成功" });
            } else {
                console.log("wxLogin auth fail");
                // @ts-ignore
                wx.showToast({ title: "授权失败" });
            }
        });

    }
    private getShopConfig() {
        // @ts-ignore
        wx.getSystemInfo({
            success: (res) => {
                console.log(res.platform)
                if (res.platform === 'ios') {
                    App.ConfigProxy.configInfo({
                        onSuccess: (res) => {
                            App.gdata.openShop = res.ShowIphoneCharge
                            console.log('充值商店：', res.ShowIphoneCharge);

                        }
                    })
                } else {
                    App.gdata.openShop = true
                }
            }
        })

    }
    // 添加全局按钮点击音效
    addBtnAudioEffect() {
        // 全局按钮响应
        // 添加点击音效
        (function () {

            // let btnAudioClip = null;

            // cc.resources.load('audio/click', cc.AudioClip, (err, clip) => {
            //     if (err) {
            //         cc.error(err.message || err);
            //         return;
            //     }

            //     btnAudioClip = clip;
            // });

            let Super = function () { };
            Super.prototype = cc.Button.prototype;
            console.log(Super.prototype);

            //实例化原型
            Super.prototype._onTouchEnded = function (t) {
                if (this.interactable && this.enabledInHierarchy) {

                    // if (btnAudioClip && btnAudioClip instanceof cc.AudioClip) {
                    // let audioID = cc.audioEngine.playEffect(btnAudioClip, false);
                    // }
                    App.audio.playEffectByName('click')

                    if (this._pressed) {
                        cc.Component.EventHandler.emitEvents(this.clickEvents, t);
                        this.node.emit('click', this);
                    }
                    this._pressed = !1;
                    this._updateState();
                    t.stopPropagation();
                }
            };
        })();
    }
    // update (dt) {}
}
