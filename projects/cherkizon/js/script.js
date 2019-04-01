'use strict';

(function () {
  var map = document.querySelector('.map');
  var maps = document.querySelectorAll('.about-map');
  var cards = document.querySelectorAll('.map-card');
  var mapPin = document.querySelector('.map-pin');
  var mapPinReverted = mapPin.querySelector('use');
  var mapPinClose = document.querySelectorAll('map-pin__button');
  var mapDescription = document.querySelector('.map__description');
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var parts;

  var mapCardHandler = function (evt) {
    parts.forEach(function (elem, i) {

      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }

      if (evt.target === elem || elem === document.activeElement) {

        mapPin.classList.add('map-pin--shown');

        cards.forEach(function (element) {
          if (element.classList.contains('map-card--shown')) {
            element.classList.remove('map-card--shown');
            element.removeAttribute('style');
            element.classList.add('map-card--hidden');
          }
        });

        var rect = elem.getBoundingClientRect();
        cards[i].classList.add('map-card--shown');
        cards[i].classList.remove('map-card--hidden');
        elem.classList.add('active');
        if (screenWidth < 767) {
          cards[i].style.right = '20px';
        }

        if (screenWidth > 768) {
          cards[i].style.left = rect.left - (cards[i].offsetWidth / 3) + 'px';
        }

        cards[i].style.top = rect.top - map.getBoundingClientRect().top - cards[i].getBoundingClientRect().height - 50 + 'px';

        mapPin.classList.add('map-pin--shown');
        mapPin.style.left = rect.left + mapPin.getBoundingClientRect().width / 4 + 'px';
        mapPin.style.top = rect.top - map.getBoundingClientRect().top - 75 + 'px';

        if (screenWidth > 768 && cards[i].getBoundingClientRect().left < mapDescription.getBoundingClientRect().right && cards[i].getBoundingClientRect().top < mapDescription.getBoundingClientRect().bottom || cards[i].getBoundingClientRect().top < map.getBoundingClientRect().top) {
          cards[i].style.top = rect.top - map.getBoundingClientRect().top + cards[i].getBoundingClientRect().height / 2 - 45 + 'px';
          mapPin.style.top = rect.top - map.getBoundingClientRect().top + 75 + 'px';
          mapPin.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg-sprite/sprite.svg#map-pin-reverted');
        } else {
          mapPin.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg-sprite/sprite.svg#map-pin');
        }
      }
    });
  };

  function initMap() {

    mapPin.classList.remove('map-pin--shown');
    mapPin.removeAttribute('style');

    cards.forEach(function (element) {
      if (element.classList.contains('map-card--shown')) {
        element.classList.remove('map-card--shown');
        element.removeAttribute('style');
        element.classList.add('map-card--hidden');
      }
    });

    maps.forEach(function (elem) {
      if (elem.getBoundingClientRect().width > 0) {
        elem.addEventListener('mouseover', mapCardHandler);
        elem.addEventListener('mouseout', initMap);
        parts = elem.querySelectorAll('.map-part');
      }
    });
  }

  mapPinClose.forEach(function (el, k) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      cards[k].classList.remove('map-card--shown');
      cards[k].removeAttribute('style');
      cards[k].classList.add('map-card--hidden');
    });
  });

  initMap();

  window.addEventListener('resize', function () {
    initMap();
  });

})();

'use strict';

(function () {
  if (window.innerWidth > 767) {
    var controller = new ScrollMagic.Controller();
    var animatedBlocks = document.querySelectorAll('.animated-block');

    for (var i = 0; i < animatedBlocks.length; i++) {
      new ScrollMagic.Scene({
          triggerElement: animatedBlocks[i],
          triggerHook: 0.8
        })
        .setClassToggle(animatedBlocks[i], 'show')
        .reverse(false)
        .addTo(controller);
    }
  }
})();

'use strict';

$.scrollLock = (function scrollLockClosure() {


  var $html = $('html');
  // State: unlocked by default
  var locked = false;
  // State: scroll to revert to
  var prevScroll = {
    scrollLeft: $(window).scrollLeft(),
    scrollTop: $(window).scrollTop()
  };
  // State: styles to revert to
  var prevStyles = {};
  var lockStyles = {
    'overflow-y': 'scroll',
    'position': 'fixed',
    'width': '100%'
  };

  // Instantiate cache in case someone tries to unlock before locking
  saveStyles();

  // Save context's inline styles in cache
  function saveStyles() {
    var styleAttr = $html.attr('style');
    var styleStrs = [];
    var styleHash = {};

    if (!styleAttr) {
      return;
    }

    styleStrs = styleAttr.split(/;\s/);

    $.each(styleStrs, function serializeStyleProp(styleString) {
      if (!styleString) {
        return;
      }

      var keyValue = styleString.split(/\s:\s/);

      if (keyValue.length < 2) {
        return;
      }

      styleHash[keyValue[0]] = keyValue[1];
    });

    $.extend(prevStyles, styleHash);
  }

  function lock() {
    var appliedLock = {};

    // Duplicate execution will break DOM statefulness
    if (locked) {
      return;
    }

    // Save scroll state...
    prevScroll = {
      scrollLeft: $(window).scrollLeft(),
      scrollTop: $(window).scrollTop()
    };

    // ...and styles
    saveStyles();

    // Compose our applied CSS
    $.extend(appliedLock, lockStyles, {
      // And apply scroll state as styles
      'left': -prevScroll.scrollLeft + 'px',
      'top': -prevScroll.scrollTop + 'px'
    });

    // Then lock styles...
    $html.css(appliedLock);

    // ...and scroll state
    $(window)
      .scrollLeft(0)
      .scrollTop(0);

    locked = true;
  }

  function unlock() {
    // Duplicate execution will break DOM statefulness
    if (!locked) {
      return;
    }

    // Revert styles
    $html.attr('style', $('<x>').css(prevStyles).attr('style') || '');

    // Revert scroll values
    $(window)
      .scrollLeft(prevScroll.scrollLeft)
      .scrollTop(prevScroll.scrollTop);

    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } else { // Otherwise, toggle
      if (locked) {
        unlock();
      } else {
        lock();
      }
    }
  };
}());
jquery.scrollLock.simple.js
$.scrollLock = (function scrollLockSimple() {
  var locked = false;
  var $body;
  var previous;

  function lock() {
    if (!$body) {
      $body = $('body');
    }

    previous = $body.css('overflow');

    $body.css('overflow', 'hidden');

    locked = true;
  }

  function unlock() {
    $body.css('overflow', previous);

    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } else { // Otherwise, toggle
      if (locked) {
        unlock();
      } else {
        lock();
      }
    }
  };
}());

'use strict';

(function () {
  var brandButton = document.querySelectorAll('.brand__button');
  var brandLogo = document.querySelectorAll('.brand__logo');
  var brandDescription = document.querySelectorAll('.brand__description');

  var brandButtonHandler = function (button, logo, description) {
    button.forEach(function (elem, i) {
      elem.addEventListener('click', function () {
        if (elem.textContent === 'Подробнее') {
          elem.textContent = 'Закрыть';
          elem.classList.remove('brand__button--open');

          logo[i].classList.remove('brand__logo--fade-in');
          logo[i].classList.add('brand__logo--hidden');

          setTimeout(function () {
            logo[i].style.display = "none";
            description[i].classList.remove('brand__description--hidden');
            description[i].classList.add('brand__description--shown');
          }, 500);

        } else if (elem.textContent === 'Закрыть') {
          elem.textContent = 'Подробнее';
          elem.classList.add('brand__button--open');
          description[i].classList.add('brand__description--fade-out');

          setTimeout(function () {
            description[i].classList.remove('brand__description--shown');
            description[i].classList.add('brand__description--hidden');
            description[i].classList.remove('brand__description--fade-out');
            logo[i].removeAttribute("style");
            logo[i].classList.remove('brand__logo--hidden');
            logo[i].classList.add('brand__logo--fade-in');
          }, 500);
        }
      });
    });
  };
  brandButtonHandler(brandButton, brandLogo, brandDescription);
})();


(function () {

  var mySwiper = undefined;

  function initSwiper() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var items = document.querySelectorAll('.brands-wrapper');
    var slideWrappers = document.querySelectorAll('.brands__container');
    var slides = document.querySelectorAll('.brand');

    if (screenWidth < 1023 && mySwiper === undefined) {

      items.forEach(function (elem) {
        elem.classList.add('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.add('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.add('swiper-slide');
      });

      mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 10,
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 767px
          767: {
            spaceBetween: 10,
            slidesOffsetBefore: 30,
            width: 260,
          },
          // when window width is <= 480px
          1023: {
            spaceBetween: 20,
            slidesOffsetBefore: 60,
            width: 540,
          },
        },
      });
    } else if (screenWidth > 1023 && mySwiper !== undefined) {

      document.querySelectorAll('.swiper-container').forEach(function (elem) {
        elem.swiper.destroy();
      });

      mySwiper = undefined;

      document.querySelectorAll('.swiper-wrapper').forEach(function (elem) {
        elem.removeAttribute('style');
      });
      document.querySelectorAll('.swiper-slide').forEach(function (elem) {
        elem.removeAttribute('style');
      });

      items.forEach(function (elem) {
        elem.classList.remove('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.remove('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.remove('swiper-slide');
      });
    }
  }

  initSwiper();

  window.addEventListener('resize', function () {
    initSwiper();
  });
})();

'use strict';

(function () {

  var mySwiper = undefined;

  function initSwiper() {
    var screenWidth = $(window).width();
    var items = document.querySelectorAll('.career-people__slider');
    var slideWrappers = document.querySelectorAll('.career-people__wrapper');
    var slides = document.querySelectorAll('.career-people__item');

    if (screenWidth < 1023 && mySwiper == undefined) {

      items.forEach(function (elem) {
        elem.classList.add('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.add('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.add('swiper-slide');
      });

      mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        // spaceBetween: 8,
        // slidesOffsetBefore: 30,
        // width: 260,
      });
    } else if (screenWidth > 1023 && mySwiper != undefined) {

      $('.swiper-container').each(function () {
        this.swiper.destroy();
      });

      mySwiper = undefined;

      items.forEach(function (elem) {
        elem.classList.remove('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.remove('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.remove('swiper-slide');
      });

      jQuery('.swiper-wrapper').removeAttr('style');
      jQuery('.swiper-slide').removeAttr('style');
    }
  }

  //Swiper plugin initialization

  initSwiper();

  //Swiper plugin initialization on window resize

  $(window).on('resize', function () {
    initSwiper();
  });

  if (window.innerWidth > 767) {
    document.querySelector('.career-join__title').textContent = 'Как присоединиться к нашей команде';
  }
})();

'use strict';

(function () {

  var directorsList = document.querySelector('.directors__list');
  var directors = directorsList.querySelectorAll('.directors__item');

  var closeAllAccordeons = function () {
    directors.forEach(function (item) {
      item.classList.remove('directors__item--opened');
      item.style.marginBottom = 'initial';
    });
  };

  var resizeAccordeons = function () {
    directors.forEach(function (item) {
      var accordeon = item.querySelector('.directors__accordeon');
      accordeon.style.left = -item.offsetLeft + 'px';
      accordeon.style.width = directorsList.offsetWidth + 'px';
    });
  };

  resizeAccordeons();

  window.onresize = resizeAccordeons;

  directors.forEach(function (item) {
    var avatar = item.querySelector('.directors__avatar');
    avatar.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeAllAccordeons();
      item.classList.add('directors__item--opened');
      var accordeon = item.querySelector('.directors__accordeon');
      item.style.marginBottom = accordeon.clientHeight + 'px';
      var closeButton = item.querySelector('.directors__close');
      closeButton.addEventListener('click', function () {
        closeAllAccordeons();
      });
    });
  });

})();

'use strict';

(function () {
  var redPin = document.querySelector('.red-dot');
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var dots = document.querySelectorAll('.timeline-dot');
  var dates = document.querySelectorAll('.timeline-date');
  var cards = document.querySelectorAll('.timeline__cards');
  var arrow = document.querySelector('.timeline__arrow');
  var bar = document.querySelector('.bar-wrapper');

  var draggable = new PlainDraggable(redPin);

  PlainDraggable.draggableCursor = 'grab';
  PlainDraggable.draggingCursor = 'grabbing';

  var initTimeline = function () {
    if (screenWidth < 767) {
      draggable.snap = {x: {start: 65, step: 69, center: true}, y: 0};
    } else if (screenWidth > 767 && screenWidth < 1023) {
      draggable.snap = {x: {start: 65, step: 69, center: true}, y: 0};
    } else if (screenWidth > 1023 && screenWidth < 1439) {
      draggable.snap = {x: {start: 55, step: 69, center: true, end: dots.length * 69 + 30}, y: 0};
    } else if (screenWidth > 1439) {
      draggable.snap = {x: {start: 105, step: 77, center: true, end: dots.length * 77 + 30}, y: 0};
    }

    dots.forEach(function (elem, i) {
      var rect1 = redPin.getBoundingClientRect();
      var rect2 = elem.getBoundingClientRect();
      if (rect1.left > rect2.left - 15 && rect1.left < rect2.left + 5) {
        dates.forEach(function (el, n) {
          el.removeAttribute('style');
          cards[n].style.cssText = 'display: none;';
        });
        dates[i].style.cssText = 'color: rgba(208, 2, 27, 1);';
        cards[i].style.cssText = 'display: flex;';
      }
    });
  };

  dates.forEach(function (e, i) {
    e.addEventListener('click', function () {
      if (screenWidth < 1023) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 65) + 'px, 0px);';
      } else if (screenWidth > 1023 && screenWidth < 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 55) + 'px, 0px);';
      } else if (screenWidth > 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 105) + 'px, 0px);';
      }
      draggable.position();
      initTimeline();
    });
  });

  dots.forEach(function (el, i) {
    el.addEventListener('click', function () {
      if (screenWidth < 1023) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 67) + 'px, 0px);';
      } else if (screenWidth > 1023 && screenWidth < 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 57) + 'px, 0px);';
      } else if (screenWidth > 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 107) + 'px, 0px);';
      }
      draggable.position();
      initTimeline();
    });
  });

  initTimeline();

  draggable.onMove = initTimeline;
  draggable.onDrag = function (newPosition) {
    return !!newPosition.snapped;
  };

  window.addEventListener('resize', function () {
    initTimeline();
  });

  arrow.onclick = function () {
    window.animateScrollTo(bar.getBoundingClientRect().right);
  };
})();

'use strict';

$(document).ready(function () {
  $('#feedback-form__tel').mask('+9 (999) 999-9999');
});

'use strict';

(function () {
  document.createElement('main');
})();

'use strict';

(function () {
  var mySwiper = undefined;

  function initSwiper() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var items = document.querySelectorAll('.investors-slider-container');
    var slideWrappers = document.querySelectorAll('.investors-slider-container .item__content');
    var slides = document.querySelectorAll('.item-card');

    if (screenWidth < 767 && mySwiper === undefined) {

      items.forEach(function (elem) {
        elem.classList.add('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.add('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.add('swiper-slide');
      });

      mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 8,
        slidesOffsetAfter: 30,
        slidesPerView: 'auto',
      });

    } else if (screenWidth > 767 && mySwiper !== undefined) {

      document.querySelectorAll('.swiper-container').forEach(function (elem) {
        elem.swiper.destroy();
      });

      mySwiper = undefined;

      document.querySelectorAll('.swiper-wrapper').forEach(function (elem) {
        elem.removeAttribute('style');
      });
      document.querySelectorAll('.swiper-slide').forEach(function (elem) {
        elem.removeAttribute('style');
      });

      items.forEach(function (elem) {
        elem.classList.remove('swiper-container');
      });

      slideWrappers.forEach(function (elem) {
        elem.classList.remove('swiper-wrapper');
      });

      slides.forEach(function (elem) {
        elem.classList.remove('swiper-slide');
      });
    }
  }

  initSwiper();

  window.addEventListener('resize', function () {
    initSwiper();
  });
})();

'use strict';

(function () {

  var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
      e.returnValue = false;
    }
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  window.disableScroll = function () {
    // if (window.addEventListener) // older FF
    //     window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }

  window.enableScroll = function () {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  }

  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var mainPage = document.querySelector('.index');
  var slidersWrapper = document.querySelector('.directions-outer-wrap');
  var overlayContainer = document.querySelector('.directions-overlay-slider');
  var overlayWrapper = overlayContainer.querySelector('.swiper-wrapper');
  var overlaySlides = overlayContainer.querySelectorAll('.swiper-slide');
  var slidesNumber = overlaySlides.length;
  var indexRatio = 1 / (slidesNumber - 1);
  var container = document.querySelector('.directions');
  var wrapper = container.querySelector('.swiper-wrapper');
  var slides = container.querySelectorAll('.directions__item');
  var bgContainer = document.querySelector('.directions-bg-desktop');
  var bgWrapper = bgContainer.querySelector('.swiper-wrapper');
  var bgSlides = bgContainer.querySelectorAll('.bg-block');
  var contentContainer = document.querySelector('.directions-content-desktop');
  var contentWrapper = contentContainer.querySelector('.swiper-wrapper');
  var contentSlides = contentContainer.querySelectorAll('.directions__content');
  var desktopPartners = document.querySelector('.directions-partners-desktop').querySelectorAll('.directions__partners');
  var desktopButton = document.querySelector('.directions-content-button');
  var contentDetailPages = [];
  [].forEach.call(contentSlides, function (item) {
    contentDetailPages.push(item.getAttribute('data-href'));
  });
  var isDesktopSwiper;
  var isSwiperActive;
  var mobileSwiper;
  var overlaySwiper;
  var desktopSwiper;
  var bgSwiper;
  var contentSwiper;
  var currentPartners;
  var slidersWrapperTop = slidersWrapper.getBoundingClientRect().top + window.pageYOffset;
  var slidersWrapperBottom = slidersWrapper.getBoundingClientRect().bottom + window.pageYOffset;
  var slidersWrapperHeight = slidersWrapperBottom - slidersWrapperTop;
  var isBelowSlider = (window.pageYOffset > slidersWrapperBottom);
  var desktopInitialSlide = (window.pageYOffset > slidersWrapperBottom) ? slidesNumber : 0;
  var upperIndex = (desktopInitialSlide === slidesNumber) ? slidesNumber - 1 : 0;
  var lowerIndex = upperIndex + 1;
  var scrollingForward = !desktopInitialSlide;
  var isPartnersChanged;
  var previousProgress;
  var currentSlideProgress;
  var touchStartY = 0;
  var touchEndY = 0;

  var initMobileSwiper = function() {
    isDesktopSwiper = false;
    mobileSwiper = new Swiper(container, {
      pagination: {
        el: '.swiper-pagination--mobile',
        clickable: true
      }
    });
    mobileSwiper.on('slideChangeTransitionEnd', function () {
      currentPartners = this.slides[this.activeIndex].querySelector('.directions__partners');
      if (currentPartners) {
        currentPartners.classList.add('partners-move');
      }
    });
    mobileSwiper.on('slideChangeTransitionStart', function () {
      if (currentPartners) {
        currentPartners.classList.remove('partners-move');
      }
    });
    if (window.pageYOffset === slidersWrapperTop) {
      currentPartners = mobileSwiper.slides[0].querySelector('.directions__partners');
      if (currentPartners) {
        currentPartners.classList.add('partners-move');
      }
    }
  };

  var initDesktopSwiper = function() {
    isDesktopSwiper = true;
    overlaySwiper = new Swiper(overlayContainer, {
      direction: 'vertical',
      loop: false,
      autoplay: false,
      spaceBetween: 0,
      speed: 400,
      initialSlide: desktopInitialSlide,
      passiveListeners: false,
      preventInteractionOnTransition: true,
      freeMode: true,
      freeModeMomentum: false,
      touchReleaseOnEdges: true,
      watchSlidesProgress: true,
      mousewheel: {
        releaseOnEdges: true,
      },
      pagination: {
        el: '.swiper-pagination--desktop',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      }
    });
    desktopSwiper = new Swiper(container, {
      direction: 'vertical',
      loop: false,
      autoplay: false,
      spaceBetween: 0,
      initialSlide: desktopInitialSlide,
      preventInteractionOnTransition: true,
      effect: 'fade',
    });
    bgSwiper = new Swiper(bgContainer, {
      direction: 'vertical',
      loop: false,
      autoplay: false,
      spaceBetween: 0,
      initialSlide: desktopInitialSlide,
      preventInteractionOnTransition: true,
    });
    contentSwiper = new Swiper(contentContainer, {
      direction: 'vertical',
      loop: false,
      autoplay: false,
      spaceBetween:0,
      initialSlide: desktopInitialSlide,
      preventInteractionOnTransition: true,
      watchSlidesProgress: true,
    });
    overlaySwiper.allowSlidePrev = false;
    overlaySwiper.allowSlideNext = false;
    overlaySwiper.mousewheel.disable();
    overlaySwiper.controller.control = desktopSwiper;
    desktopSwiper.controller.control = bgSwiper;
    bgSwiper.controller.control = contentSwiper;

    overlaySwiper.on('slideChange', function () {
      desktopButton.setAttribute('href', contentDetailPages[this.activeIndex]);
    });

    overlaySwiper.on('slideChangeTransitionStart', function () {
      if (!isPartnersChanged) {
        currentPartners.classList.remove('partners-move');
        currentPartners.classList.add('partners-hide');
      }
    });

    overlaySwiper.on('slideChangeTransitionEnd', function () {
      if (!isPartnersChanged) {
        currentPartners.classList.remove('partners-hide');
        currentPartners = desktopPartners[this.activeIndex];
        currentPartners.classList.add('partners-move');
      } else {
        isPartnersChanged = false;
      }
    });

    overlaySwiper.on('progress', function () {
      upperIndex = Math.floor(this.progress / indexRatio);
      lowerIndex = upperIndex + 1;
      currentSlideProgress = this.progress / indexRatio - upperIndex;
      if (previousProgress !== undefined) {
        scrollingForward = (this.progress >= previousProgress);
      }
      if (scrollingForward) {
        if (currentSlideProgress > 0.6 && currentSlideProgress < 0.8) {
          currentPartners.classList.remove('partners-move');
          currentPartners.classList.add('partners-hide');
        }
        if (currentSlideProgress > 0.8) {
          if (currentPartners.classList.contains('partners-move')) {
            currentPartners.classList.remove('partners-move');
          }
          currentPartners.classList.remove('partners-hide');
          currentPartners = (lowerIndex < slidesNumber) ?  desktopPartners[lowerIndex] : desktopPartners[slidesNumber - 1];
          isPartnersChanged = true;
          currentPartners.classList.add('partners-move');
        }
      } else {
        if (currentSlideProgress > 0.4 && currentSlideProgress < 0.6) {
          currentPartners.classList.remove('partners-move');
          currentPartners.classList.add('partners-hide');
        }
        if (currentSlideProgress < 0.4) {
          if (currentPartners.classList.contains('partners-move')) {
            currentPartners.classList.remove('partners-move');
          }
          currentPartners.classList.remove('partners-hide');
          currentPartners = desktopPartners[upperIndex];
          isPartnersChanged = true;
          currentPartners.classList.add('partners-move');
        }
      }
      previousProgress = this.progress;
    });

    contentSwiper.on('progress', function () {
      if ((upperIndex !== undefined) && (lowerIndex !== undefined) && (currentSlideProgress !==undefined)) {
        var desktopButtonOpacity = (currentSlideProgress < 0.85) && (currentSlideProgress > 0.35) ? 0.4 : 1;
        var desktopButtonZIndex = (currentSlideProgress < 0.85) && (currentSlideProgress > 0.35) ? -1 : 200;
        desktopButton.style.opacity = desktopButtonOpacity;
        desktopButton.style.zIndex = desktopButtonZIndex;

        var innerUpperTranslate = (currentSlideProgress < 0.8) ? (currentSlideProgress / 1.14 * 375) : 0;
        var innerUpperOpacity = (currentSlideProgress < 0.8) ? ((1 - currentSlideProgress) * 1.25) - 0.2 : 0;
        this.slides[upperIndex].querySelector('.content__wrapper').style.transform = 'translate3d( 0, ' + innerUpperTranslate + 'px, 0)';
        this.slides[upperIndex].querySelector('.content__wrapper').style.opacity = innerUpperOpacity;

        if (lowerIndex < slidesNumber) {
          var innerLowerTranslate = (currentSlideProgress < 0.7) ? 0 : (currentSlideProgress - 1) * 127;
          var innerLowerOpacity = (currentSlideProgress < 0.7) ? 0 : (currentSlideProgress - 0.7) * 3.34;
          this.slides[lowerIndex].querySelector('.content__wrapper').style.transform = 'translate3d( 0, ' + innerLowerTranslate + 'px, 0)';
          this.slides[lowerIndex].querySelector('.content__wrapper').style.opacity = innerLowerOpacity;
        }
      }
    });

    isSwiperActive = false;
    desktopButton.setAttribute('href', contentDetailPages[desktopInitialSlide]);
    upperIndex = (desktopInitialSlide === slidesNumber) ? slidesNumber - 1 : 0;
    lowerIndex = upperIndex + 1;
    scrollingForward = !desktopInitialSlide;
    if (window.pageYOffset === slidersWrapperTop) {
      currentPartners = desktopPartners[desktopInitialSlide];
      currentPartners.classList.add('partners-move');
    }
  };

  var destroySwiper = function(isDesktop) {
    container.swiper.destroy();
    wrapper.removeAttribute('style');
    slides.forEach(function (elem) {
      elem.removeAttribute('style');
    });

    if (isDesktop) {
      overlayContainer.swiper.destroy();
      overlayWrapper.removeAttribute('style');
      overlaySlides.forEach(function (elem) {
        elem.removeAttribute('style');
      });

      bgContainer.swiper.destroy();
      bgWrapper.removeAttribute('style');
      bgSlides.forEach(function (elem) {
        elem.removeAttribute('style');
      });

      contentContainer.swiper.destroy();
      contentWrapper.removeAttribute('style');
      contentSlides.forEach(function (elem) {
        elem.removeAttribute('style');
      });

      overlaySwiper = undefined;
      desktopSwiper = undefined;
      bgSwiper = undefined;
      contentSwiper = undefined;
      currentPartners = undefined;
      upperIndex = undefined;
      lowerIndex = undefined;
      scrollingForward = undefined;
      previousProgress = undefined;
      currentSlideProgress = undefined;
      [].forEach.call(desktopPartners, function (item) {
        item.classList.remove('partners-move');
        item.classList.remove('partners-hide');
      });
      [].forEach.call(contentSlides, function (item) {
        item.querySelector('.content__wrapper').removeAttribute('style');
      });
      desktopButton.removeAttribute('style');
    } else {
      mobileSwiper = undefined;
      [].forEach.call(slides, function (item) {
        item.querySelector('.directions__partners').classList.remove('partners-move');
      });
    }
  };

  var processResize = function() {
    if (window.matchMedia('(max-width: 1279px)').matches) {
      if (isDesktopSwiper) {
        destroySwiper(true);
        initMobileSwiper();
        window.removeEventListener('scroll', desktopScrollHandler);
        slidersWrapper.removeEventListener('wheel', desktopSwiperWheelHandler);
        slidersWrapper.removeEventListener('touchstart', desktopSwiperTouchStart);
        slidersWrapper.removeEventListener('touchend', desktopSwiperTouchEnd);
        if (slidersWrapper.classList.contains('directions-outer-wrap--fixed')) {
          window.scrollTo(0, slidersWrapperTop);
          slidersWrapper.classList.remove('directions-outer-wrap--fixed');
        }
        window.enableScroll();
        if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
          window.addEventListener('scroll', tabletScrollHandler);
        }
        mainPage.style.overflowY = 'auto';
      }
    } else {
      if (!isDesktopSwiper) {
        destroySwiper(false);
        isBelowSlider = (window.pageYOffset > slidersWrapperBottom);
        desktopInitialSlide = isBelowSlider ? slidesNumber : 0;
        initDesktopSwiper();
        window.removeEventListener('scroll', tabletScrollHandler);
        if ((window.pageYOffset > slidersWrapperTop) &&
        (!isBelowSlider) ||
        ((window.pageYOffset + slidersWrapperHeight) < slidersWrapperBottom) &&
        isBelowSlider) {
          slidersWrapper.classList.add('directions-outer-wrap--fixed');
          currentPartners = desktopPartners[overlaySwiper.activeIndex];
          currentPartners.classList.add('partners-move');
          desktopButton.setAttribute('href', contentDetailPages[overlaySwiper.activeIndex]);
          window.disableScroll();
          overlaySwiper.allowSlidePrev = true;
          overlaySwiper.allowSlideNext = true;
          overlaySwiper.mousewheel.enable();
          isSwiperActive = true;
          slidersWrapper.addEventListener('wheel', desktopSwiperWheelHandler);
          slidersWrapper.addEventListener('touchstart', desktopSwiperTouchStart);
          slidersWrapper.addEventListener('touchend', desktopSwiperTouchEnd);
          mainPage.style.overflowY = 'hidden';
        } else {
          window.addEventListener('scroll', desktopScrollHandler);
        }
      }
    }
  };

  if (window.matchMedia("(max-width: 1279px)").matches) {
    initMobileSwiper();
  } else {
    initDesktopSwiper();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(processResize, 10);
  });

  var mouseTimeout;
  var desktopSwiperWheelHandler = function (evt) {
    if (isSwiperActive) {
      evt.stopPropagation();
      if ((evt.deltaY > 0 && overlaySwiper.isEnd && !overlaySwiper.animating) || (evt.deltaY < 0 && overlaySwiper.isBeginning && !overlaySwiper.animating)) {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(function () {
          slidersWrapper.removeEventListener('wheel', desktopSwiperWheelHandler);
          slidersWrapper.removeEventListener('touchstart', desktopSwiperTouchStart);
          slidersWrapper.removeEventListener('touchend', desktopSwiperTouchEnd);
          window.scrollTo(0, slidersWrapperTop);
          slidersWrapper.classList.remove('directions-outer-wrap--fixed');
          currentPartners.classList.remove('partners-move');
          window.addEventListener('scroll', desktopScrollHandler);
          overlaySwiper.allowSlidePrev = false;
          overlaySwiper.allowSlideNext = false;
          overlaySwiper.mousewheel.disable();
          isBelowSlider = overlaySwiper.isEnd;
          window.enableScroll();
          isSwiperActive = false;
          mainPage.style.overflowY = 'auto';
        }, 100);
      }
    }
  };

  var desktopSwiperTouchStart = function (evt) {
    touchStartY = evt.changedTouches[0].screenY;
  };

  var desktopSwiperTouchEnd = function (evt) {
    if (isSwiperActive) {
      evt.stopPropagation();
      touchEndY = evt.changedTouches[0].screenY;
      if ((touchEndY < touchStartY && overlaySwiper.isEnd && !overlaySwiper.animating) || (touchEndY > touchStartY && overlaySwiper.isBeginning && !overlaySwiper.animating)) {
        slidersWrapper.removeEventListener('wheel', desktopSwiperWheelHandler);
        slidersWrapper.removeEventListener('touchstart', desktopSwiperTouchStart);
        slidersWrapper.removeEventListener('touchend', desktopSwiperTouchEnd);
        window.scrollTo(0, slidersWrapperTop);
        slidersWrapper.classList.remove('directions-outer-wrap--fixed');
        currentPartners.classList.remove('partners-move');
        window.addEventListener('scroll', desktopScrollHandler);
        overlaySwiper.allowSlidePrev = false;
        overlaySwiper.allowSlideNext = false;
        overlaySwiper.mousewheel.disable();
        isBelowSlider = overlaySwiper.isEnd;
        window.enableScroll();
        isSwiperActive = false;
        mainPage.style.overflowY = 'auto';
      }
    }
  };

  var desktopScrollHandler = function () {
    if (window.matchMedia('(min-width: 1280px)').matches) {
      if ((window.pageYOffset > slidersWrapperTop) &&
        (!isBelowSlider) ||
        ((window.pageYOffset + slidersWrapperHeight) < slidersWrapperBottom) &&
        isBelowSlider) {
        if (!isSwiperActive) {
          slidersWrapper.classList.add('directions-outer-wrap--fixed');
          currentPartners = desktopPartners[overlaySwiper.activeIndex];
          currentPartners.classList.add('partners-move');
          desktopButton.setAttribute('href', contentDetailPages[overlaySwiper.activeIndex]);
          window.disableScroll();
          overlaySwiper.allowSlidePrev = true;
          overlaySwiper.allowSlideNext = true;
          overlaySwiper.mousewheel.enable();
          isSwiperActive = true;
          slidersWrapper.addEventListener('wheel', desktopSwiperWheelHandler);
          slidersWrapper.addEventListener('touchstart', desktopSwiperTouchStart);
          slidersWrapper.addEventListener('touchend', desktopSwiperTouchEnd);
          window.removeEventListener('scroll', desktopScrollHandler);
          mainPage.style.overflowY = 'hidden';
        }
      }
    }
  };

  var tabletScrollHandler = function () {
    if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
      if (Math.abs(window.pageYOffset - slidersWrapperTop) < (slidersWrapperHeight * 0.1)) {
        if (!currentPartners) {
          currentPartners = mobileSwiper.slides[0].querySelector('.directions__partners');
          currentPartners.classList.add('partners-move');
        }
      }
    }
  };

  if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
    window.addEventListener('scroll', tabletScrollHandler);
  }

  if (window.matchMedia('(min-width: 1280px)').matches) {
    window.addEventListener('scroll', desktopScrollHandler);
  }

  // ------------------
  var footer = document.querySelector('footer');
  if (screenWidth > 767) {
    footer.classList.add('wow');
    footer.classList.add('fadeIn');
  } else if (screenWidth < 767) {
    footer.classList.remove('fadeIn');
    footer.classList.remove('wow');
  }

})();

(function () {
  new WOW().init();
})();

(function () {
  var slides = document.querySelectorAll('.numbers__slide');

  var currentSlide = 0;
  var nextSlide = function () {
    slides[currentSlide].classList.remove('numbers__slide--show');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('numbers__slide--show');
  };

  setInterval(nextSlide, 3000);
})();

'use strict';

(function () {
  var sidebar = document.querySelector('.sidebar');
  var button = sidebar.querySelector('.sidebar__button');

  if (sidebar) {
    button.addEventListener('click', function () {
      button.classList.toggle('sidebar__button--close');
    });
  }

  var sidebarNav = sidebar.querySelector('.sidebar__nav');
  var sidebarSearch = sidebar.querySelector('.sidebar__search');
  var buttonSearch = sidebar.querySelector('.controls__search');

  var toggleSearch = function (evt) {
    evt.preventDefault();
    sidebarNav.classList.toggle('sidebar__nav--hide');
    sidebarSearch.classList.toggle('sidebar__search--show');
    buttonSearch.classList.toggle('controls__search--open');
  };

  var toggleSearchListener = function () {
    if (window.innerWidth < 768) {
      buttonSearch.addEventListener('click', toggleSearch);
    } else {
      buttonSearch.removeEventListener('click', toggleSearch);
    }
  };

  window.onresize = toggleSearchListener;

})();

'use strict';

(function () {
  var ESC = 27;
  var body = document.querySelector('body');
  var modal = document.querySelector('.modal');
  var modalOverlay = document.querySelector('.modal__overlay');
  var button = document.querySelector('.modal__close-button');

  var closeModal = function (evt) {
    evt.preventDefault();
    if (evt.type === 'click') {
      modal.classList.remove('modal--show');
      body.classList.remove('no-scroll');
    }
    if (evt.keyCode === ESC) {
      modal.classList.remove('modal--show');
      body.classList.remove('no-scroll');
    }
    window.removeEventListener('keydown', closeModal);
    modalOverlay.removeEventListener('click', closeModal);
    button.removeEventListener('click', closeModal);
    if (document.querySelector('.directions-outer-wrap--fixed')) {
      window.disableScroll();
    }
  };

  body.classList.add('no-scroll');
  window.addEventListener('keydown', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  button.addEventListener('click', closeModal);
  if (document.querySelector('.directions-outer-wrap--fixed')) {
    window.enableScroll();
  }

})();

'use strict';

(function () {
  var section = document.querySelector('.video');
  var frame = document.querySelector('.video__player');
  var player = new Vimeo.Player('video__player');
  var slogan = document.querySelector('.video__slogan');
  var button = document.querySelector('.video__play');

  var playVideo = function (evt) {
    evt.preventDefault();
    section.classList.add('video--playing');
    player.play();
  };

  player.on('play', function () {
    frame.classList.add('video__player--show');
    slogan.classList.add('video__slogan--hide');
    button.classList.add('video__play--hide');
  });

  // player.on('pause', function () {
  //   slogan.classList.remove('video__slogan--hide');
  //   button.classList.remove('video__play--hide');
  // });

  player.on('finish', function () {
    section.classList.remove('video--playing');
    slogan.classList.remove('video__slogan--hide');
    button.classList.remove('video__play--hide');
    frame.classList.remove('video__player--show');
  });

  button.addEventListener('click', playVideo);
})();
