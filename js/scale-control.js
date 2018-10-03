'use strict';

(function () {
  var SCALE_CONTROL_VALUE_MIN = 25;
  var SCALE_CONTROL_VALUE_MAX = 100;
  var SCALE_CONTROL_STEP = 25;

  var scaleControlValue = document.querySelector('.scale__control--value');
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var image = document.querySelector('.img-upload__preview');
  var scaleValue;

  var renderScaleControlValue = function (value) {
    scaleControlValue.setAttribute('value', value + '%');
  };

  var buttonBiggerClickHandler = function () {
    scaleValue = parseInt(document.querySelector('.scale__control--value').value, 10);
    if (scaleValue >= SCALE_CONTROL_VALUE_MIN && scaleValue < SCALE_CONTROL_VALUE_MAX) {
      scaleValue = scaleValue + SCALE_CONTROL_STEP;
      renderScaleControlValue(scaleValue);
      image.style.transform = 'scale(' + (scaleValue / window.commonConstants.ONE_HUNDRED_PERCENT) + ')';
    }
  };

  var buttonSmallerClickHandler = function () {
    scaleValue = parseInt(document.querySelector('.scale__control--value').value, 10);
    if (scaleValue > SCALE_CONTROL_VALUE_MIN && scaleValue <= SCALE_CONTROL_VALUE_MAX) {
      scaleValue = scaleValue - SCALE_CONTROL_STEP;
      renderScaleControlValue(scaleValue);
      image.style.transform = 'scale(' + (scaleValue / window.commonConstants.ONE_HUNDRED_PERCENT) + ')';
    }
  };

  buttonBigger.addEventListener('click', buttonBiggerClickHandler);

  buttonSmaller.addEventListener('click', buttonSmallerClickHandler);
})();
