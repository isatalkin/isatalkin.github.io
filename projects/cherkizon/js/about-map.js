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
