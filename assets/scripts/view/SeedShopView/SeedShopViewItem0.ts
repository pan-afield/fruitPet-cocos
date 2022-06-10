import DataRenderer from "../../components/virtuallist/DataRenderer";
import RES from "../../res/RES";
import SeedShopView from "./SeedShopView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SeedShopViewItem0 extends DataRenderer {
    private enemyPool: cc.NodePool
    /**
     * 数据发生变化
     */
    public onDataChanged(): void {
        let data = this.data.data;
        let view: SeedShopView = this.data.view;
        let node = this.node
        let icon1: cc.Sprite = node.getChildByName("bg_nor").getComponent(cc.Sprite);
        let checkIcon: cc.Sprite = node.getChildByName("select").getComponent(cc.Sprite);
        let name = node.getChildByName("name").getComponent(cc.Label);
        let odd = node.getChildByName("life").getComponent(cc.Label);
        let num = node.getChildByName("ranking").getComponent(cc.Label);
        let icon = node.getChildByName("fruit").getComponent(cc.Sprite);
        num.string = data.Num;
        odd.string = `x${data.Odds}`;
        name.string = data.Name;
        RES.setSpriteFrame(icon, `common/fruit/img_fruit_${data.Num}`);
        node["data"] = data;
        node.off("click", this.selectFood, this);
        node.on("click", this.selectFood, this);


        if (view.selectFoodList.indexOf(data) != -1) {
            RES.setSpriteFrame(icon1, `view/seedShop/bg_sel`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_sel`);
        } else {
            RES.setSpriteFrame(icon1, `view/seedShop/bg_nor`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_nor`);
        }
        view.seedNums.string = `${view.selectFoodList.length}个`

    }
    private selectFood(evt: cc.Button) {
        let view: SeedShopView = this.data.view;
        let node: cc.Node = evt.target || evt.node;
        let icon: cc.Sprite = node.getChildByName("bg_nor").getComponent(cc.Sprite);
        let checkIcon: cc.Sprite = node.getChildByName("select").getComponent(cc.Sprite);
        let data = node["data"];
        if (view.selectFoodList.indexOf(data) != -1) {
            let ids = view.selectFoodList.indexOf(data);
            view.selectFoodList.splice(ids, 1);
            RES.setSpriteFrame(icon, `view/seedShop/bg_nor`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_nor`);
        } else {
            view.selectFoodList.push(data);
            RES.setSpriteFrame(icon, `view/seedShop/bg_sel`);
            RES.setSpriteFrame(checkIcon, `view/seedShop/img_sel`);
        }
        view.seedNums.string = `${view.selectFoodList.length}个`
        console.log("view.selectFoodList", view.selectFoodList)
    }
}