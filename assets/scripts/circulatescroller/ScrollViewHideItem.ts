const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollViewHideItem extends cc.Component {

    // @property({ type: cc.Float, tooltip: "刷新间隔(数值越小,刷新次数越多,但消耗也越大)" })
    // private gap: number = 0;

    @property({ type: cc.Node, tooltip: "可视范围节点,一般带有CCMask组件" })
    public view: cc.Node = null;

    @property({ type: cc.Node, tooltip: "容器" })
    public content: cc.Node = null;

    private svBBoxRect: cc.Rect;
    private time: number = 0;

    onLoad() {
        if(!this.content){
            this.content = this.node.getComponent(cc.ScrollView).content;
        }
        if(!this.view){
            this.view = this.node.children[0];
        }
        // this.node.on("scrolling", this.onScrolling, this);
        this.content.on("size-changed", this.onScrolling, this);
        this.node.on("size-changed", this.updateSize, this);
        this.content.on("position-changed", this.onScrolling, this);
    }

    protected onDestroy(): void {
        this.content.off("size-changed", this.onScrolling, this);
        this.node.off("size-changed", this.updateSize, this);
        this.content.off("position-changed", this.onScrolling, this);
    }

    start(){
        
    }

    private updateSize(){  
        // 获取 view 左下角坐标在世界坐标系中的坐标
        if(this.node.getComponent(cc.Widget)){
            this.node.getComponent(cc.Widget).updateAlignment()
        } 
        let svLeftBottomPoint = this.view.convertToWorldSpaceAR(
            cc.v2(
                this.view.x - this.view.anchorX * this.view.width,
                this.view.y - this.view.anchorY * this.view.height
            )
        );

        // view 可视区域在世界坐标系中的矩形（碰撞盒）
        this.svBBoxRect = cc.rect(
            svLeftBottomPoint.x,
            svLeftBottomPoint.y,
            this.view.width,
            this.view.height
        );
        this.svBBoxRect.height = this.node.height;
        this.svBBoxRect.width = this.node.width;
    }

    public onScrolling() {
        ++this.time;
        this.deepSeek(this.content, this.time)
    }

    private deepSeek(node: cc.Node, time: number) {
        if (time != this.time) return;
        node.children.map((childNode: cc.Node) => {
            // 对每个子节点的包围盒做和 ScrollView 可视区域包围盒做碰撞判断
            // 如果相交了，那么就显示，否则就隐藏
            if (childNode.getBoundingBoxToWorld().intersects(this.svBBoxRect)) {
                if (childNode["oldOpacity"]) {
                    childNode.opacity = childNode["oldOpacity"];
                    childNode["oldOpacity"] = null;
                }
            } else {
                if (childNode.opacity != 0) {
                    childNode["oldOpacity"] = childNode.opacity;
                    childNode.opacity = 0;
                }
            }
            this.deepSeek(childNode, time);
        });
    }


}
