/**
 * jquery.touch.taphold
 * taphold
 * @version 1.0.0
 * @update 2020/12/09
 * https://github.com/aiv367/jquery.events
 */

//taphold
(function($){

	$.taphold = {
		holdTime: 400
	};
	
	$.fn.taphold = function (data, fn) {
		return arguments.length > 0 ? $.on('taphold', null, data, fn) : $.trigger('taphold');
	}

	let t;
	$.event.special['taphold'] = {

		delegateType: 'touchstart',
		bindType: 'touchstart',

		handle: function (event) {

			let $this = $(this);
			let handleObj = event.handleObj;

			let startX = event.touches[0].pageX;
			let startY = event.touches[0].pageY;

			let touchmove = evt => {
				let x = evt.touches[0].pageX;
				let y = evt.touches[0].pageY;

				if(Math.abs(x - startX) > $.tap.offset || Math.abs(y - startY) > $.tap.offset){
					clearTimeout(t);
				}

			};

			let touchend = evt => {
				clearTimeout(t);
				$this.off('touchmove', touchmove);
			};

			$this.on('touchmove', touchmove);
			$this.one('touchend', touchend);

			clearTimeout(t);
			t = setTimeout(()=>{
				event.type = handleObj.origType;;
				handleObj.handler.apply( this, arguments );
			}, $.taphold.holdTime)

		}
	};

})(window.jQuery);
