'use strict';

(function () {
  // Функция возвращающая произвольное число в указанном диапазоне
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };


  // Функция проверяющая формат фото
  var checkFormatPhoto = function (fileName) {
    // var fileChooser = document.querySelector('.img-upload__start input[type=file]');
    // var file = fileChooser.files[0];
    // var fileName = file.name.toLowerCase();

    var matches = window.commonConstants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    checkFormatPhoto: checkFormatPhoto
  };
})();
