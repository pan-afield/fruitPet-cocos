import RecycleScroller from "../../components/virtuallist/RecycleScroller";
import Config from "../../config/config";
import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import FramingManager from "../../manager/FramingManager";
import MessageBoxManager from "../../manager/MessageBoxManager";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";
import AlertDialog from "../dialog/AlertDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConvertView extends BaseUI {
    private closeBtn: cc.Node = null;
    private cardBtn: cc.Node = null;
    private hint: cc.Node;
    private woodBtn: cc.Node = null;
    private phoneBtn: cc.Node = null;
    private trimming: cc.Node = null;
    scrollItem: cc.Node = null;
    private scrollContent: cc.Node = null;
    private scrollContent1: cc.Node = null;
    private scrollContent2: cc.Node = null;
    private scrollContent3: cc.Node = null;
    private userPic: cc.Node = null;
    private giftPoupon: cc.Node = null;
    private confirmConvert: cc.Node = null;
    private addressInfo: cc.Node;
    confrimType: string = 'wood';
    private goodsList = {};
    private closeConfirm: cc.Node = null;
    private confirmBtn: cc.Node = null;
    private phoneNum: cc.Node;
    private woodName: cc.Node;
    private goodsRid: Number;
    private boradcast: cc.Node;
    private boradcastItem: cc.Node
    private viewContent: cc.Node
    private editAddress: cc.Node
    private closeEdit: cc.Node
    private optionsName: cc.Node
    private optionsPhone: cc.Node
    private optionsAddr: cc.Node
    private optionsDetail: cc.Node
    private optionsHint: cc.Node
    private confirmEdit: cc.Node
    private chooseAddress: cc.Node
    private btnRecord: cc.Node
    private btnMore: cc.Node
    private vipPupop: cc.Node
    private closeVipPupop: cc.Node
    private vipTitle: cc.Node
    private vipBubble: cc.Node
    private vipLabel: cc.Node
    private toLabel: cc.Node
    private btnGift: cc.Node
    private vipLevel: cc.Node
    private userAddrInfo = {}
    private imgGift: cc.Node
    private toFeed: cc.Node
    private gameBtn: cc.Node
    private picMask: cc.Node
    private backEditAddr: cc.Node
    private confirmMask: cc.Node
    private vipMask: cc.Node


    protected validateUI(): void {
        this.viewContent = this.node.getChildByName('viewContent')
        this.boradcast = this.viewContent.getChildByName('borad_cast').getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.boradcastItem = this.viewContent.getChildByName('boradcastContent')
        this.closeBtn = this.viewContent.getChildByName('icon_close')
        this.cardBtn = this.viewContent.getChildByName('card')
        this.woodBtn = this.viewContent.getChildByName('wood')
        this.phoneBtn = this.viewContent.getChildByName('phone')
        this.gameBtn = this.viewContent.getChildByName('game')
        this.scrollItem = this.viewContent.getChildByName('scrollItem')
        this.scrollContent = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content')
        this.scrollContent1 = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content1')
        this.scrollContent2 = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content2')
        this.scrollContent3 = this.viewContent.getChildByName('scrollview').getChildByName('view').getChildByName('content3')
        this.userPic = this.viewContent.getChildByName('picMask').getChildByName('userPic')
        this.giftPoupon = this.viewContent.getChildByName('number')
        this.trimming = this.viewContent.getChildByName('img_graphics')
        this.confirmConvert = this.node.getChildByName('confirmConvert')
        this.closeConfirm = this.confirmConvert.getChildByName('close')
        this.confirmMask = this.confirmConvert.getChildByName('confirmMask')
        this.confirmBtn = this.confirmConvert.getChildByName('bt_sure')
        this.phoneNum = this.confirmConvert.getChildByName('editbox')
        this.woodName = this.confirmConvert.getChildByName('woodName')
        this.hint = this.confirmConvert.getChildByName('hint')
        this.addressInfo = this.confirmConvert.getChildByName('address_info')
        this.backEditAddr = this.confirmConvert.getChildByName('address_info')
        this.editAddress = this.node.getChildByName('editAddress')
        this.closeEdit = this.editAddress.getChildByName('editView').getChildByName('close')
        this.optionsName = this.editAddress.getChildByName('editView').getChildByName('optionsName').getChildByName('editbox')
        this.optionsPhone = this.editAddress.getChildByName('editView').getChildByName('optionsPhone').getChildByName('editbox')
        this.optionsAddr = this.editAddress.getChildByName('editView').getChildByName('optionsAddr').getChildByName('editbox')
        this.optionsDetail = this.editAddress.getChildByName('editView').getChildByName('optionsDetail').getChildByName('editbox')
        this.optionsHint = this.editAddress.getChildByName('editView').getChildByName('optionsHint').getChildByName('editbox')
        this.confirmEdit = this.editAddress.getChildByName('editView').getChildByName('confirm')
        this.chooseAddress = this.confirmConvert.getChildByName('chooseAddress')
        this.btnRecord = this.viewContent.getChildByName('btn_record')
        this.btnMore = this.viewContent.getChildByName('btn_more')
        this.vipPupop = this.node.getChildByName('vipPupop')
        this.closeVipPupop = this.vipPupop.getChildByName('icon_close')
        this.vipTitle = this.vipPupop.getChildByName('vipTitle')
        this.vipMask = this.vipPupop.getChildByName('vipMask')
        this.vipBubble = this.vipPupop.getChildByName('vip_bubble')
        this.vipLabel = this.vipPupop.getChildByName('vipLabel')
        this.toLabel = this.vipPupop.getChildByName('toLabel')
        this.toFeed = this.vipPupop.getChildByName('tofeed')
        this.btnGift = this.vipPupop.getChildByName('btn_gift')
        this.vipLevel = this.viewContent.getChildByName('img_Grade').getChildByName('New Label')
        this.imgGift = this.viewContent.getChildByName('img_gift')
        this.picMask = this.viewContent.getChildByName('picMask')
        // this.scrollItem.active = false;
        // let scrollContentView: RecycleScroller = this.viewContent.getChildByName('scrollview').getComponent(RecycleScroller);
        // scrollContentView.itemTemplate = this.scrollItem;
        // scrollContentView.setDataRenderer(ConvertViewItem);
    }
    protected updateView(): void {
        this.confrimType = 'wood'
        this.scrollContent.active = true
        this.scrollContent1.active = false
        this.scrollContent2.active = false
        this.scrollContent3.active = false
        this.viewContent.getChildByName('scrollview').getComponent(cc.ScrollView).content = this.scrollContent
        this.getAllConvertLog()
        this.initPosition()
        this.getConvertList()
        RES.loadHead(App.gdata.userInfo.userinfo.headimg, this.userPic.getComponent(cc.Sprite))
        if (App.gdata.userInfo.giftcoupon >= 10000) {
            this.giftPoupon.getComponent(cc.Label).string = Math.floor(App.gdata.userInfo.giftcoupon / 10000) + '???'
        } else {
            this.giftPoupon.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
        }
    }
    protected initEvent(): void {
        this.picMask.on("click", this.checkedVip, this)
        this.backEditAddr.on("click", this.backToConfirm, this)
        this.imgGift.on("click", this.goConvertRecord, this)
        this.closeVipPupop.on("click", this.closeVip, this)
        this.vipMask.on("click", this.closeVip, this)
        this.btnRecord.on("click", this.goConvertRecord, this)
        this.btnMore.on("click", this.getMore, this)
        this.closeBtn.on("click", this.close, this);
        this.confirmBtn.on("click", this.confirmToConvert, this);
        this.closeConfirm.on("click", this.closeConfirmView, this);
        this.confirmMask.on("click", this.closeConfirmView, this);
        this.phoneBtn.on("click", this.chooseOption, this)
        this.woodBtn.on("click", this.chooseOption, this)
        this.cardBtn.on("click", this.chooseOption, this)
        this.gameBtn.on("click", this.chooseOption, this)
        this.closeEdit.on('click', this.closeEditAddress, this)
        this.confirmEdit.on("click", this.confirmAddress, this)
        this.chooseAddress.on("click", this.openAddressView, this)
    }
    protected removeEvent(): void {
        this.picMask.off("click", this.checkedVip, this)
        this.backEditAddr.off("click", this.backToConfirm, this)
        this.imgGift.off("click", this.goConvertRecord, this)
        this.btnGift.off('click', () => {
            this.close()
            App.ui.open(UIConstant.RechargeView)
        }, this)
        this.btnGift.off('click', () => {
            EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
        }, this)
        this.closeVipPupop.off("click", this.closeVip, this)
        this.vipMask.off("click", this.closeVip, this)
        this.btnRecord.off("click", this.goConvertRecord, this)
        this.btnMore.off("click", this.getMore, this)
        this.closeBtn.off("click", this.close, this);
        this.confirmBtn.off("click", this.confirmToConvert, this);
        this.phoneBtn.off("click", this.chooseOption, this)
        this.woodBtn.off("click", this.chooseOption, this)
        this.cardBtn.off("click", this.chooseOption, this)
        this.gameBtn.off("click", this.chooseOption, this)
        this.closeConfirm.off("click", this.closeConfirmView, this);
        this.confirmMask.off("click", this.closeConfirmView, this);
        this.closeEdit.off('click', this.closeEditAddress, this)
        this.confirmEdit.off("click", this.confirmAddress, this)
        this.chooseAddress.off("click", this.openAddressView, this)
        this.scrollContent.children.forEach(item => {
            item.off("click", this.chooseGoods, this);
        })
        this.toFeed.off('click', () => { this.vipPupop.active = false, this.close() }, this)
    }
    private checkedVip() {
        App.ui.open(UIConstant.VipPopupView, null, { from: 'convert' })
        this.close()
    }
    /* ??????vip?????? */
    private closeVip() {
        this.vipPupop.active = false
    }
    //????????????
    private getMore(event?: cc.Button) {
        this.vipPupop.active = true
        this.toFeed.active = true
        this.btnGift.x = 150
        this.toLabel.x = 150
        this.vipTitle.getComponent(cc.Label).string = '????????????'
        this.vipLabel.getComponent(cc.RichText).string = '????????????????????????<color=#FE554C>??????????????????????????????????????????</color>???????????????????????????'
        this.toLabel.getComponent(cc.Label).string = '????????????'
        RES.setSpriteFrame(this.vipBubble.getComponent(cc.Sprite), 'view/giftCouponShop/gift_bubble')
        this.btnGift.on('click', () => {
            this.vipPupop.active = false
            this.close()
            EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
        }, this)
        this.toFeed.on('click', () => {
            this.vipPupop.active = false, this.close(), cc.director.loadScene("mainScene", function (e) {
                console.log("e", e)
                App.ui.open(UIConstant.UserInfoView)
            });
        }, this)
        if (event && event.node === this.btnMore) {
            this.vipTitle.getComponent(cc.Label).string = '????????????'
        }
    }
    /* ???????????? */
    private popupLock() {
        this.vipPupop.active = true
        this.toFeed.active = false
        this.btnGift.x = 0
        this.toLabel.x = 0
        this.vipTitle.getComponent(cc.Label).string = 'VIP??????'
        this.vipLabel.getComponent(cc.RichText).string = '????????????????????????????????????????????????VIP???'
        this.toLabel.getComponent(cc.Label).string = '????????????'
        RES.setSpriteFrame(this.vipBubble.getComponent(cc.Sprite), 'view/giftCouponShop/vip_bubble')
        this.btnGift.on('click', () => {
            this.vipPupop.active = false
            this.close()
            App.ui.open(UIConstant.RechargeView)
        }, this)
    }
    //???????????????
    private goConvertRecord() {
        this.close()
        App.ui.open(UIConstant.GiftRecordView)
    }
    //init
    private initPosition() {
        this.confrimType = 'wood'
        this.phoneBtn.color = this.cardBtn.color = this.gameBtn.color = new cc.Color(255, 171, 171, 255)
        this.woodBtn.color = new cc.Color(51, 51, 51, 255)
        this.gameBtn.getComponent(cc.Label).fontSize = this.phoneBtn.getComponent(cc.Label).fontSize = this.cardBtn.getComponent(cc.Label).fontSize = 36
        this.woodBtn.getComponent(cc.Label).fontSize = 36
        this.trimming.x = -240
    }
    private getConvertList(): void {
        let that = this;
        let onSuccess = function (res) {
            that.vipLevel.getComponent(cc.Label).string = 'VIP' + res.levelInfo.level
            that.goodsList['wood'] = res.gifts.filter(item => {
                return item.type === 4
            })
            that.goodsList['phone'] = res.gifts.filter(item => {
                return item.type === 0
            })
            that.goodsList['card'] = res.gifts.filter(item => {
                return item.type !== 4 && item.type !== 0 && item.type !== 1
            })
            that.goodsList['game'] = res.gifts.filter(item => {
                return item.type === 1
            })
            FramingManager.updateRecordList(that.goodsList[that.confrimType], that.getWoodItem, that)
        }.bind(this);
        App.GiftCouponProxy.getGiftList({ onSuccess })
    }
    private chooseOption(event): void {
        let parent: cc.Node;
        if (event.node === this.woodBtn) {
            parent = this.scrollContent;
            this.initPosition()
            this.scrollContent.active = true
            this.scrollContent1.active = false
            this.scrollContent2.active = false
            this.scrollContent3.active = false
            this.viewContent.getChildByName('scrollview').getComponent(cc.ScrollView).content = this.scrollContent
        } else if (event.node === this.cardBtn) {
            parent = this.scrollContent1;
            this.confrimType = 'card'
            this.phoneBtn.color = this.woodBtn.color = this.gameBtn.color = new cc.Color(255, 171, 171, 255)
            this.cardBtn.color = new cc.Color(51, 51, 51, 255)
            this.gameBtn.getComponent(cc.Label).fontSize = this.phoneBtn.getComponent(cc.Label).fontSize = this.woodBtn.getComponent(cc.Label).fontSize = 36
            this.cardBtn.getComponent(cc.Label).fontSize = 36
            this.trimming.x = -80
            this.scrollContent.active = false
            this.scrollContent1.active = true
            this.scrollContent2.active = false
            this.scrollContent3.active = false
            this.viewContent.getChildByName('scrollview').getComponent(cc.ScrollView).content = this.scrollContent1
        } else if (event.node === this.phoneBtn) {
            parent = this.scrollContent2;
            this.confrimType = 'phone'
            this.cardBtn.color = this.woodBtn.color = this.gameBtn.color = new cc.Color(255, 171, 171, 255)
            this.phoneBtn.color = new cc.Color(51, 51, 51, 255)
            this.gameBtn.getComponent(cc.Label).fontSize = this.cardBtn.getComponent(cc.Label).fontSize = this.woodBtn.getComponent(cc.Label).fontSize = 36
            this.phoneBtn.getComponent(cc.Label).fontSize = 36
            this.trimming.x = 80
            this.scrollContent.active = false
            this.scrollContent1.active = false
            this.scrollContent2.active = true
            this.scrollContent3.active = false
            this.viewContent.getChildByName('scrollview').getComponent(cc.ScrollView).content = this.scrollContent2
        } else if (event.node === this.gameBtn) {
            parent = this.scrollContent3;
            this.confrimType = 'game'
            this.cardBtn.color = this.woodBtn.color = this.phoneBtn.color = new cc.Color(255, 171, 171, 255)
            this.gameBtn.color = new cc.Color(51, 51, 51, 255)
            this.phoneBtn.getComponent(cc.Label).fontSize = this.cardBtn.getComponent(cc.Label).fontSize = this.woodBtn.getComponent(cc.Label).fontSize = 36
            this.gameBtn.getComponent(cc.Label).fontSize = 36
            this.trimming.x = 240
            this.scrollContent.active = false
            this.scrollContent1.active = false
            this.scrollContent2.active = false
            this.scrollContent3.active = true
            this.viewContent.getChildByName('scrollview').getComponent(cc.ScrollView).content = this.scrollContent3
        }
        console.log(this.goodsList[this.confrimType]);

        let dataList: any[] = this.goodsList[this.confrimType];
        let children: cc.Node[] = parent.children;
        if (dataList.length < children.length) {
            for (let i: number = dataList.length; i < children.length; i++) {
                children[i].active = false;
            }
        }
        FramingManager.updateRecordList(dataList, this.getWoodItem, this)
    }
    private getWoodItem(data, index: number): void {

        let parent: cc.Node;
        switch (this.confrimType) {
            case 'wood':
                parent = this.scrollContent;
                break;
            case 'card':
                parent = this.scrollContent1;
                break
            case 'phone':
                parent = this.scrollContent2;
                break
            case 'game':
                parent = this.scrollContent3;
            default:
                break;
        }
        let children: cc.Node[] = parent.children;
        let itemCopy: cc.Node = children[index];
        if (!cc.isValid(itemCopy)) {
            itemCopy = cc.instantiate(this.scrollItem);
            itemCopy.parent = parent;
        }
        itemCopy.active = true
        let pic = itemCopy.getChildByName('goodsPic')
        let name = itemCopy.getChildByName('goodsName')
        let leftNums = itemCopy.getChildByName('leftNums')
        let hot = itemCopy.getChildByName('hot')
        let price = itemCopy.getChildByName('priceContent').getChildByName('price')
        let couponText = itemCopy.getChildByName('priceContent').getChildByName('couponText')
        let goodsBg = itemCopy.getChildByName('bg_charge')
        let btnBg = itemCopy.getChildByName('btn_exchange')
        let btnLabel = itemCopy.getChildByName('btn_exchange').getChildByName('btnLabel')

        if (data.status === -1) {
            RES.setSpriteFrame(btnBg.getComponent(cc.Sprite), '/view/giftCouponShop/btn_Unlock@2x')
            btnLabel.getComponent(cc.Label).string = `?????????`
            btnLabel.color = cc.color(102, 102, 102)
        } else if (data.status === -2) {
            RES.setSpriteFrame(btnBg.getComponent(cc.Sprite), '/view/giftCouponShop/btn_Unlock@2x')
            btnLabel.getComponent(cc.Label).string = `????????????`
            btnLabel.color = cc.color(102, 102, 102)
        } else if (data.status === -3) {
            btnLabel.getComponent(cc.Label).string = `??????`
            RES.setSpriteFrame(btnBg.getComponent(cc.Sprite), '/view/giftCouponShop/btn_exchange@2x')
            btnLabel.color = cc.color(255, 239, 239)
        } else if (data.status === 0) {
            btnLabel.getComponent(cc.Label).string = `??????`
            RES.setSpriteFrame(btnBg.getComponent(cc.Sprite), '/view/giftCouponShop/btn_exchange@2x')
            btnLabel.color = cc.color(255, 239, 239)
        }
        itemCopy['data'] = data
        itemCopy.on("click", this.chooseGoods, this);
        RES.loadHead(data.imgurl, pic.getComponent(cc.Sprite))
        name.getComponent(cc.Label).string = data.name
        leftNums.getComponent(cc.Label).string = `??????${data.leftinventory}???`
        hot.getComponent(cc.Label).string = `??????${data.sells}???`
        if (data.price > 9999) {
            price.getComponent(cc.Label).string = data.price / 10000 + ''
            couponText.getComponent(cc.Label).string = '?????????'
        } else {
            price.getComponent(cc.Label).string = data.price
            couponText.getComponent(cc.Label).string = '??????'
        }
        switch (this.confrimType) {
            case 'wood':
                goodsBg.active = false
                break;
            case 'card':
                RES.setSpriteFrame(goodsBg.getComponent(cc.Sprite), '/view/giftCouponShop/bg_jd')
                break
            case 'phone':
                RES.setSpriteFrame(goodsBg.getComponent(cc.Sprite), '/view/giftCouponShop/bg_charge')
                break
            case 'game':
                RES.setSpriteFrame(goodsBg.getComponent(cc.Sprite), '/view/giftCouponShop/bg_gold')
            default:
                break;
        }

    }
    private checkGiftCoupon(items) {
        console.log(items);
        if (App.gdata.userInfo.giftcoupon < items.price) {
            this.confirmConvert.active = false
            this.getMore()
            return
        }
        if (App.gdata.userInfo.vipLevelInfo.level < items.viplevel) {
            this.confirmConvert.active = false
            MessageBoxManager.showAlert({
                type: AlertDialog.TYPE_1,
                msg: '????????????,???????????????VIP??????!',
                okCallBack: () => { this.close(), App.ui.open(UIConstant.RechargeView) }
            });
        }
    }
    private chooseGoods(event) {
        const node = event.node || event.target
        if (node.data.status === -2) {
            App.ui.open(UIConstant.MallTipView, null, {
                data: { msg: '?????????????????????????????????????????????????????????' },
                okCallBack: () => {
                    this.close()
                    cc.director.loadScene("mainScene", function (e) {
                        console.log("e", e)
                        App.ui.open(UIConstant.UserInfoView)
                    });
                },
                okLabel: '??????????????????',
            })
            return
        } else if (node.data.status === -3) {
            App.ui.open(UIConstant.MallTipView, null, {
                data: { msg: `?????????VIP${node.data.viplevel}????????????????????????????????????????????????VIP?????????` },
                okCallBack: () => {
                    this.close(), App.ui.open(UIConstant.RechargeView)
                },
                okLabel: '????????????',
            })
            return
        } else if (node.data.status === -4) {
            App.ui.open(UIConstant.MallTipView, null, {
                data: { msg: `????????????????????????????????????????????????` },
                okLabel: '??????'
            })
            return
        }
        this.confirmConvert.active = true
        let pic = this.confirmConvert.getChildByName('goodsPic')
        let title = this.confirmConvert.getChildByName('title')
        let goodsContent = this.scrollContent.active ? this.scrollContent : this.scrollContent1.active ? this.scrollContent1
            : this.scrollContent2.active ? this.scrollContent2 : this.scrollContent3
        goodsContent.children.forEach((item, index) => {
            if (event.node === item) {
                if (this.confrimType === 'wood') {
                    this.goodsList['wood'].forEach((items, indexs) => {
                        if (index === indexs) {
                            this.checkGiftCoupon(items)
                            RES.loadHead(items.imgurl, pic.getComponent(cc.Sprite))
                            title.getComponent(cc.Label).string = '????????????'
                            this.woodName.getComponent(cc.Label).string = items.name
                            this.woodName.active = true
                            this.phoneNum.active = false
                            this.hint.active = false
                            this.addressInfo.active = true
                            this.chooseAddress.active = true
                            this.goodsRid = items.rid
                            this.confirmBtn.y = -260
                        }
                    });
                } else if (this.confrimType === 'card') {
                    this.goodsList['card'].forEach((items, indexs) => {
                        if (index === indexs) {
                            this.checkGiftCoupon(items)
                            RES.loadHead(items.imgurl, pic.getComponent(cc.Sprite))
                            title.getComponent(cc.Label).string = '????????????'
                            this.phoneNum.active = true
                            if (items.name.includes('?????????')) {
                                this.hint.getComponent(cc.Label).string = '?????????????????????????????????????????????????????????????????????'
                            } else if (items.name.includes('?????????')) {
                                this.hint.getComponent(cc.Label).string = '??????????????????????????????????????????????????????????????????????????????'
                            } else if (items.name.includes('??????')) {
                                this.hint.getComponent(cc.Label).string = '????????????????????????????????????????????????????????????????????????'
                            }
                            this.hint.active = true
                            this.addressInfo.active = false
                            this.chooseAddress.active = false
                            this.woodName.active = false
                            this.goodsRid = items.rid
                            this.confirmBtn.y = -146
                        }
                    });
                } else if (this.confrimType === 'phone') {
                    this.goodsList['phone'].forEach((items, indexs) => {
                        if (index === indexs) {
                            this.checkGiftCoupon(items)
                            RES.loadHead(items.imgurl, pic.getComponent(cc.Sprite))
                            title.getComponent(cc.Label).string = '????????????'
                            this.phoneNum.active = true
                            this.hint.getComponent(cc.Label).string = '*???????????????????????????????????????2??????????????????'
                            this.hint.active = true
                            this.addressInfo.active = false
                            this.chooseAddress.active = false
                            this.woodName.active = false
                            this.goodsRid = items.rid
                            this.confirmBtn.y = -146
                        }
                    });
                } else if (this.confrimType === 'game') {
                    this.goodsList['game'].forEach((items, indexs) => {
                        if (index === indexs) {
                            this.checkGiftCoupon(items)
                            RES.loadHead(items.imgurl, pic.getComponent(cc.Sprite))
                            title.getComponent(cc.Label).string = '????????????'
                            this.phoneNum.active = false
                            this.hint.active = false
                            this.addressInfo.active = false
                            this.chooseAddress.active = false
                            this.woodName.active = true
                            this.woodName.getComponent(cc.Label).string = `??????????????????${items.name}?`
                            this.goodsRid = items.rid
                            this.confirmBtn.y = -146
                        }
                    });
                }
            }
        })
    }
    private closeConfirmView(): void {
        this.confirmConvert.active = false
    }
    private confirmToConvert(): void {
        if (this.addressInfo.active) {
            if (Object.keys(this.userAddrInfo).length === 0) return
            let onSuccess = (res) => {
                console.log('??????????????????:', res);
                if (res.Data === 1 || res.Data === 2) {
                    App.ui.open(UIConstant.MallTipView, null, {
                        data: { msg: res.Msg },
                        okLabel: res.Data === 2 ? '????????????' : App.gdata.openShop ? '????????????' : '??????',
                        okCallBack: () => {
                            this.close()
                            App.ui.open(UIConstant.RechargeView)
                        }
                    })
                    return
                }
                App.ui.open(UIConstant.MallTipView, null, {
                    data: { msg: res.Msg },
                    okCallBack: () => {
                        if (App.gdata.userInfo.giftcoupon >= 10000) {
                            this.giftPoupon.getComponent(cc.Label).string = Math.floor(App.gdata.userInfo.giftcoupon / 10000) + '???'
                        } else {
                            this.giftPoupon.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
                        }
                    }
                })
                this.getConvertList()
                EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
            }
            App.GiftCouponProxy.convertGift({
                onSuccess, data: {
                    rid: this.goodsRid, phone: this.userAddrInfo['phone'],
                    name: this.userAddrInfo['name'], address: this.userAddrInfo['addr'] + this.userAddrInfo['detail'], remark: this.userAddrInfo['hint']
                }
            })
        } else {
            if (this.phoneNum.active) {
                let phone = this.phoneNum.getComponent(cc.EditBox).string
                let onSuccess = (res) => {
                    console.log('????????????????????????:', res);
                    if (res.Data === 1 || res.Data === 2) {
                        App.ui.open(UIConstant.MallTipView, null, {
                            data: { msg: res.Msg },
                            okLabel: res.Data === 2 ? '????????????' : App.gdata.openShop ? '????????????' : '??????',
                            okCallBack: () => {
                                this.close()
                                res.Data === 2 ? App.ui.open(UIConstant.RechargeView) : ''
                            }
                        })
                        return
                    }
                    App.ui.open(UIConstant.MallTipView, null, {
                        data: { msg: res.Msg },
                        okCallBack: () => {
                            if (App.gdata.userInfo.giftcoupon >= 10000) {
                                this.giftPoupon.getComponent(cc.Label).string = Math.floor(App.gdata.userInfo.giftcoupon / 10000) + '???'
                            } else {
                                this.giftPoupon.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
                            }
                        }
                    })
                    this.getConvertList()
                    EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                }
                App.GiftCouponProxy.convertGift({ onSuccess, data: { rid: this.goodsRid, phone } })
            } else {
                let onSuccess = (res) => {
                    console.log('??????????????????:', res);
                    if (res.Data === 1 || res.Data === 2) {
                        App.ui.open(UIConstant.MallTipView, null, {
                            data: { msg: res.Msg },
                            okLabel: res.Data === 2 ? '????????????' : App.gdata.openShop ? '????????????' : '??????',
                            okCallBack: () => {
                                this.close()
                                res.Data === 2 ? App.ui.open(UIConstant.RechargeView) : ''
                            }
                        })
                        return
                    }
                    App.ui.open(UIConstant.MallTipView, null, {
                        data: { msg: res.Msg },
                        okCallBack: () => {
                            if (App.gdata.userInfo.giftcoupon >= 10000) {
                                this.giftPoupon.getComponent(cc.Label).string = Math.floor(App.gdata.userInfo.giftcoupon / 10000) + '???'
                            } else {
                                this.giftPoupon.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
                            }
                        }
                    })
                    this.getConvertList()
                    EventDispatcher.dispatch(GameEvent.UPDATE_FARM_USERINFO)
                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO)
                }
                App.GiftCouponProxy.convertGift({ onSuccess, data: { rid: this.goodsRid } })
            }
        }
        this.closeConfirmView()
    }
    private getAllConvertLog() {
        this.boradcast.removeAllChildren()
        this.boradcast.stopAllActions()
        this.boradcast.setPosition(cc.v2(0, 24))
        let onSuccess = (res) => {
            res.list.forEach((item, index) => {
                let itemCopy = cc.instantiate(this.boradcastItem)
                itemCopy.active = true
                let text = itemCopy.getChildByName('boradcastText')
                text.getComponent(cc.Label).string = `??????${item.Nick}?????????${item.Name}`
                this.boradcast.addChild(itemCopy)
                if (index === res.list.length - 1) {
                    let self = this;
                    let j = 1;
                    let action = cc.sequence(cc.moveBy(1, 0, j * 48), cc.delayTime(2), cc.callFunc(function () {
                        if (j == res.list.length - 1) {
                            j = 1;
                            self.boradcast.setPosition(0, 24);
                        } else {
                            j++;
                        }
                    }.bind(this))).repeatForever();
                    this.boradcast.runAction(action);
                    console.log("????????????")
                }
            })
        }
        App.GiftCouponProxy.ConvertLog({ onSuccess, data: { page: 1, pagesize: 20, type: 1 } })
    }
    private closeEditAddress() {
        this.editAddress.active = false
    }
    private openAddressView() {
        this.editAddress.active = true
    }
    private backToConfirm() {
        this.editAddress.active = true
        this.confirmConvert.active = false
    }
    private confirmAddress(): void {
        this.userAddrInfo['name'] = this.optionsName.getComponent(cc.EditBox).string
        this.userAddrInfo['phone'] = this.optionsPhone.getComponent(cc.EditBox).string
        this.userAddrInfo['addr'] = this.optionsAddr.getComponent(cc.EditBox).string
        this.userAddrInfo['detail'] = this.optionsDetail.getComponent(cc.EditBox).string
        this.userAddrInfo['hint'] = this.optionsHint.getComponent(cc.EditBox).string
        console.log(this.userAddrInfo);
        this.editAddress.active = false
        let name = this.addressInfo.getChildByName('address_name')
        let number = this.addressInfo.getChildByName('address_number')
        let detail = this.addressInfo.getChildByName('address_detail')
        name.getComponent(cc.Label).string = this.userAddrInfo['name']
        number.getComponent(cc.Label).string = this.userAddrInfo['phone']
        detail.getComponent(cc.Label).string = this.userAddrInfo['addr'] + this.userAddrInfo['detail']
        this.chooseAddress.active = false
        this.confirmConvert.active = true
    }
}