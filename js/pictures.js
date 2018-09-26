'use strict';

(function () {
  var form = document.querySelector('#upload-select-image');
  var changeForm = document.querySelector('.img-upload__overlay');
  var uploadSubmit = document.querySelector('#upload-submit');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var cbSuccess = function (response) {
    if (response) {
      window.uploadPicture.closePopupChangeForm();
      changeForm.classList.add('hidden');
    }
  };

  var cbError = function (errorMessage) {
    var elem = document.querySelector('.error-message-to-server');
    if (!elem) {
      var container = document.createElement('div');
      container.classList.add('error-message-to-server');
      container.textContent = errorMessage;
      imgUploadPreview.insertBefore(container, imgUploadPreview.children[0]);
    }
  };

  // Функция обработчик отправки формы
  var buttonSubmitHandler = function (evt) {
    if (window.validation.getValidationHash()) {
      window.backend.save(new FormData(form), cbSuccess, cbError);
      evt.preventDefault();
    }
  };


  // Обработчик отправки формы редактирования формы
  uploadSubmit.addEventListener('click', buttonSubmitHandler);
})();
