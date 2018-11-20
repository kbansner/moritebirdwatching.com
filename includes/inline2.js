$(document).ready(function() {
  var currSlide = 0;
  var $slider = $('.slider');
  var $slides = $slider.children('.slide');
  var nextSlide = function(){
    console.log('nextSlide', $slides.length, currSlide);
    if (currSlide < $slides.length -1) {
      $slider[0].scrollBy({left: $slider.width(), behavior: 'smooth'})
      bindNext(currSlide + 1);
    }
    else {
      $slider[0].scrollTo({left: 0, behavior: 'smooth'});
    }
  }
  var bindNext = function(i){
    $slides.eq(i).find('.slide-background').one('animationend', nextSlide);
  }
  bindNext(0);
  $slides.viewportChecker({
    scrollHorizontal: true,
    classToAdd: 'on',
    classToAddForFullView: '',
    repeat: true,
    scrollBox: $slider[0],
    callbackFunction: function($elem, action){
      if (action==='add') {
        $elem.next().removeClass('lazyload')
          .next().removeClass('lazyload');
      } else {
        currSlide = $slides.index($slides.filter('.on'));
      }
    }
  });
});
