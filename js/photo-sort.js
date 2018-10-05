'use strict';

(function () {
  var AMOUNT_PHOTO = 10;
  var PHOTO_INDEX_MIN = 0;
  var PHOTO_INDEX_MAX = 14;

  var imgFilter = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var actualListPhotos;

  var clearPreviewPhotos = function () {
    var photosPreview = document.querySelectorAll('.picture');
    var buttonsSort = document.querySelectorAll('.img-filters__button');
    buttonsSort.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });
    photosPreview.forEach(function (it) {
      it.remove();
    });
  };

  var shuffleArray = function (array) {
    var m = array.length;
    var t;
    var i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };


  var buttonFilterPopularClickHandler = window.debounce(function () {
    // Список фото скаченный с сайта
    actualListPhotos = window.getPhotoOtherPersons();
    clearPreviewPhotos();
    filterPopular.classList.add('img-filters__button--active');
    window.renderPhotos(actualListPhotos);
  });


  var buttonFilterNewClickHandler = window.debounce(function () {
    actualListPhotos = window.getPhotoOtherPersons();
    // генерируем случайное число от 0 до 14 и вытаскиваем из оригинального массива 10 фото,
    // после их между собой перемешиваем
    var startInsexPhoto = window.util.getRandomNumber(PHOTO_INDEX_MIN, PHOTO_INDEX_MAX);
    var randomTenPhotosArray = shuffleArray(actualListPhotos.slice(startInsexPhoto, startInsexPhoto + AMOUNT_PHOTO));
    clearPreviewPhotos();
    filterNew.classList.add('img-filters__button--active');
    window.renderPhotos(randomTenPhotosArray);
  });


  var buttonFilterDiscussedClickHandler = window.debounce(function () {
    actualListPhotos = window.getPhotoOtherPersons();

    // Список фото отсортированный по убыванию комментариев
    var decreaseSort = actualListPhotos.slice(0).sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    clearPreviewPhotos();
    filterDiscussed.classList.add('img-filters__button--active');
    window.renderPhotos(decreaseSort);
  });

  filterPopular.addEventListener('click', buttonFilterPopularClickHandler);


  filterNew.addEventListener('click', buttonFilterNewClickHandler);


  filterDiscussed.addEventListener('click', buttonFilterDiscussedClickHandler);


  window.photoSort = function () {
    imgFilter.classList.remove('img-filters--inactive');
  };
})();
