const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const attemptsElement = document.getElementById("attempts");
const restartButton = document.getElementById("restart-btn");

let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let score = 0;
let timer;
let time = 0;

const cards = [
    "A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"
];

function shuffleCards() {
    return cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffleCards();

    shuffledCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.innerHTML = card;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(e) {
    const card = e.target.closest(".card");
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        attempts++;
        updateAttempts();
        checkForMatch();
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    const firstCardValue = firstCard.querySelector(".card-back").innerHTML;
    const secondCardValue = secondCard.querySelector(".card-back").innerHTML;

    if (firstCardValue === secondCardValue) {
        matchedPairs++;
        score += 10;
        updateScore();
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert("You won the game!"), 200);
        }
    } else {
        score -= 2;
        updateScore();
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerElement.textContent = `Time: ${time}s`;
    }, 1000);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateAttempts() {
    attemptsElement.textContent = `Attempts: ${attempts}`;
}

function restartGame() {
    clearInterval(timer);
    time = 0;
    matchedPairs = 0;
    attempts = 0;
    score = 0;
    updateScore();
    updateAttempts();
    timerElement.textContent = `Time: 0s`;
    createBoard();
    startTimer();
}

restartButton.addEventListener("click", restartGame);

createBoard();
startTimer();
