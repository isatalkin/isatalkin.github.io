'use strict';

(function () {
  var ESC = 27;
  var body = document.querySelector('body');
  var modal = document.querySelector('.modal');
  var modalOverlay = document.querySelector('.modal__overlay');
  var button = document.querySelector('.modal__close-button');

  var closeModal = function (evt) {
    evt.preventDefault();
    if (evt.type === 'click') {
      modal.classList.remove('modal--show');
      body.classList.remove('no-scroll');
    }
    if (evt.keyCode === ESC) {
      modal.classList.remove('modal--show');
      body.classList.remove('no-scroll');
    }
    window.removeEventListener('keydown', closeModal);
    modalOverlay.removeEventListener('click', closeModal);
    button.removeEventListener('click', closeModal);
    if (document.querySelector('.directions-outer-wrap--fixed')) {
      window.disableScroll();
    }
  };

  body.classList.add('no-scroll');
  window.addEventListener('keydown', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  button.addEventListener('click', closeModal);
  if (document.querySelector('.directions-outer-wrap--fixed')) {
    window.enableScroll();
  }

})();
