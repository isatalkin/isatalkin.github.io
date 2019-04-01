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
