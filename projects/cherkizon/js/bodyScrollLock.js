'use strict';

$.scrollLock = (function scrollLockClosure() {


  var $html = $('html');
  // State: unlocked by default
  var locked = false;
  // State: scroll to revert to
  var prevScroll = {
    scrollLeft: $(window).scrollLeft(),
    scrollTop: $(window).scrollTop()
  };
  // State: styles to revert to
  var prevStyles = {};
  var lockStyles = {
    'overflow-y': 'scroll',
    'position': 'fixed',
    'width': '100%'
  };

  // Instantiate cache in case someone tries to unlock before locking
  saveStyles();

  // Save context's inline styles in cache
  function saveStyles() {
    var styleAttr = $html.attr('style');
    var styleStrs = [];
    var styleHash = {};

    if (!styleAttr) {
      return;
    }

    styleStrs = styleAttr.split(/;\s/);

    $.each(styleStrs, function serializeStyleProp(styleString) {
      if (!styleString) {
        return;
      }

      var keyValue = styleString.split(/\s:\s/);

      if (keyValue.length < 2) {
        return;
      }

      styleHash[keyValue[0]] = keyValue[1];
    });

    $.extend(prevStyles, styleHash);
  }

  function lock() {
    var appliedLock = {};

    // Duplicate execution will break DOM statefulness
    if (locked) {
      return;
    }

    // Save scroll state...
    prevScroll = {
      scrollLeft: $(window).scrollLeft(),
      scrollTop: $(window).scrollTop()
    };

    // ...and styles
    saveStyles();

    // Compose our applied CSS
    $.extend(appliedLock, lockStyles, {
      // And apply scroll state as styles
      'left': -prevScroll.scrollLeft + 'px',
      'top': -prevScroll.scrollTop + 'px'
    });

    // Then lock styles...
    $html.css(appliedLock);

    // ...and scroll state
    $(window)
      .scrollLeft(0)
      .scrollTop(0);

    locked = true;
  }

  function unlock() {
    // Duplicate execution will break DOM statefulness
    if (!locked) {
      return;
    }

    // Revert styles
    $html.attr('style', $('<x>').css(prevStyles).attr('style') || '');

    // Revert scroll values
    $(window)
      .scrollLeft(prevScroll.scrollLeft)
      .scrollTop(prevScroll.scrollTop);

    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } else { // Otherwise, toggle
      if (locked) {
        unlock();
      } else {
        lock();
      }
    }
  };
}());
jquery.scrollLock.simple.js
$.scrollLock = (function scrollLockSimple() {
  var locked = false;
  var $body;
  var previous;

  function lock() {
    if (!$body) {
      $body = $('body');
    }

    previous = $body.css('overflow');

    $body.css('overflow', 'hidden');

    locked = true;
  }

  function unlock() {
    $body.css('overflow', previous);

    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } else { // Otherwise, toggle
      if (locked) {
        unlock();
      } else {
        lock();
      }
    }
  };
}());
