ymaps.ready(function(){var o=new ymaps.Map("map",{center:[55.778274,37.586859],zoom:17,controls:[]},{suppressMapOpenBlock:!0},{searchControlProvider:"yandex#search"}),e=new ymaps.Placemark([55.778274,37.586859],{},{iconLayout:"default#image",iconImageHref:"img/svg-sprite/map-pin.svg",iconImageSize:[51,69],iconImageOffset:[-26,-69]});o.geoObjects.add(e),o.controls.remove("rulerControl"),o.controls.remove("searchControl"),o.controls.remove("trafficControl"),o.controls.remove("typeSelector"),o.controls.remove("zoomControl"),o.controls.remove("geolocationControl"),o.controls.remove("routeEditor"),o.behaviors.disable("scrollZoom"),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&o.behaviors.disable("drag")});