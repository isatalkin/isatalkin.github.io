ymaps.ready(function(){var r=new ymaps.Map("map",{center:[55.848608,37.581726],zoom:16,controls:[]},{suppressMapOpenBlock:!0},{searchControlProvider:"yandex#search"}),o=new ymaps.Placemark([55.848608,37.581726],{},{iconLayout:"default#image",iconImageHref:"img/map-pin.png",iconImageSize:[43,55],iconImageOffset:[-22,-55]});r.geoObjects.add(o),r.controls.remove("rulerControl"),r.controls.remove("searchControl"),r.controls.remove("trafficControl"),r.controls.remove("typeSelector"),r.controls.remove("zoomControl"),r.controls.remove("geolocationControl"),r.controls.remove("routeEditor");var e={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return e.Android()||e.BlackBerry()||e.iOS()||e.Opera()||e.Windows()}};e.any()&&r.behaviors.disable("drag")});