'use strict';

(function () {
  var map = document.querySelector('.map');
  var maps = document.querySelectorAll('.about-map');
  var cards = document.querySelectorAll('.map-card');
  var mapPin = document.querySelector('.map-pin');
  var mapPinClose = document.querySelectorAll('map-pin__button');
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

(function () {
  if (window.innerWidth > 767) {
    var controller = new ScrollMagic.Controller();
    var animatedBlocks = document.querySelectorAll('.animated-block');

    for (var i = 0; i < animatedBlocks.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: animatedBlocks[i]
      })
      .setClassToggle(animatedBlocks[i], 'show')
      .reverse(false)
      .addTo(controller);
    }
  }
})();

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
  var redPin = document.querySelector('.red-dot');

  var dots = document.querySelectorAll('.timeline-dot');
  var dates = document.querySelectorAll('.timeline-date');
  var cards = document.querySelectorAll('.timeline__cards');

  var draggable = new PlainDraggable(redPin);

  PlainDraggable.draggableCursor = 'grab';
  PlainDraggable.draggingCursor = 'grabbing';

  var initTimeline = function () {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 767) {
      draggable.snap = {x: {start: 65, step: 67, center: true}, y: 0};
    } else if (screenWidth > 767 && screenWidth < 1023) {
      draggable.snap = {x: {start: 65, step: 67, center: true}, y: 0};
    } else if (screenWidth > 1023 && screenWidth < 1439) {
      draggable.snap = {x: {start: 55, step: 67, center: true, end: 871}, y: 0};
    } else if (screenWidth > 1439) {
      draggable.snap = {x: {start: 105, step: 87, center: true, end: 1200}, y: 0};
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

  initTimeline();

  draggable.onMove = initTimeline;
  draggable.onDrag = function (newPosition) {
    return !!newPosition.snapped;
  };

  window.addEventListener('resize', function () {
    initTimeline();
  });
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

(function() {
  if (window.innerWidth < 768) {
    var container = document.querySelector('.directions');
    var wrapper = container.children[0];
    var slides = container.querySelectorAll('.directions__item');
    var pagination = container.children[1];

    container.classList.add('swiper-container');
    wrapper.classList.add('swiper-wrapper');
    pagination.classList.add('swiper-pagination');

    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.add('swiper-slide');
    }
  }

  if (window.innerWidth > 767) {
    $.scrollify({
      section : ".screen",
    });

    var controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      offset: 125
    })
    .setClassToggle('#sidebar', 'show')
    .addTo(controller);

    var numbersScene = new ScrollMagic.Scene({
      triggerElement: '.numbers'
    })
    .setClassToggle('#numbers', 'animate')
    .addTo(controller);

    var newsScene = new ScrollMagic.Scene({
      triggerElement: '.news'
    })
    .setClassToggle('#news', 'animate')
    .addTo(controller);

    var directions = document.querySelectorAll('.directions__item');

    for (var i = 0; i < directions.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: directions[i],
        triggerHook: 0
      })
      .setPin(directions[i])
      .addTo(controller);
    }

    for (var i = 1; i < directions.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: directions[i],
        triggerHook: 0
      })
      .setClassToggle(directions[i], 'show')
      .addTo(controller);
    }

    for (var i = 1; i < directions.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: directions[i],
        triggerHook: 0
      })
      .setClassToggle(directions[i - 1], 'fade')
      .addTo(controller);
    }

    var careerScene = new ScrollMagic.Scene({
      triggerElement: '.video',
      triggerHook: 0
    })
    .addTo(controller);

    var main = document.querySelector('main');
    var career = main.querySelector('.career');
    var fakeScreen = document.createElement('div');

    fakeScreen.id = 'fake-career';
    fakeScreen.style.height = '100vh';
    fakeScreen.classList.add('screen');
    main.appendChild(fakeScreen);

    new ScrollMagic.Scene({
      triggerElement: '#video',
      triggerHook: 0
    })
    .setClassToggle('#career', 'fixed')
    .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#video',
      triggerHook: 0
    })
    .setClassToggle('#career', 'animate')
    .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#video',
      triggerHook: 0
    })
    .setClassToggle('#footer', 'animate')
    .addTo(controller);
  }
})();

(function () {
  if (window.innerWidth < 768 && document.querySelector('.swiper-container')) {
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
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
})();

'use strict';

(function () {
  var button = document.querySelector('.popup__button');
  var content = document.querySelector('.popup__container');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    content.classList.add('popup__container--close');
  });
})();
