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
import { answerCheck } from '../utils/answerCheck.js';

let currentScore = 0;

export const initQuestionPage = () => {
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

  initQuestionPage();
};

const updateScoreValue = (currentQuestion, userAnswer) => {
  if (currentQuestion.correct === userAnswer) {
    currentScore++;
    document.getElementById(SCORE_VALUE_ID).innerHTML = currentScore;
  }
};
