const inputEl = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const formEl = document.getElementById('form-message');
const mainEl = document.querySelector('main');
const logoEl = document.querySelector('.logo-div');
const cardsEl = document.querySelector('.cards');
const messagesEl = document.querySelector('.messages');
const inputBox = document.querySelector('.input-box')

let firstMessage = true;

// renderHTML

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (firstMessage) {
        styleMessageEl();
        mainEl.removeChild(logoEl);
        mainEl.removeChild(cardsEl);
        inputBox.style.marginTop = "0"
    }
    firstMessage = false;
    const userMessage = inputEl.value;
    console.log(userMessage);
    sendMessage(userMessage);
    inputEl.value = '';
    messagesEl.scrollTo(0, messagesEl.scrollHeight);
});

async function sendMessage(text) {
    const newEl = document.createElement('div');
    const newTextEl = document.createElement('p');
    const newProfile = document.createElement('img')
    newProfile.src = '/assets/default-profile.png'
    newTextEl.textContent = text;
    newEl.appendChild(newTextEl)
    newEl.appendChild(newProfile)
    newEl.classList.add('div-message')
    newProfile.classList.add('profile-picture')
    newTextEl.classList.add('message');
    newTextEl.classList.add('my-message');
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
        messagesEl.scrollTo(0, messagesEl.scrollHeight);
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
