import DataRenderer from "../../components/virtuallist/DataRenderer";
import RES from "../../res/RES";
import PigAttackView from "./PigAttackView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PigAttackViewItem extends DataRenderer {
    private enemyPool: cc.NodePool
    /**
     * 数据发生变化
     */
    public onDataChanged(): void {
        let data = this.data.data;
        // let view: PigAttackView = this.data.view;
        // let attackItemCopy = cc.instantiate(view.attackItem)
        let attackItemCopy = this.node;
        const name = attackItemCopy.getChildByName('name');
        const odds = attackItemCopy.getChildByName('odds');
        const rank = attackItemCopy.getChildByName('rank');
        // attackItemCopy.active = true
        name.getComponent(cc.Label).string = data.Name
        odds.getComponent(cc.Label).string = `x${data.Odds}`
        rank.getComponent(cc.Label).string = data.Period + '号'
        RES.setSpriteFrame(attackItemCopy.getChildByName('success_fruit').getChildByName('fruitPic').getComponent(cc.Sprite), `common/fruit/img_fruit_${data.Nums}`)
        // view.scrollContent.addChild(attackItemCopy)

    }

    private getItem(item) {
        // if (!this.attackItem) return
        // let attackItemCopy = cc.instantiate(this.attackItem)
        // const name = attackItemCopy.getChildByName('name')
        // const odds = attackItemCopy.getChildByName('odds')
        // const rank = attackItemCopy.getChildByName('rank')
        // attackItemCopy.active = true
        // name.getComponent(cc.Label).string = item.Name
        // odds.getComponent(cc.Label).string = item.Odds
        // rank.getComponent(cc.Label).string = item.Period + '号'
        // RES.setSpriteFrame(attackItemCopy.getChildByName('success_fruit').getChildByName('fruitPic').getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Nums}`)
        // this.scrollContent.addChild(attackItemCopy)
    }
}