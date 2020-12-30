/**
 * jquery.event.operate
 * jQuery event 全局事件扩展 (panstart, panmove, panend)
 * @version 1.0.0
 * @update 2019/05/23
 * https://github.com/aiv367/jquery.event.operate
 */
(function($){

	$.event.special.panstart = {

		setup: function(){
	
			let $this = $(this);
			let $root = $(document);
			let whichNames = ['touch', 'mouseLeft', 'mouseMiddle', 'mouseRight'];
	
			$this.on('touchstart mousedown', function(startEvt){
	
				startEvt.preventDefault();

				let thisOffset = $this.offset(); //获取匹配元素相对视口的偏移
				let thisPosition = $this.position(); //获取匹配元素相对父元素的偏移
	
				let pointEvt = startEvt;
				if(startEvt.type === 'touchstart'){
					pointEvt = startEvt.touches[0];
				}

				let whichName = whichNames[startEvt.which];
	
				let startData = {
	
					whichName,
					pageX: pointEvt.pageX, //对于整个页面来说，包括了被卷去的body部分的长度
					pageY: pointEvt.pageY,
					clientX: pointEvt.clientX, //点击位置距离当前body可视区域的x，y坐标
					clientY: pointEvt.clientY,
					screenX: pointEvt.screenX, //点击位置距离当前电脑屏幕的x，y坐标
					screenY: pointEvt.screenY,
					offsetX: whichName === 'touch' ? pointEvt.pageX - thisOffset.left : pointEvt.offsetX, //相对于带有定位的父盒子的x，y坐标
					offsetY: whichName === 'touch' ? pointEvt.pageY - thisOffset.top : pointEvt.offsetY,

					targetPageX: thisOffset.left, //当前dom的位置信息
					targetPageY: thisOffset.top,
					targetOffsetX: thisPosition.left,
					targetOffsetY: thisPosition.top,
	
				}
	
				startEvt.type = 'panstart';
				$this.trigger($.Event(startEvt, {
					eventData: {
						start: startData
					}
				}), startData);
	
				let moveIng = moveEvt => {
	
					let pointEvt = moveEvt;
					if(moveEvt.type === 'touchmove'){
						pointEvt = moveEvt.touches[0];
					}
		
					let thisOffset = $this.offset(); //距离页面的距离
					let thisPosition = $this.position(); //获取匹配元素相对父元素的偏移
		
					//交互点数据
					let moveData = {
						whichName,
						pageX: pointEvt.pageX, //对于整个页面来说，包括了被卷去的body部分的长度
						pageY: pointEvt.pageY,
						clientX: pointEvt.clientX, //点击位置距离当前body可视区域的x，y坐标
						clientY: pointEvt.clientY,
						screenX: pointEvt.screenX, //点击位置距离当前电脑屏幕的x，y坐标
						screenY: pointEvt.screenY,
						offsetX: whichName === 'touch' ? pointEvt.pageX - thisOffset.left : pointEvt.offsetX, //相对于带有定位的父盒子的x，y坐标
						offsetY: whichName === 'touch' ? pointEvt.pageY - thisOffset.top : pointEvt.offsetY,
						moveX: pointEvt.pageX - startData.pageX,
						moveY: pointEvt.pageY - startData.pageY,
						targetPageX: thisOffset.left, //当前 dom 的位置信息
						targetPageY: thisOffset.top,
						targetOffsetX: thisPosition.left,
						targetOffsetY: thisPosition.top,

					};
		
					//触发自定义事件
					moveEvt.type = 'panmove';
					$this.trigger($.Event(moveEvt, {
						eventData: {
							start: startData,
							move: moveData
						}
					}), moveData);
		
				};
	
				let moveEnd = function(endEvt){
	
					let pointEvt = endEvt;
					if(endEvt.type === 'touchend'){
						pointEvt = endEvt.changedTouches[0];
					}
		
					let thisOffset = $this.offset(); //距离页面的距离
					let thisPosition = $this.position(); //获取匹配元素相对父元素的偏移
		
					//交互点数据
					let endData = {
						whichName,
						pageX: pointEvt.pageX, //对于整个页面来说，包括了被卷去的body部分的长度
						pageY: pointEvt.pageY,
						clientX: pointEvt.clientX, //点击位置距离当前body可视区域的x，y坐标
						clientY: pointEvt.clientY,
						screenX: pointEvt.screenX, //点击位置距离当前电脑屏幕的x，y坐标
						screenY: pointEvt.screenY,
						offsetX: whichName === 'touch' ? pointEvt.pageX - thisOffset.left : pointEvt.offsetX, //相对于带有定位的父盒子的x，y坐标
						offsetY: whichName === 'touch' ? pointEvt.pageY - thisOffset.top : pointEvt.offsetY,
						moveX: pointEvt.pageX - startData.pageX,
						moveY: pointEvt.pageY - startData.pageY,
						targetPageX: thisOffset.left, //当前 dom 的位置信息
						targetPageY: thisOffset.top,
						targetOffsetX: thisPosition.left,
						targetOffsetY: thisPosition.top,
	
					};
		
					//触发自定义事件
					endEvt.type = 'panend';
					$this.trigger($.Event(endEvt, {
						eventData: {
							start: startData,
							end: endData
						}
					}), endData);
	
					$root.off('touchmove mousemove', moveIng);
					$root.off('touchend mouseup', moveEnd);
	
				};
	
				$root.on('touchmove mousemove', moveIng);
				$root.on('touchend mouseup', moveEnd);
	
			});
		}
	
	}

	$.event.special.panmove = {
		setup: function(){
			$(this).on('panstart', $.noop);
		}
	}

	$.event.special.panend = {
		setup: function(){
			$(this).on('panstart', $.noop);
		}
	}

	$.event.special.pan = {
		setup: function(){

		}
	}

	//drag extend demo
	$.fn.drag = function(fn){
	
		let $this = $(this);
	
		$this.on('panmove', (evt, data)=>{
			
			let evtData = {
				
				moveX: data.moveX,
				moveY: data.moveY,
				targetStartPageX: data.startPoint.targetPageX,
				targetStartPageY: data.startPoint.targetPageY,
				targetStartOffsetX: data.startPoint.targetOffsetX,
				targetStartOffsetY: data.startPoint.targetOffsetY,
			};
	
			if(fn){
				fn(evtData);
			}else{

				$this.css({
					left: evtData.targetStartOffsetX + evtData.moveX,
					top: evtData.targetStartOffsetY + evtData.moveY
				});
			}
	
		});
	}

	
})(window.jQuery);
