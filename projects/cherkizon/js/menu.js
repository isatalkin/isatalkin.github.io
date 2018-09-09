'use strict';

(function () {
  var sidebar = document.querySelector('.sidebar');
  var button = sidebar.querySelector('.sidebar__button');

  if (sidebar) {
    button.addEventListener('click', function () {
      button.classList.toggle('sidebar__button--close');
    });
  }
})();
