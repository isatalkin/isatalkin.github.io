'use strict';

(function () {
  var redPin = document.querySelector('.red-dot');
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var dots = document.querySelectorAll('.timeline-dot');
  var dates = document.querySelectorAll('.timeline-date');
  var cards = document.querySelectorAll('.timeline__cards');
  var arrow = document.querySelector('.timeline__arrow');
  var bar = document.querySelector('.bar-wrapper');

  var draggable = new PlainDraggable(redPin);

  PlainDraggable.draggableCursor = 'grab';
  PlainDraggable.draggingCursor = 'grabbing';

  var initTimeline = function () {
    if (screenWidth < 767) {
      draggable.snap = {x: {start: 65, step: 69, center: true}, y: 0};
    } else if (screenWidth > 767 && screenWidth < 1023) {
      draggable.snap = {x: {start: 65, step: 69, center: true}, y: 0};
    } else if (screenWidth > 1023 && screenWidth < 1439) {
      draggable.snap = {x: {start: 55, step: 69, center: true, end: dots.length * 69 + 30}, y: 0};
    } else if (screenWidth > 1439) {
      draggable.snap = {x: {start: 105, step: 77, center: true, end: dots.length * 77 + 30}, y: 0};
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

  dates.forEach(function (e, i) {
    e.addEventListener('click', function () {
      if (screenWidth < 1023) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 65) + 'px, 0px);';
      } else if (screenWidth > 1023 && screenWidth < 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 55) + 'px, 0px);';
      } else if (screenWidth > 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 105) + 'px, 0px);';
      }
      draggable.position();
      initTimeline();
    });
  });

  dots.forEach(function (el, i) {
    el.addEventListener('click', function () {
      if (screenWidth < 1023) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 67) + 'px, 0px);';
      } else if (screenWidth > 1023 && screenWidth < 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 57) + 'px, 0px);';
      } else if (screenWidth > 1439) {
        redPin.style.cssText = 'transform: translate(' + (dots[i].offsetLeft - 107) + 'px, 0px);';
      }
      draggable.position();
      initTimeline();
    });
  });

  initTimeline();

  draggable.onMove = initTimeline;
  draggable.onDrag = function (newPosition) {
    return !!newPosition.snapped;
  };

  window.addEventListener('resize', function () {
    initTimeline();
  });

  arrow.onclick = function () {
    window.animateScrollTo(bar.getBoundingClientRect().right);
  };
})();
