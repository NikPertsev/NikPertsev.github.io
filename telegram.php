<?php

$token = '7327285588:AAE-CWawdP6rf7xOeTCpYLAU2S9ZNPE02X4'; // Токен который мы получили при регистрации бота
$chat_id = '-4216142023';

$arr = [
	"Имя клиента: " => trim(strip_tags($_POST['fname'])),
    "Фамилия клиента: " => trim(strip_tags($_POST['sname'])),
	"Телефон клиента: " => trim(strip_tags($_POST['number'])),
	"Email клиента: " => trim(strip_tags($_POST['mail'])),
];

foreach ($arr as $key => $value) {
	$txt .= "" . $key . "" . $value . "%0A";
}

$url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}";
$proxy = "154.36.110.199:6853";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);

// url на который осуществляется отправка
// тестового запроса работает через https
// поэтому нужно добавить флаги для работы с ssl
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

// Подключение к прокси серверу
curl_setopt($ch, CURLOPT_PROXY, $proxy);

// если требуется авторизация
curl_setopt($ch, CURLOPT_PROXYUSERPWD,'ykscuofy:n1mffb0wm01d');

// отправка запроса
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
$curl_scraped_page = curl_exec($ch);
curl_close($ch);

// Конец обращения к Telegram API

//м.б. из-за этого не работает?
header("Location: ./views/individuals.ejs");
exit;

?>