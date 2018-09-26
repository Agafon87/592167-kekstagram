'use strict';

(function () {

  var uploadFile = document.querySelector('.img-upload__input');
  var changeForm = document.querySelector('.img-upload__overlay');

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
  };


  // Функция закрывающая popup окно редактирования фото
  var closePopupChangeForm = function () {
    window.effectsPreview.resetUploadPreviewEffects();
    changeForm.classList.add('hidden');
    document.removeEventListener('keydown', escClickHandler);
    uploadFile.value = '';
  };


  uploadFile.addEventListener('change', openPopupChangeForm);


  var uploadCancel = document.querySelector('#upload-cancel');
  uploadCancel.addEventListener('click', closePopupChangeForm);
})();
