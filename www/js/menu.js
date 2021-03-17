jQuery(document).ready(function($){
  
	var $trigger = $('#trigger'),
		$content_wrapper = $('.main');

	//open-close lateral menu clicking on the menu icon
	$trigger.on('click', function(event){
		event.preventDefault();
		$content_wrapper.toggleClass('offcanvas_open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		$('#offcanvas').toggleClass('offcanvas_open');
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#trigger, #trigger i') ) {
			$content_wrapper.removeClass('offcanvas_open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			$('#offcanvas').removeClass('offcanvas_open');
		}
	});

var $search = $( '#search' ),
		$searchinput = $search.find('input.search-input'),
		$body = $('html,body'),
		openSearch = function() {
			$search.data('open',true).addClass('search-open');
			$searchinput.focus();
			return false;
		},
		closeSearch = function() {
			$search.data('open',false).removeClass('search-open');
		};

	$searchinput.on('click',function(e) { e.stopPropagation(); $search.data('open',true); });

	$search.on('click',function(e) {
		e.stopPropagation();
		if( !$search.data('open') ) {

			openSearch();

			$body.off( 'click' ).on( 'click', function(e) {
				closeSearch();
			} );

		}
		else {
			if( $searchinput.val() === '' ) {
				closeSearch();
				return false;
			}
		}
	});
});
