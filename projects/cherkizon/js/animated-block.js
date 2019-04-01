'use strict';

(function () {
  if (window.innerWidth > 767) {
    var controller = new ScrollMagic.Controller();
    var animatedBlocks = document.querySelectorAll('.animated-block');

    for (var i = 0; i < animatedBlocks.length; i++) {
      new ScrollMagic.Scene({
          triggerElement: animatedBlocks[i],
          triggerHook: 0.8
        })
        .setClassToggle(animatedBlocks[i], 'show')
        .reverse(false)
        .addTo(controller);
    }
  }
})();
