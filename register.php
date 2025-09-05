<?php
session_start();
require_once('session_start.php'); // старт сессии перед обработкой

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = password_hash(filter_input(INPUT_POST, 'password'), PASSWORD_DEFAULT);

    if ($username && $password) {
        // Тут должна быть проверка наличия имени пользователя в БД (если используется база)
        // Простое сохранение в массиве (для демо-версии)
        $_SESSION['username'] = $username;
        $_SESSION['logged_in'] = true;
        header('Location: index.php');
        exit();
    } else {
        $errors[] = 'Необходимо заполнить оба поля!';
    }
}
?>

<!-- Возвращаемся обратно на главную страницу -->
<script>window.location.href='./';</script>
