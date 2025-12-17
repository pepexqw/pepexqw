let messages = [];  // Массив для хранения сообщений

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log("Полученные данные:", data);
        
        // Сохраняем сообщение
        messages.push(data.message);
        res.status(200).json({ status: 'success', received: data });
    } else if (req.method === 'GET') {
        // Возвращаем все сообщения
        res.status(200).json({ messages });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}
