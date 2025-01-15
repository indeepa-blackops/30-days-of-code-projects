const questions = [
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Africa", correct: false },
      { text: "Arctic", correct: false },
    ]
  },
  {
    question: "What is the result of '1' + 1 in JavaScript?",
    answers: [
      { text: "2", correct: false },
      { text: "11", correct: true },
      { text: "Error", correct: false },
      { text: "undefined", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "High Text Markup Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
    ]
  },
  {
    question: "Which of these is a JavaScript data type?",
    answers: [
      { text: "String", correct: true },
      { text: "Character", correct: false },
      { text: "Float", correct: false },
      { text: "Numberic", correct: false },
    ]
  },
];

class QuizApp {
  constructor() {
    this.questionElement = document.getElementById("question");
    this.answerButtons = document.getElementById("answer-buttons");
    this.nextButton = document.getElementById("next-btn");
    this.currentQuestionIndex = 0;
    this.score = 0;
    
    this.nextButton.addEventListener("click", () => this.handleNextButton());
    this.initializeQuiz();
  }

  initializeQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.nextButton.innerHTML = "Next";
    this.showQuestion();
  }

  resetState() {
    this.nextButton.style.display = 'none';
    while (this.answerButtons.firstChild) {
      this.answerButtons.removeChild(this.answerButtons.firstChild);
    }
  }

  showQuestion() {
    this.resetState();
    const currentQuestion = questions[this.currentQuestionIndex];
    const questionNo = this.currentQuestionIndex + 1;
    this.questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      this.answerButtons.appendChild(button);
      
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      
      button.addEventListener("click", (e) => this.selectAnswer(e, index));
    });
  }

  selectAnswer(e, answerIndex) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      this.score++;
    } else {
      selectedBtn.classList.add("incorrect");
      // Show which answer was correct
      Array.from(this.answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
          button.classList.add("correct");
        }
      });
    }

    // Disable all buttons after selection
    Array.from(this.answerButtons.children).forEach(button => {
      button.disabled = true;
    });

    this.nextButton.style.display = 'block';
  }

  showScore() {
    this.resetState();
    const percentage = (this.score / questions.length) * 100;
    this.questionElement.innerHTML = `
      <h2>Quiz Complete!</h2>
      <p>You scored ${this.score} out of ${questions.length} (${percentage.toFixed(1)}%)</p>
    `;
    this.nextButton.innerHTML = "Play Again";
    this.nextButton.style.display = "block";
  }

  handleNextButton() {
    if (this.nextButton.innerHTML === "Play Again") {
      this.initializeQuiz();
      return;
    }
    
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < questions.length) {
      this.showQuestion();
    } else {
      this.showScore();
    }
  }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuizApp();
});