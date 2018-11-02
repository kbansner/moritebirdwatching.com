$(document).ready(function() {
  (function(){
    var timer, pause = false, delay = 7000;
    var slider = $('.slider')[0];
    var lastXPos = 0;
    var slideNext = function() {
      slider.scrollBy({
        left: slider.clientWidth, behavior: 'smooth'
      })
    }
    var scroller = function(){
      var outsideViewPort = $(slider).children('.on').length === 0;
      if (outsideViewPort) setPause()
      if (!pause) {
        slideNext();
      }
    }
    timer = setInterval(scroller, delay);

    var setPause = function(){
      pause = true;
    }
    var unsetPause = function(){
      pause = false;
      /* console.log('unsetPause') */
    }
    $(slider).on('touchstart', (e) => { lastXPos = slider.scrollLeft; })
    $(slider).on('touchend wheel', (e) => {
        //console.log('touchend or scroll', e.originalEvent )
        if (Math.abs(slider.scrollLeft - lastXPos) > 10) {
          //console.log('left', slider.scrollLeft, slider.scrollLeft - lastXPos)
          setPause();
        }
        lastXPos = slider.scrollLeft;
    });
    $('.slider').on('mouseenter', unsetPause)
  })();

  (function(){
    const slides = document.querySelectorAll('.slide');
    // Set CSS properties
    function setCssProperties(ele, x, s) {
      //console.log('props', x)
      ele.style.setProperty('--x-factor', x);
    }
    observer = new IntersectionObserver(entries => {
      var x = 0;
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          //console.log('in the view', entry);
          $(entry.target).addClass('on');
          x = parseInt(Math.random() * 30) + 'px';
          setCssProperties(entry.target, x);
          // preload backgrounds one ahead
          $(entry.target).next().removeClass('lazyload');
        } else {
          //console.log('out of view');
          $(entry.target).removeClass('on');
        }
      });
    });

    slides.forEach(image => {
      observer.observe(image);
    });
  })();

  // Tours section gallery arrows
  $('.tour .arrow-prev').on('click', function(e){
    var x = $(e.target).nextAll('.gallery').children('picture')[0].clientWidth + 20;
    $(this).siblings('.gallery')[0].scrollBy({ left: -1 * x, behavior: 'smooth' });
  });
  $('.tour .arrow-next').on('click', function(e){
    var x = $(e.target).nextAll('.gallery').children('picture')[0].clientWidth + 20;
    $(this).siblings('.gallery')[0].scrollBy({ left: x, behavior: 'smooth' });
  });
});

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
