$(document).ready(function() {
  var currSlide = 0;
  var $slides = $('.slide');
  $slides.viewportChecker({
    scrollHorizontal: true,
    classToAdd: 'on',
    classToAddForFullView: '',
    repeat: true,
    scrollBox: '.slider',
    callbackFunction: function($elem, action){
      if (action==='add') {
        $elem.next().removeClass('lazyload')
          .next().removeClass('lazyload');
      // animationend auto advance
      } else {
        currSlide = $slides.index($slides.filter('.on'));
        console.log(currSlide);
      }
    }
  });
});
