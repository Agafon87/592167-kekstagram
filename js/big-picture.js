'use strict';

(function () {
  // Объявление переменных
  var AVATAR_AMOUNT_MIN = 1;
  var AVATAR_AMOUNT_MAX = 6;

  var bigPicture = document.querySelector('.big-picture');
  var cloneBigPictureComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var body = document.body;

  // Функция возвращающая комментарий
  var renderComment = function (comment) {
    var cloneElement = cloneBigPictureComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(AVATAR_AMOUNT_MIN, AVATAR_AMOUNT_MAX) + '.svg';
    cloneElement.querySelector('.social__text').textContent = comment;

    return cloneElement;
  };

  // Функция возвращающая все данные картинки, по которой был произведен клик
  var findPicture = function (evt) {
    var srcPicture = evt.srcElement.attributes.src.value;
    var picture = window.getPhotoOtherPersons().find(function (element) {
      return element.url === srcPicture;
    });

    return picture;
  };

  var renderBigPicture = function (selectedPicture) {

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', escBigPictureClickHandler);
    bigPicture.querySelector('img[alt="Девушка в купальнике"]').src = selectedPicture.url;
    bigPicture.querySelector('.likes-count').textContent = selectedPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = selectedPicture.comments.length;


    var bigPictureComments = bigPicture.querySelector('.social__comments');
    bigPictureComments.innerHTML = '';

    var fragmentComment = document.createDocumentFragment();
    for (var j = 0; j < selectedPicture.comments.length; j++) {
      fragmentComment.appendChild(renderComment(selectedPicture.comments[j]));
    }

    bigPictureComments.appendChild(fragmentComment);

    bigPicture.querySelector('.social__caption').textContent = selectedPicture.description;

    // Прячем блоки счетчиков комментариев и загрузки новых комментариев
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  };


  // Функция обработчик нажатия клавиши Esc
  var escBigPictureClickHandler = function (evt) {
    if (evt.keyCode === window.commonConstants.ESC_KEYCODE_PRESS) {
      closePopupBigPicture();
    }
  };


  // Функция закрывающая popup окно редактирования фото
  var closePopupBigPicture = function () {
    body.removeAttribute('class');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', escBigPictureClickHandler);
  };


  // Прикручиваем к каждой картинке обработчик события открытия увеличенного изображения
  window.bigPicture = function () {
    var allPhotos = document.querySelectorAll('.picture');
    for (var indexImg = 0; indexImg < allPhotos.length; indexImg++) {
      allPhotos[indexImg].addEventListener('click', function (evt) {
        renderBigPicture(findPicture(evt));
      });
    }
  };


  // Закрытие отображения увеличенного изображения при нажатии на крестик
  var BigPictureCancel = document.querySelector('#picture-cancel');
  BigPictureCancel.addEventListener('click', closePopupBigPicture);
})();
