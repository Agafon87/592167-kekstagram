'use strict';

(function () {

  var fileChooser = document.querySelector('.img-upload__start input[type=file]');
  var picture = document.querySelector('img[alt="Предварительный просмотр фотографии"]');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (window.util.checkFormatPhoto()) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
