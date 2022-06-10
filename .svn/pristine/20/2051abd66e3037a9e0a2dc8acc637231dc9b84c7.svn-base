export default class FramingManager{
    
    public constructor() {

    }

    /**
     * 
     * @param data 
     * @param callback 
     * @param thisObj 
     */
    public static async updateRecordList(data:any[],callback:Function,thisObj:Object){

        await this.executePreFrame(this._getItemGenerator(data,callback,thisObj),1);

    }
    
    /**
     * 
     * @param generator 
     * @param duration 
     * @returns 
     */
    private static executePreFrame(generator: Generator, duration?: number) {
        duration = duration || 500/cc.game.getFrameRate();
		return new Promise<void>((resolve, reject) => {
			let gen = generator;
			// 创建执行函数
			let execute = () => {
				// 执行之前，先记录开始时间
				let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                while(true){

                    let iter = gen.next();
					if (iter == null || iter.done) {
						resolve();
						return;
					}

					// 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
					if (new Date().getTime() - startTime > duration) {
						// 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
						setTimeout(() => {
							execute();
						});
						return;
					}

                }
			};

			// 运行执行函数
			execute();
		});
    }
    /**
     * 
     * @param data 
     * @param callback 
     * @param thisObj 
     */
    private static *_getItemGenerator(data: any[],callback:Function,thisObj) {
        for(let k=0;k<data.length;k++){
            let itemdata = data[k];
            yield callback.apply(thisObj,[itemdata,k]); 
        }
    }
    

}

 