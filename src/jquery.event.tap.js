/**
 * jquery.touch.tap
 * tap
 * @version 1.0.0
 * @update 2020/12/09
 * https://github.com/aiv367/jquery.events
 */

//tap
(function($){

	$.tap = {
		offset: 5
	};
	
	$.fn.tap = function (data, fn) {
		return arguments.length > 0 ? $.on('tap', null, data, fn) : $.trigger('tap');
	}

	$.event.special['tap'] = {
		delegateType: 'touchstart',
		bindType: 'touchstart',

		handle: function (event) {

			let $this = $(this);
			let handleObj = event.handleObj;

			let startX = event.touches[0].pageX;
			let startY = event.touches[0].pageY;
			let isMove = false;

			let touchmove = evt => {
				let x = evt.touches[0].pageX;
				let y = evt.touches[0].pageY;

				if(Math.abs(x - startX) > $.tap.offset || Math.abs(y - startY) > $.tap.offset){
					isMove = true;
				}

			};

			let touchend = evt => {
				$this.off('touchmove', touchmove);
				if(!isMove){
					event.type = handleObj.origType;;
					handleObj.handler.apply( this, arguments );
				}
			};

			$this.on('touchmove', touchmove);
			$this.one('touchend', touchend);

		}
	};

})(window.jQuery);
