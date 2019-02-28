'use strict';

(function () {

  var nav = document.querySelector('.header__nav');
  var button = document.querySelector('.header__burger');
  var search = document.querySelector('.search');
  var searchInput = document.querySelector('.search__input');
  var searchLabel = document.querySelector('.search__label');

  var toggleNav = function (evt) {
    evt.preventDefault();
    nav.classList.toggle('header__nav--opened');
    if (search.classList.contains('search--opened')) {
      search.classList.remove('search--opened');
    }
  }

  var setNavListener = function () {
    if (window.innerWidth < 768) {
      button.addEventListener('click', toggleNav);
    }
  };

  var expandSearch = function (evt) {
    evt.preventDefault();
    search.classList.add('search--opened');
    searchInput.focus();
  }

  var setSearchListener = function () {
    if (window.innerWidth < 992) {
      searchLabel.addEventListener('click', expandSearch);
    }
  }

  var setListeners = function () {
    setNavListener();
    setSearchListener();
    if (window.innerWidth > 767) {
      nav.classList.remove('header__nav--opened');
      search.classList.remove('search--opened');
    }
  }

  setListeners();
  window.onresize = setListeners;

  var navItems = document.querySelectorAll('.nav__item');
  Array.prototype.forEach.call(navItems, function (item) {
    if (item.querySelector('.dropdown')) {
      item.addEventListener('mouseover', function () {
        var itemLeft = item.offsetLeft;
        var dropdown = item.querySelector('.dropdown');
        dropdown.style.left = itemLeft + 'px';
      });
    }
  });

})();
