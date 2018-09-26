'use strict';

(function () {
  // Объявление переменных
  var EFFECT_CHROME_MIN = 0;
  var EFFECT_CHROME_MAX = 1;
  var EFFECT_SEPIA_MIN = 0;
  var EFFECT_SEPIA_MAX = 1;
  var EFFECT_MARVIN_MIN = 0;
  var EFFECT_MARVIN_MAX = 100;
  var EFFECT_PHOBOS_MIN = 0;
  var EFFECT_PHOBOS_MAX = 3;
  var EFFECT_HEAT_MIN = 0;
  var EFFECT_HEAT_MAX = 2;
  var ONE_HUNDRED_PERCENT = 100;
  var EFFECT_LEVEL_PIN_MAX = 455;

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var sliderEffectLevel = document.querySelector('.img-upload__effect-level.effect-level');
  var scaleControlValue = document.querySelector('.scale__control--value');


  // Функция сброса эффектов с картинки
  var resetUploadPreviewEffects = function () {
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.removeAttribute('style');
    sliderEffectLevel.classList.remove('visually-hidden');
    scaleControlValue.removeAttribute('value');
    scaleControlValue.setAttribute('value', '100%');
  };


  // Функция возвращающая положение пина слайдера в позиции 100%
  var getSliderPinOneHundredPercent = function () {
    var effectLevelPin = document.querySelector('.effect-level__pin');
    var effectLevelDepth = document.querySelector('.effect-level__depth');

    effectLevelPin.style.left = EFFECT_LEVEL_PIN_MAX + 'px';
    effectLevelDepth.style.width = ONE_HUNDRED_PERCENT + '%';
  };


  // Обработчик нажатия на радиобатон effect-none
  var radioEffectNone = document.querySelector('#effect-none');
  radioEffectNone.addEventListener('click', function () {
    resetUploadPreviewEffects();
    sliderEffectLevel.classList.add('visually-hidden');
  });


  // Обработчик нажатия на радиобатон Chrome
  var radioEffectChrome = document.querySelector('#effect-chrome');
  radioEffectChrome.addEventListener('click', function () {
    resetUploadPreviewEffects();
    getSliderPinOneHundredPercent();
    imgUploadPreview.classList.add('effects__preview--chrome');
  });


  // Обработчик нажатия на радиобатон Sepia
  var radioEffectSepia = document.querySelector('#effect-sepia');
  radioEffectSepia.addEventListener('click', function () {
    resetUploadPreviewEffects();
    getSliderPinOneHundredPercent();
    imgUploadPreview.classList.add('effects__preview--sepia');
  });


  // Обработчик нажатия на радиобатон Marvin
  var radioEffectMarvin = document.querySelector('#effect-marvin');
  radioEffectMarvin.addEventListener('click', function () {
    resetUploadPreviewEffects();
    getSliderPinOneHundredPercent();
    imgUploadPreview.classList.add('effects__preview--marvin');
  });


  // Обработчик нажатия на радиобатон Phobos
  var radioEffectPhobos = document.querySelector('#effect-phobos');
  radioEffectPhobos.addEventListener('click', function () {
    resetUploadPreviewEffects();
    getSliderPinOneHundredPercent();
    imgUploadPreview.classList.add('effects__preview--phobos');
  });


  // Обработчик нажатия на радиобатон Heat
  var radioEffectHeat = document.querySelector('#effect-heat');
  radioEffectHeat.addEventListener('click', function () {
    resetUploadPreviewEffects();
    getSliderPinOneHundredPercent();
    imgUploadPreview.classList.add('effects__preview--heat');
  });


  // Функция вычисляющая пропорцию глубины эффекта, переводя пиксели в проценты
  var getProportion = function (currentValue, minValue, maxValue) {
    return Math.round(currentValue * ONE_HUNDRED_PERCENT / maxValue);
  };

  // Функция возвращающая пропорцию интенсивности эффекта в зависимости от установленной величины
  var getEffectProportion = function (levelValue, minValue, maxValue) {
    return (levelValue * maxValue / ONE_HUNDRED_PERCENT) + minValue;
  };


  // Функция возвращающая значение фильтра
  var getFilterValue = function (mapName, effectValue) {
    var filterValue = '';
    switch (mapName) {
      case 'effects__preview--chrome':
        filterValue = 'grayscale(' + getEffectProportion(effectValue, EFFECT_CHROME_MIN, EFFECT_CHROME_MAX) + ')';
        break;
      case 'effects__preview--sepia':
        filterValue = 'sepia(' + getEffectProportion(effectValue, EFFECT_SEPIA_MIN, EFFECT_SEPIA_MAX) + ')';
        break;
      case 'effects__preview--marvin':
        filterValue = 'invert(' + getEffectProportion(effectValue, EFFECT_MARVIN_MIN, EFFECT_MARVIN_MAX) + '%)';
        break;
      case 'effects__preview--phobos':
        filterValue = 'blur(' + getEffectProportion(effectValue, EFFECT_PHOBOS_MIN, EFFECT_PHOBOS_MAX) + 'px)';
        break;
      case 'effects__preview--heat':
        filterValue = 'brightness(' + (getEffectProportion(effectValue, EFFECT_HEAT_MIN, EFFECT_HEAT_MAX) + 1) + ')';
        break;
      default:
        break;
    }

    return filterValue;
  };

  window.effectsPreview = {
    getProportion: getProportion,
    getFilterValue: getFilterValue,
    resetUploadPreviewEffects: resetUploadPreviewEffects
  };
})();
