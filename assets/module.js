const fs = require("fs");

//Функции для работы с файлами

function ReadFilesv3(day, month, year) {
  let texti = "";
  var files = fs.readdirSync("assets\\data\\addlessons", { encoding: "utf-8" });
  files.forEach((file) => {
    if(file=="les_"+day+"."+month+"."+year+".txt") {
      texti += fs.readFileSync(`assets\\data\\addlessons\\${file}`);
    }});
    return texti;
  };

function GetFile(){
  return fs.readdirSync("assets\\data\\addlessons", { encoding: "utf-8" });
}

//Массив записей за текущий день

var d = new Date();
const arr =ReadFilesv3(d.getDate(),d.getMonth()+1,d.getFullYear()).split("/").filter((str) => str.length>3);
  
  
  module.exports = {
    ReadFiles: ReadFilesv3,
    GetFile: GetFile,
    CDArr: arr
  }