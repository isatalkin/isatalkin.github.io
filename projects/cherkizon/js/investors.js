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
