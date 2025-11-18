// pages/api/ideas.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { idea } = req.query;

    // Проверка на наличие идеи в запросе
    if (idea) {
        const logEntry = `${new Date().toISOString()}: ${idea}\n`;
        const filePath = path.join(process.cwd(), 'idea.txt');

        // Запись идеи в файл.
        try {
            fs.appendFileSync(filePath, logEntry, 'utf8');
            return res.status(200).json({ message: 'Идея сохранена' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка при записи идеи', error: error.message });
        }
    }

    return res.status(400).json({ message: 'Не указана идея' });
}