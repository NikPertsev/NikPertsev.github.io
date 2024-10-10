//Действия по работе текстовых полей при клике на них

document.addEventListener("click", (e) => {
  const div1 = e.currentTarget.getElementsByClassName("textbox__container");
  for (let index = 0; index < div1.length; index++) {
    const element = div1[index];
    const _div1 = element.getElementsByClassName("textbox__desc")[0];
    const choose = e.composedPath().includes(element);
    if (choose) _div1.className = "textbox__desc ui-field--active";
    if (!choose) _div1.className = "textbox__desc";
  }
});

document.querySelector("form").addEventListener("submit", (e) => {
  document.querySelector("div.result").className = "result--active";
});



// CSRFToken хз зачем но вдруг пригодится (безопасность сайтов)

/*
function addCSRFToken() {
  var hiddenField = document.createElement("input");
  hiddenField.type = "hidden";
  hiddenField.name = "csrf_token";
  hiddenField.value = "heroboraredcostnaya";
  document.getElementById("secureForm").appendChild(hiddenField);
}

window.addEventListener("DOMContentLoaded", (event) => {
  addCSRFToken();
});

*/
