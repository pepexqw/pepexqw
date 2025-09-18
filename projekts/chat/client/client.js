// client/client.js
document.addEventListener('DOMContentLoaded', () => {
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const startButton = document.getElementById('startButton');
    const hangupButton = document.getElementById('hangupButton');

    let localStream;
    let pc;

    const constraints = {
        video: false,
        audio: true
    };

    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
        console.log('Connected to the server');
    };

    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'offer') {
            handleOffer(msg.offer, msg.from);
        } else if (msg.type === 'answer') {
            handleAnswer(msg.answer);
        } else if (msg.type === 'candidate') {
            addIceCandidate(msg.candidate);
        }
    };

    startButton.onclick = async () => {
        startButton.disabled = true;
        hangupButton.disabled = false;
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        localVideo.srcObject = localStream;
        createPeerConnection();
        pc.addStream(localStream);
        createOffer();
    };

    hangupButton.onclick = () => {
        hangupButton.disabled = true;
        startButton.disabled = false;
        closePeerConnection();
    };

    function createPeerConnection() {
        pc = new RTCPeerConnection(null);
        pc.onicecandidate = e => onIceCandidate(e);
        pc.onaddstream = e => remoteVideo.srcObject = e.stream;
    }

    function createOffer() {
        pc.createOffer()
            .then(desc => setLocalAndSendDescription(desc))
            .catch(error => console.error('Ошибка при создании оферты:', error));
    }

    function setLocalAndSendDescription(description) {
        pc.setLocalDescription(description)
            .then(() => {
                socket.send(JSON.stringify({type: 'offer', offer: description}));
            })
            .catch(error => console.error('Ошибка при установке локальной описания:', error));
    }

    function handleOffer(offer, sender) {
        pc.setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => {
                pc.createAnswer()
                    .then(answer => setLocalAndSendAnswer(answer))
                    .catch(error => console.error('Ошибка при создании ответа:', error));
            })
            .catch(error => console.error('Ошибка при установке удалённой описания:', error));
    }

    function setLocalAndSendAnswer(answer) {
        pc.setLocalDescription(answer)
            .then(() => {
                socket.send(JSON.stringify({type: 'answer', answer: answer}));
            })
            .catch(error => console.error('Ошибка при установке локальной описания:', error));
    }

    function handleAnswer(answer) {
        pc.setRemoteDescription(new RTCSessionDescription(answer))
            .catch(error => console.error('Ошибка при установке удалённой описания:', error));
    }

    function onIceCandidate(event) {
        if (event.candidate) {
            socket.send(JSON.stringify({type: 'candidate', candidate: event.candidate}));
        }
    }

    function addIceCandidate(candidate) {
        pc.addIceCandidate(new RTCIceCandidate(candidate))
            .catch(error => console.error('Ошибка добавления кандидата ICE:', error));
    }

    function closePeerConnection() {
        if (pc) {
            pc.close();
            pc = null;
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
        }
        remoteVideo.srcObject = null;
    }
});