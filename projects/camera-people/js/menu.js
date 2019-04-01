'use strict';

(function () {
  var menuMounted = false;
  var header = document.querySelector('.header');
  var button = document.createElement('button');
  button.classList.add('header__button');
  var body = document.querySelector('body');

  function mountMenuHandler() {
    if (!menuMounted) {

      header.appendChild(button);
      button.onclick = function (evt) {
        evt.preventDefault();
        button.classList.toggle('header__button--close');
        header.classList.toggle('header--opened');
        body.classList.toggle('overflow-hidden');
      };
      menuMounted = true;
    }
  }

  function unmountMenuHandler() {
    if (menuMounted) {
      header.classList.remove('header--opened');
      button.classList.remove('header__button--close');
      body.classList.remove('overflow-hidden');
      header.removeChild(button);
      menuMounted = false;
    }
  }

  if (window.innerWidth < 768) {
    mountMenuHandler();
  }

  window.onresize = function () {
    if (window.innerWidth < 768) {
      mountMenuHandler();
    }
    if (window.innerWidth > 767) {
      unmountMenuHandler();
    }
  }

})();
