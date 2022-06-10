import RES from "../res/RES";
import App from "./App";

/**
 * 动画管理
 */
export default class AnimeManager {

    private static _instance: AnimeManager;

    public constructor() {
        this.init();
    }

    public static get ins(): AnimeManager {
        if (this._instance == null) {
            this._instance = new AnimeManager();
        }
        return this._instance;
    }

    private init(): void {
    }

    /**
     * 序列帧动画节点管理
     */
    public static sequenceNodePool: cc.NodePool = new cc.NodePool();

    /**
     * 播放序列帧动画
     * @param parentNode 
     * @param pos 
     * @param plistName 
     * @param callBack 
     * @param callBackObj 
     * @param callBackParams 
     */
    public static playSequenceAnime(parentNode: cc.Node, pos: cc.Vec2 | cc.Vec3, plistName?: string | cc.SpriteFrame[], animeOption?: {
        animeNode?: cc.Node;
        animeName?: string;
        wrapMode?: cc.WrapMode;
        speed?: number;
        isCommonNode?: boolean;//是否为通用节点，通用节点可以回收重复使用
    }, callBack?: Function, callBackObj?: any, callBackParams?: any[]): cc.Node {
        if (!parentNode) {
            return null;
        } 
        let spriteFrames: cc.SpriteFrame[];
        let name: string;
        if (typeof plistName == 'string') {
            let spriteAtlas: cc.SpriteAtlas = RES.getRes(plistName);
            if (spriteAtlas) {
                spriteFrames = spriteAtlas.getSpriteFrames();
            }
            name = plistName;
        } else {
            spriteFrames = plistName;
        }
        if (!spriteFrames) {
            return null;
        }
        if (animeOption && animeOption.animeName) {
            name = animeOption.animeName;
        }

        let animeNode: cc.Node;
        if (animeOption && animeOption.animeNode) {
            animeNode = animeOption.animeNode;
        } else {
            if (animeOption && animeOption.isCommonNode) {
                animeNode = AnimeManager.sequenceNodePool.get();
                if (!animeNode) {
                    animeNode = new cc.Node();
                }
                animeNode.stopAllActions();
                animeNode.angle = 0;
                animeNode.scale = 1;
                animeNode.setAnchorPoint(0.5, 0.5);
                animeNode.opacity = 255;
            } else {
                animeNode = new cc.Node();
            }
        }
        animeNode.position = pos as any;
        animeNode.active = true;
        let sprite: cc.Sprite = animeNode.getComponent(cc.Sprite);
        if (!sprite) {
            sprite = animeNode.addComponent(cc.Sprite);
        }
        sprite.spriteFrame = spriteFrames[0];
        animeNode.parent = parentNode;

        let animetion: cc.Animation = animeNode.getComponent(cc.Animation);
        if (!animetion) {
            animetion = animeNode.addComponent(cc.Animation);
        }

        if (!animetion.currentClip || animetion.currentClip.name != name) {
            if (animetion.currentClip) {
                animetion.stop();
                animetion.removeClip(animetion.currentClip, true);
            }

            //创建动画剪辑，这里每次重新创建，后期如果认为客户机内存足够的话，可以缓存出来下次直接用
            let animmeClip: cc.AnimationClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, spriteFrames.length);
            animmeClip.name = name;//动画名称，这里暂时使用图集的名称取名，后期有必要的话传一个参数进来作为名字
            if (animeOption) {
                if (!isNaN(animeOption.wrapMode)) {
                    animmeClip.wrapMode = animeOption.wrapMode;
                }
                if (!isNaN(animeOption.speed)) {
                animmeClip.speed = animeOption.speed;
                }
                //animmeClip.wrapMode = animeOption.wrapMode cc.WrapMode.Loop;//循环播放
            }

            animetion.addClip(animmeClip);
        }
        animetion.on(cc.Animation.EventType.FINISHED, () => {
            if (!animeOption || animeOption.wrapMode != cc.WrapMode.Loop) {
                if (animeOption && animeOption.isCommonNode) {
                    AnimeManager.sequenceNodePool.put(animeNode);
                } else {
                    animeNode.removeFromParent();
                }
            }
            if (callBack && callBackObj) {
                callBack.apply(callBackObj, callBackParams);
            }
        });
        animetion.play(name);
        return animeNode;
    }

    /**
     * 回收序列帧动画节点
     */
    public static putSequenceNode(animeNode: cc.Node) {
        if (this.sequenceNodePool.size() < 100) {
            this.sequenceNodePool.put(animeNode);
        } else {
            animeNode.removeFromParent(true);
        }
    }


    /**
     * 骨骼动画节点管理
     */
    public static skeNodePool: cc.NodePool = new cc.NodePool();

    /**
     * 播放骨骼动画
     * !!!骨骼动画播放完之后一定要销毁，否则会导致drawcall暴增，帧率下降
     * @param parentNode 
     * @param pos 
     * @param skeName 
     * @param callBack 
     * @param callBackObj 
     * @param callBackParams 
     */
    public static playSkeAnime(parentNode: cc.Node, pos: cc.Vec2 | cc.Vec3, skeName?: string, animeName?: string, animeOption?: {
        displayIndex?: number;//动画节点在父节点中的层级位置（zindex）
        playTimes?: number;//播放次数， -1默认， 0无限循环， >=1指定次数
        autoDestroy?: boolean;//播放完之后是否自动销毁， 仅playTimes=1时有效
        isCommonNode?: boolean;//是否为通用节点，通用节点可以回收重复使用
    }, callBack?: Function, callBackObj?: any, callBackParams?: any[]): cc.Node {
        if (!parentNode) {
            return null;
        }

        //创建动画节点，这里每次重新创建，后期如果认为客户机内存足够的话，可以缓存出来下次直接用
        let animeNode: cc.Node;
        if (animeOption && animeOption.isCommonNode) {
            animeNode = AnimeManager.skeNodePool.get();
            if (!animeNode) {
                animeNode = new cc.Node();
            } else {
                animeNode.stopAllActions();
                animeNode.scale = 1;
                animeNode.angle = 0;
                animeNode.opacity = 255;
            }
        } else {
            animeNode = new cc.Node();
        }
        animeNode.position = pos as any;
        if (animeOption && !isNaN(animeOption.displayIndex)) {
            parentNode.addChild(animeNode, animeOption.displayIndex);
        } else {
            animeNode.parent = parentNode;
        }
        animeNode.active = true;

        let skeleton: sp.Skeleton = animeNode.getComponent(sp.Skeleton);
        if (!skeleton) {
            skeleton = animeNode.addComponent(sp.Skeleton);
            skeleton.premultipliedAlpha = false;
        }
        // skeleton.enableBatch = true;//如果使用动态合图合并骨骼纹理时，不要开启批合并 @see LXDynamicAtlasManager.ins.insertSpineSkeleton

        // skeleton.clearTracks();
        skeleton.skeletonData = RES.getRes(skeName);
        let loop: boolean = false;
        if (animeOption && !isNaN(animeOption.playTimes) && animeOption.playTimes == 0) {
            skeleton.loop = true;
            loop = true;
        }
        skeleton.setCompleteListener(() => {
            if (callBack && callBackObj) {
                callBack.apply(callBackObj, callBackParams);
            } else if (callBack && typeof callBack == "function") {
                callBack();
            }

            if (animeOption && (isNaN(animeOption.playTimes) || animeOption.playTimes == 1) && animeOption.autoDestroy) {
                if (animeOption.isCommonNode) {
                    AnimeManager.skeNodePool.put(animeNode);
                } else {
                    animeNode.removeFromParent();
                }
            }
        });

        if (animeName) {
            skeleton.setAnimation(0, animeName, loop);
        }
        return animeNode;
    }

    /**
     * 回收骨骼动画节点
     */
    public static putSkeNode(animeNode: cc.Node) {
        if (!animeNode || !animeNode.isValid) {
            return;
        }
        if (this.skeNodePool.size() < 100) {
            this.skeNodePool.put(animeNode);
        } else {
            animeNode.removeFromParent(true);
        }
    }

    public static clear(): void {
        this.sequenceNodePool.clear();
        this.skeNodePool.clear();
    } 
}
// window["AnimeManager"] = AnimeManager;