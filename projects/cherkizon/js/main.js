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
