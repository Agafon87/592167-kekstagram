'use strict';

(function () {
  var cbSuccess = function (photos) {
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

    for (var i = 0; i < photos.length; i++) {
      var picture = renderPhoto(photos[i]);
      picture.addEventListener('click', window.util.openPopupBigPicture);

      fragment.appendChild(picture);
    }

    photoListElement.appendChild(fragment);

    window.bigPicture();

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
