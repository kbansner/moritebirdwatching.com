//initial fade in
$(document).ready(function() {
  $('#main').addClass('is-js');
  setTimeout(function(){
    $('.slider')
      .addClass('loaded');
  }, 1200);
});

// smooth scrolling hashtags
// Select all links with hashes
$(document).ready(function() {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        event.preventDefault();
        $('#main')[0].scroll({top: target.offset().top, left: 0, behavior: 'smooth'})
        target.focus();
      }
    });
});


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
  $slider.viewportChecker({
    scrollHorizontal: false,
    classToAdd: 'auto-show',
    classToAddForFullView: '',
    repeat: true,
    scrollBox: '#main',
    callbackFunction: function($elem, action){
      if (action==='remove') {
        bindNext(currSlide);
      }
    }
  });
});

$(document).ready(function() {
  var $sliders = $('.gallery');
  $.each($sliders, function(i, ele){
    var currSlide = 0;
    var $slides = $(ele);
    $slides.children('img').viewportChecker({
      scrollHorizontal: true,
      classToAdd: '',
      classToAddForFullView: 'on',
      repeat: true,
      scrollBox: ele
      // callbackFunction: function($elem, action){
      //   currSlide = $slides.index($slides.filter('.on'));
      // }
    });
    // var nextSlide = function(){
    //   console.log('nextSlide', $slides.length, currSlide);
    //   if (currSlide < $slides.length -1) {
    //     $slides[0].scrollBy({left: $slides.width(), behavior: 'smooth'})
    //     bindNext(currSlide + 1);
    //   }
    //   else {
    //     $slides[0].scrollTo({left: 0, behavior: 'smooth'});
    //   }
    // }
    // var bindNext = function(i){
    //   $slides.eq(i).find('img').one('animationend', nextSlide);
    // }
    // bindNext(0);
  })
});
