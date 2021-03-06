import DataRenderer from "../../components/virtuallist/DataRenderer";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import FruitRecordView from "./FruitRecordView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitRecordViewItem extends DataRenderer {
    private enemyPool: cc.NodePool
    /**
     * 数据发生变化
     */
    public onDataChanged(): void {
        let data = this.data.data;
        let view: FruitRecordView = this.data.view;
        let fruitItemCopy = this.node
        fruitItemCopy.on('click', view.checkDetail, view)
        // let fruitShadow = fruitItemCopy.getChildByName('fruit_shadow')
        // let fruitHadFeed = fruitItemCopy.getChildByName('img_hadfeed')
        let fruitPic = fruitItemCopy.getChildByName('fruitPic')
        let fruitNumber = fruitItemCopy.getChildByName('number')
        let fruitLife = fruitItemCopy.getChildByName('bg_life').getChildByName('life')
        let fruitPeriod = fruitItemCopy.getChildByName('period')
        let fruitBg = fruitItemCopy.getChildByName('fruit_record_bg')
        let btnCheck = fruitItemCopy.getChildByName('btn_Check')
        let lifeBg = fruitItemCopy.getChildByName('bg_life')
        let fruitRank = fruitItemCopy.getChildByName('fruitRank')
        let time = fruitItemCopy.getChildByName('time')
        let checkText = btnCheck.getChildByName('check')
        let running = fruitItemCopy.getChildByName('running')
        let unplant = fruitItemCopy.getChildByName('unplant')
        // if (item.Status !== 2) { //2已喂养 0 枯苗 -1未成熟 1未喂养
        //     // fruitShadow.active = false
        //     fruitHadFeed.active = false
        // }
        fruitRank.getComponent(cc.Label).string = data.ResultNums
        if (data.Status === 0) {
            time.active = false
            running.active = false
            unplant.active = false
            lifeBg.active = true
            fruitItemCopy.getChildByName('awards_popue').active = false
            fruitItemCopy.getChildByName('number').active = false
            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_perish')
            // RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_fail')
            checkText.getComponent(cc.Label).string = '枯苗'
            checkText.color = cc.color(168, 94, 38)
            // fruitNumber.getComponent(cc.Label).string = '金币 ---'
            RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_img_nor')
            RES.setSpriteFrame(lifeBg.getComponent(cc.Sprite), 'view/farmRecord/bg_life_perishpng')
            fruitLife.getComponent(cc.RichText).string = `<color=#A85E26>生命x${data.ResultOdds}</color>`
            fruitPeriod.getComponent(cc.Label).string = `${data.Period}号果园`
            RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), 'view/farmRecord/status_6')
        } else if (data.Status === -1) {
            time.active = true
            running.active = true
            unplant.active = true
            lifeBg.active = false
            checkText.color = cc.color(255, 255, 255)
            RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_img_nor')
            RES.setSpriteFrame(lifeBg.getComponent(cc.Sprite), 'view/farmRecord/bg_life_perishpng')
            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_green')
            fruitPeriod.getComponent(cc.Label).string = `${data.Period}号果园`
            running.getChildByName('label').getComponent(cc.Label).string = '进行中'
            RES.setSpriteFrame(running.getComponent(cc.Sprite), 'view/farmRecord/bg_running')
            fruitItemCopy.getChildByName('awards_popue').active = false
            fruitItemCopy.getChildByName('number').active = false
            if (data.Instone) {
                // time.getChildByName('label').getComponent(cc.Label).string = this.timeX
                // RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_underway')
                // fruitRank.getComponent(cc.Label).string = '---'
                // fruitNumber.getComponent(cc.Label).string = '金币 ---'
                unplant.getChildByName('label').getComponent(cc.Label).string = '已种植'
                checkText.getComponent(cc.Label).string = '未成熟'
                RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `common/kindof_one/status_3`)
            } else {
                unplant.getChildByName('label').getComponent(cc.Label).string = '未种植'
                checkText.getComponent(cc.Label).string = '前往种植'
                RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `view/farmRecord/img_palnt`)
            }
        } else {
            time.active = false
            unplant.active = false
            lifeBg.active = true
            RES.setSpriteFrame(lifeBg.getComponent(cc.Sprite), 'view/farmRecord/img_vitality')
            checkText.color = cc.color(255, 255, 255)
            fruitItemCopy.getChildByName('awards_popue').active = true
            fruitItemCopy.getChildByName('number').active = true
            RES.setSpriteFrame(btnCheck.getComponent(cc.Sprite), 'view/farmRecord/bt_red')
            RES.setSpriteFrame(fruitBg.getComponent(cc.Sprite), 'view/farmRecord/bg_img_sel')
            checkText.getComponent(cc.Label).string = data.ResultName
            running.active = true
            running.getChildByName('label').getComponent(cc.Label).string = '成功'
            RES.setSpriteFrame(running.getComponent(cc.Sprite), 'view/farmRecord/bg_successing')
            let num: number | string
            UIUtil.toStone(data.Outstone) + ''
            if (data.Outstone < 10000) {
                num = data.Outstone
            } else if (data.Outstone < 100000000) {
                num = (data.Outstone / 10000).toFixed() + '万'
            } else {
                num = (data.Outstone / 100000000).toFixed() + '亿'
            }
            fruitNumber.getComponent(cc.Label).string = `+${num}`
            fruitLife.getComponent(cc.RichText).string = `<color=#2A9647>生命x${data.ResultOdds}</color>`
            fruitPeriod.getComponent(cc.Label).string = `${data.Period}号果园`
            RES.setSpriteFrame(fruitPic.getComponent(cc.Sprite), `common/fruit/img_fruit_${data.ResultNums}`)
        }
        if (data.Status === 1) {
            view.totalAward = view.totalAward + data.Outstone
        }

    }

}