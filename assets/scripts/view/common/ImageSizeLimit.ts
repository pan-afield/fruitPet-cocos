// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ImageSizeLimit extends cc.Component {

    @property()
    _minWidth:number = 0;

    @property()
    public get minWidth():number
    {
        return this._minWidth;
    }

    public set minWidth(value:number)
    {
        if(this._minWidth == value || !value || this._minWidth > this._maxWidth)
        {
            return;
        }
        this._minWidth = value;
        this.updateStatus();
    }

    @property()
    _maxWidth:number = 0;

    @property()
    public get maxWidth():number
    {
        return this._maxWidth;
    }

    public set maxWidth(value:number)
    {
        if(this._maxWidth == value || !value || this._maxWidth < this._minWidth)
        {
            return;
        }
        this._maxWidth = value;
        this.updateStatus();
    }

    @property()
    _minHeight:number = 0;

    @property()
    public get minHeight():number
    {
        return this._minHeight;
    }

    public set minHeight(value:number)
    {
        if(this._minHeight == value || !value || this._minHeight > this._maxHeight)
        {
            return;
        }
        this._minHeight = value;
        this.updateStatus();
    }

    @property()
    _maxHeight:number = 0;

    @property()
    public get maxHeight():number
    {
        return this._maxHeight;
    }

    public set maxHeight(value:number)
    {
        if(this._maxHeight == value || !value || this._maxHeight < this._minHeight)
        {
            return;
        }
        this._maxHeight = value;
        this.updateStatus();
    }

    // LIFE-CYCLE CALLBACKS:

    __preload () {
        this.node.on("spriteframe-changed", this.onSpriteframeChanged, this);
    }

    // onLoad () {}

    start () {
        
    }

    onEnable()
    {
        this.updateStatus();
    }

    onDisable()
    {

    }

    private onSpriteframeChanged():void
    {
        this.updateStatus();
    }

    private updateStatus():void
    {
        let sp:cc.Sprite = this.node.getComponent(cc.Sprite);
        if(!sp)
        {
            return;
        }
        
        let spf:cc.SpriteFrame = sp.spriteFrame;
        if(spf)
        {
            let texture_sp:cc.Texture2D = spf.getTexture();
            if(texture_sp)
            {
                if(!texture_sp.loaded)
                {
                    texture_sp.on("load", function(){
                        this.node.scale = 1;
                        this.adjust();
                    }.bind(this));
                    return;
                }
            }
        }

        this.node.scale = 1;
        this.adjust();
    }

    private adjust():void
    {
        let sp:cc.Sprite = this.node.getComponent(cc.Sprite);
        if(!sp)
        {
            return;
        }
        let spriteframe:cc.SpriteFrame = sp.spriteFrame;
        if(!spriteframe)
        {
            return;
        }

        let rect:cc.Rect = spriteframe.getRect();

        let scale:number = this.node.scale;
        
        let widthScale:number = 1;

        let maxWidthScale:number = this.maxWidth / rect.width;
        let minWidthScale:number = NaN;
        if(this.maxWidth != 0 && rect.width * scale > this.maxWidth)//超过最大预设宽度
        {
            widthScale = this.maxWidth / rect.width;
        }else//未超过最大预设宽度
        {
            if(this.minWidth != 0 && rect.width * scale < this.minWidth)//小于最小预设宽度
            {
                minWidthScale = this.minWidth / rect.width;
            }
        }

        let heightScale:number = 1;

        let maxHeightScale:number = this.maxHeight / rect.height;
        let minHeightScale:number = NaN;
        if(this.maxHeight != 0 && rect.height * scale > this.maxHeight)
        {
            heightScale = this.maxHeight / rect.height;
        }else
        {
            if(this.minHeight != 0 && rect.height * scale < this.minHeight)//小于最小预设高度
            {
                minHeightScale = this.minHeight / rect.height;
            }
        }

        let useScale:number = 1;
        if(!isNaN(minWidthScale) && !isNaN(minHeightScale))
        {
            if(minWidthScale > minHeightScale)
            {
                if(minWidthScale <= maxHeightScale)
                {
                    useScale = minWidthScale;
                }else{
                    useScale = minHeightScale
                }
            }else if(minWidthScale < minHeightScale)
            {
                if(minHeightScale <= maxWidthScale)
                {
                    useScale = minHeightScale;
                }else{
                    useScale = minWidthScale;
                }
            }else
            {
                useScale = minWidthScale;
            }
        }else if(!isNaN(minWidthScale) && isNaN(minHeightScale))
        {
            if(minWidthScale <= maxHeightScale)
            {
                useScale = minWidthScale;
            }else
            {
                useScale = Math.min(widthScale, heightScale);
            }
        }else if(isNaN(minWidthScale) && !isNaN(minHeightScale))
        {
            if(minHeightScale <= maxWidthScale)
            {
                useScale = minHeightScale;
            }else
            {
                useScale = Math.min(widthScale, heightScale);
            }
        }else if(isNaN(minWidthScale) && isNaN(minHeightScale))
        {
            useScale = Math.min(widthScale, heightScale);
        }

        // this.node.scale = Math.min(widthScale, heightScale);
        this.node.scale = useScale;
    }

    update (dt) {
        let sp:cc.Sprite = this.node.getComponent(cc.Sprite);
        if(!sp)
        {
            return;
        }
        if(sp["_vertsDirty"])
        {
            this.updateStatus();
        }
    }
}
