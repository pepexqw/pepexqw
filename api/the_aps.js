export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log("Полученные данные:", data);
        
        res.status(200).json({ status: 'success', received: data });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}
