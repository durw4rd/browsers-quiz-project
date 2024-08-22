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

let currentScore = Number(localStorage.getItem('currentScore')) || 0;

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
  const localStorageSelectedAnswer = localStorage.getItem(
    `${quizData.currentQuestionIndex}question`
  );

  if (localStorageSelectedAnswer === null) {
    answersListElement.addEventListener('click', function clickHandler(evt) {
      const usersAnswer = evt.target.dataset.key;
      answerCheck(usersAnswer, correct);
      answersListElement.removeEventListener('click', clickHandler);
    });
  } else {
    showAnswer(correct, localStorageSelectedAnswer);
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

  if (quizData.currentQuestionIndex < 10) {
    initQuestionPage();
  } else {
    initResultPage(currentScore);
    quizData.currentQuestionIndex = 0;
    currentScore = 0;
    localStorage.removeItem('currentScore');
    localStorage.removeItem('currentQuestion');

    for (let i = 0; i < 10; i++) {
      localStorage.removeItem(`${i}question`);
    }
  }
};

const updateScoreValue = () => {
  currentScore++;
  document.getElementById(SCORE_VALUE_ID).innerHTML = currentScore;
  localStorage.setItem('currentScore', currentScore);
};

const answerCheck = (usersAnswer, correctAnswer) => {
  localStorage.setItem(`${quizData.currentQuestionIndex}question`, usersAnswer);
  if (usersAnswer === correctAnswer) {
    correctAnswerStyle(correctAnswer);
    updateScoreValue();
  } else {
    incorrectAnswerStyle(usersAnswer, correctAnswer);
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
