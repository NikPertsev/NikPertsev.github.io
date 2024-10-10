//Подключение модулей

const mdl = require("./assets/module.js");

//Сервер с помощью express js (первичная настройка)

const exp = require("express");
const app = exp();
app.set("view engine", "ejs");
app.use(exp.static("assets"));

//Подгрузка страниц

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contacts", (req, res) => {
  res.render("contacts");
});
app.get("/individuals", (req, res) => {
  res.render("individuals");
});
app.get("/onlinelessons", (req, res) => {
  res.render("onlinelessons");
});

//Подгрузка записей за текущий день и страницы raspisanie

app.get("/raspisanie", (req, res) => {
  res.render("raspisanie", { strings: mdl.CDArr});
});

//AJAX Запросы для raspisanie

app.get("/raspisanieupload/:day/:month/:year", (req, res) => {
  res.write(mdl.ReadFiles(req.params.day, req.params.month, req.params.year));
  res.end();
});


app.get("/raspisanied", (req, res) => {
  let result = "/";
  mdl.GetFile().forEach((node) =>{
    result+=node;
    result+="/";
  });
  res.send(result);
});

//Сервер с помощью express js (финальная настройка)

const PORT = 3000;
//const HOST = 'Fabi';

app.listen(PORT, () => {
  console.log(`server was created at: http://localhost:${PORT}`);
});