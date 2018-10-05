'use strict';

(function () {
  // Объявление переменных
  var AVATAR_AMOUNT_MIN = 1;
  var AVATAR_AMOUNT_MAX = 6;
  var AMOUNT_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var cloneBigPictureComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var amountComments = bigPicture.querySelector('.actual-comments-count');
  var body = document.body;
  var necessaryComments;

  // Функция возвращающая комментарий
  var renderComment = function (comment) {
    var cloneElement = cloneBigPictureComment.cloneNode(true);

    cloneElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(AVATAR_AMOUNT_MIN, AVATAR_AMOUNT_MAX) + '.svg';
    cloneElement.querySelector('.social__text').textContent = comment;

    return cloneElement;
  };


  // Функция возращающая новую порцию комментариев
  var getNewPortionComments = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (it) {
      fragment.appendChild(renderComment(it));
    });

    return fragment;
  };


  // Функция добавляющая комментарии при нажатии кнопки commentsLoader
  var buttonCommentsLoaderClickHandler = function () {
    var amountVisibleComments = bigPictureComments.querySelectorAll('.social__comment');
    var differenceVisibleCommentsAndAllComments = necessaryComments.length - amountVisibleComments.length;
    var fragmentCommentsNew;
    if (differenceVisibleCommentsAndAllComments > 0 && differenceVisibleCommentsAndAllComments > AMOUNT_COMMENTS) {
      fragmentCommentsNew = getNewPortionComments(necessaryComments.slice(amountVisibleComments.length, amountVisibleComments.length + AMOUNT_COMMENTS));
    } else if (differenceVisibleCommentsAndAllComments > 0 && differenceVisibleCommentsAndAllComments <= AMOUNT_COMMENTS) {
      fragmentCommentsNew = getNewPortionComments(necessaryComments.slice(amountVisibleComments.length, amountVisibleComments.length + differenceVisibleCommentsAndAllComments));
      commentsLoader.classList.add('hidden');
    }

    var actualCommentsCount = amountVisibleComments.length + fragmentCommentsNew.children.length;
    bigPictureComments.appendChild(fragmentCommentsNew);
    amountComments.textContent = actualCommentsCount;
  };

  // Функция возвращающая все данные картинки, по которой был произведен клик
  var findPicture = function (current) {
    var srcPicture = current.children[0].attributes.src.value;
    var picture = window.getPhotoOtherPersons().find(function (element) {
      return element.url === srcPicture;
    });

    return picture;
  };

  var renderBigPicture = function (selectedPicture) {
    necessaryComments = selectedPicture.comments;
    bigPicture.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', escBigPictureClickHandler);
    bigPicture.querySelector('img[alt="Девушка в купальнике"]').src = selectedPicture.url;
    bigPicture.querySelector('.likes-count').textContent = selectedPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = selectedPicture.comments.length;
    amountComments.textContent = (selectedPicture.comments.length > AMOUNT_COMMENTS) ? AMOUNT_COMMENTS : selectedPicture.comments.length;

    bigPictureComments.innerHTML = '';

    var fragmentComment = document.createDocumentFragment();
    var commentsCount = (selectedPicture.comments.length > AMOUNT_COMMENTS) ? AMOUNT_COMMENTS : selectedPicture.comments.length;
    for (var j = 0; j < commentsCount; j++) {
      fragmentComment.appendChild(renderComment(selectedPicture.comments[j]));
    }

    bigPictureComments.appendChild(fragmentComment);

    bigPicture.querySelector('.social__caption').textContent = selectedPicture.description;

    commentsLoader.addEventListener('click', buttonCommentsLoaderClickHandler);

    if (selectedPicture.comments.length < AMOUNT_COMMENTS) {
      commentsLoader.classList.add('hidden');
    }
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
    // for (var indexImg = 0; indexImg < allPhotos.length; indexImg++) {
    //   allPhotos[indexImg].addEventListener('click', function (evt) {
    //     renderBigPicture(findPicture(evt.currentTarget));
    //   });
    // }
    allPhotos.forEach(function (it) {
      it.addEventListener('click', function (evt) {
        renderBigPicture(findPicture(evt.currentTarget));
      });
    });
  };


  // Закрытие отображения увеличенного изображения при нажатии на крестик
  var BigPictureCancel = document.querySelector('#picture-cancel');
  BigPictureCancel.addEventListener('click', closePopupBigPicture);
})();
