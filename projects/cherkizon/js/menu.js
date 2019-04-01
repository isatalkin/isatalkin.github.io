'use strict';

(function () {
  var sidebar = document.querySelector('.sidebar');
  var button = sidebar.querySelector('.sidebar__button');

  if (sidebar) {
    button.addEventListener('click', function () {
      button.classList.toggle('sidebar__button--close');
    });
  }

  var sidebarNav = sidebar.querySelector('.sidebar__nav');
  var sidebarSearch = sidebar.querySelector('.sidebar__search');
  var buttonSearch = sidebar.querySelector('.controls__search');

  var toggleSearch = function (evt) {
    evt.preventDefault();
    sidebarNav.classList.toggle('sidebar__nav--hide');
    sidebarSearch.classList.toggle('sidebar__search--show');
    buttonSearch.classList.toggle('controls__search--open');
  };

  var toggleSearchListener = function () {
    if (window.innerWidth < 768) {
      buttonSearch.addEventListener('click', toggleSearch);
    } else {
      buttonSearch.removeEventListener('click', toggleSearch);
    }
  };

  window.onresize = toggleSearchListener;

})();
