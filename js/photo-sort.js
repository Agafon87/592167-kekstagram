'use strict';

(function () {
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

    // Список случайных фото, в количестве 10 штук
    var randomTenPhotosArray = [];
    var randomIndexTenPhotosArray = [];
    for (var i = 1; i <= 10; i++) {
      for (;;) {
        var number = window.util.getRandomNumber(0, 24);
        if (randomIndexTenPhotosArray.indexOf(number) === -1) {
          randomIndexTenPhotosArray.push(number);
          break;
        }
      }
    }
    for (var j = 0; j < randomIndexTenPhotosArray.length; j++) {
      randomTenPhotosArray.push(actualListPhotos[randomIndexTenPhotosArray[j]]);
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
