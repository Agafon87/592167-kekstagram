'use strict';

(function () {
  var form = document.querySelector('#upload-select-image');
  var changeForm = document.querySelector('.img-upload__overlay');
  var uploadSubmit = document.querySelector('#upload-submit');
  var mainTag = document.querySelector('main');


  // Функция закрытия окна оповещения об удачной загрузки на сервер
  var cbSectionSuccessClose = function () {
    var sectionSuccess = document.querySelector('.success');
    mainTag.removeChild(sectionSuccess);

    document.removeEventListener('keydown', escSuccessModalClickHandler);
    document.removeEventListener('click', cbSectionSuccessClose);
  };


  // Функция обработчик нажатия клавиши esc для successModal
  var escSuccessModalClickHandler = function (evt) {
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS) {
      cbSectionSuccessClose();
    }
  };


  var getSuccessModal = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var successModal = successTemplate.cloneNode(true);
    mainTag.appendChild(successModal);

    document.addEventListener('click', cbSectionSuccessClose);
    document.addEventListener('keydown', escSuccessModalClickHandler);
  };


  var getErrorModal = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorModal = errorTemplate.cloneNode(true);
    errorModal.querySelector('.error__title').textContent = errorMessage;

    mainTag.appendChild(errorModal);

    document.addEventListener('keydown', escErrorModalClickHandler);
    document.addEventListener('click', cbSectionErrorClose);
  };


  // Функция обработчик нажатия клавиши esc для errorModal
  var escErrorModalClickHandler = function (evt) {
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS) {
      cbSectionErrorClose();
    }
  };

  var cbSectionErrorClose = function () {
    var sectionError = document.querySelector('.error');
    mainTag.removeChild(sectionError);

    document.removeEventListener('keydown', escErrorModalClickHandler);
    document.removeEventListener('click', cbSectionErrorClose);
  };

  var cbSuccess = function (response) {
    if (response) {
      window.uploadPicture.closePopupChangeForm();
      changeForm.classList.add('hidden');
      getSuccessModal();
    }
  };

  var cbError = function (errorMessage) {
    window.uploadPicture.closePopupChangeForm();
    changeForm.classList.add('hidden');
    getErrorModal(errorMessage);
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
