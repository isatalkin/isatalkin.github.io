'use strict';

(function() {

  var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 'auto',
      freeMode: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 40,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });

})();
