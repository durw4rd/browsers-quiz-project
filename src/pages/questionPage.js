import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_VALUE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createScoreElement } from '../views/scoreView.js';
import { quizData } from '../data.js';
import { initResultPage } from './resultPage.js';
import { createSkipBtn } from '../views/skipBtnView.js';

let currentScore = Number(localStorage.getItem('currentScore')) || 0;
let answersLS = JSON.parse(localStorage.getItem(`selected`)) || {};

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

  const scoreElement = createScoreElement(currentScore);

  userInterface.appendChild(scoreElement);

  document
    .getElementById(PREV_QUESTION_BUTTON_ID)
    .addEventListener('click', prevQuestion);

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  const correct = currentQuestion.correct;

  const skipBtn = createSkipBtn();
  userInterface.appendChild(skipBtn);

  if (answersInLSCheck('selected') === null) {
    answersListElement.addEventListener('click', function clickHandler(evt) {
      if (evt.target.nodeName !== 'LI') {
        return;
      }

      const usersAnswer = evt.target.dataset.key;
      skipBtn.disabled = true;

      answersLS[quizData.currentQuestionIndex] = usersAnswer;
      localStorage.setItem('selected', JSON.stringify(answersLS));

      answerCheck(usersAnswer, correct);
      answersListElement.removeEventListener('click', clickHandler);
    });
    skipBtn.addEventListener('click', skipQuestion);
  } else {
    showAnswer(correct, answersInLSCheck('selected'));
  }
};

const prevQuestion = () => {
  if (quizData.currentQuestionIndex >= 1) {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;

    initQuestionPage();
  }
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < 10) {
    initQuestionPage();
  } else {
    initResultPage(currentScore);
    quizData.currentQuestionIndex = 0;
    currentScore = 0;
    answersLS = {};
    localStorage.removeItem('currentScore');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('selected');

    for (let i = 0; i < 10; i++) {
      localStorage.removeItem(`${i}question`);
    }
  }
};

const skipQuestion = (evt) => {
  evt.target.disabled = true;

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

const correctAnswerStyle = (correct) => {
  const correctLi = document.querySelector(
    `#answers-list li[data-key = ${correct}]`
  );

  correctLi.classList.add('correct');
};

const incorrectAnswerStyle = (incorrect, correct) => {
  const incorrectLi = document.querySelector(
    `#answers-list li[data-key = ${incorrect}]`
  );
  const correctLi = document.querySelector(
    `#answers-list li[data-key = ${correct}]`
  );

  correctLi.classList.add('correct');
  incorrectLi.classList.add('incorrect');
};
