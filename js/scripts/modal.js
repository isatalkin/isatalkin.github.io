'use strict';

(function() {
  var project = document.querySelector('.projects__item:first-child');
  var shadow = document.querySelector('.modal-shadow');

  project.addEventListener('click', function (evt) {
    evt.preventDefault();
    project.classList.add('projects__item--big');
    shadow.classList.add('modal-shadow--show');
    shadow.addEventListener('click', function () {
      project.classList.remove('projects__item--big');
    shadow.classList.remove('modal-shadow--show');
    });
  });
})();
