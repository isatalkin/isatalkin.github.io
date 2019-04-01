'use strict';

(function () {
  var fieldset = document.querySelector('.filter-form__field-wrapper');
  var fielsetOpen = document.querySelector('.filter-form__show');

  fielsetOpen.addEventListener('click', function(){
    fieldset.classList.remove('filter-form__field-wrapper--hide');
    fielsetOpen.classList.add('filter-form__show--hidden');
  })
})();

(function () {
  var openField = document.querySelectorAll('.filter-form__legend');

  openField.forEach(function(item) {
    item.addEventListener('click', function(evt) {
      var target = evt.currentTarget;
      // evt.stopPropagation();
      target.parentNode.classList.toggle('filter-form__field--hidden');
    })
  })





















})();
