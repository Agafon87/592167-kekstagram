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


  var buttonFilterPopularClickHandler = window.debounce(function () {
    // Список фото скаченный с сайта
    actualListPhotos = window.getPhotoOtherPersons();
    clearPreviewPhotos();
    filterPopular.classList.add('img-filters__button--active');
    window.renderPhotos(actualListPhotos);
  });


  var buttonFilterNewClickHandler = window.debounce(function () {
    actualListPhotos = window.getPhotoOtherPersons();

    var randomTenPhotosArray = [];
    var startPhotoIndex = window.util.getRandomNumber(PHOTO_INDEX_MIN, PHOTO_INDEX_MAX);
    for (var j = startPhotoIndex; j < startPhotoIndex + AMOUNT_PHOTO; j++) {
      randomTenPhotosArray.push(actualListPhotos[j]);
    }
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
