const taskList = []
const listElement = document.getElementById('taskList');
const statusText = document.getElementById('status');

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    statusText.innerText = `Heard "${transcript}"`;

    if (transcript.startsWith("new task")) {
        const taskText = transcript.replace("new task", "").trim();
        if (taskText) {
            addTask(taskText);
        }
    }
    else if (transcript.startsWith("delete task")) {
        const match = transcript.match(/delete task (\d+)/);
        if (match) {
            const num = parseInt(match[1]) - 1;
            deleteTask(num);
        }
    }
    else if (transcript.startsWith("mark task")) {
        const match = transcript.match(/mark task (\d+)/);
        if (match) {
            const num = parseInt(match[1]) - 1;
            markTaskAsDone(num);
        }
    }
};


function addTask(taskText) {
    taskList.push({text: taskText, done:false});
    renderTasks();
}

function deleteTask(num){
    if(taskList[num]){
        taskList.splice(num, 1);
        renderTasks();
    }
}

function markTaskAsDone(num){
    if(taskList[num]){
        taskList[num].done = true;
        renderTasks();
    }
}

function renderTasks() {
    listElement.innerHTML = '';
    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${task.text} ${task.done ? '(Done)' : ''}`;
        listElement.appendChild(li);
    });
}

function startVoice() {
    statusText.innerText = "Listening...";
    recognition.start();
    
}

document.getElementById('startButton').addEventListener('click', startVoice);