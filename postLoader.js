/*
Add this function to main.js to allow 'infinite' loading of posts

Available attributes:
	data-attribute				Location
	====================================
	data-items *				Add this to the container of the items
	data-item *					Add this to all items which should be appended
	data-more *					Add this to the loadmore button, this button should be inside data-items
	data-html					Add this to the loadmore button and enter the html which should appear after a click on the button
	data-scroll					Add this to the loadmore button if the button should be triggered on scroll
	
	* = required
*/

var postLoader = (function($){
	var clicked = 0;

	function postInit(){
		$(document).on('click', '[data-more]', function(e){
			e.preventDefault();
			loadPosts($(e.target));
		});
	}

	function loadPosts(btn){
		var nextPage = btn.attr('href'),
			container = '[data-items]',
			containerItem = '[data-item]',
			containerButton = '[data-more]',
			btnHTML = (btn.data('html') != undefined) ? btn.data('html') : 'Loading...';

			btn.html(btnHTML);

		$.get(nextPage, function(data){ 
		  	$('<div />').append(data).find(containerItem).appendTo(container);
		  	$('<div />').append(data).find(containerButton).appendTo(container);
			btn.remove();
  		 	clicked = 0;
		});
	}

	function loadOnScroll(){
		if($('[data-scroll]').length > 0){
			var offTop = $('[data-more]').offset().top - (2*$(window).height()),
				triggerTop = $(window).scrollTop();
			if(triggerTop > offTop && clicked == 0){
				clicked = 1;
				$('[data-more]').trigger('click');
			}
		}
	}

	$(window).on('scroll', loadOnScroll);
	$(document).on('ready', postInit);
}(jQuery));