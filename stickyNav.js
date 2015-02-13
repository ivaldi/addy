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
  var nav, navoffset, navHeight, inContent, stickyContainer, stickyContainerLeft, stickyContainerRight;

  function init(){
    nav = $('[data-sticky-nav]'),
    inContent = (nav.attr('data-in-content') == '' || nav.attr('data-in-content') == undefined) ? false : nav.attr('data-in-content'),
    stickyContainer = $('[data-sticky-container]'),
    stickyContainerLeft = stickyContainer.offset().left,
    stickyContainerRight = $(window).width() - stickyContainerLeft - stickyContainer.outerWidth();

    if(nav.length > 0){
      navoffset = [];
      navHeight = [];
      nav.each(function(){
        navoffset.push($(this).offset().top),
        navHeight.push($(this).outerHeight());
      });
    }
  }

  function scroller(){
    if(nav.length > 0 && nav != undefined){
      nav.each(function(index){
        if($(window).scrollTop() > navoffset[index]){
          if(!$(this).hasClass('sticky')){
            $(this).before('<div data-sticky-clone="'+index+'" style="height:'+navHeight[index]+'px"></div>');
            $(this).addClass('sticky');
            if(inContent){
              $(this).css({
                'left' : stickyContainerLeft,
                'right' : stickyContainerRight,
                'position' : 'fixed',
                'top' : 0
              });
            }else{
              $(this).css({
                'left' : 0,
                'right' : 0,
                'position' : 'fixed',
                'top' : 0
              });
            }
          }
        }else{
          $(this).removeClass('sticky');
          $('[data-sticky-clone="'+index+'"]').remove();
          if(inContent){
            $(this).removeAttr('style');
          }
        }
      });
    }
  }

  $(window).on('scroll', scroller);
  $(window).on('load', init);

}(jQuery));