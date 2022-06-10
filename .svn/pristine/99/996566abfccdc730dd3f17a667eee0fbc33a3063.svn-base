// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIConstant from "../../constant/UIConstant";
import EventDispatcher from "../../event/EventDispatcher";
import GameEvent from "../../event/GameEvent";
import App from "../../manager/App";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpgradeView extends BaseUI {
    private mask: cc.Node;
    private treasureContent: cc.Node;
    private treasureItem: cc.Node;
    private giftPo: cc.Node
    private level: cc.Node
    private resList;
    private acitonView: cc.Node
    private aniAnchor: Boolean = true //动画执行时无法点击
    private boomAni: cc.Node //暴击动画节点
    private continueBtn
    private addNum
    private toFruit

    protected validateUI(): void {
        this.mask = this.node.getChildByName('mask')
        this.addNum = this.node.getChildByName('addNum')
        this.treasureContent = this.node.getChildByName('treasureContent')
        this.treasureItem = this.node.getChildByName('treasureItem')
        this.giftPo = this.node.getChildByName('top_bg').getChildByName('label')
        this.level = this.node.getChildByName('level')
        this.acitonView = this.node.getChildByName('actionView')
        this.boomAni = this.node.getChildByName('boom')
        this.continueBtn = this.node.getChildByName('btn_Continue')
        this.toFruit = this.node.getChildByName('toFruit')
    }
    protected updateView(): void {
        console.log(this.data);
        if (this.data) {
            this.node.getChildByName('numContent').active = false
            this.giftPo.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon
            const { level, giftcoupon } = this.data.data
            this.addNum.getComponent(cc.Label).string = '+' + giftcoupon
            this.level.getComponent(cc.RichText).string = `恭喜你成功升到LV<color=#F6D027>${level}</color>`
            this.node.getChildByName('award').getComponent(cc.RichText).string = `获得礼券x<color=#F6D027>${UIUtil.toStone(giftcoupon)}</color>`
            let num = giftcoupon >= 10000 ? giftcoupon / 10000 + 'W' : giftcoupon
            this.node.getChildByName('numContent').getChildByName('nums').getComponent(cc.Label).string = '+' + num
            const giftAni = this.node.getChildByName('aniGift')
            const addAction = cc.sequence(cc.spawn(cc.moveBy(1, 0, 60), cc.fadeOut(1)), cc.callFunc(() => {
                this.giftPo.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon //更新礼券
            }))
            giftAni.getComponent(sp.Skeleton).setAnimation(0, 'animation2', false)
            giftAni.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                if (event.data.name === "ending") {
                    this.node.getChildByName('numContent').active = true
                    EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO);
                    this.addNum.active = true
                    this.addNum.opacity = 255
                    this.addNum.runAction(addAction)
                }
            })
        }

        // const endPos = this.node.getChildByName('top_bg').getPosition()
        // const startPos = this.node.getChildByName('icon_Gift').convertToWorldSpaceAR(cc.Vec2.ZERO)
        // const addAction = cc.sequence(cc.spawn(cc.moveBy(1, 0, 60), cc.fadeOut(1)), cc.callFunc(() => {

        // }))
        // const action = cc.sequence(cc.spawn(cc.moveTo(1, endPos), cc.scaleTo(1, 0.4)),
        //     cc.callFunc(() => {
        //         this.node.getChildByName('icon_Gift').active = false 
        //         this.addNum.active = true
        //         this.addNum.runAction(addAction)
        //     })).easing(cc.easeOut(1))
        // console.log(endPos);
        // this.node.getChildByName('icon_Gift').runAction(action)
        // if (this.data) {
        //     // const { level, giftcoupon } = this.data.data
        //     // this.level.getComponent(cc.Label).string = `恭喜你成功升到LV${level}`
        //     // EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO);
        //     // /* 初始数值 */
        //     // let initNum = '+'
        //     // let numArr = [] //转为数字后的数组
        //     // let timer = {} //计时器变化数字对象
        //     // let numText = ''
        //     // let num = giftcoupon >= 100000000 ? giftcoupon / 10000 + 'W' : giftcoupon
        //     // if (giftcoupon >= 100000000) {
        //     //     numArr = num.split('W')[0].split('')
        //     //     numText = 'W'
        //     // } else {
        //     //     numArr = num.toString().split('')
        //     // }
        //     // numArr = num.toString().split('')
        //     // numArr.forEach(() => {
        //     //     initNum = initNum + '0'
        //     // })
        //     // console.log(numArr);
        //     // App.audio.playEffectByName('open_treasure_boom')
        //     // const label = this.boomAni.getChildByName('boomLabel')
        //     // this.boomAni.active = true
        //     // this.boomAni.opacity = 255
        //     // this.boomAni.getComponent(sp.Skeleton).setAnimation(0, 'animation', false)
        //     // this.boomAni.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
        //     //     if (event.data.name === "ending") {
        //     //         this.aniAnchor = true
        //     //         this.giftPo.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon //更新礼券
        //     //     } else if (event.data.name === "text") {
        //     //         label.active = true
        //     //         label.getComponent(cc.Label).string = initNum
        //     //         numArr.forEach((item, index, arr) => {
        //     //             arr[index] = parseInt(item)
        //     //             if (arr[index] > 0) {
        //     //                 console.log(item);
        //     //                 timer[index] = { curNum: 0, time: null }
        //     //                 timer[index].curNum = arr[index]
        //     //                 arr[index] = 0
        //     //                 timer[index].time = this.schedule(() => {
        //     //                     let boomNum = '+'
        //     //                     if (arr[index] === timer[index].curNum) {
        //     //                         this.unschedule(timer[index]);
        //     //                         return
        //     //                     }
        //     //                     arr[index]++
        //     //                     numArr.forEach((items) => {
        //     //                         numArr[index] = arr[index]
        //     //                         boomNum = boomNum + items
        //     //                     })
        //     //                     // debugger
        //     //                     label.getComponent(cc.Label).string = numText ? boomNum + numText : boomNum
        //     //                 }, 0.1)
        //     //             }
        //     //         })
        //     //     } else if (event.data.name === "boom") {
        //     //         EventDispatcher.dispatch(GameEvent.SNAKE_VIEW)
        //     //     }
        //     // });
        // } else {
        //     // this.getTreasure()
        // }
    }

    protected openTreasure(event) {
        if (!this.aniAnchor) return
        this.aniAnchor = false
        if (this.treasureContent.children[0].getChildByName('guide').active) {
            this.treasureContent.children[0].getChildByName('guide').active = false
        }
        this.treasureContent.children.forEach((item, index) => {
            if (item.getChildByName('treasure_false') === event.node) {
                console.log(this.resList, index);
                let rid = this.resList[index].rid
                App.PetProxy.OpenLevelRewardPackage({
                    onSuccess: (res) => {
                        EventDispatcher.dispatch(GameEvent.UPDATE_USER_INFO);
                        /* 初始数值 */
                        let initNum = '+'
                        let numArr = [] //转为数字后的数组
                        let timer = {} //计时器变化数字对象
                        let numText = ''
                        let num = res.reward >= 100000000 ? res.reward / 10000 + 'W' : res.reward
                        // num = '9999W'
                        if (res.reward >= 100000000) {
                            numArr = num.split('W')[0].split('')
                            numText = 'W'
                        } else {
                            numArr = num.toString().split('')
                        }
                        numArr.forEach(() => {
                            initNum = initNum + '0'
                        })
                        console.log(numArr);
                        if (this.resList[index].odds > 1 || this.resList[index].isFirstPackage) {
                            App.audio.playEffectByName('open_treasure_boom')
                            item.removeFromParent()
                            item.destroy()
                            const label = this.boomAni.getChildByName('boomLabel')
                            this.boomAni.active = true
                            this.boomAni.opacity = 255
                            this.boomAni.getComponent(sp.Skeleton).setAnimation(0, 'animation', false)
                            this.boomAni.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                                if (event.data.name === "ending") {
                                    // this.boomAni.active = false
                                    label.active = false
                                    this.boomAni.opacity = 0
                                    this.aniAnchor = true
                                    this.getTreasure()//更新福袋
                                    this.giftPo.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon //更新礼券
                                } else if (event.data.name === "text") {
                                    label.active = true
                                    label.getComponent(cc.Label).string = initNum
                                    numArr.forEach((item, index, arr) => {
                                        arr[index] = parseInt(item)
                                        if (arr[index] > 0) {
                                            console.log(item);
                                            timer[index] = { curNum: 0, time: null }
                                            timer[index].curNum = arr[index]
                                            arr[index] = 0
                                            timer[index].time = this.schedule(() => {
                                                let boomNum = '+'
                                                if (arr[index] === timer[index].curNum) {
                                                    this.unschedule(timer[index]);
                                                    return
                                                }
                                                arr[index]++
                                                numArr.forEach((items) => {
                                                    numArr[index] = arr[index]
                                                    boomNum = boomNum + items
                                                })
                                                // debugger
                                                label.getComponent(cc.Label).string = numText ? boomNum + numText : boomNum
                                            }, 0.1)
                                        }
                                    })
                                } else if (event.data.name === "boom") {
                                    EventDispatcher.dispatch(GameEvent.SNAKE_VIEW)
                                }
                            });
                        } else {
                            App.audio.playEffectByName('open_treasure_normal')
                            let numTreasure = item.getChildByName('treasure_num')
                            let spineTreasure = item.getChildByName('treasure_spine')
                            spineTreasure.y = -120
                            numTreasure.active = true
                            numTreasure.getComponent(cc.Label).string = num
                            spineTreasure.getComponent(sp.Skeleton).setAnimation(0, 'open', false)
                            spineTreasure.getComponent(sp.Skeleton).setEventListener((trackIndex, event) => {
                                if (event.data.name === "ending") {
                                    const award = this.acitonView.getChildByName('awardNor')
                                    if (!award) return
                                    const awardNor = cc.instantiate(award)
                                    const pos = item.convertToWorldSpaceAR(cc.Vec2.ZERO)
                                    item.removeFromParent()
                                    item.destroy()
                                    const label = awardNor.getChildByName('number')
                                    label.getComponent(cc.Label).string = num
                                    const posEnd = this.node.getChildByName('top_bg').convertToWorldSpaceAR(cc.Vec2.ZERO)
                                    this.acitonView.addChild(awardNor)
                                    awardNor.setPosition(cc.v2(pos.x, pos.y))
                                    awardNor.active = true
                                    let bezierAction = cc.moveTo(1, cc.v2(posEnd.x, posEnd.y));
                                    let action = cc.sequence(cc.spawn(
                                        bezierAction,
                                        cc.scaleTo(1, 0.4, 0.4)
                                    ), cc.callFunc(() => {
                                        this.aniAnchor = true
                                        awardNor.removeFromParent()
                                        awardNor.destroy()
                                        this.getTreasure()//更新福袋
                                        this.giftPo.getComponent(cc.Label).string = App.gdata.userInfo.giftcoupon //更新礼券
                                    })).easing(cc.easeInOut(3));
                                    awardNor.runAction(action)
                                }
                            })
                        }
                    }, rid
                })
            }
        })
    }
    protected getTreasure() {
        this.treasureContent.removeAllChildren()
        App.PetProxy.LevelRewardPackages({
            onSuccess: (res: any) => {
                console.log(res)
                this.resList = res.list
                this.level.getComponent(cc.Label).string = `${App.gdata.userInfo.petInfo.level}级！`
                if (!res.list) return
                res.list.forEach((item, index) => {
                    if (!this.treasureItem) return
                    let itemCopy = cc.instantiate(this.treasureItem)
                    itemCopy.getChildByName('guide').active = index === 0
                    itemCopy.active = true
                    itemCopy.getChildByName('treasure_false').on('click', this.openTreasure, this)
                    this.treasureContent.addChild(itemCopy)
                })
            }, level: 0 //0当前等级福袋
        })
    }
    private toGift() {
        this.close()
        App.ui.open(UIConstant.ConvertView)
    }
    private gotoFruit() {
        this.close()
        EventDispatcher.dispatch(GameEvent.GO_TO_FRAMSCENE)
    }
    protected initEvent(): void {
        this.mask.on('click', this.close, this)
        this.continueBtn.on('click', this.toGift, this)
        this.toFruit.on('click', this.gotoFruit, this)
    }
    protected removeEvent(): void {
        this.mask.off('click', this.close, this)
        this.continueBtn.off('click', this.toGift, this)
        this.toFruit.off('click', this.gotoFruit, this)
        this.treasureContent.children.forEach(item => {
            item.getChildByName('treasure_false').off('click', this.openTreasure, this)
        })
        // EventDispatcher.dispatch(GameEvent.UPDATE_PET_INFO) //更新福袋个数
    }
}
