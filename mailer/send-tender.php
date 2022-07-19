<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$user_name = $_POST['username-tender'];
$user_phone = $_POST['usertel-tender'];
$user_email = $_POST['useremail-tender'];
$userfile = $_FILES['userfile-tender'];

// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'vinnichenkoanton.cv@gmail.com'; // Логин на почте
    $mail->Password   = 'wlxtbwowdhcsmlza'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('mail@yandex.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('vinnichenkoanton.cv@gmail.com');  

    // Прикрипление файлов к письму
if (!empty($userfile['name'][0])) {
    for ($ct = 0; $ct < count($userfile['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($userfile['name'][$ct]));
        $filename = $userfile['name'][$ct];
        if (move_uploaded_file($userfile['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = 'Письмо от Ecobud(Тендер)';
$mail->Body = '
    Пользователь сайта <b>Ecobud</b> оставил заявку!<br><br> 
    Имя: ' . $user_name . ' <br>
    Номер телефона: ' . $user_phone . ' <br>
    Email: ' . $user_email . ' <br>
    Файл(ы): прикреплен(ы) ';    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);