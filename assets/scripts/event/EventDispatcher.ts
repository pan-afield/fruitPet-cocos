/**
 * 事件派发器
 */
export default class EventDispatcher {

	private static _instance:EventDispatcher;

	private _eventDict:{[id:string]:any};
    private _events:number = 0;

	public constructor() {
		this.init();
	}

	public static get ins():EventDispatcher
	{
		if(this._instance == null)
		{
			this._instance = new EventDispatcher();
		}
		return this._instance;
	}

	private init():void
    {
        this._eventDict = {};
    }
    
    public static dispatch(type: string,...params):void
    {
        this.ins.dispatchEvent(type,params);
    }
    public static addListener(type: string,listener: Function,thisObject: any): void
    { 
        this.ins.addEventListener(type,listener,thisObject);
    }
    public static removeListener(type: string,listener: Function,thisObject: any): void
    {
        this.ins.removeEventListener(type,listener,thisObject);
    }
    
    protected dispatchEvent(type: string,params?:Array<any>):void
    {
        var list = this._eventDict[type];
        if(!list) 
        {
            return;
        }
        var length = list.length;
        if(length == 0) 
        {
            return;
        }
        this._events += 1;
        for(var i = 0; i < length; i++) {
            var eventObj = list[i];
            eventObj.listener.apply(eventObj.thisObject,params);
        }
        this._events -= 1;        
    }
    public addEventListener(type: string,listener: Function,thisObject: any):void
    {
        var list:Array<any> = this._eventDict[type];
        if(!list) 
        {
            list = this._eventDict[type] = [];
        }
        else if (this._events != 0)
        {
            this._eventDict[type] = list = list.concat();
        }
        var length:number = list.length;
        var obj;
        for(var i = 0; i < length; i++) 
        {
            obj = list[i];
            if(obj.listener == listener && obj.thisObject == thisObject) {
                return;
            }
        }
        obj = { type: type,listener: listener,thisObject: thisObject };
        list.push(obj);
    }
    public removeEventListener(type: string,listener: Function,thisObject: any): void
    {
        var list: Array<any> = this._eventDict[type];
        if(!list) 
        {
            return;
        }
        if(this._events != 0) 
        {
            this._eventDict[type] = list = list.concat();
        }
        var length = list.length;
        for(var i = 0; i < length; i++) {
            var obj = list[i];
            if(obj.listener == listener && obj.thisObject == thisObject) {
                list.splice(i,1);
                return;
            }
        }
    }

    /**
     * 移除所有监听事件
     */
    public removeAllEvents():void
    {
        this._eventDict = {};
    }
}