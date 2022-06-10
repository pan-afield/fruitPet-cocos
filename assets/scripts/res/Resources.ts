import EventDispatcher from "../event/EventDispatcher";
import RES from "./RES";
// import EventDispatcher from "../event/EventDispatcher";
// import LEvent from "../event/LEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Resources extends cc.Component {

    @property({
        type: cc.Asset
    })
    /**图片 */
    // @property(cc.SpriteFrame)
    // car1: cc.SpriteFrame = null;
    // @property(cc.SpriteFrame)
    // car2: cc.SpriteFrame = null;
    // customRes: cc.Asset[] = [];
    // @property({type: sp.SkeletonData})
    // danchou:sp.SkeletonData = null;
    // @property({type: sp.SkeletonData})
    // danchouef:sp.SkeletonData = null;
    // @property({type: sp.SkeletonData})
    // shilian:sp.SkeletonData = null;
    //----图集---开始-------

    // LIFE-CYCLE CALLBACKS:


    @property(cc.SpriteAtlas)
    loginCarPlist: cc.SpriteAtlas = null;

    @property(cc.SpriteAtlas)
    carStantPlist: cc.SpriteAtlas = null;

    @property(cc.SpriteAtlas)
    carEatPlist: cc.SpriteAtlas = null;

    @property(sp.SkeletonData)
    normalCatSpine: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    youngCatSpine: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    bigCatSpine: sp.SkeletonData = null;

    @property(sp.SkeletonData)
    smallHeart: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    middleHeart: sp.SkeletonData = null;
    @property(sp.SkeletonData)
    bigHeart: sp.SkeletonData = null;



    onLoad() {
        RES.updateRes(this);
        // EventDispatcher.dispatch(LEvent.RES_LOAD_COMPLETE, this);
        this.node.removeFromParent();
        this.destroy();
    }

    start() {

    }

    // update (dt) {}

}


