'use strict';

(function () {
  // Объявление переменных
  var EFFECT_LEVEL_PIN_MIN = 0;
  var EFFECT_LEVEL_PIN_MAX = 455;

  // Обработчик события слайдера
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };


    var currentLevelPinValue = '';

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };


      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var effectLevelPinValue = effectLevelPin.offsetLeft - shift.x;

      if (effectLevelPinValue >= EFFECT_LEVEL_PIN_MIN && effectLevelPinValue < EFFECT_LEVEL_PIN_MAX) {
        effectLevelPin.style.left = effectLevelPinValue + 'px';
        var effectLevelDepth = document.querySelector('.effect-level__depth');
        currentLevelPinValue = window.effectsPreview.getProportion(effectLevelPinValue, EFFECT_LEVEL_PIN_MIN, EFFECT_LEVEL_PIN_MAX);
        effectLevelDepth.style.width = currentLevelPinValue + '%';
        effectLevelValue.setAttribute('value', currentLevelPinValue);
      }

      var effectClassName = '';

      if (imgUploadPreview.classList.length > 1) {
        effectClassName = imgUploadPreview.classList[1];
        imgUploadPreview.style.filter = '';
        imgUploadPreview.style.filter = window.effectsPreview.getFilterValue(effectClassName, currentLevelPinValue);
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      var effectClassName = '';
      if (imgUploadPreview.classList.length > 1) {
        effectClassName = imgUploadPreview.classList[1];
        imgUploadPreview.style.filter = '';
        imgUploadPreview.style.filter = window.effectsPreview.getFilterValue(effectClassName, currentLevelPinValue);
      }


      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });
})();
