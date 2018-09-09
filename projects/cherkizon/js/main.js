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
