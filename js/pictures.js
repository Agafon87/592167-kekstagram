'use strict';

// Объявление переменных
var AMOUNT_PHOTO = 25;
var LIKES_AMOUNT_MIN = 15;
var LIKES_AMOUNT_MAX = 200;
var ARRAY_COMMENTS_AMOUNT_MIN = 0;
var ARRAY_COMMENTS_AMOUNT_MAX = 5;
var ARRAY_DESCRIPTIONS_AMOUNT_MIN = 0;
var ARRAY_DESCRIPTIONS_AMOUNT_MAX = 5;
var INDEX_PHOTO_MIN = 1;
var INDEX_PHOTO_MAX = AMOUNT_PHOTO;
var AVATAR_AMOUNT_MIN = 1;
var AVATAR_AMOUNT_MAX = 6;
var ESC_KEYCODE_PRESS = 27;
var EFFECT_CHROME_MIN = 0;
var EFFECT_CHROME_MAX = 1;
var EFFECT_SEPIA_MIN = 0;
var EFFECT_SEPIA_MAX = 1;
var EFFECT_MARVIN_MIN = 0;
var EFFECT_MARVIN_MAX = 100;
var EFFECT_PHOBOS_MIN = 0;
var EFFECT_PHOBOS_MAX = 3;
var EFFECT_HEAT_MIN = 1;
var EFFECT_HEAT_MAX = 3;
var ONE_HUNDRED_PERCENT = 100;


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

// Функция возвращающая произвольное число в указанном диапазоне
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

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
  var commentsCount = getRandomNumber(1, 2);
  for (var i = 0; i < commentsCount; i++) {
    arrPhotoComments.push(ARRAY_COMMENTS[getRandomNumber(ARRAY_COMMENTS_AMOUNT_MIN, ARRAY_COMMENTS_AMOUNT_MAX)]);
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
    var indexPhoto = getRandomNumber(INDEX_PHOTO_MIN, INDEX_PHOTO_MAX);
    if (arrayIndexPhoto.indexOf(indexPhoto) === -1) {
      arrayIndexPhoto.push(indexPhoto);
    }
  }
  for (var i = 0; i < arrayIndexPhoto.length; i++) {
    var amountLikesPhoto = getRandomNumber(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX);
    var descriptionPhoto = ARRAY_DESCRIPTIONS[getRandomNumber(ARRAY_DESCRIPTIONS_AMOUNT_MIN, ARRAY_DESCRIPTIONS_AMOUNT_MAX)];
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

// Задание 4 Показываем элемент big-picture
var bigPicture = document.querySelector('.big-picture');
bigPicture.querySelector('img[alt="Девушка в купальнике"]').src = PHOTO_OTHER_PERSONS[0].url;
bigPicture.querySelector('.likes-count').textContent = PHOTO_OTHER_PERSONS[0].likes;
bigPicture.querySelector('.comments-count').textContent = PHOTO_OTHER_PERSONS[0].comments.length;

var cloneBigPictureComment = bigPicture.querySelector('.social__comment').cloneNode(true);
var bigPictureComments = bigPicture.querySelector('.social__comments');
bigPictureComments.innerHTML = '';

// Функция возвращающая комментарий
var renderComment = function (comment) {
  var cloneElement = cloneBigPictureComment.cloneNode(true);

  cloneElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(AVATAR_AMOUNT_MIN, AVATAR_AMOUNT_MAX) + '.svg';
  cloneElement.querySelector('.social__text').textContent = comment;

  return cloneElement;
};

var fragmentComment = document.createDocumentFragment();
for (var j = 0; j < PHOTO_OTHER_PERSONS[0].comments.length; j++) {
  fragmentComment.appendChild(renderComment(PHOTO_OTHER_PERSONS[0].comments[j]));
}

bigPictureComments.appendChild(fragmentComment);

bigPicture.querySelector('.social__caption').textContent = PHOTO_OTHER_PERSONS[0].description;

// Задание 5 Прячет блоки счетчиков комментариев и загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var uploadFile = document.querySelector('.img-upload__input');
var changeForm = document.querySelector('.img-upload__overlay');
var imgUploadPreview = document.querySelector('.img-upload__preview');


// Функция сброса эффектов с картинки
var resetUploadPreviewEffects = function () {
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.removeAttribute('style');
};


// Функция обработчик нажатия клавиши Esc на форме редактирования фото
var escClickHandler = function (evt) {
  var classTarget = evt.target.className;
  if (evt.keyCode === ESC_KEYCODE_PRESS && classTarget !== 'text__hashtags' && classTarget !== 'text__description') {
    closePopupChangeForm();
  }
};


// Функция открывающая окно редактирования фото
var openPopupChangeForm = function () {
  changeForm.classList.remove('hidden');
  document.addEventListener('keydown', escClickHandler);
};


// Функция закрывающая popup окно редактирования фото
var closePopupChangeForm = function () {
  resetUploadPreviewEffects();
  changeForm.classList.add('hidden');
  document.removeEventListener('keydown', escClickHandler);
  uploadFile.value = '';
};


uploadFile.addEventListener('change', openPopupChangeForm);


var uploadCancel = document.querySelector('#upload-cancel');
uploadCancel.addEventListener('click', closePopupChangeForm);


// Обработчик нажатия на радиобатон effect-none
var radioEffectNone = document.querySelector('#effect-none');
radioEffectNone.addEventListener('click', resetUploadPreviewEffects);


// Обработчик нажатия на радиобатон Chrome
var radioEffectChrome = document.querySelector('#effect-chrome');
radioEffectChrome.addEventListener('click', function () {
  resetUploadPreviewEffects();
  imgUploadPreview.classList.add('effects__preview--chrome');
});


// Обработчик нажатия на радиобатон Sepia
var radioEffectSepia = document.querySelector('#effect-sepia');
radioEffectSepia.addEventListener('click', function () {
  resetUploadPreviewEffects();
  imgUploadPreview.classList.add('effects__preview--sepia');
});


// Обработчик нажатия на радиобатон Marvin
var radioEffectMarvin = document.querySelector('#effect-marvin');
radioEffectMarvin.addEventListener('click', function () {
  resetUploadPreviewEffects();
  imgUploadPreview.classList.add('effects__preview--marvin');
});


// Обработчик нажатия на радиобатон Phobos
var radioEffectPhobos = document.querySelector('#effect-phobos');
radioEffectPhobos.addEventListener('click', function () {
  resetUploadPreviewEffects();
  imgUploadPreview.classList.add('effects__preview--phobos');
});


// Обработчик нажатия на радиобатон Heat
var radioEffectHeat = document.querySelector('#effect-heat');
radioEffectHeat.addEventListener('click', function () {
  resetUploadPreviewEffects();
  imgUploadPreview.classList.add('effects__preview--heat');
});


// Функция обработчик нажатия клавиши Esc
var escBigPictureClickHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE_PRESS) {
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


// Функция вычисляющая пропорцию глубины эффекта, переводя пиксели в проценты
var getProportion = function (currentValue, minValue, maxValue) {
  return Math.round(currentValue * ONE_HUNDRED_PERCENT / maxValue);
};

// Функция возвращающая пропорцию интенсивности эффекта в зависимости от установленной величины
var getEffectProportion = function (levelValue, minValue, maxValue) {
  return (levelValue * maxValue / ONE_HUNDRED_PERCENT) + minValue;
};


// Функция возвращающая значение фильтра
var getFilterValue = function (mapName, effectValue) {
  var filterValue = '';
  switch (mapName) {
    case 'effects__preview--chrome':
      filterValue = 'grayscale(' + getEffectProportion(effectValue, EFFECT_CHROME_MIN, EFFECT_CHROME_MAX) + ')';
      break;
    case 'effects__preview--sepia':
      filterValue = 'sepia(' + getEffectProportion(effectValue, EFFECT_SEPIA_MIN, EFFECT_SEPIA_MAX) + ')';
      break;
    case 'effects__preview--marvin':
      filterValue = 'invert(' + getEffectProportion(effectValue, EFFECT_MARVIN_MIN, EFFECT_MARVIN_MAX) + '%)';
      break;
    case 'effects__preview--phobos':
      filterValue = 'blur(' + getEffectProportion(effectValue, EFFECT_PHOBOS_MIN, EFFECT_PHOBOS_MAX) + 'px)';
      break;
    case 'effects__preview--heat':
      filterValue = 'brightness(' + getEffectProportion(effectValue, EFFECT_HEAT_MIN, EFFECT_HEAT_MAX) + ')';
      break;
    default:
      break;
  }

  return filterValue;
};

// Обработчик события слайдера
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value').value;
effectLevelPin.addEventListener('mousedown', function (evt) {
  var startPosition = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var currentLevelPinValue = '';

  var mouseMoveHandler = function (moveEvt) {
    var shift = {
      x: startPosition.x - moveEvt.clientX,
      y: startPosition.y - moveEvt.clientY
    };

    dragged = true;

    startPosition = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var effectLevelPinValue = effectLevelPin.offsetLeft - shift.x;

    if (effectLevelPinValue >= 0 && effectLevelPinValue < 455) {
      effectLevelPin.style.left = effectLevelPinValue + 'px';
      var effectLevelDepth = document.querySelector('.effect-level__depth');
      currentLevelPinValue = getProportion(effectLevelPinValue, 0, 455);
      effectLevelDepth.style.width = currentLevelPinValue + '%';
    }

    var effectClassName = '';

    if (imgUploadPreview.classList.length > 1) {
      effectClassName = imgUploadPreview.classList[1];
      imgUploadPreview.removeAttribute('style');
      imgUploadPreview.style.filter = getFilterValue(effectClassName, currentLevelPinValue);
    }
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    var effectClassName = '';
    if (imgUploadPreview.classList.length > 1) {
      effectClassName = imgUploadPreview.classList[1];
      imgUploadPreview.removeAttribute('style');
      imgUploadPreview.style.filter = getFilterValue(effectClassName, (dragged) ? currentLevelPinValue : effectLevelValue);
    }


    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

});


// Функция добавляющая класс not-valid на поле, если оно не валидно, и навешивает нужное сообщение
var getIsNotValidObject = function (obj, errorMessage) {
  obj.setCustomValidity(errorMessage);
  obj.classList.add('not-valid');
};


// Функция удаляющая класс not-valid с поля
var getIsValidObject = function (obj) {
  obj.setCustomValidity('');
  obj.classList.remove('not-valid');
};


// Функция сравнивающая элементы массива
var compareArrayElement = function (arr) {
  var compareResult = true;
  for (var iArr = 0; iArr < arr.length; iArr++) {
    for (var jArr = iArr + 1; jArr < arr.length; jArr++) {
      var currentElement = arr[iArr];
      var nextElement = arr[jArr];
      if (currentElement.toLowerCase() === nextElement.toLowerCase()) {
        compareResult = false;
      }
    }
  }

  return compareResult;
};


// Функция определяющая что хэш-тег должен начинаться с символа #
var isHashTagBeginSymbolLattice = function (elem) {
  return elem !== '' && elem[0] !== '#';
};

// Функция проверяющая что хэш-тег не может состоять только из одной решётки
var isHashTagOnlySymbolLattice = function (elem) {
  return elem === '#';
};

// Функция проверяющая что хэш-теги должны разделяться пробелами
var isTwoHashTagsInOne = function (elem) {
  if (elem.length > 0 && elem.length <= 20) {
    var symbolLattice = [];
    for (var letterIndex = 0; letterIndex < elem.length; letterIndex++) {
      var letter = elem[letterIndex];
      if (letter === '#') {
        symbolLattice.push(letter);
      }
    }
    if (symbolLattice.length > 1) {
      return false;
    }
  }

  return true;
};

// Функция проверяющая что максимальная длина одного хэш-тега 20 символов, включая решётку
var isHashTagMoreThanTwentySymbols = function (elem) {
  return elem.length > 20;
};


// Функция проверки хэш-тегов
var testHashTags = function (element, arr) {
  var errorMessages = [];
  for (var hashIndex = 0; hashIndex < arr.length; hashIndex++) {
    var currentHash = arr[hashIndex];
    errorMessages.push(isHashTagBeginSymbolLattice(currentHash) ? 'хэш-тег должен начинаться с символа #' : '');
    errorMessages.push(isHashTagOnlySymbolLattice(currentHash) ? 'хэш-тег не может состоять только из одной решётки' : '');
    errorMessages.push(!isTwoHashTagsInOne(currentHash) ? 'хэш-теги разделяются пробелами' : '');
    errorMessages.push(isHashTagMoreThanTwentySymbols(currentHash) ? 'максимальная длина одного хэш-тега 20 символов, включая решётку' : '');
  }

  var tmp = '';
  for (var erMessageIndex = 0; erMessageIndex < errorMessages.length; erMessageIndex++) {
    if (tmp === '') {
      tmp = errorMessages[erMessageIndex];
    }
  }

  if (tmp !== '') {
    getIsNotValidObject(element, tmp);
  } else if (!compareArrayElement(arr)) {
    getIsNotValidObject(element, 'один и тот же хэш-тег не может быть использован дважды');
  } else {
    getIsValidObject(element);
  }
};


// Функция обработчик отправки формы
var buttonSubmitHandler = function () {
  var inputHash = document.querySelector('.text__hashtags');
  var hashTags = inputHash.value.split(' ');
  if (hashTags.length > 0 && hashTags.length <= 5) {
    testHashTags(inputHash, hashTags);
  } else if (hashTags.length > 5) {
    getIsNotValidObject(inputHash, 'Нельзя указывать больше пяти хэш-тегов');
  } else {
    getIsValidObject(inputHash);
  }
};

// Обработчик отправки формы редактирования формы
var buttonSubmit = document.querySelector('#upload-submit');
buttonSubmit.addEventListener('click', buttonSubmitHandler);
