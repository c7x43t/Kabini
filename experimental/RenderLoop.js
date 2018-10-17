function IterableWeakSet(){
	let UNDEFINED;
	this._WeakMap_=new WeakMap();
	this.set=function(object){
		const key=this._WeakMap_.get(object);
		if(key===UNDEFINED){
			this._WeakMap_.set(object,this.objects.length);
			this.objects.push(object);
		}
		return this;
	}
	this.delete=function(object){
		const key=this._WeakMap_.get(object);
		if(key!==UNDEFINED){
			delete this.objects[key];
			this._WeakMap_.delete(object);
			return true;
		}
		return false;
	}
	this.has=function(object){
		return this._WeakMap_.has(object);
	}
	this.objects=[];
	this[Symbol.iterator]=function* specialIterator(){
		const keys=Object.keys(this.objects);
		for(let i=0;i<keys.length;i++){
			yield this.objects[keys[i]]
		}
	}
	this.map=function(){
		
	}
	this.forEach=function(){
		
	}
	this.reduce=function(){
		
	}
	
}

// no duplicate function per render frame -> IterableWeakMap
// 2 or more calls result in f beeing also called in the next frame
function RenderLoop(){
	let renderLoop=[];
	let renderLoopNextFrame=[];
	let set=new WeakSet();
	let setNextFrame=new WeakSet();
	let temp;
	function renderLoopWorker() {
	   // execution of queued functions
	   for(let f,i=renderLoop.length;i>=0;i--){
			f=renderLoop.shift();
			if(f instanceof Function) f();
	   }
	   // no other way to reset a WeakMap, one of them gets recreated and gc
	   if(setNextFrame.length===0){
		   set=new WeakSet();
	   }else{
			// swap loops and reset next
			set=setNextFrame;
			setNextFrame=new WeakSet();
			// swap loops
			temp=renderLoop;
			renderLoop=renderLoopNextFrame;
			renderLoopNextFrame=temp;
		   
	   }
	   // -
	   requestAnimationFrame(renderLoopWorker);
	}
	function addFunctionToLoop(f){
		if(!set.has(f)){
			set.add(f);
			renderLoop.push(f);
		}else{
			if(!setNextFrame.has(f)){
				setNextFrame.add(f);
				renderLoopNextFrame.push(f);
			}
		}
	};
	// initialization
	renderLoop.add=addFunctionToLoop;
	renderLoopNextFrame.add=addFunctionToLoop;
	renderLoopWorker();
	this.add=function(f){
		renderLoop.add(f)
	}
}
