// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Роуты
app.use('/client', express.static('client'));

// Хранение текущих соединений
const clients = {};

wss.on('connection', (ws, req) => {
    const userId = Math.random().toString(36).substr(2, 9); // Генерация уникального ID
    clients[userId] = ws;
    console.log(`${userId} подключён`);

    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        if (data.type === 'offer') {
            Object.keys(clients).forEach((key) => {
                if (clients[key] != ws) {
                    clients[key].send(JSON.stringify({
                        type: 'offer',
                        offer: data.offer,
                        from: userId
                    }));
                }
            });
        } else if (data.type === 'answer') {
            clients[data.to].send(JSON.stringify({
                type: 'answer',
                answer: data.answer
            }));
        } else if (data.type === 'candidate') {
            clients[data.to].send(JSON.stringify({
                type: 'candidate',
                candidate: data.candidate
            }));
        }
    });

    ws.on('close', () => {
        delete clients[userId];
        console.log(`${userId} отключён`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});