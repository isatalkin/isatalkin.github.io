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
