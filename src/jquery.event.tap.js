/**
 * jquery.events.tap
 * jquery.events.taphold
 * @version 1.0.0
 * @update 2020/12/09
 * https://github.com/aiv367/jquery.events
 */

//tap taphold
(function ($) {
	

	$.event.special.tap = {

		setup: function () {

			let that = this;
			let $this = $(that);
			let hasTouch = 'ontouchend' in document;
			let tapStart = false;

			$this.on('touchstart mousedown', evt => {


				if(tapStart){
					return;
				}

				tapStart = true;

				let startX = evt.type === 'mousedown' ? evt.pageX : evt.touches[0].pageX;
				let startY = evt.type === 'mousedown' ? evt.pageY : evt.touches[0].pageY;
				let isMove = false;
				let isHoldTap = false;
				let t;

				clearTimeout(t);
				t = setTimeout(() => {

					//taphold
					if(isMove){
						return false;
					}
					isHoldTap = true;
					evt.type = 'taphold';
					$.event.dispatch.call(that, evt);

				}, $.tap.tapHoldTime);

				function move(evt) {
					let moveX = evt.type === 'mousemove' ? evt.pageX : evt.touches[0].pageX;
					let moveY = evt.type === 'mousemove' ? evt.pageY : evt.touches[0].pageY;

					if (Math.abs(moveX - startX) > 5 || Math.abs(moveY - startY) > 5) {
						isMove = true;
					}
				}

				function end(evt) {

					if (!isMove && !isHoldTap) {

						//tap
						clearTimeout(t);
						evt.type = 'tap';
						$.event.dispatch.call(that, evt);

					}

					$this.off('touchmove mousemove', move);
					$this.off('touchend mouseup', end);

					setTimeout(() => {
						tapStart = false; 
					});

				}

				$this.on('touchmove mousemove', move);
				$this.on('touchend mouseup', end);

			});

		},

		teardown: function () {
			$(this).off('touchstart mousedown');
		}

	};

	$.event.special.taphold = {
		setup: function () {
			$(this).on('tap', $.noop);
		},
		teardown: function () {
			$(this).off('tap');
		}
	};

	$.tap = {
		tapHoldTime: 400
	};

	$.fn.tap = function (data, fn) {
		let $this = $(this);
		return arguments.length > 0 ? $this.on('tap', null, data, fn) : $this.trigger('tap');
	}

	$.fn.taphold = function (data, fn) {
		let $this = $(this);
		return arguments.length > 0 ? $this.on('taphold', null, data, fn) : $this.trigger('taphold');
	}

})(window.jQuery);
