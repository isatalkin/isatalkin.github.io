'use strict';

(function () {
  var redPin = document.querySelector('.red-dot');

  var dots = document.querySelectorAll('.timeline-dot');
  var dates = document.querySelectorAll('.timeline-date');
  var cards = document.querySelectorAll('.timeline__cards');

  var draggable = new PlainDraggable(redPin);

  PlainDraggable.draggableCursor = 'grab';
  PlainDraggable.draggingCursor = 'grabbing';

  var initTimeline = function () {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 767) {
      draggable.snap = {x: {start: 65, step: 67, center: true}, y: 0};
    } else if (screenWidth > 767 && screenWidth < 1023) {
      draggable.snap = {x: {start: 65, step: 67, center: true}, y: 0};
    } else if (screenWidth > 1023 && screenWidth < 1439) {
      draggable.snap = {x: {start: 55, step: 67, center: true, end: 871}, y: 0};
    } else if (screenWidth > 1439) {
      draggable.snap = {x: {start: 105, step: 87, center: true, end: 1200}, y: 0};
    }

    dots.forEach(function (elem, i) {
      var rect1 = redPin.getBoundingClientRect();
      var rect2 = elem.getBoundingClientRect();
      if (rect1.left > rect2.left - 15 && rect1.left < rect2.left + 5) {
        dates.forEach(function (el, n) {
          el.removeAttribute('style');
          cards[n].style.cssText = 'display: none;';
        });
        dates[i].style.cssText = 'color: rgba(208, 2, 27, 1);';
        cards[i].style.cssText = 'display: flex;';
      }
    });
  };

  initTimeline();

  draggable.onMove = initTimeline;
  draggable.onDrag = function (newPosition) {
    return !!newPosition.snapped;
  };

  window.addEventListener('resize', function () {
    initTimeline();
  });
})();
