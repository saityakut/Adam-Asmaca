const word_element = document.getElementById('word');
const popupContainer = document.getElementById('popup-container');
const messageElement = document.getElementById('success-message');
const wrongLettersElement = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();
function getRandomWord() {
    const words = ['javascript', 'java', 'python' , 'flutter' , 'dart' , 'html', 'css' , ];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() { 
    word_element.innerHTML = `
    ${selectedWord.split('').map(letter => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </div>
    `).join('')}
    `;

    const w = word_element.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popupContainer.style.display = 'flex';
        messageElement.innerText = 'Tebrikler Kazandınız!!! '
    }
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popupContainer.style.display = 'flex';
        messageElement.innerText = 'Maaslesef Kaybettiniz..';
    }
}

function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show'); 
    },1000);
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 222) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
   } 
});

playAgainButton.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popupContainer.style.display = 'none';
});

displayWord();