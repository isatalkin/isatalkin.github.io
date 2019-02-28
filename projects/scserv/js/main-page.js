'use strict';

(function () {

  // Анимация заголовка

  // Применяем парсер HTML, который разделяет заголовок по символам
  Splitting();
  // Берём коллекцию символов и к каждому символу применяем анимацию
  var headingChars = document.querySelectorAll('.hero__title .char');
  var delay = 0; // Изначальная задержка анимации
  Array.prototype.forEach.call(headingChars, function (char) {
    char.classList.add('fall');
    char.style.animationDelay = delay + 's';
    delay += 0.15; // Каждому следующему символу увеличиваем задержу начала анимации
  });

  // Далее идёт инициализация слайдеров

  // Если блоков с картинкой больше одного, создаем кнопки, пагинацию и инициализируем слайдер
  if (document.querySelectorAll('.about-slider__slide').length > 1) {

    var slider = document.querySelector('.about-slider');
    var fragment = document.createDocumentFragment();
    var buttonPrev = createButton('prev');
    var buttonNext = createButton('next');
    var pagination = createPagination();
    fragment.appendChild(pagination);
    fragment.appendChild(buttonPrev);
    fragment.appendChild(buttonNext);
    slider.appendChild(fragment);


    var aboutSlider = new Swiper('.about-slider', {
      loop: true,
      slidesPerView: 1,
      navigation: {
        nextEl: '.about-slider__button--next',
        prevEl: '.about-slider__button--prev'
      },
      pagination: {
        el: '.about-slider__pagination'
      }
    });
  }

  // Также инициализируем слайдер клиентов
  var clientSlider = new Swiper('.main-clients__slider', {
    loop: true,
    navigation: {
      nextEl: '.main-clients__button--next',
      prevEl: '.main-clients__button--prev'
    },
    slidesPerView: 5,
    spaceBetween: 30,
    breakpoints: {
      991: {
        slidesPerView: 3
      },
      767: {
        slidesPerView: 1
      }
    }
  });

  // Функция для создания кнопки слайдера
  function createButton(role) {
    var element = document.createElement('button');
    element.type = 'button';
    element.classList.add('swiper-button-' + role);
    element.classList.add('about-slider__button');
    element.classList.add('about-slider__button--' + role);
    return element;
  }

  // Функция для создания пагинации в слайдере
  function createPagination() {
    var element = document.createElement('div');
    element.classList.add('swiper-pagination');
    element.classList.add('about-slider__pagination');
    return element;
  }

})();
