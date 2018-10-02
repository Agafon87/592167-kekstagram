'use strict';

(function () {
  // Объявление переменных
  var EFFECT_LEVEL_PIN_MIN = 0;
  var EFFECT_LEVEL_PIN_MAX = 455;

  // Обработчик события слайдера
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectClassName = '';

  var checkLengthClassList = function (currentLevelPinValue) {
    if (imgUploadPreview.classList.length > 1) {
      effectClassName = imgUploadPreview.classList[1];
      imgUploadPreview.style.filter = '';
      imgUploadPreview.style.filter = window.effectsPreview.getFilterValue(effectClassName, currentLevelPinValue);
    }
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var startPosition = {
      x: evt.clientX,
    };

    var currentLevelPinValue = '';
    var dragged = false;


    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startPosition.x - moveEvt.clientX,
      };
      dragged = true;


      startPosition = {
        x: moveEvt.clientX,
      };

      var effectLevelPinValue = effectLevelPin.offsetLeft - shift.x;

      if (effectLevelPinValue >= EFFECT_LEVEL_PIN_MIN && effectLevelPinValue < EFFECT_LEVEL_PIN_MAX) {
        effectLevelPin.style.left = effectLevelPinValue + 'px';
        var effectLevelDepth = document.querySelector('.effect-level__depth');
        currentLevelPinValue = window.effectsPreview.getProportion(effectLevelPinValue, EFFECT_LEVEL_PIN_MIN, EFFECT_LEVEL_PIN_MAX);
        effectLevelDepth.style.width = currentLevelPinValue + '%';
        effectLevelValue.setAttribute('value', currentLevelPinValue);
      }

      checkLengthClassList(currentLevelPinValue);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (!dragged) {
        checkLengthClassList(effectLevelValue.value);
      }
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });
})();
