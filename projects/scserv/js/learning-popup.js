'use strict';

(function () {
  var TIMEOUT = 50;
  var coursesLinks = document.querySelectorAll('.courses__class-link');
  var popupList = document.querySelectorAll('.learning-popup');
  if (!popupList[0] || !coursesLinks) {
    return;
  }
  var popup = null;
  var closeBtn = null;

  var onCoursesLinksClick = function (evt) {
    evt.preventDefault();
    popup = popupList[parseInt(evt.currentTarget.dataset.number, 10)];
    if (!popup) {
      return;
    }
    closeBtn = popup.querySelector('.learning-popup__close-btn');
    popup.classList.remove('learning-popup--off');
    setTimeout(function () {
      popup.classList.add('learning-popup--visible');
    }, TIMEOUT);
    document.addEventListener('keydown', onEscKeyDown);
    closeBtn.addEventListener('click', onCloseBtnClick);
    popup.addEventListener('click', onOverlayClick);
    document.body.classList.add('learning-popup__dont-scroll-it');
    document.body.addEventListener('touchmove', onBodyTouchMove, { passive: false });
  };

  var closePopup = function () {
    popup.classList.remove('learning-popup--visible');
    popup.classList.add('learning-popup--off');
    document.removeEventListener('keydown', onEscKeyDown);
    closeBtn.removeEventListener('click', onCloseBtnClick);
    popup.removeEventListener('click', onOverlayClick);
    document.body.classList.remove('learning-popup__dont-scroll-it');
    document.body.removeEventListener('touchmove', onBodyTouchMove, { passive: false });
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

  Array.prototype.forEach.call(coursesLinks, function (it, id) {
    it.addEventListener('click', onCoursesLinksClick);
    it.dataset.number = id;
  });
})();
