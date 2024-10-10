//ScriptCalendar Begin

var Cal = function (divId) {
  //Сохраняем идентификатор div
  this.divId = divId;
  // Дни недели с понедельника
  this.DaysOfWeek = ["Пн", "Вт", "Ср", "Чтв", "Птн", "Суб", "Вск"];
  // Месяцы начиная с января
  this.Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  //Устанавливаем текущий месяц, год
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};
// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
  document.getElementById("currMonth").textContent =
    this.Months[this.currMonth] + " " + this.currYear + " г.";
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {
  var d = new Date(),
    // Первый день недели в выбранном месяце
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    // Последний день выбранного месяца
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    // Последний день предыдущего месяца
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = "<table>";
  // Запись выбранного месяца и года
  //html += "<thead><tr>";
  //html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
  //html += "</tr></thead>";
  // заголовок дней недели
  html += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    html += "<td>" + this.DaysOfWeek[i] + "</td>";
  }
  html += "</tr>";
  // Записываем дни
  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();
    // Начать новую строку в понедельник
    if (dow == 1) {
      html += "<tr>";
    }
    // Если первый день недели не понедельник показать последние дни предыдущего месяца
    else if (i == 1) {
      html += "<tr>";
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html +=
        '<td><div class="pointer pointer__dis"></div> <div class="divtoday">' +
        i +
        "</div></td>";
    } else {
      html +=
        '<td><div class="pointer pointer__dis"></div> <div class="divnormal">' +
        i +
        "</div></td>";
    }
    // закрыть строку в воскресенье
    if (dow == 0) {
      html += "</tr>";
    }
    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + "</td>";
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);
  // Конец таблицы
  html += "</table>";
  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;
};
// При загрузке окна
window.onload = function () {
  // Начать календарь
  var c = new Cal("divCal");
  c.showcurr();
  // Привязываем кнопки «Следующий» и «Предыдущий»
  getId("btnNext").onclick = function () {
    c.nextMonth();
    CellsBinding(c);
    listClear();
  };
  getId("btnPrev").onclick = function () {
    c.previousMonth();
    CellsBinding(c);
    listClear();
  };
  CellsBinding(c);
};

// Получить элемент по id

function getId(id) {
  return document.getElementById(id);
}

//ScriptCalendar End

//Привязка файлов с расписанием и ячеек к календарю

function CellsBinding(cal) {
  var cells = getId("divCal").getElementsByTagName("td");
  for (var cell of cells) {
    cell.addEventListener("click", (e) => {
      setData(e.target.textContent, cal.currMonth, cal.currYear);
    });
  }

  // AJAX запрос для отображения активных дней. Проверяются все файлы
  // и для этих дней в css присваивается класс pointer

  const requestURL = "/raspisanied";
  const xhr = new XMLHttpRequest();
  xhr.open('GET', requestURL);
  xhr.onload = () => {
    if (xhr.status !== 200) {
      return;
    }
    let test = xhr.response.split("/").filter((str) => str.length>3);
    test.forEach((node)=>{
      let arr1 = node.replace("les_","").replace(".txt","").split(".");
      if(parseInt(arr1[1])==cal.currMonth+1 && parseInt(arr1[2])==cal.currYear){
        getId("divCal").getElementsByTagName("td")
        .item(parseInt(arr1[0])+6+new Date(parseInt(arr1[2]), parseInt(arr1[1])-1, 0).getDay()).getElementsByClassName("pointer pointer__dis")
        .item(0).className = "pointer";
      }
    });
  }
  xhr.send();
}

//AJAX запрос для выгрузки записей из txt в лист при клике на какой то день

function setData(day, month, year) {
  const requestURL = `/raspisanieupload/${day}/${month+1}/${year}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', requestURL);
  xhr.onload = () => {
    if (xhr.status !== 200) {
      return;
    }
    const arr = xhr.responseText.split("/").filter((str) => str.length>3);
    let result = "";
    arr.forEach((node) =>{
      result+=`<li>${node}</li>`;
    });
    document.querySelector('.list__lessons').innerHTML = result;
  }
  xhr.send();
}

//очистить ul (list li)

function listClear(){
  document.querySelector('.list__lessons').innerHTML = "";
}