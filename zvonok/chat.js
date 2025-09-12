// chat.js
let micButton = document.getElementById('mic-btn');
let infoMessage = document.getElementById('info-message');
let myPeerConnection = null;
let localStream = null;

async function startMic() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micButton.innerHTML = 'Выключить микрофон';
        micButton.classList.toggle('active');
    } catch (err) {
        alert('Ошибка доступа к микрофону.');
    }
}

function stopMic() {
    if (!localStream) return;
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
    micButton.innerHTML = 'Включить микрофон';
    micButton.classList.toggle('active');
}

// Используем PeerJS для установки соединений
let peer = new Peer({
    host: 'peerjs.cloud',
    port: 443,
    secure: true
});

peer.on('open', function(id) {
    infoMessage.innerHTML = `Ваш ID: ${id}`;
    micButton.disabled = false; // Разблокировка кнопки
    micButton.addEventListener('click', toggleMic);
});

peer.on('call', call => {
    answerCall(call);
});

function toggleMic() {
    if (localStream) {
        stopMic();
    } else {
        startMic();
    }
}

function answerCall(call) {
    call.answer(localStream);
    call.on('stream', remoteStream => {
        // Обработка удалённого потока звука
    });
}

function makeCall(peerID) {
    let call = peer.call(peerID, localStream);
    call.on('stream', remoteStream => {
        // Обработка удалённого потока звука
    });
}

window.onload = () => {
    micButton.addEventListener('click', toggleMic);
};
