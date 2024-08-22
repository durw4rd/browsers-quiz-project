import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_VALUE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createScoreElement } from '../views/scoreView.js';
import { quizData } from '../data.js';

let currentScore = Number(localStorage.getItem('currentScore')) || 0;
const answersLS = JSON.parse(localStorage.getItem(`selected`)) || {};

export const initQuestionPage = () => {
  localStorage.setItem('currentQuestion', quizData.currentQuestionIndex);

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  const correct = currentQuestion.correct;

  const skipBtn = document.getElementById(SKIP_QUESTION_BUTTON_ID);

  if (answersInLSCheck('selected') === null) {
    skipBtn.addEventListener('click', skipQuestion);

    answersListElement.addEventListener('click', function clickHandler(evt) {
      skipBtn.style.display = 'none';

      const usersAnswer = evt.target.dataset.key;

      answersLS[quizData.currentQuestionIndex] = usersAnswer;
      localStorage.setItem('selected', JSON.stringify(answersLS));

      answerCheck(usersAnswer, correct);
      answersListElement.removeEventListener('click', clickHandler);
    });
  } else {
    skipBtn.style.display = 'none';
    showAnswer(correct, answersInLSCheck('selected'));
  }

  const scoreElement = createScoreElement(currentScore);

  userInterface.appendChild(scoreElement);

  document
    .getElementById(PREV_QUESTION_BUTTON_ID)
    .addEventListener('click', prevQuestion);

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const prevQuestion = () => {
  if (quizData.currentQuestionIndex >= 1) {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;

    initQuestionPage();
  }
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};

const skipQuestion = (evt) => {
  evt.target.style.display = 'none';

  const correctAnswer =
    quizData.questions[quizData.currentQuestionIndex].correct;

  answersLS[quizData.currentQuestionIndex] = correctAnswer;
  localStorage.setItem('selected', JSON.stringify(answersLS));

  correctAnswerStyle(correctAnswer);
};

const updateScoreValue = () => {
  currentScore++;
  document.getElementById(SCORE_VALUE_ID).innerHTML = currentScore;
  localStorage.setItem('currentScore', currentScore);
};

const answerCheck = (usersAnswer, correctAnswer) => {
  if (usersAnswer === correctAnswer) {
    correctAnswerStyle(correctAnswer);
    updateScoreValue();
  } else {
    incorrectAnswerStyle(usersAnswer, correctAnswer);
  }
};

const answersInLSCheck = (key) => {
  const localStorageSelectedAnswers = JSON.parse(localStorage.getItem(key));

  let selectedAnswer;

  if (localStorageSelectedAnswers === null) {
    return null;
  } else {
    return (selectedAnswer =
      localStorageSelectedAnswers[quizData.currentQuestionIndex] || null);
  }
};

const showAnswer = (correct, selected) => {
  if (correct === selected) {
    correctAnswerStyle(correct);
  } else {
    incorrectAnswerStyle(selected, correct);
  }
};

/* TODO add correct/incorrect styles */

const correctAnswerStyle = (correct) => {
  const correctLi = document.querySelector(
    `#answers-list li[data-key = ${correct}]`
  );

  correctLi.style.backgroundColor = 'green';
};

const incorrectAnswerStyle = (incorrect, correct) => {
  const incorrectLi = document.querySelector(
    `#answers-list li[data-key = ${incorrect}]`
  );
  const correctLi = document.querySelector(
    `#answers-list li[data-key = ${correct}]`
  );

  correctLi.style.backgroundColor = 'green';
  incorrectLi.style.backgroundColor = 'red';
};

const cleanAnswerInLS = (key, object) => {
  object = {};
  localStorage.setItem(key, JSON.stringify(object));
};
