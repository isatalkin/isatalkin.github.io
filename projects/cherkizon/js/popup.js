'use strict';

(function () {
  var button = document.querySelector('.popup__button');
  var content = document.querySelector('.popup__container');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    content.classList.add('popup__container--close');
  });
})();
