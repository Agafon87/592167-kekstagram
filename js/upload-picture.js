'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var changeForm = document.querySelector('.img-upload__overlay');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var sliderEffectLevel = document.querySelector('.img-upload__effect-level.effect-level');

  // Функция обработчик нажатия клавиши Esc на форме редактирования фото
  var escClickHandler = function (evt) {
    var classTarget = evt.target.className;
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS && classTarget !== 'text__hashtags' && classTarget !== 'text__description') {
      closePopupChangeForm();
    }
  };


  // Функция открывающая окно редактирования фото
  var openPopupChangeForm = function () {
    changeForm.classList.remove('hidden');
    document.addEventListener('keydown', escClickHandler);
    sliderEffectLevel.classList.add('visually-hidden');
  };


  // Функция закрывающая popup окно редактирования фото
  var closePopupChangeForm = function () {
    window.effectsPreview.resetUploadPreviewEffects();
    textHashtags.value = '';
    window.validation.getIsValidObject(textHashtags);
    textDescription.value = '';
    var effectRadioDefault = document.querySelector('#effect-none');
    effectRadioDefault.checked = true;
    document.removeEventListener('keydown', escClickHandler);
    uploadFile.value = '';
    changeForm.classList.add('hidden');
  };


  uploadFile.addEventListener('change', openPopupChangeForm);


  var uploadCancel = document.querySelector('#upload-cancel');
  uploadCancel.addEventListener('click', closePopupChangeForm);

  window.uploadPicture = {
    closePopupChangeForm: closePopupChangeForm
  };
})();
