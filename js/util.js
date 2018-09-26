'use strict';

(function () {
  // Функция возвращающая произвольное число в указанном диапазоне
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  window.util = {
    getRandomNumber: getRandomNumber
  };
})();
