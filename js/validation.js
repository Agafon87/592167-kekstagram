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
    // берем только первую ошибку
    // for (var i = 0; i < validationFunctions.length; i++) {
    //   var error = validationFunctions[i](hash);
    //   if (error !== '') {
    //     return error;
    //   }
    // }
    var errorMessage = '';
    validationFunctions.find(function (it) {
      errorMessage = it(hash);
      return errorMessage !== '';
    });
    return errorMessage;
  };

  var testHashTags = function (hashes) {
    var errorMessages = '';

    var hashValidateFunctions = [
      isHashTagBeginSymbolLattice,
      isHashTagOnlySymbolLattice,
      isTwoHashTagsInOne,
      isHashTagMoreThanTwentySymbols
    ];

    // пройдемся до первой ошибки
    // for (var i = 0; i < hashes.length; i++) {
    //   errorMessages = createErrorString(hashes[i], hashValidateFunctions);
    //   if (errorMessages !== '') {
    //     return errorMessages;
    //   }
    // }
    hashes.find(function (it) {
      errorMessages = createErrorString(it, hashValidateFunctions);
      return errorMessages !== '';
    });

    if (hashes.length > 1 && compareArrayElement(hashes)) {
      return HASH_REPEAT_ERROR;
    }

    return errorMessages;
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
