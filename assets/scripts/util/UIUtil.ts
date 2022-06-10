import GameConst from "../constant/GameConst";
// import SceneManager from "../manager/SceneManager";

/**
 * UI工具
 */
export default class UIUtil {

    public constructor() {
    }

    /**
     * 将 锚点为(0,0)的坐标 转换为 锚点为(0.5, 0.5)的坐标
     * @param worldPos
     * @param parent
     */
    public static converToRealNodePos<T extends cc.Vec2 | cc.Vec3>(worldPos: T, parent?: cc.Node): T {
        let width: number;
        let height: number;
        if (parent) {
            let size: cc.Size = parent.getContentSize();
            width = size.width;
            height = size.height;
        } else {
            width = GameConst.stageSize.width;
            height = GameConst.stageSize.height;
        }
        if (worldPos instanceof cc.Vec2) {
            return cc.v2(worldPos.x - width / 2, worldPos.y - height / 2) as any;
        }
        else {
            return cc.v3(worldPos.x - width / 2, worldPos.y - height / 2) as any;
        }
        // return cc.v3(worldPos.x - width / 2, worldPos.y - height / 2);
    }

    /**
     * 适配屏幕
     */
    public static adapteScreen(node?: cc.Node): void {
        let newSize: cc.Size = cc.view.getVisibleSize();
        let canvasCom: cc.Canvas;
        if (node) {
            canvasCom = node.getComponent(cc.Canvas);
        }

        if (!canvasCom) {
            canvasCom = cc.Canvas.instance;
        }

        //设计尺寸比值 高度/宽度
        let designRatio: number = GameConst.designSize.height / GameConst.designSize.width;
        //当前尺寸比值 高度/宽度
        let currentRatio: number = newSize.height / newSize.width;

        // canvasCom.designResolution = cc.size(newSize);
        if (currentRatio < designRatio) {
            canvasCom.fitHeight = true;
            canvasCom.fitWidth = false;
        } else {
            canvasCom.fitHeight = false;
            canvasCom.fitWidth = true;
        }
        // canvasCom["alignWithScreen"]();
        newSize = cc.view.getVisibleSize();

        // SceneManager.ins.stageSize = newSize;
    }

    /**
     * 重新排序子节点顺序，并将制定节点放置到最上层
     * @param uiNode
     * @param parent
     */
    public static sortChilrenZindex(parent: cc.Node, uiNode: cc.Node): void {
        if (!parent || !uiNode) {
            return
        }
        //重排顺序
        let children: cc.Node[] = parent.children;
        let count: number = 1;
        for (let i: number = 0; i < children.length; i++) {
            if (children[i] == uiNode) {
                continue;
            }
            children[i].zIndex = count;
            count++;
        }
        uiNode.zIndex = count + 1;
    }

    public static addUrlPara = function (url, name, value) {
        if (/\?/g.test(url)) {
            if (/name=[-\w]{4,25}/g.test(url)) {
                url = url.replace(/name=[-\w]{4,25}/g, name + "=" + encodeURIComponent(value));
            } else {
                url += "&" + name + "=" + encodeURIComponent(value);
            }
        }
        url += "?" + name + "=" + encodeURIComponent(value);
        return url
    };

    public static getPageRawUrl = function () {
        try {
            return 'http://' + location.host + location.pathname + location.search;
        } catch (error) {
            return '';
        }
    };

    public static toStone = function (num, fixed: number = 2, type?) {
        if (typeof fixed != 'number')
            fixed = 2;
        var str = num;
        if (Math.abs(num) >= 10000000000 && type) {
            str = Math.floor((num / 10000000000)) + '百亿';
            return str;
        }
        if (Math.abs(num) >= 100000000) {
            if (num % 100000000 * Math.pow(10, fixed) == 0)
                fixed = 0;
            if (fixed == 0)
                str = Math.floor((num / 100000000)) + '亿';
            else
                str = (num / 100000000).toFixed(fixed) + '亿';
        } else if (Math.abs(num) >= 10000) {
            if (num % 10000 * Math.pow(10, fixed) == 0)
                fixed = 0;
            if (fixed == 0)
                str = Math.floor((num / 10000)) + '万';
            else
                str = (num / 10000).toFixed(fixed) + '万';
        }
        return str;
    };

    /**
     * 格式化玩家名字
     * @param _nick 名字
     * @param nums 第几位开始切割
     * @param replacetxt 切割字符
     * @returns 
     */
    public static formatNick(_nick: string, nums: number, replacetxt?: string): string {
        if (!_nick) {
            return "";
        }
        if (!replacetxt) {
            replacetxt = "...";
        }
        let nick = "";
        if (_nick.length > nums) {
            nick = _nick.substring(0, nums) + replacetxt;
        } else {
            nick = _nick;
        }
        return nick
    }

    // public static getQueryString(name: any, defval: any) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //     var r, idx = location.search.indexOf('/');
    //     if (idx == -1) {
    //         r = location.search.substr(1).match(reg);
    //     } else {
    //         r = location.search.substring(1, idx).match(reg);
    //     }
    //     if (r != null)
    //         return unescape(r[2]);
    //     if (typeof defval != 'undefined') {
    //         return defval;
    //     } else {
    //         return null;
    //     }
    // }



    /**
     * 加载头像
     * @param img 
     */
    public static loadHead(img: string, node: cc.Sprite) {
        (function (_goodsImg, _imgpath) {
            cc.loader.load({
                url: _imgpath,
                type: "png"
            }, function (err, texture) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!cc.isValid(self)) {
                    return;
                }
                if (_imgpath != img) {
                    return;
                }
                _goodsImg.spriteFrame = new cc.SpriteFrame(texture);
            });
        })(node, img);
    }

    /**
     * 格式时间
     */
    public static formatTim(timeStamp: number, formatStr: string) {
        timeStamp = timeStamp < 0 ? 0 : timeStamp;
        let date = new Date(timeStamp),
            fStr = "";
        switch (formatStr) {
            case "时:分":
                fStr = date.getUTCHours() + "时" + date.getUTCMinutes() + "分"
                break;
            case "时:分:秒":
                fStr = date.getUTCHours() + "时" + date.getUTCMinutes() + "分" + date.getUTCSeconds() + "秒";
                break;
            case "h:min:s":
                fStr = date.getUTCHours() + "h" + date.getUTCMinutes() + "min" + date.getUTCSeconds() + "s";
                break;
            case "hh:mm:ss":
                fStr = this.makeuptime(date.getUTCHours()) + ":" + this.makeuptime(date.getUTCMinutes()) + ":" + this.makeuptime(date.getUTCSeconds());
                break;
            case "hh:mm":
                fStr = date.getUTCHours() + ":" + date.getUTCMinutes();
                break;
            case "mm:ss":
                fStr = date.getUTCMinutes() + ":" + date.getUTCSeconds();
                break;
            case "ss":
                fStr = date.getUTCSeconds() + "";
                break;
            case "mm":
                fStr = date.getUTCMinutes() + "";
                break;
            case "hh":
                fStr = date.getUTCHours() + "";
                break;
            case "dd":
                fStr = date.getUTCDate() + "";
                break;
            case "天:时:分:秒":
                fStr = date.getUTCDate() + "天" + date.getUTCHours() + "小时" + date.getUTCMinutes() + "分" + date.getUTCSeconds() + "秒";
            case "天:时":
                fStr = date.getUTCDate() + "天" + date.getUTCHours() + "小时";
            default:
                break;
        }
        return fStr;
    }

    //补齐0
    private static makeuptime(nums: number) {
        let str: string;
        if (nums < 10) {
            str = "0" + nums;
            return str
        }
        return nums
    }

    public static chinaFont(_number: number): string {
        let cstr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        let cnIntRadice = ["", "十", "百", "千"];
        let integerNum = _number.toString();
        let chineseStr = ""
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cstr[0];
                }
                //归零
                zeroCount = 0;

                chineseStr += cstr[parseInt(n)] + cnIntRadice[m];
            }
        }
        if (_number >= 10 && _number < 20) {
            chineseStr = chineseStr.replace("一", "");
        }
        return chineseStr;
    }

    public static getUserLxt() {
        var result = UIUtil.getQueryString('lxt');
        if (!result) {
            var cookie = this.getCookie('lexun.com');
            var regex = new RegExp('(lxt)=([^&]*)');
            if (regex.test(cookie)) {
                result = decodeURIComponent(regex.exec(cookie)[2]);
            }
        }
        return result;
    }

    /**
    * 获取地址栏参数
    */
    public static getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    /**
    * 获得cookie
    */
    public static getCookie(key) {
        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    public static dateFormat(time, format?) {
        time = parseInt(time, 10)
        if (isNaN(time)) {
            return 'Invalid Date'
        }
        format = format || 'YYYY-MM-DD HH:mm:ss'
        if (String(time).length < 13) {
            time = String(time) + '000'
        }
        time = time.length > 13 ? parseInt(time.substr(0, 13), 10) : parseInt(time, 10)
        const DateObj = new Date(time)
        const year = DateObj.getFullYear()
        const month = DateObj.getMonth() + 1
        const day = DateObj.getDate()
        const hour = DateObj.getHours()
        const minutes = DateObj.getMinutes()
        const seconds = DateObj.getSeconds()
        const date = format.replace('YYYY', year).replace('MM', this.makeuptime(month)).replace('DD', this.makeuptime(day)).replace('HH', this.makeuptime(hour)).replace('mm', this.makeuptime(minutes)).replace('ss', this.makeuptime(seconds))
        return date
    }
}