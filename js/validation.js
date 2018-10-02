'use strict';

(function () {
  var HASH_TAG_MAX_LENGTH = 20;
  var MAX_COUNT_HASH_TAGS = 5;

  // Функция добавляющая класс not-valid на поле, если оно не валидно, и навешивает нужное сообщение
  var getIsNotValidObject = function (obj, errorMessage) {
    obj.setCustomValidity(errorMessage);
    obj.classList.add('not-valid');
  };


  // Функция удаляющая класс not-valid с поля
  var getIsValidObject = function (obj) {
    obj.setCustomValidity('');
    obj.classList.remove('not-valid');
  };


  // Функция сравнивающая элементы массива
  var compareArrayElement = function (arr) {
    for (var iArr = 0; iArr < arr.length; iArr++) {
      for (var jArr = iArr + 1; jArr < arr.length; jArr++) {
        var currentElement = arr[iArr];
        var nextElement = arr[jArr];
        if (currentElement.toLowerCase() === nextElement.toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  };


  // Функция определяющая что хэш-тег должен начинаться с символа #
  var isHashTagBeginSymbolLattice = function (elem) {
    return elem !== '' && elem[0] !== '#';
  };

  // Функция проверяющая что хэш-тег не может состоять только из одной решётки
  var isHashTagOnlySymbolLattice = function (elem) {
    return elem === '#';
  };

  // Функция проверяющая что хэш-теги должны разделяться пробелами
  var isTwoHashTagsInOne = function (elem) {
    if (elem.length > 0 && elem.length <= HASH_TAG_MAX_LENGTH) {
      var symbolLattice = 0;
      for (var letterIndex = 0; letterIndex < elem.length; letterIndex++) {
        if (symbolLattice >= 2) {
          return false;
        }
        var letter = elem[letterIndex];
        if (letter === '#') {
          symbolLattice++;
        }
      }
    }

    return true;
  };


  // Функция проверяющая что максимальная длина одного хэш-тега 20 символов, включая решётку
  var isHashTagMoreThanTwentySymbols = function (elem) {
    return elem.length > HASH_TAG_MAX_LENGTH;
  };

  var testHashTags = function (element, arr) {
    var errorMessages = [];
    for (var hashIndex = 0; hashIndex < arr.length; hashIndex++) {
      var currentHash = arr[hashIndex];
      errorMessages.push(isHashTagBeginSymbolLattice(currentHash) ? 'хэш-тег должен начинаться с символа #' : '');
      errorMessages.push(isHashTagOnlySymbolLattice(currentHash) ? 'хэш-тег не может состоять только из одной решётки' : '');
      errorMessages.push(!isTwoHashTagsInOne(currentHash) ? 'хэш-теги разделяются пробелами' : '');
      errorMessages.push(isHashTagMoreThanTwentySymbols(currentHash) ? 'максимальная длина одного хэш-тега 20 символов, включая решётку' : '');
    }

    var tmp = '';
    for (var i = 0; i < errorMessages.length; i++) {
      if (errorMessages[i] !== '') {
        tmp = errorMessages[i];
        break;
      }
    }

    if (tmp !== '') {
      getIsNotValidObject(element, tmp);
    } else if (!compareArrayElement(arr)) {
      getIsNotValidObject(element, 'один и тот же хэш-тег не может быть использован дважды');
    } else {
      getIsValidObject(element);
    }
  };


  var getValidationHash = function () {
    var inputHash = document.querySelector('.text__hashtags');
    var hashTags = inputHash.value.split(' ');
    if (hashTags.length > 0 && hashTags.length <= MAX_COUNT_HASH_TAGS) {
      testHashTags(inputHash, hashTags);
    } else if (hashTags.length > MAX_COUNT_HASH_TAGS) {
      getIsNotValidObject(inputHash, 'Нельзя указывать больше пяти хэш-тегов');
    } else {
      getIsValidObject(inputHash);
    }

    return inputHash.validity.valid;
  };

  window.validation = {
    getValidationHash: getValidationHash,
    getIsValidObject: getIsValidObject
  };
})();
