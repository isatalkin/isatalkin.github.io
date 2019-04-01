'use strict';

(function() {

  var features = document.querySelector('.details__features');
  var featuresItem = features.getElementsByClassName('details__tab');
  var featuresMenu = features.getElementsByClassName('details__table');

  var deactivateItem = function(element) {
    Array.from(element).forEach(function(item) {
      item.classList.add('hidden');
    });
  };

  var activateItem = function(element) {
    element.classList.remove('hidden');
  };

  var deactivateTab = function() {
    var tabActive = features.querySelector('.active');
    if (tabActive) {
      tabActive.classList.remove('active');
      deactivateItem(featuresMenu);
    }
  };

  var onFeaturesClick = function(evt) {
    Array.from(featuresItem).forEach(function(item) {
      item.addEventListener('click', function(evt) {
        evt.preventDefault();
        deactivateTab();
        item.classList.add('active');
        var itemSubmenu = item.querySelector('.hidden');
        if (itemSubmenu) {
          itemSubmenu.classList.remove('hidden');
        }
      });
    });
  };

  onFeaturesClick();

})();
