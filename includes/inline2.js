function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

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

// Hero Slider
$(document).ready(function() {
  var currSlide = 0;
  var $slider = $('.slider');
  var $slides = $slider.children('.slide');
  var nextSlide = function(){
    //console.log('nextSlide', $slides.length, currSlide);
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

  var slideCallback = function(){
    var c = $slides.index($slides.filter('.on'));
    currSlide = c > -1 ? c : currSlide;
    $slides.slice(1, currSlide + 3).removeClass('lazyload');
    console.log('currSlide', currSlide);
  }
  bindNext(0);
  $slides.viewportChecker({
    scrollHorizontal: true,
    classToAdd: '',
    classToAddForFullView: 'on',
    repeat: true,
    offset: 0,
    scrollBox: $slider[0],
    callbackFunction: debounce(slideCallback, 100)
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

// Tours Slider
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
      scrollBox: ele,
      callbackFunction($elem, action){
        // console.log($elem, action);
      }
    });
  })
});


// Team Slider
$(document).ready(function() {
  var $slider = $('.team-slider');
  var $slides = $slider.children('.team-slide');
  var currSlide = 0;
  var timer = null;
  var nextSlide = function(){
    //console.log('nextSlide', $slides.length, currSlide, $slides.length -1);
    // setCurrentSlide()
    if (currSlide < $slides.length -1) {
      $slider[0].scrollBy({left: $slides.eq(2).width(), behavior: 'smooth'})
      currSlide += 1;
      bindNext();
    }
    else {
      $slider[0].scrollTo({left: 0, behavior: 'smooth'});
      currSlide = 0;
      bindNext();
    }
    console.log('currSlide', currSlide);
  }
  var bindNext = function(){
    // console.log('bindNext')
    timer = setTimeout(nextSlide, 3000);
  }
  // var setCurrentSlide = function(){
  //   currSlide = $slides.index($slides.filter('.active'));
  //   // console.log('currSlide', currSlide);
  // }

  $slider.on('touchstart', function(){
    clearTimeout(timer);
  });

  $slider.on('wheel', function(e){
    if(Math.abs(e.originalEvent.deltaX) > 10) {
      clearTimeout(timer);
      // console.log('scrolling sideways', Math.abs(e.originalEvent.deltaX));
    }
  });

  $slides.viewportChecker({
    scrollHorizontal: true,
    classToAdd: '',
    classToAddForFullView: 'active',
    repeat: true,
    offset: 10,
    scrollBox: $slider[0]
    // callbackFunction: throttle(setCurrentSlide, 100)
  });
  $slider.viewportChecker({
    classToAdd: 'launch',
    scrollBox: '#main',
    callbackFunction: bindNext
  });
});
