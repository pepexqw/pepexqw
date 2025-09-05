// Скрипт для переключения светлой и тёмной темы

let theme = localStorage.getItem('theme');
if (theme === null) {
    setTheme(); // Использовать дефолтную тему
} else {
    applyTheme(theme); // Применяем сохранённую ранее тему
}

function toggleTheme() {
    let currentTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function applyTheme(newTheme) {
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${newTheme}-theme`);
}

function setTheme() {
    // Устанавливаем начальную тему
    let userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    let initialTheme = userPrefersDarkMode.matches ? 'dark' : 'light';
    applyTheme(initialTheme);
}
