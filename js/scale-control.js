'use strict';

(function () {
  var scaleControlValue = document.querySelector('.scale__control--value');
  // var scaleControlIntValue = parseInt(scaleControlValue.value, 10);
  var buttonBigger = document.querySelector('.scale__control--bigger');
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var image = document.querySelector('.img-upload__preview');
  var scaleValue = 0;

  var renderScaleControlValue = function (value) {
    scaleControlValue.removeAttribute('value');
    scaleControlValue.setAttribute('value', value + '%');
  };

  var buttonBiggerClickHandler = function () {
    scaleValue = parseInt(document.querySelector('.scale__control--value').value, 10);
    if (scaleValue >= 25 && scaleValue < 100) {
      scaleValue = scaleValue + 25;
      renderScaleControlValue(scaleValue);
      image.style.transform = 'scale(' + (scaleValue / 100) + ')';
    }
  };

  var buttonSmallerClickHandler = function () {
    scaleValue = parseInt(document.querySelector('.scale__control--value').value, 10);
    if (scaleValue > 25 && scaleValue <= 100) {
      scaleValue = scaleValue - 25;
      renderScaleControlValue(scaleValue);
      image.style.transform = 'scale(' + (scaleValue / 100) + ')';
    }
  };

  buttonBigger.addEventListener('click', buttonBiggerClickHandler);

  buttonSmaller.addEventListener('click', buttonSmallerClickHandler);
})();
