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
    if (currSlide < $slides.length -1) {
      $slider[0].scrollBy({left: $slides.eq(1).width(), behavior: 'smooth'})
      bindNext(currSlide + 1);
    }
    else {
      $slider[0].scrollTo({left: 0, behavior: 'smooth'});
      bindNext(0);
    }
  }
  var bindNext = function(){
    timer = setTimeout(nextSlide, 2000);
    // $slides.eq(i).find('figure').one('animationend', function(){alert('foo')});
  }
  var moveToSlide = function(elem){
    clearTimeout(timer);
    var newSlide = $slides.index(elem.currentTarget)
    var move = (newSlide - currSlide) * $slides.eq(1).width()
    $slider[0].scrollBy({left: move, behavior: 'smooth'})
  }
  var setCurrentSlide = function(){
    console.log('currSlide', currSlide);
    currSlide = $slides.index($slides.filter('.active:first'));
  }

  $slider.on('touchstart', function(){
    clearTimeout(timer);
  });

  $slider.on('wheel', function(e){
    if(Math.abs(e.originalEvent.deltaX) > 20) {
      clearTimeout(timer);
      console.log('scrolling sideways', Math.abs(e.originalEvent.deltaX));
    }
  });

  $slider.on('click', '.team-slide', moveToSlide)

  $slides.viewportChecker({
    scrollHorizontal: true,
    classToAdd: '',
    classToAddForFullView: 'active',
    repeat: true,
    scrollBox: $slider[0],
    // callbackFunction: function($elem, action){
    //   if (action==='add') {
    //     console.log('add')
    //     _.throttle(setCurrentSlide, 10);
    //   } else {
    //     console.log('remove')
    //   }
    // }
    callbackFunction: throttle(setCurrentSlide, 500)
  });
  $slider.viewportChecker({
    classToAdd: 'launch',
    repeat: true,
    scrollBox: '#main',
    callbackFunction: function($elem, action){
      if (action==='add') {
        console.log('launch');
      } else {
        console.log('!!!!!!!!remove');
      }
    }
  });
  setTimeout(function(){
    console.log('start')
    bindNext(0);
  },2000)

});
