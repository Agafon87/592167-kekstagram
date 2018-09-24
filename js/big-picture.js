'use strict';

(function () {
  // Объявление переменных
  var AVATAR_AMOUNT_MIN = 1;
  var AVATAR_AMOUNT_MAX = 6;

  // Задание 4 Показываем элемент big-picture
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('img[alt="Девушка в купальнике"]').src = window.renderPreviewPhoto.photoOtherPersons.url;
  bigPicture.querySelector('.likes-count').textContent = window.renderPreviewPhoto.photoOtherPersons.likes;
  bigPicture.querySelector('.comments-count').textContent = window.renderPreviewPhoto.photoOtherPersons.comments.length;

  var cloneBigPictureComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  bigPictureComments.innerHTML = '';

  // Функция возвращающая комментарий
  var renderComment = function (comment) {
    var cloneElement = cloneBigPictureComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(AVATAR_AMOUNT_MIN, AVATAR_AMOUNT_MAX) + '.svg';
    cloneElement.querySelector('.social__text').textContent = comment;

    return cloneElement;
  };

  var fragmentComment = document.createDocumentFragment();
  for (var j = 0; j < window.renderPreviewPhoto.photoOtherPersons.comments.length; j++) {
    fragmentComment.appendChild(renderComment(window.renderPreviewPhoto.photoOtherPersons.comments[j]));
  }

  bigPictureComments.appendChild(fragmentComment);

  bigPicture.querySelector('.social__caption').textContent = window.renderPreviewPhoto.photoOtherPersons.description;

  // Задание 5 Прячет блоки счетчиков комментариев и загрузки новых комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  // Функция обработчик нажатия клавиши Esc
  var escBigPictureClickHandler = function (evt) {
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS) {
      closePopupBigPicture();
    }
  };


  // Функция открывающая окно редактирования фото
  var openPopupBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', escBigPictureClickHandler);
  };


  // Функция закрывающая popup окно редактирования фото
  var closePopupBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', escBigPictureClickHandler);
  };


  // Прикручиваем к каждой картинке обработчик события открытия увеличенного изображения
  var allPhotos = document.querySelectorAll('.picture');
  for (var indexImg = 0; indexImg < allPhotos.length; indexImg++) {
    allPhotos[indexImg].addEventListener('click', openPopupBigPicture);
  }


  // Закрытие отображения увеличенного изображения при нажатии на крестик
  var BigPictureCancel = document.querySelector('#picture-cancel');
  BigPictureCancel.addEventListener('click', closePopupBigPicture);
})();
