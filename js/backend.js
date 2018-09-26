'use strict';

(function () {
  var xhrSettings = function (cbSuccess, cbError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        cbSuccess(xhr.response);
      } else {
        cbError('Что-то пошло не так' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      cbError('Произошла ошибка подключения');
    });

    xhr.addEventListener('timeout', function () {
      cbError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 1000;

    return xhr;
  };

  var load = function (cbSuccess, cbError) {
    var url = 'https://js.dump.academy/kekstagram/data';
    var xhr = xhrSettings(cbSuccess, cbError);

    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (data, cbSuccess, cbError) {
    var url = 'https://js.dump.academy/kekstagram';
    var xhr = xhrSettings(cbSuccess, cbError);

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
