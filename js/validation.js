'use strict';

(function () {
  var HASH_TAG_MAX_LENGTH = 20;
  var MAX_COUNT_HASH_TAGS = 5;
  var HASH_FIRST_SYMBOL_ERROR = 'хэш-тег должен начинаться с символа #';
  var HASH_EMPTY_ERROR = 'хэш-тег не может состоять только из одной решётки';
  var HASH_SEPARATOR_ERROR = 'хэш-теги разделяются пробелами';
  var HASH_MAX_LENGTH_ERROR = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
  var HASH_OVERLOAD_ERROR = 'Нельзя указывать больше пяти хэш-тегов';
  var HASH_REPEAT_ERROR = 'один и тот же хэш-тег не может быть использован дважды';
  var ZERO = 0;
  var inputHash = document.querySelector('.text__hashtags');


  var setValidObject = function (valid, errorMessage) {
    if (valid) {
      window.util.removeNotValidClass(inputHash);
    } else {
      inputHash.setCustomValidity(errorMessage);
      inputHash.classList.add('not-valid');
    }
  };

  // Функция сравнивающая элементы массива
  var compareArrayElement = function (hashes) {
    return hashes.map(function (hash) {
      return hash.toLowerCase();
    }).some(function (hash, indx, arr) {
      return arr.indexOf(hash) !== indx;
    });
  };


  // Функция определяющая что хэш-тег должен начинаться с символа #
  var isHashTagBeginSymbolLattice = function (elem) {
    return elem[0] === '#' ? '' : HASH_FIRST_SYMBOL_ERROR;
  };

  // Функция проверяющая что хэш-тег не может состоять только из одной решётки
  var isHashTagOnlySymbolLattice = function (elem) {
    return elem === '#' ? HASH_EMPTY_ERROR : '';
  };

  // Функция проверяющая что хэш-теги должны разделяться пробелами
  var isTwoHashTagsInOne = function (elem) {
    return elem.slice(1).search('#') === -1 ? '' : HASH_SEPARATOR_ERROR;
  };


  // Функция проверяющая что максимальная длина одного хэш-тега 20 символов, включая решётку
  var isHashTagMoreThanTwentySymbols = function (elem) {
    return elem.length > HASH_TAG_MAX_LENGTH ? HASH_MAX_LENGTH_ERROR : '';
  };

  var createErrorString = function (hash, validationFunctions) {
    var errorMessage = [];
    validationFunctions.forEach(function (it) {
      var error = it(hash);
      if (error !== '') {
        errorMessage.push(error);
      }
    });

    // return only one or empty
    if (errorMessage.length > 0) {
      return errorMessage[0];
    }

    return '';
  };

  var testHashTags = function (hashes) {
    var errorMessages = [];

    var hashValidateFunctions = [
      isHashTagBeginSymbolLattice,
      isHashTagOnlySymbolLattice,
      isTwoHashTagsInOne,
      isHashTagMoreThanTwentySymbols
    ];


    errorMessages = hashes.map(function (it) {
      return createErrorString(it, hashValidateFunctions);
    }).filter(function (it) {
      return it !== '';
    });

    if (hashes.length > 1 && compareArrayElement(hashes)) {
      errorMessages.push(HASH_REPEAT_ERROR);
    }

    errorMessages.push('');
    return errorMessages[0];
  };


  var getValidationHash = function () {
    // массив из введенных значений, откинем случайные дубли пробелов
    var hashTags = inputHash.value.split(' ').filter(function (hash) {
      return hash.length > ZERO;
    });


    if (hashTags.length > MAX_COUNT_HASH_TAGS) {
      setValidObject(false, HASH_OVERLOAD_ERROR);
    } else if (hashTags.length > ZERO) {
      var hashTestResult = testHashTags(hashTags);
      setValidObject(hashTestResult === '', hashTestResult);
    } else if (hashTags.length === ZERO) {
      setValidObject(true);
    }

    return inputHash.validity.valid;
  };

  window.validation = {
    getValidationHash: getValidationHash,
    setValidObject: setValidObject
  };
})();
