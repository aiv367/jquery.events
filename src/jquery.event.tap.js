/**
 * jquery.events.tap
 * jquery.events.taphold
 * @version 1.0.0
 * @update 2020/12/09
 * https://github.com/aiv367/jquery.events
 */

//tap taphold
(function ($) {

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

	$.event.special['tap'] = {

		setup: function () {

			let that = this;
			let $this = $(that);

			$this.on('touchstart', evt => {

				let startX = evt.touches[0].pageX;
				let startY = evt.touches[0].pageY;
				let isMove = false;
				let isHoldTap = false;
				let t;

				clearTimeout(t);
				t = setTimeout(() => {

					//taphold
					isHoldTap = true;
					evt.type = 'taphold';
					$.event.dispatch.call(that, evt);

				}, $.tap.tapHoldTime);

				function move(evt) {
					if (Math.abs(evt.touches[0].pageX - startX) > 5 || Math.abs(evt.touches[0].pageY - startY) > 5) {
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

					$this.off('touchmove', move);
					$this.off('touchend', end);
				}

				$this.on('touchmove', move);
				$this.on('touchend', end);

			});

		},

		teardown: function () {
			$(this).off('touchstart');
		}

	};

	$.event.special['taphold'] = {
		setup: function () {
			$(this).on('tap', $.noop);
		},
		teardown: function () {
			$(this).off('tap');
		}
	}

})(window.jQuery);
