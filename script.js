const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');

const questions = [
    {
        question: 'What is the capital of india?',
        answers: [
            { text: 'Delhi', correct: true },
            { text: 'Goa', correct: false },
            { text: 'Kerla', correct: false },
            { text: 'Mumbai', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.querySelector('#question').innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === answer.text) {
            button.classList.add(answer.correct ? 'correct' : 'incorrect');
        }
    });
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
    } else {
        showResult();
    }
}

function showResult() {
    scoreElement.innerText = score;
    resultContainer.classList.remove('hidden');
    updateHighscore(score);
}

function updateHighscore(newScore) {
    const highscore = localStorage.getItem('highscore');
    if (!highscore || newScore > parseInt(highscore)) {
        localStorage.setItem('highscore', newScore);
        highscoreElement.innerText = newScore;
    } else {
        highscoreElement.innerText = highscore;
    }
}

function restartQuiz() {
    startQuiz();
}

function loadHighscore() {
    const highscore = localStorage.getItem('highscore');
    highscoreElement.innerText = highscore ? highscore : 'None';
}

loadHighscore();
startQuiz();
