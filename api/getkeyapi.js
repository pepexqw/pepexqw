export default function handler(req, res) {
    const allowedOrigin = 'https://pepexqw.vercel.app';

    // Проверяем заголовок Origin
    const origin = req.headers.origin;
    if (origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Access forbidden' });
    }

    // Возвращаем API_KEY
    const apiKey = '214ADHFS!fsfDF?';
    res.status(200).json({ apiKey });
}