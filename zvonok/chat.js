// chat.js
const roomInput = document.getElementById('room-id');
const joinBtn = document.getElementById('join-room');
const remoteVideo = document.getElementById('remoteVideo');
const localAudio = document.getElementById('localAudio');

let peerInstance = null;

// Функция для присоединения к комнате
async function joinRoom(roomId) {
    try {
        const constraints = { audio: true, video: false }; // Включаем только звук
        const localStream = await navigator.mediaDevices.getUserMedia(constraints);
        localAudio.srcObject = localStream;

        peerInstance = new SimplePeer({
            initiator: true,
            trickle: false,
            config: {"iceServers": [
                {"urls": ["stun:stun.l.google.com:19302"]},
            ]},
            stream: localStream
        });

        fetch(`/api/offers/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ offer: peerInstance.signal })
        }).then(response => response.json())
          .then(signal => {
              peerInstance.signal(signal.answer);
          });

        peerInstance.on('signal', signal => {
            fetch(`/api/offers/${roomId}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answer: signal })
            });
        });

        peerInstance.on('stream', stream => {
            remoteVideo.srcObject = stream;
        });
    } catch (err) {
        console.error('Ошибка:', err);
    }
}

// Присоединяемся к комнате при нажатии кнопки
joinBtn.addEventListener('click', () => {
    const roomId = roomInput.value.trim();
    if (roomId !== '') {
        joinRoom(roomId);
    }
});
