/*
Add this function to main.js to activate a 100% width sticky bar somewhere on the page

Available attributes:
  data-attribute        default
  ===================================
  data-sticky-nav *         (empty data-attribute to activate)
  data-in-content           false
  data-sticky-container


  * = required
*/

var stickyNav = (function($){
  var nav, navoffset, navHeight, inContent, stickyContainer, stickyContainerLeft, stickyContainerRight,
  save;

  function init(){
    nav = $('[data-sticky-nav]'),
    inContent = (nav.attr('data-in-content') == '' || nav.attr('data-in-content') == undefined) ? false : nav.attr('data-in-content'),
    stickyContainer = $('[data-sticky-container]'),
    stickyContainerLeft = stickyContainer.offset().left,
    stickyContainerRight = $(window).width() - stickyContainerLeft - stickyContainer.outerWidth();

    if(nav.length > 0){
      navoffset = nav.offset().top,
      navHeight = nav.outerHeight();
    }
  }

  function scroller(){
    if(nav.length > 0 && nav != undefined){
      if($(window).scrollTop() > navoffset){
        if(!nav.hasClass('sticky')){
          nav.before('<div data-sticky-clone style="height:'+navHeight+'px"></div>');
          nav.addClass('sticky');
          if(inContent){
            nav.css({
              'left' : stickyContainerLeft,
              'right' : stickyContainerRight,
              'position' : 'fixed',
              'top' : 0
            });
          }else{
            nav.css({
              'left' : 0,
              'right' : 0,
              'position' : 'fixed',
              'top' : 0
            });
          }
        }
      }else{
        nav.removeClass('sticky');
        $('[data-sticky-clone]').remove();
        if(inContent){
          nav.removeAttr('style');
        }
      }
    }
  }

  $(window).on('scroll', scroller);
  $(window).on('load', init);

}(jQuery));