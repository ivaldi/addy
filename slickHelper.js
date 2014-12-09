/*
Add this function to main.js to activate slick sliders with the help of data-attributes

Available attributes:
	data-attribute				default
	===================================
	data-slick *				(empty data-attribute to activate slick)
	data-autoplay				false
	data-autoplayspeed			3000
	data-dots					false
	data-draggable				true			
	data-arrows					true
	data-infinite				true
	data-slide 					div
	data-sliestoshow 			1
	data-slidestoscroll 		1
	data-speed 					300
	data-vertical 				false

	* = required
*/

var slickHelper = (function($){
	function slickInit(){
		$('[data-slick]').each(function(){
		
			var slickSlider = $(this),
				slick_autoplay = (slickSlider.attr('data-autoplay') == '') ? false : slickSlider.data('autoplay'),
				slick_autoplaySpeed = (slickSlider.attr('data-autoplayspeed') == '') ? 3000 : slickSlider.data('autoplayspeed'),
				slick_dots = (slickSlider.attr('data-dots') == '') ? false : slickSlider.data('dots'),
				slick_draggable = (slickSlider.attr('data-draggable') == '') ? true : slickSlider.data('draggable'),
				slick_arrows = (slickSlider.attr('data-arrows') == '') ? true : slickSlider.data('arrows'),
				slick_infinite = (slickSlider.attr('data-infinite') == '') ? true : slickSlider.data('infinite'),
				slick_slide = (slickSlider.attr('data-slide') == '') ? 'div' : slickSlider.data('slide'),
				slick_slidesToShow = (slickSlider.attr('data-slidestoshow') == '') ? 1 : slickSlider.data('slidestoshow'),
				slick_slidesToScroll = (slickSlider.attr('data-slidestoscroll') == '') ? 1 : slickSlider.data('slidestoscroll'),
				slick_speed = (slickSlider.attr('data-speed') == '') ? 300 : slickSlider.data('speed'),
				slick_vertical = (slickSlider.attr('data-vertical') == '') ? false : slickSlider.data('vertical');

			slickSlider.slick({
				autoplay: slick_autoplay,
				autoplaySpeed: slick_autoplaySpeed,
				dots: slick_dots,
				draggable: slick_draggable,
				arrows: slick_arrows,
				infinite: slick_infinite,
				slide: slick_slide,
				slidesToShow: slick_slidesToShow,
				slidesToScroll: slick_slidesToScroll,
				speed: slick_speed,
				vertical: slick_vertical
			});
		});
	}

	$(document).on('ready', slickInit);
}(jQuery));