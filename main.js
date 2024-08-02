const inputEl = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const formEl = document.getElementById('form-message');
const mainEl = document.querySelector('main');
const logoEl = document.querySelector('.logo-div');
const cardsEl = document.querySelector('.cards');
const messagesEl = document.querySelector('.messages');

let firstMessage = true;

// renderHTML

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (firstMessage) {
        styleMessageEl();
        mainEl.removeChild(logoEl);
        mainEl.removeChild(cardsEl);
    }
    firstMessage = false;
    const userMessage = inputEl.value;
    console.log(userMessage);
    sendMessage(userMessage);
    inputEl.value = '';
});

async function sendMessage(text) {
    const newEl = document.createElement('p');
    newEl.textContent = text;
    newEl.classList.add('message');
    newEl.classList.add('my-message');
    messagesEl.appendChild(newEl);

    // Send the message to the backend
    try {
        const response = await fetch('http://localhost:3000/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        receiveMessage(data.response);
    } catch (error) {
        receiveMessage("Failed to get response from the bot");
    }
}

function styleMessageEl() {
    messagesEl.style.flex = "1";
    messagesEl.style.padding = "100px";
}

function receiveMessage(text) {
    const testEl = document.createElement('p');
    testEl.textContent = text;
    testEl.classList.add('message');
    testEl.classList.add('bot-response');
    messagesEl.appendChild(testEl);
}
