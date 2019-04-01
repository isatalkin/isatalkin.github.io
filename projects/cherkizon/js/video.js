'use strict';

(function () {
  var section = document.querySelector('.video');
  var frame = document.querySelector('.video__player');
  var player = new Vimeo.Player('video__player');
  var slogan = document.querySelector('.video__slogan');
  var button = document.querySelector('.video__play');

  var playVideo = function (evt) {
    evt.preventDefault();
    section.classList.add('video--playing');
    player.play();
  };

  player.on('play', function () {
    frame.classList.add('video__player--show');
    slogan.classList.add('video__slogan--hide');
    button.classList.add('video__play--hide');
  });

  // player.on('pause', function () {
  //   slogan.classList.remove('video__slogan--hide');
  //   button.classList.remove('video__play--hide');
  // });

  player.on('finish', function () {
    section.classList.remove('video--playing');
    slogan.classList.remove('video__slogan--hide');
    button.classList.remove('video__play--hide');
    frame.classList.remove('video__player--show');
  });

  button.addEventListener('click', playVideo);
})();
