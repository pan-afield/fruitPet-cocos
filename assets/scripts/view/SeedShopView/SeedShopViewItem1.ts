import DataRenderer from "../../components/virtuallist/DataRenderer";
import RES from "../../res/RES";
import SeedShopView from "./SeedShopView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SeedShopViewItem1 extends DataRenderer {
    private enemyPool: cc.NodePool
    /**
     * 数据发生变化
     */
    public onDataChanged(): void {
        let data = this.data.data;
        let view: SeedShopView = this.data.view;
        const itemCopy = this.node;
        const btn = itemCopy.getChildByName('bg').getChildByName('btn').getChildByName('bt_buy')
        const bg = itemCopy.getChildByName('bg').getChildByName('box').getChildByName('bg_express').getChildByName('fruitBox')
        const name = itemCopy.getChildByName('bg').getChildByName('name').getChildByName('name')
        const bag = itemCopy.getChildByName('bg').getChildByName('contentBag')
        if (data.NumArr.length >= 14) {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_big')
        } else if (data.NumArr.length >= 7) {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_middle')
        } else {
            RES.setSpriteFrame(bg.getComponent(cc.Sprite), 'view/seedShop/fruitBox_small')
        }
        name.getComponent(cc.Label).string = `${data.Name} (包含${data.NumArr.length}个种子)`;
        bag.removeAllChildren()
        this.enemyPool = new cc.NodePool()
        data.NumArr.forEach((item, index) => {
            if(!view.fruitItem) return
            const fruitItem = cc.instantiate(view.fruitItem)
            this.enemyPool.put(fruitItem)
            if (index >= 7) return
            let fruitCopy = null
            if (this.enemyPool.size() > 0) {
                fruitCopy = this.enemyPool.get()
            } else {
                if(!view.fruitItem) return
                fruitCopy = cc.instantiate(view.fruitItem)
            }
            const fruit = fruitCopy.getChildByName('fruit')
            const ranking = fruitCopy.getChildByName('ranking')
            RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
            ranking.getComponent(cc.Label).string = item.Num
            fruitCopy.active = true
            bag.addChild(fruitCopy)
        })
        data["extend"] = false
        itemCopy.active = true;
        btn["data"] = data
        itemCopy["data"] = data
        itemCopy.off("click", this.extend, this);
        itemCopy.on("click", this.extend, this);
        btn.off("click", this.selectExpress, this);
        btn.on("click", this.selectExpress, this);


    }

    /* 展开 */
    private extend(event: cc.Button) {
        // console.log('展开', event);
        let view: SeedShopView = this.data.view;
        const node = event.target || event.node
        const data = node["data"]
        if (data.NumArr.length <= 6) return
        const bag = node.getChildByName('bg').getChildByName('contentBag')
        const more = node.getChildByName('more').getChildByName('icon_unfold')
        bag.removeAllChildren()
        // let addArr = data.NumArr.slice(7)
        if (data.extend) {
            data.extend = false
            RES.setSpriteFrame(more.getComponent(cc.Sprite), 'view/seedShop/icon_unfold')
            data.NumArr.forEach((item, index) => {
                if (index >= 7) return
                let fruitCopy = null
                if (this.enemyPool.size() > 0) {
                    fruitCopy = this.enemyPool.get()
                } else {
                    fruitCopy = cc.instantiate(view.fruitItem)
                }
                const fruit = fruitCopy.getChildByName('fruit')
                const ranking = fruitCopy.getChildByName('ranking')
                RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
                ranking.getComponent(cc.Label).string = item.Num
                fruitCopy.active = true
                bag.addChild(fruitCopy)
            })
        } else {
            data.extend = true
            RES.setSpriteFrame(more.getComponent(cc.Sprite), 'view/seedShop/icon_fold')
            data.NumArr.forEach((item, index) => {
                let fruitCopy = null
                if (this.enemyPool.size() > 0) {
                    fruitCopy = this.enemyPool.get()
                } else {
                    fruitCopy = cc.instantiate(view.fruitItem)
                }
                const fruit = fruitCopy.getChildByName('fruit')
                const ranking = fruitCopy.getChildByName('ranking')
                RES.setSpriteFrame(fruit.getComponent(cc.Sprite), `common/fruit/img_fruit_${item.Num}`)
                ranking.getComponent(cc.Label).string = item.Num
                fruitCopy.active = true
                bag.addChild(fruitCopy)
            })
        }
    }

    private selectExpress(evt: cc.Button) {
        let view: SeedShopView = this.data.view;
        let node = evt.target || evt.node;
        let data = node["data"];
        if (!data) return;
        view.selectFoodList = data.NumArr;
        view.settlementInfo(null, data.Num, data.Name);
    }
}