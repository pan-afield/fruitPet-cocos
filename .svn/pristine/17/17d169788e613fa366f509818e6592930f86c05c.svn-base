// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameConst from "../../constant/GameConst";
import RES from "../../res/RES";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plant extends cc.Component {

    @property
    num: number = 0;
    public id: number = 0;

    public state: number = 1; // 1 空地 2 成长动画 3 成长 4枯萎

    protected start(): void {
        this.id = this.num;
    }

    public stateInfo(state: number) {
        this.state = state;
        let icon = this.node.getComponent(cc.Sprite);
        this.node.scale = 0.8
        let plantInfo: any = GameConst.plantUpList[this.id];
        switch (this.state) {
            case 1:
                icon.spriteFrame = null;
                break;
            case 2:
                this.planting();
                break;
            case 3:
                RES.setSpriteFrame(icon, plantInfo.plantUrl)
                break;
            case 4:
                RES.setSpriteFrame(icon, plantInfo.endUrl)
                break;
        }
    }

    private async planting() {
        let plantInfo: any = GameConst.plantUpList[this.id];
        let icon = this.node.getComponent(cc.Sprite);
        let list: [] = plantInfo.planting;
        for (let i = 0; i < list.length; i++) {
            RES.setSpriteFrame(icon, list[i]);
            await this.sleep(500)
        }
    }

    private sleep(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, interval);
        })
    }
}
