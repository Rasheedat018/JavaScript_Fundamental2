const quizInfo = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "High Tech Modern Language",
            "HyperText Management Logic",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-style", "font-color", "color", "text-color"],
        correctAnswer: 2
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<hr>"],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a table?",
        options: ["<tbl>", "<table>", "<tab>", "<tr>"],
        correctAnswer: 1
    },
    {
        question: "Which CSS property controls the space inside an element, between the content and the border?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 30;

const quizContainer = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

const timerEl = document.createElement("p");
timerEl.id = "timer";
quizContainer.insertBefore(timerEl, progressEl);

function loadQuestion() {
    if (currentQuestionIndex >= quizInfo.length) {
        showResults();
        return;
    }

    const currentQuestion = quizInfo[currentQuestionIndex];

    // Debugging logs
    console.log("Loading Question:", currentQuestion);

    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizInfo.length}`;
    nextBtn.classList.add("hide");

    startTimer();
}

function startTimer() {
    let timeLeft = timeLimit;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoMoveNext();
        }
    }, 1000);
}

function autoMoveNext() {
    disableOptions();
    nextBtn.classList.remove("hide");
}

function disableOptions() {
    document.querySelectorAll(".option-btn").forEach(button => {
        button.disabled = true;
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const correctIndex = quizInfo[currentQuestionIndex].correctAnswer;
    const buttons = document.querySelectorAll(".option-btn");

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add("correct");
        score++;
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    buttons.forEach(button => button.disabled = true);
    nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizInfo.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreEl.textContent = `You scored ${score} out of ${quizInfo.length}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    loadQuestion();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Quiz Loaded");
    loadQuestion();
});