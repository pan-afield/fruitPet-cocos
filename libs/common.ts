/**
 * 对象工具
 */
namespace err {
    /**
    * @language en_US
    * The Base64Util class provides methods for encoding and decoding base64.
    * @version Egret 2.4
    * @platform Web,Native
    * @includeExample egret/utils/Base64Util.ts
    */
    /**
     * @language zh_CN
     * Base64Util 类提供用于编解码base64的方法。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/Base64Util.ts
     */
    export class Base64Util {
        /**
         * @language en_US
         * encode base64.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 编码base64。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static encode(arraybuffer: ArrayBuffer): string {
            let bytes = new Uint8Array(arraybuffer);
            let len = bytes.length;
            let base64 = '';

            for (let i = 0; i < len; i += 3) {
                base64 += chars[bytes[i] >> 2];
                base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                base64 += chars[bytes[i + 2] & 63];
            }

            if ((len % 3) === 2) {
                base64 = base64.substring(0, base64.length - 1) + '=';
            } else if (len % 3 === 1) {
                base64 = base64.substring(0, base64.length - 2) + '==';
            }

            return base64;
        }
        /**
         * @language en_US
         * decode base64.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 解码base64。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static decode(base64: string): ArrayBuffer {
            let bufferLength = base64.length * 0.75;
            let len = base64.length;
            let p = 0;
            let encoded1 = 0;
            let encoded2 = 0;
            let encoded3 = 0;
            let encoded4 = 0;

            if (base64[base64.length - 1] === '=') {
                bufferLength--;
                if (base64[base64.length - 2] === '=') {
                    bufferLength--;
                }
            }

            let arraybuffer = new ArrayBuffer(bufferLength),
                bytes = new Uint8Array(arraybuffer);

            for (let i = 0; i < len; i += 4) {
                encoded1 = lookup[base64.charCodeAt(i)];
                encoded2 = lookup[base64.charCodeAt(i + 1)];
                encoded3 = lookup[base64.charCodeAt(i + 2)];
                encoded4 = lookup[base64.charCodeAt(i + 3)];

                bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
            }

            return arraybuffer;
        }
    }
}
window.err = err;

/**
 * @private
 */
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
/**
 * @private
 */
let lookup = new Uint8Array(256);

for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

/**
 * 计算公式
 */
namespace FormulaUtil {

    /**
	 * 计算旋转角度
	 * @param posStart 起点坐标
	 * @param posEnd 终点坐标
	 * @returns 角度制值
	 */
    export function getAngleToTarget(posStart: { x: number, y: number }, posEnd: { x: number, y: number }): number {
        let positionX_start: number = posStart.x;
        let positionY_start: number = posStart.y;

        let positionX_end: number = posEnd.x;
        let positionY_end: number = posEnd.y;

        return FormulaUtil.convertRadToAngle(Math.atan2(positionY_end - positionY_start, positionX_end - positionX_start));
    }

    /**
	 * 将弧度制角度值转换成角度制角度值
	 * @param angle 通常角度（角度制）
	 */
    export function convertRadToAngle(rad: number): number {
        return 180 * rad / Math.PI;
    }

    /**
	 * 将角度制角度值 转换成 弧度制角度值
	 * @param angle 通常角度（角度制）
	 */
    export function convertAngleToRad(angle: number): number {
        return Math.PI * angle / 180;
    }

	/**
	 * 获取某个区间内的随机整数
	 * @param min 最小值
	 * @param max 最大值
	 * The maximum is inclusive and the minimum is inclusive
	 */
    export function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	/**
	 * 深入随机数
	 * @param min
	 * @param max
	 */
    export function deepRandom(min: number, max: number): number {
        FormulaUtil.random(0, 100);
        FormulaUtil.random(0, 100);
        FormulaUtil.random(0, 100);
        FormulaUtil.random(0, 100);

        return FormulaUtil.random(min, max);
    }

    export function random(min: number, max: number): number {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return FormulaUtil.toInt(min + Math.random() * (max - min));
    }

    export function toInt(obj, def?): number {
        try {
            if (FormulaUtil.isNumber(obj)) {
                return parseInt(obj);
            }
            return def ? def : 0;
        }
        catch (ex) {
            return def ? def : 0;
        }
    }

    export function isNumber(obj): boolean {
        return obj && !isNaN(obj);
    }

    export function intToIp(num: number): string {
        var str;
        var tt = new Array();
        tt[0] = (num >>> 24) >>> 0;
        tt[1] = ((num << 8) >>> 24) >>> 0;
        tt[2] = (num << 16) >>> 24;
        tt[3] = (num << 24) >>> 24;
        str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
        return str;
    }

	/**
	 * 字符转为16进制
	 * @param value
	 */
    export function stringToHex(value: string): string {
        var val = "";
        for (var i = 0; i < value.length; i++) {
            if (value == "") {
                val = value.charCodeAt(i).toString(16);
            } else {
                val += value.charCodeAt(i).toString(16);
            }
        }
        return val;
    }

	/**
	 * 转换数字为带单位万、亿的字符串
	 * @param num
	 */
    export function transformUnitNum(num: number): string {
        if (isNaN(num)) {
            return null;
        }
        let abs_num: number = Math.abs(num);
        if (abs_num >= 100000000) {
            return Math.floor(num / 1000000) / 100 + "亿";
        } else if (abs_num >= 10000) {
            return Math.floor(num / 100) / 100 + "万";
        }
        return num + "";
    }

	/**
	 * 计算平面直角坐标系中任意两点间的距离
	 * @param posStart 起点坐标
	 * @param posEnd 终点坐标
	 */
    export function getDistanceOf(x1: number, y1: number, x2: number, y2: number): number {
        let disX: number = x2 - x1;
        let disY: number = y2 - y1;
        return Math.sqrt(disX * disX + disY * disY);
    }

	/**
	 * 将数值除以某数之后返回指定位数的小数
	 * @param value
	 * @param divide 被除数
	 * @param decimal 小数位数
	 */
    export function getFixedNumber(value: number, divide: number = 1, decimal: number = 0): number {
        return (Math.floor((value / divide) * Math.pow(10, decimal)) / Math.pow(10, decimal));
    }

	/**
	 * 计算起点到目标点间夹角（即精灵旋转的朝向,转头的角度）
	 * @param po1
	 * @param po2
	 */
    export function calAngle(po1: { x: number, y: number }, po2: { x: number, y: number }): number {
        let dx: number = po2.x - po1.x;
        let dy: number = po2.y - po1.y;
        let ro: number = FormulaUtil.convertRadToAngle(Math.atan(dx / dy));
        return ro;
    }

}
window.FormulaUtil = FormulaUtil;

/**
 * 时间工具
 */
namespace TimeUtil {
	/**
     * 获取当前时间的距离1970.1.1.08:00时间的秒数
     */
    export function getTimeSec(): number {
        let date: Date = new Date();
        return Math.floor(date.getTime() / 1000);
    }

    /***
     * 获得当前服务器时间
     */
    export function getServerTime(): number {
        let date: Date = new Date();
        return date.getTime();
    }

    /**
     * 判断时间戳
     * @param startTime {year=2019, month=10, day=7, hour=23,min=59,sec=59}
     * @param endTime {year=2019, month=10, day=7, hour=23,min=59,sec=59}
     */
    export function getTimeContrast(startTime: any, endTime: any): boolean {
        let nowDate: Date = new Date();
        let nowTime = nowDate.getTime();

        nowDate.setFullYear(startTime.year);
        nowDate.setMonth(startTime.month);
        nowDate.setDate(startTime.day);
        nowDate.setHours(startTime.hour);
        nowDate.setMinutes(startTime.min);
        nowDate.setSeconds(startTime.sec);

        let startTime_Milliseconds = nowDate.getTime();

        nowDate.setFullYear(endTime.year);
        nowDate.setMonth(endTime.month);
        nowDate.setDate(endTime.day);
        nowDate.setHours(endTime.hour);
        nowDate.setMinutes(endTime.min);
        nowDate.setSeconds(endTime.sec);

        let endTime_Milliseconds = nowDate.getTime();

        if (nowTime >= startTime_Milliseconds && nowTime <= endTime_Milliseconds) {
            return true;
        }
        return false;
    }

    /**
     * 根据年月获取该月的最大天数
     */
    export function getDayByYearMonth(year: number, month: number): number {
        return (new Date(year, month, 0)).getDate();
    }

    /**
     * 根据当前年
     */
    export function getYear(): number {
        return (new Date()).getFullYear();
    }

    /**
     * 根据当前月
     */
    export function getMonth(): number {
        return ((new Date()).getMonth() + 1);
    }

    /**
     * 格式化时间
     * @param date Date的实例
     * @param timeFormat 格式, 如："yyyy-MM-dd hh:mm:ss"
     */
    export function formatTime(date?: Date, timeFormat: string = "yyyy-MM-dd hh:mm:ss"): string {
        if (!date) {
            date = new Date();
        }
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(timeFormat))
            timeFormat = timeFormat.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(timeFormat))
                timeFormat = timeFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return timeFormat;
    }

    /**
     * 计算传入时间与当前时间的间隔
     * @para time --- 传入时间，以时间戳形式传入
     */
    export function calTimeSpace(time: number) {
        time = Number(time);
        let nowTime = TimeUtil.getTimeSec()
        let temp = nowTime - time / 1000;
        let date = new Date(time);
        let msg: string = "";
        if (temp < 60 * 60) {
            msg = TimeUtil.formatTime(date, "hh:mm");
        }
        else if (temp < 24 * 60 * 60) {
            msg = Math.floor(temp / (60 * 60)) + "小时前";
        }
        else if (temp < 30 * 24 * 60 * 60) {
            msg = Math.floor(temp / (24 * 60 * 60)) + "天前";
        }
        else if (temp < 12 * 30 * 24 * 60 * 60) {
            msg = Math.floor(temp / (30 * 24 * 60 * 60)) + "月前";
        }
        else {
            msg = Math.floor(temp / (12 * 30 * 24 * 60 * 60)) + "年前";
        }
        return msg;
    }

    /**
     * 计算两时间之差
     * @para time --- 传入时间，以时间戳形式传入
     */
    export function differTiem(time: number,_time:number) {
        time = Number(time);
        let nowTime = _time;
        let temp = nowTime - time / 1000;
        let diffday: number = 0;
        console.log("temptemptemptemp",temp);
        if (temp < 60 * 60) {
            return false;
        }
        else if (temp < 24 * 60 * 60) {
            return false;
        }
        else if (temp < 30 * 24 * 60 * 60) {
            diffday = Math.floor(temp / (24 * 60 * 60));
            return diffday;
        }
        else if (temp < 12 * 30 * 24 * 60 * 60) {
            return false;
        }
        else {
            return false;
        }
        
    }

	/**
     * 转化为需要显示的时间字符串
     * @param time 秒
     * @param str
     */
    export function timeStr(time: number, str?: string): string {
        let t1: number = 86400;
        let t2: number = 3600;
        let t3: number = 60;
        let s_str: string = str || "";
        if (time >= t1) {
            s_str = s_str + Math.floor(time / t1) + "天";
            time = time % t1;
        } else if (time >= t2) {
            s_str = s_str + Math.floor(time / t2) + "小时";
            time = time % t2;
            if (s_str.indexOf("天")) {
                return s_str;
            }
        } else if (time >= t3) {
            s_str = s_str + Math.floor(time / t3) + "分";
            time = time % t3;
            if (s_str.indexOf("小时")) {
                return s_str;
            }
        } else {
            if (time > 0 || s_str == "") {
                s_str = s_str + time + "秒";
            }
            return s_str;
        }
        return TimeUtil.timeStr(time, s_str);
    }
}
window.TimeUtil = TimeUtil;

/**
 * 字符串工具
 */
namespace StringUtil {
	/**
	 * 字符串 转 字节数组
	 * @param str
	 */
    export function stringToByte(str): number[] {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }

	/**
	 * 字节数组 转 字符串
	 * @param arr
	 */
    export function byteToString(arr): string {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '',
            _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }

    /**
	 * 转换数字为带单位万、亿的字符串
	 * @param num
	 */
    export function transformUnitNum(value: number): string {
        let param = StringUtil.numberFormat(value);
        return param.value + param.unit;
    }

    /**
     * 清楚当前站点下的所有cookie
     * @param name
     */
    export function numberFormat(value:number) {
        var param:any = {};
        var k = 10000,
            sizes = ['', '万', '亿', '万亿'],
            i;
            if(value < k){
                param.value =value
                param.unit=''
            }else{
                i = Math.floor(Math.log(value) / Math.log(k)); 
                param.value = Math.floor(((value / Math.pow(k, i))) * 100) / 100;
                param.unit = sizes[i];
            }
        return param;
    }
}
window.StringUtil = StringUtil;

/**
 * 脚本工具
 */
namespace ScriptUtil {
	/**
     * 向document写入一个新的<script>标签
     * @param src
     */
    export function writeAScriptTag(src: string, noCache: boolean, callBack?: Function, callBackObj?: any): void {
        var s = document.createElement('script');
        s.async = true;

        if (noCache && typeof src === 'string') {
            if (new RegExp(/\?/).test(src)) {
                src += '&_t=' + (new Date() as any - 0);
            } else {
                src += '?_t=' + (new Date() as any - 0);
            }
        } 
        s.src = src;
        s.addEventListener('load', function (e) { 
            if (s.parentNode) {
                s.parentNode.removeChild(s);
            }
            if (callBack) {
                if (callBackObj) {
                    callBack.apply(callBackObj);
                } else {
                    callBack();
                }
            }
        }, false);
        document.body.appendChild(s);
    }

    /**
     * 获取cookie
     * @param name
     */
    export function getCookie(name: string): string {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }

    /**
     * 设置cookie
     * @param name coockie名
     * @param value coockie值
     * @param expTime 有效期，单位 - 秒， 比如 120 秒
     */
    export function setCookie(name: string, value: string, expTime?: number) {
        let exp: Date = new Date();
        exp.setTime(exp.getTime() + expTime * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
    }

    /**
     * 删除cookie
     * @param name
     */
    export function deleteCookie(name: string) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = ScriptUtil.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        }
    }

    /**
     * 清楚当前站点下的所有cookie
     * @param name
     */
    export function clearDomainCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
            }
        }
    }
}
window.ScriptUtil = ScriptUtil;

/**
 * 对象工具
 */
namespace ObjectUtil {
	/**
     * 复制对象的值
     * @param sobj 源对象
     * @param tobj 目标对象
     */
    export function oto(sobj: any, tobj: any): void {
        if (!sobj) {
            tobj = sobj;
            return;
        }
        let temObj: any;
        for (var key in sobj) {
            if (sobj[key] instanceof Array) {
                tobj[key] = ObjectUtil.copyArray(sobj[key]);
            } else if (sobj[key] && (typeof (sobj[key]) == "object")) {
                temObj = new Object();
                tobj[key] = temObj;
                ObjectUtil.oto(sobj[key], temObj);
            } else {
                tobj[key] = sobj[key];
            }
        }
    }

    /**
     *
     */
    export function copyArray(sArray: any[]): any[] {
        if (!sArray) {
            return sArray;
        }
        let newArray: any[] = [];
        let newItem: any;
        for (let i: number = 0; i < sArray.length; i++) {
            if (!sArray[i]) {
                newArray.push(sArray[i]);
                continue;
            }
            newItem = new Object();
            newArray.push(newItem);
            ObjectUtil.oto(sArray[i], newItem);
        }
        return newArray;
    }
}

window.ObjectUtil = ObjectUtil;