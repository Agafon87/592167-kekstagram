'use strict';

(function () {

  var PICTURE_ERROR_CODE = 'Вы можете загрузить файлы только в следующих форматах: gif, jpg, jpeg, png';
  var uploadFile = document.querySelector('.img-upload__input');
  var changeForm = document.querySelector('.img-upload__overlay');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var sliderEffectLevel = document.querySelector('.img-upload__effect-level.effect-level');
  var picture = document.querySelector('img[alt="Предварительный просмотр фотографии"]');
  var elem = document.querySelector('.error-message-from-server');
  var uploadCancel = document.querySelector('#upload-cancel');
  var effectRadioDefault = document.querySelector('#effect-none');

  // Функция обработчик нажатия клавиши Esc на форме редактирования фото
  var escClickHandler = function (evt) {
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS && evt.srcElement.name !== 'description' && evt.srcElement.name !== 'hashtags') {
      closePopupChangeForm();
    }
  };


  // Функция открывающая окно редактирования фото
  var openPopupChangeForm = function (e) {
    var file = e.target.files[0];
    if (window.util.checkFormatPhoto(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });
      reader.readAsDataURL(file);

      if (elem) {
        elem.remove();
      }
      changeForm.classList.remove('hidden');
      document.addEventListener('keydown', escClickHandler);
      sliderEffectLevel.classList.add('visually-hidden');
    } else {
      if (!elem) {
        var container = document.createElement('div');
        container.classList.add('error-message-from-server');
        container.textContent = PICTURE_ERROR_CODE;
        document.body.insertBefore(container, document.body.children[0]);
        elem = document.body.children[0];
      }
    }
  };


  // Функция закрывающая popup окно редактирования фото
  var closePopupChangeForm = function () {
    window.effectsPreview.resetUploadPreviewEffects();
    window.util.removeNotValidClass(textHashtags);
    textHashtags.value = '';
    textDescription.value = '';
    effectRadioDefault.checked = true;
    document.removeEventListener('keydown', escClickHandler);
    uploadFile.value = '';
    changeForm.classList.add('hidden');
  };


  uploadFile.addEventListener('change', openPopupChangeForm);

  uploadCancel.addEventListener('click', closePopupChangeForm);

  window.uploadPicture = {
    closePopupChangeForm: closePopupChangeForm
  };
})();
