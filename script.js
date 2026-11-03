const micBtn = document.getElementById('mic-btn');
const statusBox = document.getElementById('status');
const taskList = document.getElementById('task-list');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'kk-KZ';
    recognition.interimResults = false;

    micBtn.addEventListener('click', () => {
        try {
            recognition.start();
            statusBox.textContent = "Тыңдап тұрмын, сөйлеңіз...";
        } catch (error) {
            console.error(error);
        }
    });

    recognition.addEventListener('result', (e) => {
        const speechText = e.results[0][0].transcript.toLowerCase();
        statusBox.textContent = `Айтылды: "${speechText}"`;

        if (speechText.includes('тапсырма қосу')) {
            const newTask = document.createElement('li');
            newTask.textContent = "Жаңа тапсырма (дауыспен қосылды)";
            taskList.appendChild(newTask);
        }
    });

    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });

    recognition.addEventListener('error', (e) => {
        statusBox.textContent = "Қате орын алды: " + e.error;
    });

} else {
    micBtn.style.display = 'none';
    statusBox.textContent = "Бұл браузер дауыспен басқаруды қолдамайды.";
}