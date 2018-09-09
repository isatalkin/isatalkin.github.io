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
