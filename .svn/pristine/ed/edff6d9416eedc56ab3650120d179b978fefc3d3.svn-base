import DataRenderer from "./DataRenderer";

const {ccclass, property} = cc._decorator;

/**
 * !#en Enum for Layout type
 * !#zh 布局类型
 * @enum Layout.Type
 */
let Type = cc.Enum({
    /**
     * !#en None Layout
     * !#zh 取消布局
     *@property {Number} NONE
     */
    NONE: 0,
    /**
     * !#en Horizontal Layout
     * !#zh 水平布局
     * @property {Number} HORIZONTAL
     */
    HORIZONTAL: 1,

    /**
     * !#en Vertical Layout
     * !#zh 垂直布局
     * @property {Number} VERTICAL
     */
    VERTICAL: 2,
    /**
     * !#en Grid Layout
     * !#zh 网格布局
     * @property {Number} GRID
     */
    // GRID: 3,
});

class PosData{
    x:number;
    y:number;
    anchorX:number;
    anchorY:number;
    width:number;
    height:number;
    templType:number;
}

/**
 * 虚拟列表
 * @author zhangjun
 * 注意事项：
 * 1、本组件重写了cc.ScrollView，所以使用时请按cc.ScrollView的方式使用即可，建议严格按照Editor中的ScrollView控件节点结构进行布局。
 * 2、组件指定了一个maskView来确定可视区域，本质上就是ScrollView的mask（view）节点。
 * 3、组件已经提供了水平布局和垂直布局，所以请不要给组件的content节点设置任何layout。
 * 4、组件提供了设置四周内边距的属性、设置子项间隔的属性。
 * 5、组件需要指定子项的渲染模板（预制）、渲染组件（脚本），用户只要添加数据源（数组）就可以自动渲染（另外可以给每个单独项指定不同的渲染模板（预制））。
 * 6、请确保maskView和content的锚点是一致的。
 * 7、cc.ScrollView本身存在一个bug：
 *  比如列表方向设置为垂直方向，
 *  如果一开始node就是隐藏的，而这时就设置content的高度会导致node在显示状态下向上滑动时已经滑动到底部最后一个item还能继续上滑。
 *  一直上滑到最后一个item消失在顶部时才能停止滑动。
 *  所以建议在node显示的情况下才设置数据（dataprovider）。
 */
@ccclass
export default class RecycleScroller extends cc.ScrollView {
    @property({
        tooltip:"遮罩节点",
        type: cc.Node
    })
    maskView:cc.Node = null;

    /** 布局类型 */
    @property({
        tooltip:"布局类型",
        type: cc.Enum(Type),
        displayName: "布局类型"
    })
    _type = Type.NONE;
    /** 布局类型 */
    @property({
        tooltip:"布局类型",
        type:cc.Enum(Type)
    })
    public get type()
    {
        return this._type;
    }
    public set type(value)
    {
        if(this._type == value)
        {
            return;
        }
        this._type = value;
    }

    /** 水平间隔 */
    @property({
        tooltip:"水平间隔",
        type:cc.Integer
    })
    _spacingX:number = 0;
    /** 水平间隔 */
    @property({
        tooltip:"水平间隔",
        type:cc.Integer,
        visible() { return this.type === Type.HORIZONTAL; }
    })
    public get spacingX():number
    {
        return this._spacingX;
    }
    public set spacingX(value:number)
    {
        if(this._spacingX == value)
        {
            return;
        }
        this._spacingX = value;
    }

    /** 垂直间隔 */
    @property({
        tooltip:"垂直间隔",
        type:cc.Integer
    })
    _spacingY:number = 0;
    /** 垂直间隔 */
    @property({
        tooltip:"垂直间隔",
        type:cc.Integer,
        visible() { return this.type === Type.VERTICAL; }
    })
    public get spacingY():number
    {
        return this._spacingY;
    }
    public set spacingY(value:number)
    {
        if(this._spacingY == value)
        {
            return;
        }
        this._spacingY = value;
    }

    /** 左侧内边距 */
    @property({
        tooltip:"左侧内边距",
        type:cc.Integer
    })
    _paddingLeft:number = 0;
    /** 左侧内边距 */
    @property({
        tooltip:"左侧内边距",
        type:cc.Integer,
        visible() { return this.type === Type.HORIZONTAL; }
    })
    public get paddingLeft():number
    {
        return this._paddingLeft;
    }
    public set paddingLeft(value:number)
    {
        if(this._paddingLeft == value)
        {
            return;
        }
        this._paddingLeft = value;
    }

    /** 右侧内边距 */
    @property({
        tooltip:"右侧内边距",
        type:cc.Integer
    })
    _paddingRight:number = 0;
    /** 右侧内边距 */
    @property({
        tooltip:"右侧内边距",
        type:cc.Integer,
        visible() { return this.type === Type.HORIZONTAL; }
    })
    public get paddingRight():number
    {
        return this._paddingRight;
    }
    public set paddingRight(value:number)
    {
        if(this._paddingRight == value)
        {
            return;
        }
        this._paddingRight = value;
    }

    /** 顶部内边距 */
    @property({
        tooltip:"顶部内边距",
        type:cc.Integer
    })
    _paddingTop:number = 0;
    /** 顶部内边距 */
    @property({
        tooltip:"顶部内边距",
        type:cc.Integer,
        visible() { return this.type === Type.VERTICAL; }
    })
    public get paddingTop():number
    {
        return this._paddingTop;
    }
    public set paddingTop(value:number)
    {
        if(this._paddingTop == value)
        {
            return;
        }
        this._paddingTop = value;
    }

    /** 底部内边距 */
    @property({
        tooltip:"底部内边距",
        type:cc.Integer
    })
    _paddingBottom:number = 0;
    /** 底部内边距 */
    @property({
        tooltip:"底部内边距",
        type:cc.Integer,
        visible() { return this.type === Type.VERTICAL; }
    })
    public get paddingBottom():number
    {
        return this._paddingBottom;
    }
    public set paddingBottom(value:number)
    {
        if(this._paddingBottom == value)
        {
            return;
        }
        this._paddingBottom = value;
    }

    /** 子项模板 */
    _itemTemplate:cc.Prefab | cc.Node = null;
    /** 子项模板 */
    public get itemTemplate():cc.Prefab | cc.Node
    {
        return this._itemTemplate;
    }
    public set itemTemplate(value:cc.Prefab | cc.Node)
    {
        if(this._itemTemplate == value)
        {
            return;
        }
        this._itemTemplate = value;
        this.updateItemTemplate();
    }

    /**
     * 更新数据渲染模板
     */
    private updateItemTemplate():void
    {
        this.content.removeAllChildren();
        this.updateDataProvider();
    }

    private itemsPosData:PosData[] = [];

    private templateType:number = 0;
    private templateMap:{[type:number]:cc.Prefab | cc.Node} = {};

    /** 数据源 */
    _dataProvider:Array<any> = [];
    public get dataProvider():Array<any>
    {
        return this._dataProvider;
    }
    public set dataProvider(value:Array<any>)
    {
        if(this._dataProvider == value)
        {
            return;
        }
        this._dataProvider = value;
        this.updateDataProvider();
    }

    /**
     * 此方法不会更新列表
     * @param value 
     */
    public setDataProvider(value:Array<any>):void
    {
        if(this._dataProvider == value)
        {
            return;
        }
        this._dataProvider = value;
    }

    /** 数据渲染组件 */
    _dataRenderer:any = null;
    public getDataRenderer<T extends DataRenderer>():{new(): T}
    {
        return this._dataRenderer;
    }
    public setDataRenderer<T extends DataRenderer>(type: {new(): T}):void
    {
        if(this._dataRenderer == type)
        {
            return;
        }
        this._dataRenderer = type;
        this.updateDataRenderer();
    }

    /** 当前可视节点列表 */
    private currentVisibleItems:cc.Node[] = [];

    /** 是否允许分帧创建子项 */
    @property({
        tooltip:"是否允许分帧创建子项"
    })
    private enableSplitCreateItem:boolean = true;
    /** 当enableSplitCreateItem为true时，用于识别还要自动触发多少次validateItemsStatus方法 */
    private validateItemsStatusTimes:number = 0;
    /** 每帧允许创建的最大数量 */
    private MAX_CREATE_PER_FRAME:number = 2;
    /** 当前帧剩余可创建的数量 */
    private createdAtThisFrame:number = 2;

    start(){
        super.start();
    }

    /**
     * 数据源更新时，确定content总长度、缓存节点位置
     */
    private cacheVirtualPosData():void
    {
        if(!this._dataProvider)
        {
            return;
        }
        if(!this.itemTemplate)
        {
            return;
        }

        this.itemsPosData.length = 0;

        //---第1步：确定列表总长度-----开始-------------------------------
        //总长度（宽度/高度）
        let allDis:number = 0;
        if(this.type == Type.HORIZONTAL)
        {
            allDis += this.paddingLeft;
        }
        else if(this.type == Type.VERTICAL)
        {
            allDis += this.paddingTop;
        }
        let templ:cc.Prefab | cc.Node;
        let templNode:cc.Node;
        let templateType:number;
        
        for(let i:number = 0; i<this._dataProvider.length; i++)
        {
            templateType = NaN;
            templ = this._dataProvider[i].template;
            if(!templ)
            {
                templ = this.itemTemplate;
            }else
            {
                templateType = this.getTemplateType();
                this.templateMap[templateType] = templ;
            }
            templNode = this.getTemplNode(templ);
            if(i > 0)
            {
                if(this.type == Type.HORIZONTAL)
                {
                    allDis += this.spacingX;
                }
                else if(this.type == Type.VERTICAL)
                {
                    allDis += this.spacingY;
                }
            }
            if(this.type == Type.HORIZONTAL)
            {
                allDis += templNode.width;
            }
            else if(this.type == Type.VERTICAL)
            {
                allDis += templNode.height;
            }
        }

        if(this.type == Type.HORIZONTAL)
        {
            allDis += this.paddingRight;
            this.content.width = allDis;
        }
        else if(this.type == Type.VERTICAL)
        {
            allDis += this.paddingBottom;
            this.content.height = allDis;
        }
        //---第1步：确定列表总长度-----结束-------------------------------

        //---第2步：确定所有子项在列表中的位置-----开始-------------------------------
        //起点
        let startX:number = 0 - allDis * this.content.anchorX;//x起点坐标（水平布局时，以左侧为起点）
        let startY:number = allDis * (1 - this.content.anchorY);//y起点坐标（垂直布局时，以顶部为起点）

        let currentDis:number = 0;
        if(this.type == Type.HORIZONTAL)
        {
            currentDis += this.paddingLeft;//水平布局时添加左侧内边距
        }
        else if(this.type == Type.VERTICAL)
        {
            currentDis += this.paddingTop;//垂直布局时添加顶部内边距
        }

        for(let i:number = 0; i<this._dataProvider.length; i++)
        {
            templateType = NaN;
            templ = this._dataProvider[i].template;
            if(!templ)
            {
                templ = this.itemTemplate;
            }else
            {
                templateType = this.getTemplateType();
                this.templateMap[templateType] = templ;
            }
            if(i > 0)
            {
                if(this.type == Type.HORIZONTAL)
                {
                    currentDis += this.spacingX;
                }
                else if(this.type == Type.VERTICAL)
                {
                    currentDis += this.spacingY;
                }
            }

            this.itemsPosData[i] = {
                x:this.type == Type.HORIZONTAL ? startX + (currentDis + templNode.width * templNode.anchorX) : templNode.x,
                y:this.type == Type.VERTICAL ? startY - (currentDis + templNode.height * (1 - templNode.anchorY)) : templNode.y,
                width:templNode.width,
                height:templNode.height,
                anchorX:templNode.anchorX,
                anchorY:templNode.anchorY,
                templType:isNaN(templateType) ? 0 : templateType//每个节点可以有不同的预制，当没有指定预制时，会使用默认的预制
            };

            if(this.type == Type.HORIZONTAL)
            {
                currentDis += templNode.width;
            }
            else if(this.type == Type.VERTICAL)
            {
                currentDis += templNode.height;
            }
        }
        //---第2步：确定所有子项在列表中的位置-----结束-------------------------------
    }

    private updateItemsPos():void
    {
        //---第2步：确定所有子项在列表中的位置-----开始-------------------------------
        let allDis:number = 0;
        if(this.type == Type.HORIZONTAL)
        {
            allDis = this.content.width;
        }
        else if(this.type == Type.VERTICAL)
        {
            allDis = this.content.height;
        }
        
        //起点
        let startX:number = 0 - allDis * this.content.anchorX;//x起点坐标（水平布局时，以左侧为起点）
        let startY:number = allDis * (1 - this.content.anchorY);//y起点坐标（垂直布局时，以顶部为起点）

        let currentDis:number = 0;
        if(this.type == Type.HORIZONTAL)
        {
            currentDis += this.paddingLeft;//水平布局时添加左侧内边距
        }
        else if(this.type == Type.VERTICAL)
        {
            currentDis += this.paddingTop;//垂直布局时添加顶部内边距
        }

        let itemPos;
        for(let i:number = 0; i<this.itemsPosData.length; i++)
        {
            itemPos = this.itemsPosData[i];
            if(i > 0)
            {
                if(this.type == Type.HORIZONTAL)
                {
                    currentDis += this.spacingX;
                }
                else if(this.type == Type.VERTICAL)
                {
                    currentDis += this.spacingY;
                }
            }

            itemPos.x = this.type == Type.HORIZONTAL ? startX + (currentDis + itemPos.width * itemPos.anchorX) : itemPos.x;
            itemPos.y = this.type == Type.VERTICAL ? startY - (currentDis + itemPos.height * (1 - itemPos.anchorY)) : itemPos.y;

            if(this.type == Type.HORIZONTAL)
            {
                currentDis += itemPos.width;
            }
            else if(this.type == Type.VERTICAL)
            {
                currentDis += itemPos.height;
            }
        }
        //---第2步：确定所有子项在列表中的位置-----结束-------------------------------
    }

    private getTemplNode(templ:cc.Prefab | cc.Node):cc.Node
    {
        if(templ instanceof cc.Prefab)
        {
            return templ.data;
        }else if(templ instanceof cc.Node)
        {
            return templ;
        }
        return null;
    }

    /**
     * 生成预制主键
     */
    private getTemplateType():number
    {
        this.templateType += 1;
        return this.templateType;
    }

    /**
     * 获取指定类型预制
     * @param type 
     */
    private getTemplate(type:number):cc.Prefab | cc.Node
    {
        if(this.templateMap[type])
        {
            return this.templateMap[type];
        }
        return this.itemTemplate;//当没有找到指定预制时，会使用默认的预制
    }

    /**
     * 更新数据源
     */
    private updateDataProvider():void
    {
        if(!this.dataProvider)
        {
            return;
        }

        this.cacheVirtualPosData();

        if(!this.itemTemplate)
        {
            return;
        }

        //HORIZONTAL布局
        if(this.type == Type.HORIZONTAL)
        {
            this.content.x = 0;
        }
        //VERTICAL布局
        else if(this.type == Type.VERTICAL)
        {
            this.content.y = 0;
        }

        this.validateItemsStatus();
    }

    /**
     * 更新数据渲染组件
     */
    private updateDataRenderer():void
    {
        let children:cc.Node[] = this.content.children;
        let item:cc.Node;
        let dataCom:DataRenderer;
        let dataIndex:number;
        for(let i:number = 0; i<children.length; i++)
        {
            item = children[i];
            dataCom = item.getComponent(DataRenderer);
            if(dataCom)
            {
                dataIndex = dataCom.dataIndex;
                dataCom.destroy();
            }else
            {
                continue;
            }
            dataCom = item.addComponent(this.getDataRenderer());
            dataCom.dataIndex = dataIndex;
            dataCom.data = this.dataProvider[dataIndex];
        }
    }

    /**
     * 获取可用节点
     * @param type 
     */
    private getUsableItem(type:number):cc.Node
    {
        let children:cc.Node[] = this.content.children;
        let dataCom:DataRenderer;
        for(let j:number = 0; j<children.length; j++)
        {
            dataCom = children[j].getComponent(DataRenderer);
            if(dataCom.dataIndex > this.dataProvider.length - 1)
            {
                return children[j];
            }
        }

        //HORIZONTAL布局
        if(this.type == Type.HORIZONTAL)
        {
            //起点（列表可视区域的起点）
            let startX:number = 0 - this.maskView.width * this.content.anchorX;
            //终点（列表可视区域的终点）
            let endX:number = this.maskView.width * (1 - this.content.anchorX);
            //0点坐标（列表容器content的最左侧起点x坐标）
            let zeroPoint:number = 0 - this.content.width * this.content.anchorX;

            //列表容器content在其父容器（即控制可视区域的mask节点）的最左侧x坐标
            let ctnStartPoint:number = this.content.x - (this.content.width * this.content.anchorX);

            let item:cc.Node;
            let rightX_item:number;
            let leftX_item:number;
            for(let i:number = 0; i<children.length; i++)
            {
                item = children[i];
                if(item["prefabType"] != type)
                {
                    continue;
                }

                rightX_item = ctnStartPoint + ((item.x + item.width * (1-item.anchorX)) - zeroPoint);//获得item在可视区域的最左侧x坐标
                leftX_item = ctnStartPoint + ((item.x - item.width * item.anchorX) - zeroPoint);//获得item在可视区域的最右侧x坐标
                if(rightX_item < startX || leftX_item > endX)//如果不在可视区域内，则证明此节点处于空闲状态，可以被使用
                {
                    return item;
                }
            }
        }
        //VERTICAL布局
        else if(this.type == Type.VERTICAL)
        {
            //起点（列表可视区域的起点）
            let startY:number = 0 - this.maskView.height * this.content.anchorY;
            //终点（列表可视区域的终点）
            let endY:number = this.maskView.height * (1 - this.content.anchorY);
            //0点坐标（列表容器content的最顶端侧起点y坐标）
            let zeroPoint:number = this.content.height * (1-this.content.anchorY);

            //列表容器content在其父容器（即控制可视区域的mask节点）的最顶端侧y坐标
            let ctnStartPoint:number = this.content.y + (this.content.height * (1-this.content.anchorY));

            let item:cc.Node;
            let topY_item:number;
            let bottomY_item:number;
            for(let i:number = 0; i<children.length; i++)
            {
                item = children[i];
                if(item["prefabType"] != type)
                {
                    continue;
                }

                topY_item = ctnStartPoint - (zeroPoint - (item.y + item.height * (1-item.anchorY)));//获得item在可视区域的最顶端侧y坐标
                bottomY_item = ctnStartPoint - (zeroPoint - (item.y - item.height * item.anchorY));//获得item在可视区域的最底端侧y坐标
                if(topY_item < startY || bottomY_item > endY)//如果不在可视区域内，则证明此节点处于空闲状态，可以被使用
                {
                    return item;
                }
            }
        }
        
        return this.createItem(type);
    }

    private createItem(type:number):cc.Node{
        let item:cc.Node = cc.instantiate(this.getTemplate(type)) as cc.Node;
        item.addComponent(this.getDataRenderer());
        item.on(cc.Node.EventType.SIZE_CHANGED, this.onItemResize.bind(this, item), this);
        item["prefabType"] = type;
        return item;
    }

    private onItemResize(item:cc.Node):void
    {
        let dataCom:DataRenderer = item.getComponent(DataRenderer);
        if(!dataCom)
        {
            return;
        }
        let dataIndex:number = dataCom.dataIndex;
        let itemPos = this.itemsPosData[dataIndex];
        if(itemPos)
        {
            let needValiDateStatus:boolean = false;
            let dis:number = 0;
            if(itemPos.width != item.width)
            {
                dis = item.width - itemPos.width;
                itemPos.width = item.width;
                if(this.type == Type.HORIZONTAL)
                {
                    needValiDateStatus = true;
                }
            }
            if(itemPos.height != item.height)
            {
                dis = item.height - itemPos.height;
                itemPos.height = item.height;
                if(this.type == Type.VERTICAL)
                {
                    needValiDateStatus = true;
                }
            }
            
            if(needValiDateStatus)
            {
                if(this.type == Type.HORIZONTAL)
                {
                    this.content.width += dis;
                }else if(this.type == Type.VERTICAL)
                {
                    this.content.height += dis;
                }
                this.updateItemsPos();
                // let itemPos_temp;
                // for(let i:number = dataIndex + 1; i<this.itemsPosData.length; i++)
                // {
                //     itemPos_temp = this.itemsPosData[i];
                //     if(!itemPos_temp)
                //     {
                //         continue;
                //     }
                //     if(this.type == Type.HORIZONTAL)
                //     {
                //         itemPos_temp.x += Math.abs(dis);
                //     }else if(this.type == Type.VERTICAL)
                //     {
                //         itemPos_temp.y -= Math.abs(dis);
                //     }
                // }
                this.validateItemsStatus();
            }
        }
    }

    onEnable(){
        super.onEnable();
        this.node.on("scrolling", this.onScrolling, this);
    }
    onDisable(){
        super.onDisable();
        this.node.off("scrolling", this.onScrolling, this);
    }

    private onScrolling():void
    {
        this.validateItemsStatus();
    }

    protected update(dt: number): void {
        super.update(dt);
        if(this.enableSplitCreateItem && this.validateItemsStatusTimes > 0)
        {
            //重置每帧可创建的数量
            this.createdAtThisFrame = this.MAX_CREATE_PER_FRAME;
            this.validateItemsStatusTimes -= this.createdAtThisFrame;
            this.validateItemsStatus();
        }
    }

    private validateItemsStatus():void
    {
        this.currentVisibleItems.length = 0;
        //HORIZONTAL布局
        if(this.type == Type.HORIZONTAL)
        {
            //起点（列表可视区域的起点）
            let startX:number = 0 - this.maskView.width * this.content.anchorX;
            //终点（列表可视区域的终点）
            let endX:number = this.maskView.width * (1 - this.content.anchorX);
            //0点坐标（列表容器content的最左侧起点x坐标）
            let zeroPoint:number = 0 - this.content.width * this.content.anchorX;

            //列表容器content在其父容器（即控制可视区域的mask节点）的最左侧x坐标
            let ctnStartPoint:number = this.content.x - (this.content.width * this.content.anchorX);

            let itemNode:cc.Node;
            let posItem:PosData;

            let rightX_item:number;
            let leftX_item:number;

            let children:cc.Node[] = this.content.children;
            let alreadyExist:boolean = false;

            let dataCom:DataRenderer;
            for(let i:number = 0; i<this.itemsPosData.length; i++)
            {
                posItem = this.itemsPosData[i];

                alreadyExist = false;
                for(let j:number = 0; j<children.length; j++)
                {
                    dataCom = children[j].getComponent(DataRenderer);
                    if(dataCom.dataIndex == i)
                    {
                        //存在的情况下更新位置即可
                        children[j].x = posItem.x;
                        children[j].y = posItem.y;
                        if(children[j].parent != this.content)
                        {
                            children[j].parent = this.content;
                        }
                        if(!children[j].active)
                        {
                            children[j].active = true;
                        }
                        if(dataCom.data != this.dataProvider[i])
                        {
                            dataCom.data = this.dataProvider[i];
                        }
                        if(children[j].width != posItem.width)
                        {
                            this.onItemResize(children[j]);
                        }
                        alreadyExist = true;
                        this.currentVisibleItems.push(children[j]);
                        break;
                    }
                }
                if(alreadyExist)
                {
                    continue;
                }

                rightX_item = ctnStartPoint + ((posItem.x + posItem.width * (1-posItem.anchorX)) - zeroPoint);//获得item在可视区域的最左侧x坐标
                leftX_item = ctnStartPoint + ((posItem.x - posItem.width * posItem.anchorX) - zeroPoint);//获得item在可视区域的最右侧x坐标
                if(rightX_item < startX || leftX_item > endX)//如果不在可视区域内，则证明此节点不需要显示，不用处理
                {
                    continue;
                }

                if(this.enableSplitCreateItem)
                {
                    if(this.createdAtThisFrame <= 0)
                    {
                        this.validateItemsStatusTimes += 1;
                        continue;
                    }
                    this.createdAtThisFrame -= 1;
                }

                itemNode = this.getUsableItem(posItem.templType);
                itemNode.x = posItem.x;
                itemNode.y = posItem.y;
                if(itemNode.parent != this.content)
                {
                    itemNode.parent = this.content;
                }
                if(!itemNode.active)
                {
                    itemNode.active = true;
                }
                dataCom = itemNode.getComponent(DataRenderer);
                dataCom.dataIndex = i;
                dataCom.data = this.dataProvider[i];//刷新数据
                if(itemNode.width != posItem.width)
                {
                    this.onItemResize(itemNode);
                }
                this.currentVisibleItems.push(itemNode);
            }
        }
        //VERTICAL布局
        else if(this.type == Type.VERTICAL)
        {
            //起点（列表可视区域的起点）
            let startY:number = 0 - this.maskView.height * this.content.anchorY;
            //终点（列表可视区域的终点）
            let endY:number = this.maskView.height * (1 - this.content.anchorY);
            //0点坐标（列表容器content的最顶端侧起点y坐标）
            let zeroPoint:number = this.content.height * (1-this.content.anchorY);

            //列表容器content在其父容器（即控制可视区域的mask节点）的最顶端侧y坐标
            let ctnStartPoint:number = this.content.y + (this.content.height * (1-this.content.anchorY));

            let itemNode:cc.Node;
            let posItem:PosData;
            let topY_item:number;
            let bottomY_item:number;

            let children:cc.Node[] = this.content.children;
            let alreadyExist:boolean = false;

            let dataCom:DataRenderer;
            for(let i:number = 0; i<this.itemsPosData.length; i++)
            {
                posItem = this.itemsPosData[i];

                alreadyExist = false;
                for(let j:number = 0; j<children.length; j++)
                {
                    dataCom = children[j].getComponent(DataRenderer);
                    if(dataCom.dataIndex == i)
                    {
                        //存在的情况下更新位置即可
                        children[j].x = posItem.x;
                        children[j].y = posItem.y;
                        if(children[j].parent != this.content)
                        {
                            children[j].parent = this.content;
                        }
                        if(!children[j].active)
                        {
                            children[j].active = true;
                        }
                        if(dataCom.data != this.dataProvider[i])
                        {
                            dataCom.data = this.dataProvider[i];
                        }
                        if(children[j].height != posItem.height)
                        {
                            this.onItemResize(children[j]);
                        }
                        alreadyExist = true;
                        this.currentVisibleItems.push(children[j]);
                        break;
                    }
                }
                if(alreadyExist)
                {
                    continue;
                }

                topY_item = ctnStartPoint - (zeroPoint - (posItem.y + posItem.height * (1-posItem.anchorY)));//获得item在可视区域的最顶端侧y坐标
                bottomY_item = ctnStartPoint - (zeroPoint - (posItem.y - posItem.height * posItem.anchorY));//获得item在可视区域的最底端侧y坐标
                if(topY_item < startY || bottomY_item > endY)//如果不在可视区域内，则证明此节点不需要显示，不用处理
                {
                    continue;
                }

                if(this.enableSplitCreateItem)
                {
                    if(this.createdAtThisFrame <= 0)
                    {
                        this.validateItemsStatusTimes += 1;
                        continue;
                    }
                    this.createdAtThisFrame -= 1;
                }

                itemNode = this.getUsableItem(posItem.templType);
                itemNode.x = posItem.x;
                itemNode.y = posItem.y;
                if(itemNode.parent != this.content)
                {
                    itemNode.parent = this.content;
                }
                if(!itemNode.active)
                {
                    itemNode.active = true;
                }
                dataCom = itemNode.getComponent(DataRenderer);
                dataCom.dataIndex = i;
                dataCom.data = this.dataProvider[i];//刷新数据
                if(itemNode.height != posItem.height)
                {
                    this.onItemResize(itemNode);
                }
                this.currentVisibleItems.push(itemNode);
            }
        }
        this.validateUnUsedItems();
    }

    private validateUnUsedItems():void
    {
        let maxDataIndex = this.dataProvider.length - 1;
        let children:cc.Node[] = this.content.children;
        let item:cc.Node;
        let dataCom:DataRenderer;
        for(let i:number = 0; i<children.length; i++)
        {
            item = children[i];
            dataCom = item.getComponent(DataRenderer);
            if(!dataCom)
            {
                continue;
            }
            if(dataCom.dataIndex > maxDataIndex || !this.currentVisibleItems.includes(item))
            {
                item.active = false;
            }
        }
    }

    /**
     * 向列表插入数据
     * @param dataItem 插入的数据
     * @param index 插入的位置
     */
    public insertItem(dataItem:any, index:number = NaN):void
    {
        if(!dataItem)
        {
            return;
        }
        if(!this.dataProvider)
        {
            this.dataProvider = [];
        }
        if(isNaN(index))
        {
            index = this.dataProvider.length;
        }else
        {
            if(index > this.dataProvider.length)
            {
                index = this.dataProvider.length;
            }
        }
        this.dataProvider.splice(index, 0, dataItem);
        this.cacheVirtualPosData();
        this.validateItemsStatus();
    }

    /**
     * 向列表添加数据
     * @param dataItem 添加的数据
     */
    public addItem(dataItem:any):void
    {
        this.insertItem(dataItem);
    }

    /**
     * 向列表添加多个数据
     * @param dataItems 添加的数据（数组）
     * @param index 插入的位置
     */
    public addItems(dataItems:any[], index:number = NaN):void
    {
        if(!dataItems || dataItems.length == 0)
        {
            return;
        }
        if(!this._dataProvider)
        {
            this._dataProvider = [];
        }
        if(isNaN(index))
        {
            this._dataProvider = this._dataProvider.concat(dataItems);
        }else
        {
            if(index <= 0)
            {
                this._dataProvider = dataItems.concat(this._dataProvider);
            }else if(index > this._dataProvider.length)
            {
                this._dataProvider = this._dataProvider.concat(dataItems);
            }else
            {
                let firstPart:Array<any> = this._dataProvider.slice(0, index);
                let lastPart:Array<any> = this._dataProvider.slice(index, this._dataProvider.length);
                this._dataProvider = firstPart.concat(dataItems, lastPart);
            }
        }
        this.cacheVirtualPosData();
        this.validateItemsStatus();
    }

    /**
     * 删除指定项
     * @param index 索引
     */
    public removeItem(index:number):void
    {
        if(isNaN(index))
        {
            return;
        }
        if(index >this.dataProvider.length - 1 || index < 0)
        {
            return;
        }
        this.dataProvider.splice(index, 1);
        this.itemsPosData.splice(index, 1);
        this.cacheVirtualPosData();
        this.validateItemsStatus();
    }

    public clear():void
    {
        if(this.dataProvider)
        {
            this.dataProvider.length = 0;
        }
        if(this.itemsPosData)
        {
            this.itemsPosData.length = 0;
        }
        let children:cc.Node[] = this.content.children;
        for(let j:number = 0; j<children.length; j++)
        {
            let dataCom = children[j].getComponent(DataRenderer);
            dataCom.data = null
        }
        this.cacheVirtualPosData();
        this.validateItemsStatus();
    }

    public refresh():void
    {
        this.cacheVirtualPosData();
        this.validateItemsStatus();
    }

    public scrollToItem(index:number):void
    {
        //HORIZONTAL布局
        if(this.type == Type.HORIZONTAL)
        {
            //0点坐标（列表容器content的最左侧起点x坐标）
            let zeroPoint:number = 0 - this.content.width * this.content.anchorX;

            //列表容器content当前在其父容器（即控制可视区域的mask节点）的最左侧x坐标
            // let ctnStartPoint:number = this.content.x - (this.content.width * this.content.anchorX);

            //列表容器content的父容器的0点坐标
            let ctnStartPoint:number = this.maskView.width * this.maskView.anchorX;

            let posItem:PosData = this.itemsPosData[index];

            // let tartgetX:number = ctnStartPoint + ((posItem.x - posItem.width * posItem.anchorX) - zeroPoint);//获得item在可视区域的最右侧x坐标
            let tartgetX:number = ctnStartPoint + ((posItem.x - posItem.width * posItem.anchorX) - zeroPoint);//获得item在可视区域的最右侧x坐标
            if(ctnStartPoint == 0)
            {
                tartgetX = ctnStartPoint - ((posItem.x - posItem.width * posItem.anchorX) - zeroPoint);//获得item在可视区域的最右侧x坐标
            }
            this.content.x = tartgetX;
            this.validateItemsStatus();
        }
        //VERTICAL布局
        else if(this.type == Type.VERTICAL)
        {
            //0点坐标（列表容器content的最顶端侧起点y坐标）
            let zeroPoint:number = this.content.height * (1-this.content.anchorY);
            let maxY:number = this.content.height * this.content.anchorY - this.maskView.height;

            //列表容器content在其父容器（即控制可视区域的mask节点）的最顶端侧y坐标
            let ctnStartPoint:number = this.content.y + (this.content.height * (1-this.content.anchorY));
            
            let posItem:PosData = this.itemsPosData[index];
            // let tartgetY:number = ctnStartPoint - (zeroPoint - (posItem.y - posItem.height * posItem.anchorY));//获得item在可视区域的最底端侧y坐标
            let tartgetY:number = (zeroPoint * this.content.anchorY - (posItem.y + posItem.height * (1-posItem.anchorY) * ((this.content.anchorY - 1) || 1)));//获得item在可视区域的最顶端侧y坐标
            // this.content.y = tartgetY;
            if(tartgetY < zeroPoint)
            {
                this.content.y = zeroPoint;
            }else if(tartgetY > maxY)
            {
                this.content.y = maxY;
            }else
            {
                this.content.y = tartgetY;
            }
            this.validateItemsStatus();
        }
    }
}
