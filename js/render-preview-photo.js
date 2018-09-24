'use strict';

(function () {
  var AMOUNT_PHOTO = 25;
  var LIKES_AMOUNT_MIN = 15;
  var LIKES_AMOUNT_MAX = 200;
  var ARRAY_COMMENTS_AMOUNT_MIN = 0;
  var ARRAY_COMMENTS_AMOUNT_MAX = 5;
  var ARRAY_DESCRIPTIONS_AMOUNT_MIN = 0;
  var ARRAY_DESCRIPTIONS_AMOUNT_MAX = 5;
  var INDEX_PHOTO_MIN = 1;
  var INDEX_PHOTO_MAX = AMOUNT_PHOTO;

  var PHOTO_OTHER_PERSONS = [];

  var ARRAY_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var ARRAY_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];


  // Функция возвращающая объект - фотография
  var getPhotoDescription = function (indexUrl, amountLikes, commentContent, descriptionContent) {
    return {
      url: 'photos/' + indexUrl + '.jpg',
      likes: amountLikes,
      comments: commentContent,
      description: descriptionContent
    };
  };

  // Функция возвращающая комментарии к фотографии
  var getPhotoComments = function () {
    var arrPhotoComments = [];
    var commentsCount = window.util.getRandomNumber(1, 2);
    for (var i = 0; i < commentsCount; i++) {
      arrPhotoComments.push(ARRAY_COMMENTS[window.util.getRandomNumber(ARRAY_COMMENTS_AMOUNT_MIN, ARRAY_COMMENTS_AMOUNT_MAX)]);
    }

    return arrPhotoComments;
  };

  // Функция формирующая объект фото и размещающая его в массиве PHOTO_OTHER_PERSONS
  (function () {
    var arrayIndexPhoto = [];
    for (;;) {
      if (arrayIndexPhoto.length >= INDEX_PHOTO_MAX) {
        break;
      }
      var indexPhoto = window.util.getRandomNumber(INDEX_PHOTO_MIN, INDEX_PHOTO_MAX);
      if (arrayIndexPhoto.indexOf(indexPhoto) === -1) {
        arrayIndexPhoto.push(indexPhoto);
      }
    }
    for (var i = 0; i < arrayIndexPhoto.length; i++) {
      var amountLikesPhoto = window.util.getRandomNumber(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX);
      var descriptionPhoto = ARRAY_DESCRIPTIONS[window.util.getRandomNumber(ARRAY_DESCRIPTIONS_AMOUNT_MIN, ARRAY_DESCRIPTIONS_AMOUNT_MAX)];
      var photoDescription = getPhotoDescription(arrayIndexPhoto[i], amountLikesPhoto, getPhotoComments(), descriptionPhoto);
      PHOTO_OTHER_PERSONS.push(photoDescription);
    }
  })();

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

  for (var i = 0; i < PHOTO_OTHER_PERSONS.length; i++) {
    var picture = renderPhoto(PHOTO_OTHER_PERSONS[i]);

    fragment.appendChild(picture);
  }

  photoListElement.appendChild(fragment);

  window.renderPreviewPhoto = {
    photoOtherPersons: PHOTO_OTHER_PERSONS[0]
  };
})();
