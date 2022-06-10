import DataRenderer from "../../components/virtuallist/DataRenderer";
import RES from "../../res/RES";
import UIUtil from "../../util/UIUtil";
import BuySeedView from "./BuySeedView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuySeedViewItem extends DataRenderer {
    private enemyPool: cc.NodePool
    /**
     * 数据发生变化
     */
    public onDataChanged(): void {
        let data = this.data.data;
        let view: BuySeedView = this.data.view;
        let node = this.node
        let icon = node.getChildByName("icon").getComponent(cc.Sprite);
        let name = node.getChildByName("name").getComponent(cc.Label);
        let num = node.getChildByName("num").getComponent(cc.Label);
        if (data.Nums !== undefined) {
            RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Nums}`);
        } else {
            RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Num}`);
        }
        if (!view.expressId && !view.continueBuy) {
            name.string = `${data.Num}-${data.Name}`;
        } else {
            name.string = data.Name
        }
        if (view.continueBuy) {
            node["Instone"] = data.Instone
            num.string = UIUtil.toStone(data.Instone);
            view.gold += data.Instone
            view.seedText.string = `共需消耗<color=#ED5B26>${UIUtil.toStone(view.gold)}金币</color>`;
        } else {
            num.string = UIUtil.toStone(view.lotNum);
            view.gold = view.goodList.length * view.lotNum
            view.seedText.string = `单类种子购买${UIUtil.toStone(view.lotNum)}金币,\n共需消耗<color=#ED5B26>${UIUtil.toStone(view.gold)}金币</color>`;
        }
    }

}