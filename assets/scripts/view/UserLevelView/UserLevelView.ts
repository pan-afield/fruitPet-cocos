// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../manager/App";
import RES from "../../res/RES";
import BaseUI from "../BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserLevelView extends BaseUI {
    private closeBtn: cc.Node
    private petName: cc.Node
    private petLevel: cc.Node
    private petExperience: cc.Node
    private experenceProcess: cc.Node
    private levelTitle: cc.Node
    private introduce: cc.Node
    private levelLeft: cc.Node
    private levelRight: cc.Node
    private levelsAll
    private currentsLevel

    protected validateUI(): void {
        this.closeBtn = this.node.getChildByName('close')
        this.petName = this.node.getChildByName('petName')
        this.petLevel = this.node.getChildByName('petLevel')
        this.petExperience = this.node.getChildByName('experience')
        this.experenceProcess = this.node.getChildByName('progressBar')
        this.levelTitle = this.node.getChildByName('level_bg_title').getChildByName('level_introduce')
        this.introduce = this.node.getChildByName('introduce')
        this.levelLeft = this.node.getChildByName('level_left')
        this.levelRight = this.node.getChildByName('level_right')
    }
    protected updateView(): void {
        console.log(this.data);
        this.currentsLevel = this.data.data.level
        this.petName.getComponent(cc.Label).string = this.data.data.name
        this.petLevel.getComponent(cc.Label).string = `LV ${this.data.data.level}/10`
        this.experenceProcess.getComponent(cc.ProgressBar).progress = this.data.data.process / 100
        this.levelTitle.getComponent(cc.Label).string = `LV ${this.data.data.level}守护能力`
        this.getLevelInfo()
    }

    protected leftSlide() {
        if (this.currentsLevel === 1) return
        this.currentsLevel--
        this.levelTitle.getComponent(cc.Label).string = `LV ${this.currentsLevel}守护能力`
        let introItem = cc.instantiate(this.node.getChildByName('intro_item'))
        introItem.active = true
        this.introduce.removeAllChildren()
        this.levelsAll.forEach((item, index) => {
            if (item.level === this.currentsLevel) {
                //for
                introItem.getComponent(cc.Label).string = `每小时赠送${item.giftcouponout}礼券`
                this.introduce.addChild(introItem)
            }
        })
    }
    protected rightSlide() {
        if (this.currentsLevel === 10) return
        this.currentsLevel++
        this.levelTitle.getComponent(cc.Label).string = `LV ${this.currentsLevel}守护能力`
        let introItem = cc.instantiate(this.node.getChildByName('intro_item'))
        introItem.active = true
        this.introduce.removeAllChildren()
        this.levelsAll.forEach((item, index) => {
            if (item.level === this.currentsLevel) {
                //for
                introItem.getComponent(cc.Label).string = `每小时赠送${item.giftcouponout}礼券`
                this.introduce.addChild(introItem)
            }
        })
    }

    protected getLevelInfo() {
        App.PetProxy.getPetLevels({
            onSuccess: (res) => {
                console.log(res);
                this.levelsAll = res.levels
                let introItem = cc.instantiate(this.node.getChildByName('intro_item'))
                introItem.active = true
                this.introduce.removeAllChildren()
                res.levels.forEach((item, index) => {
                    if (item.level === this.data.data.level) {
                        this.petExperience.getComponent(cc.Label).string = `${this.data.data.feeds}/${item.feeds}`
                        //for
                        introItem.getComponent(cc.Label).string = `每小时赠送${item.giftcouponout}礼券`
                        this.introduce.addChild(introItem)
                    }
                })
            }
        })
    }
    protected initEvent(): void {
        this.closeBtn.on('click', this.close, this)
        this.levelLeft.on('click', this.leftSlide, this)
        this.levelRight.on('click', this.rightSlide, this)
    }
    protected removeEvent(): void {
        this.closeBtn.off('click', this.close, this)
        this.levelLeft.off('click', this.leftSlide, this)
        this.levelRight.off('click', this.rightSlide, this)
    }

}
