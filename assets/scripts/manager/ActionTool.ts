/**
 * 通用动作工具
 * 模板:
 *      ActionTool.ins.setMove(0.5,cc.v2(0,0));
 */
export default class ActionTool {
    public constructor() {
        
    }
    /**单例 */
    private static _instance: ActionTool;
    public static get ins(): ActionTool {
        if (!this._instance) {
            this._instance = new ActionTool();
        }
        return this._instance;
    }

    private checkParam(_action, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _delay?: Array<number>): any {
        if (!_action) return

        if (_delay && _delay[0]) {
            _action = cc.tween().delay(_delay[0]).then(_action);
        }
        if (_delay && _delay[1]) {
            _action = _action.delay(_delay[1]);
        }

        if (_callobj && _callobj.call) {
            _action.call(() => {
                if (_callobj.target) {
                    _callobj.call.apply(_callobj.target, [_callobj.data]);
                } else {
                    _callobj.call();
                }
            });
        }
        if (_repeat || _repeat === 0) {
            if (_repeat === 0) {
                _action = cc.tween().then(_action).repeatForever();
            } else {
                _action = cc.tween().then(_action).repeat(_repeat);
            }
        }
        return _action;
    }

    /**
     * 获取一个move动作
     * @param _time 时间
     * @param _pos 移动位置
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public getMove(_time: number, _pos: cc.Vec2, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        let t;
        if (!_isby) {
            t = cc.tween().to(_time, { position: _pos });
        } else {
            t = cc.tween().by(_time, { position: _pos });
        }
        _tag != null && t.tag(_tag);
        return this.checkParam(t, _callobj, _repeat, _delay);
    }

    /**
     * 执行move动作
     * @param _time 时间
     * @param _pos 移动位置
     * @param _targe node
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public doMove(_time: number, _pos: cc.Vec2, _targe: cc.Node, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        if (!_targe || !cc.isValid(_targe)) return
        return cc.tween(_targe).then(this.getMove(_time, _pos, _isby, _delay, _callobj, _repeat, _tag)).start();
    }

    /**
     * 获取一个scale动作
     * @param _time 时间
     * @param _x x轴变化
     * @param _y y轴变化
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public getScale(_time: number, _x: number, _y: number, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        let t;
        if (!_isby) {
            t = cc.tween().to(_time, { scaleX: _x, scaleY: _y });
        } else {
            t = cc.tween().by(_time, { scaleX: _x, scaleY: _y });
        }
        _tag != null && t.tag(_tag);
        return this.checkParam(t, _callobj, _repeat);
    }

    /**
     * 执行scale动作
     * @param _time 时间
     * @param _targe node
     * @param _x x轴变化
     * @param _y y轴变化
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public doScale(_time: number, _targe: cc.Node, _x?: number, _y?: number, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        if (!_targe || !cc.isValid(_targe)) return
        _x = _x != null ? _x : _targe.scaleX;
        _y = _y != null ? _y : _targe.scaleY;
        return cc.tween(_targe).then(this.getScale(_time, _x, _y, _isby, _delay, _callobj, _repeat, _tag)).start();
    }


    /**
     * 获取一个旋转动作
     * @param _time 时间
     * @param _angle 角度
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public getRotate(_time: number, _angle: number, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        let t;
        if (!_isby) {
            t = cc.tween().to(_time, { angle: _angle });
        } else {
            t = cc.tween().by(_time, { angle: _angle });
        }
        t.tag(_tag);
        return this.checkParam(t, _callobj, _repeat, _delay);
    }

    /**
     * 执行一个旋转动作
     * @param _time 时间
     * @param _angle 角度
     * @param _targe node
     * @param _isby 是否是相对位置
     * @param _delay 延迟时间，数组格式传入 需要延迟的位置[动作前,动作后(回调前)]
     * @param _callobj 回调
     * @param _repeat 重复次数，0：无限循环
     * @param _tag 标签
     * @returns any
     */
    public doRotate(_time: number, _angle: number, _targe: cc.Node, _isby?: boolean, _delay?: Array<number>, _callobj?: {
        call?: Function,
        target?: any,
        data?: any
    }, _repeat?: number, _tag?: number): any {
        if (!_targe || !cc.isValid(_targe)) return
        return cc.tween(_targe).then(this.getRotate(_time, _angle, _isby, _delay, _callobj, _repeat,_tag)).start();
    }

    //添加一个移除自身的动作
    public removeSelf(_act:any){
        return _act.removeSelf();
    }
    
    /**
     * 执行序列动作
     * @param _acts 动作
     * @param target node
     */
    public doSequence(target: cc.Node, _act: any, ..._acts: any[]) {
        let tempact = _act;
        if (_acts && _acts.length > 0) {
            for (let i = 0; i < _acts.length; i++) {
                const element = _acts[i];
                tempact = cc.tween().sequence(tempact, element);
            }
        }
        cc.tween(target).then(tempact).start();
    }

    /**
     * 执行并行动作
     * @param _act 动作
     * @param _acts 新增动作
     * @param _target node
     */
    public doParallel(_target: cc.Node, _act: any, ..._acts: any[]) {
        let tempact = _act;
        if (_acts && _acts.length > 0) {
            for (let i = 0; i < _acts.length; i++) {
                const element = _acts[i];
                tempact = cc.tween().parallel(tempact, element);
            }
        }

        return cc.tween(_target).then(tempact).start();
    }

    /**
     * 执行动作
     * @param _act 
     * @param _target 
     */
    public runAction(_act,_target:cc.Node){
        cc.tween(_target).then(_act).start();
    }

    //根据传入参数停止指定动作
    public stopAction(_act: any) {
        _act.stop();
    }

    //停止所有指定标签的tween
    public stopAllByTag(_tag: number) {
        cc.Tween.stopAllByTag(_tag);
    }

    //停止所有指定对象的tween
    public stopAllByTarget(_target) {
        cc.Tween.stopAllByTarget(_target);
    }

    //设置tweenTag
    public setTag(_act: any, _tag: number) {
        for (let i = 0; i < _act._actions.length; i++) {
            const element = _act._actions[i];
            element.tag = _tag;
        }
        _act.tag(_tag);
    }

    //根据index设置tweentag
    public setTagByindex(_act: any, _tag: number,_index:number){
        if(_act._actions[_index]){
            _act._actions[_index].tag = _tag;
        }
    }

    //克隆tween
    public clone(_act: any) {
        return _act.clone();
    }
}