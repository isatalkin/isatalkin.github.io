'use strict';

(function () {

  initSmoothScrolling();

  function initSmoothScrolling() {
    if (isCssSmoothSCrollSupported()) {
      return;
    }

    var onTopButtonLeft = document.querySelector('.footer__ontop--left');
    var onTopButtonRight = document.querySelector('.footer__ontop--right');
    var duration = 1000;

    onTopButtonLeft.addEventListener('click', scrollTop);
    onTopButtonRight.addEventListener('click', scrollTop);

    function scrollTop(evt) {
      evt.preventDefault();
      jump('.header', {
        duration: duration
      });
    }

  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  function jump(target, options) {
    var
      start = window.pageYOffset,
      opt = {
        duration: options.duration,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad
      },
      distance = typeof target === 'string' ?
      opt.offset + document.querySelector(target).getBoundingClientRect().top :
      target,
      duration = typeof opt.duration === 'function' ?
      opt.duration(distance) :
      opt.duration,
      timeStart, timeElapsed;

    requestAnimationFrame(function (time) {
      timeStart = time;
      loop(time);
    });

    function loop(time) {
      timeElapsed = time - timeStart;

      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

      if (timeElapsed < duration)
        requestAnimationFrame(loop)
      else
        end();
    }

    function end() {
      window.scrollTo(0, start + distance);

      if (typeof opt.callback === 'function')
        opt.callback();
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

  }

})();
