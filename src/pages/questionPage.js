import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_VALUE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createScoreElement } from '../views/scoreView.js';
import { quizData } from '../data.js';
import { initResultPage } from './resultPage.js';

let currentScore = Number(localStorage.getItem('currentScore')) || 0;

export const initQuestionPage = () => {
  localStorage.setItem('currentQuestion', quizData.currentQuestionIndex);

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  answersListElement.addEventListener('click', function clickHandler(evt) {
    const usersAnswer = evt.target;
    answerCheck(usersAnswer);
    answersListElement.removeEventListener('click', clickHandler);
  });

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  const scoreElement = createScoreElement(currentScore);

  userInterface.appendChild(scoreElement);

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < 10) {
    initQuestionPage();
  } else {
    quizData.currentQuestionIndex = 0;
    currentScore = 0;
    localStorage.removeItem('currentScore');
    localStorage.removeItem('currentQuestion');
    initResultPage();
  }
};

const updateScoreValue = () => {
  currentScore++;
  document.getElementById(SCORE_VALUE_ID).innerHTML = currentScore;
  localStorage.setItem('currentScore', currentScore);
};

const answerCheck = (usersAnswer) => {
  const correctAnswer =
    quizData.questions[quizData.currentQuestionIndex].correct;
  const answersListElements = document.querySelectorAll('#answers-list li');
  let correctAnswerElement;

  answersListElements.forEach((li) => {
    if (li.dataset.key === correctAnswer) {
      correctAnswerElement = li;
    }
  });

  /* TODO decide about style */

  if (correctAnswerElement === usersAnswer) {
    usersAnswer.style.backgroundColor = 'green';
    updateScoreValue();
  } else {
    usersAnswer.style.backgroundColor = 'red';
    correctAnswerElement.style.backgroundColor = 'green';
  }
};
