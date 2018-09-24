'use strict';

// Функция обработчик отправки формы
var buttonSubmitHandler = function () {
  window.validation.getValidationHash();
};


// Обработчик отправки формы редактирования формы
var buttonSubmit = document.querySelector('#upload-submit');
buttonSubmit.addEventListener('click', buttonSubmitHandler);
