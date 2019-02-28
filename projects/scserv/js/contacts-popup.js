'use strict';

(function () {
  var TIMEOUT = 50;
  var openPopupBtns = document.querySelectorAll('.js-open-popup');
  var popup = document.querySelector('.js-popup');
  if (!popup || !openPopupBtns) {
    return;
  }
  var submitBtn = popup.querySelector('.feedback-popup__submit');
  var formElmt = popup.querySelector('form');
  var inputElmts = formElmt.querySelectorAll('input');

  var closeBtn = popup.querySelector('.js-close-btn');

  var onOpenPopupBtnClick = function (evt) {
    evt.preventDefault();
    removeRequiredToData();
    popup.classList.remove('feedback-popup--off');
    setTimeout(function () {
      popup.classList.add('feedback-popup--visible');
    }, TIMEOUT);
    document.addEventListener('keydown', onEscKeyDown);
    closeBtn.addEventListener('click', onCloseBtnClick);
    popup.addEventListener('click', onOverlayClick);
    document.body.classList.add('feedback-popup__dont-scroll-it');
    document.body.addEventListener('touchmove', onBodyTouchMove, { passive: false });
    submitBtn.addEventListener('click', onSubmitBtnClick);
  };

  var closePopup = function () {
    popup.classList.remove('feedback-popup--visible');
    popup.classList.add('feedback-popup--off');
    document.removeEventListener('keydown', onEscKeyDown);
    closeBtn.removeEventListener('click', onCloseBtnClick);
    popup.removeEventListener('click', onOverlayClick);
    document.body.classList.remove('feedback-popup__dont-scroll-it');
    document.body.removeEventListener('touchmove', onBodyTouchMove, { passive: false });
    submitBtn.removeEventListener('click', onSubmitBtnClick);
    Array.prototype.forEach.call(inputElmts, function (it) {
      it.required = false;
    });
  };

  var onEscKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  };

  var onCloseBtnClick = function () {
    closePopup();
  };

  var onOverlayClick = function (evt) {
    if (evt.target === popup) {
      closePopup()
    }
  };

  var onBodyTouchMove = function (evt) {
    if (evt.currentTarget === evt.target) {
      evt.preventDefault();
    }
  };

  var removeRequiredToData = function () {
    Array.prototype.forEach.call(inputElmts, function (it) {
      if (it.required) {
        it.dataset.required = 'Y';
        it.required = false;
      }
    })
  };

  var onSubmitBtnClick = function () {
    Array.prototype.forEach.call(inputElmts, function (it) {
      if (it.dataset.required === 'Y' || it.dataset.required === 'y') {
        it.required = true;
      }
    });
  };

  Array.prototype.forEach.call(openPopupBtns, function (it) {
    it.addEventListener('click', onOpenPopupBtnClick);
  });
})();
