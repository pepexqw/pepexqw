<?php
// Проверяем, отправлена ли форма
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получаем введенные данные
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // хешируем пароль

    // Создаем массив данных пользователя
    $data = array(
        'username' => $username,
        'email' => $email,
        'password' => $password
    );

    // Сохраняем данные в JSON-файл users.json
    file_put_contents('users.json', json_encode($data));
    
    echo "<p style='color: green'>Пользователь успешно зарегистрирован!</p>";
}
?>
<a href="index.html">Вернуться назад</a>