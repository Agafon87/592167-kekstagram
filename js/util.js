'use strict';

(function () {
  // Функция возвращающая произвольное число в указанном диапазоне
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };


  // Функция проверяющая формат фото
  var checkFormatPhoto = function (fileName) {

    var matches = window.commonConstants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };


  // Функция убирающая класс not-valid
  var removeNotValidClass = function (element) {
    element.setCustomValidity('');
    element.classList.remove('not-valid');
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    checkFormatPhoto: checkFormatPhoto,
    removeNotValidClass: removeNotValidClass
  };
})();
