'use strict';

(function () {
  var ARRAY_DESCRIPTIONS_AMOUNT_MIN = 0;
  var ARRAY_DESCRIPTIONS_AMOUNT_MAX = 5;

  var ARRAY_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];


  window.renderPhotos = function (photos) {
    // Находим элемент в который потом вставим фото других пользователей
    var photoListElement = document.querySelector('.pictures');

    // Находим template picture и записываем его в переменную
    var pictureOtherPersonsTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

    var renderPhoto = function (photo) {
      var photoElement = pictureOtherPersonsTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;

      return photoElement;
    };

    var fragment = document.createDocumentFragment();

    photos.forEach(function (it) {
      fragment.appendChild(renderPhoto(it));
    });

    photoListElement.appendChild(fragment);

    window.bigPicture();
    window.photoSort();
  };

  var cbSuccess = function (photos) {
    photos.forEach(function (it) {
      if (!it.description) {
        it.description = ARRAY_DESCRIPTIONS[window.util.getRandomNumber(ARRAY_DESCRIPTIONS_AMOUNT_MIN, ARRAY_DESCRIPTIONS_AMOUNT_MAX)];
      }
    });

    window.renderPhotos(photos);

    window.getPhotoOtherPersons = function () {
      return photos;
    };
  };

  var cbError = function (errorMessage) {
    var elem = document.querySelector('.error-message-from-server');
    if (!elem) {
      var container = document.createElement('div');
      container.classList.add('error-message-from-server');
      container.textContent = errorMessage;
      document.body.insertBefore(container, document.body.children[0]);
    }
  };

  window.backend.load(cbSuccess, cbError);

})();
