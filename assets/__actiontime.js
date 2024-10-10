function getCookie(name) {
  // Функция получения куки по имени
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var checkbutt = document.getElementById("but");
checkbutt.disabled = true;
function checkButton() {
  var time = new Date(); // Получаем текущую дату
  var cookie = getCookie("clicked"); //Получаем куки по имени через функцию
  var dif = 0; // Если нет значения в куки, то останется 0
  if (cookie) {
    //Если куки существую, то
    let cookieTime = new Date(cookie); // Преобразуем значение куки в дату
    let dif1 = time - cookieTime; // Вычитаем текущее время минус время куки, чтобы получить разницу.
    dif = Math.round(dif1 / 1000); // округляем и делим на 1000(это миллисекунды)
  }
  var z = document.getElementById("text"); // получаем значение куда записывать (для теста
  var duration = 60; // Длительность между нажатиями.Поставил 60 секунд для демонстрации. Заменить 1200, если нужен час.

  if (dif > duration || dif == 0) {
    // Если длительность больше указанного времени, или равно 0, то выполняем операцию
    checkbutt.disabled = false;
  } else {
    checkbutt.disabled = true;
    var f = duration - dif; // получаем разницу для вывода сенкуд. Можно будет поменять до минут и так далее, смотря как надо выводить
    z.innerText = "До повторного нажатия кнопки подождите " + f + " секунд"; // Выводим сообщение с таймером секунд.
  }
}

setInterval(checkButton, 500);

but.onclick = function () {
  // При нажатии кнопки
  var time = new Date();
  document.cookie = "clicked=" + time; // Записываем данные в куки по имени.
};
