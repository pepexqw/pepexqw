let cachedData = null;
let lastFetchTime = 0;

async function fetchData() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    if (!response.ok) {
        throw new Error('Ошибка при получении данных');
    }
    return await response.json();
}

export default async function handler(req, res) {
    const apiKeys = ["2134Ffasdj_F1", "1231DK4214_D1", "fhJKFHkf_!3f"]; // Массив ваших API-ключей
    const { api_key } = req.query; // Извлечение API-ключа из запроса

    // Проверка API-ключа
    if (!apiKeys.includes(api_key)) {
        return res.status(401).json({ error: "Неавторизованный доступ. Неверный API-ключ." });
    }

    const currentTime = Date.now();

    // Если данные устарели, обновляем их
    if (!cachedData || (currentTime - lastFetchTime > 60000)) {
        try {
            cachedData = await fetchData();
            lastFetchTime = currentTime;
        } catch (error) {
            return res.status(500).json({ error: "Ошибка при получении данных." });
        }
    }

    // Создаем объект ответа без поля PreviousURL
    const responseData = {
        Date: cachedData.Date,
        PreviousDate: cachedData.PreviousDate,
        Timestamp: cachedData.Timestamp,
        Valute: cachedData.Valute
    };

    // Возвращаем кэшированные данные
    res.status(200).json(responseData);
}
