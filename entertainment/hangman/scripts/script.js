const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const scoreDisplay = document.querySelector(".score-display"); // Element to display score

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount, score;
const maxGuesses = 6;
const answeredWords = []; // List to track answered words

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
};

// Disable right-click and copy text
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Wag kang magdaya nakikita ka nang diyos');
});
document.addEventListener('copy', function (e) {
    e.preventDefault();
    alert('Sige daya pa, kaya dika mahal ihhh');
});

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    let wordObj;
    let wordIndex;

    // Keep selecting a word until we find one that hasn't been answered
    do {
        wordIndex = Math.floor(Math.random() * wordList.length);
        wordObj = wordList[wordIndex];
    } while (answeredWords.includes(wordObj.word)); // Check if word has already been answered

    currentWord = wordObj.word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = wordObj.hint;
    resetGame();
};

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

    // If the game was won, add the word to the answeredWords list and update the score
    if (isVictory) {
        answeredWords.push(currentWord);
        score += 10; // Increase score for answering correctly
    }

    // Update the score display
    scoreDisplay.innerText = `Score: ${score}`;
};

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Add event listener for keyboard input
document.addEventListener('keydown', (e) => {
    const pressedKey = e.key.toLowerCase(); // Convert to lowercase for consistency
    if (pressedKey >= 'a' && pressedKey <= 'z') { // Only letters
        // Check if the pressed key corresponds to a valid letter and hasn't been used already
        const button = Array.from(keyboardDiv.querySelectorAll("button")).find(btn => btn.innerText.toLowerCase() === pressedKey && !btn.disabled);
        if (button) {
            initGame(button, pressedKey); // Simulate button click with the pressed key
        }
    }
});

// Initialize score and display
score = 0;
scoreDisplay.innerText = `SCORE: ${score}`;

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
