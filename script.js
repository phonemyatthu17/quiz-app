const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswers);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextBtn.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswers(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: " What is actually electricity?",
    answer: [
      { text: "A flow of water", correct: false },
      { text: "A flow of air", correct: false },
      { text: "A flow of electrons", correct: true },
      { text: "A flow of atoms", correct: false },
    ],
  },
  {
    question: "What is 2 + 3?",
    answer: [
      { text: "5", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "What is 2 + 6?",
    answer: [
      { text: "8", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answer: [
      { text: "4", correct: true },
      { text: "22", correct: true },
    ],
  },
];
