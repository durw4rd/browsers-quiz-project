import {
  USER_INTERFACE_ID,
  FINISH_ANYWAY_BUTTON_ID,
  ANSWER_BUTTON_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  NEXT_MISSED_QUESTION_ID,
  FINISH_QUIZ_BUTTON_ID,
} from '../constants.js';
import { quizData } from '../data.js';
import { createFinishElement } from '../views/finishView.js';
import { initResultPage } from './resultPage.js';
import {
  initQuestionPage,
  currentScore,
  cleanLocalStorage,
} from './questionPage.js';

export const initFinishPage = (answers) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const finishElement = createFinishElement(answers);
  userInterface.appendChild(finishElement);

  document
    .getElementById(FINISH_ANYWAY_BUTTON_ID)
    .addEventListener('click', finishQuizAnyway);

  document
    .getElementById(ANSWER_BUTTON_ID)
    .addEventListener('click', missedQuestionNavigation);
};

const finishQuizAnyway = () => {
  initResultPage(currentScore);
  cleanLocalStorage();
};

const missedQuestionNavigation = () => {
  const selected = JSON.parse(localStorage.getItem('selected'));

  const answeredQuestions =
    selected !== null ? Object.keys(selected).map(Number) : [];
  const questionIndexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const missedQuestions = questionIndexArr.filter(
    (index) => !answeredQuestions.includes(index)
  );

  initMissingQuestionPage(missedQuestions);
};

const initMissingQuestionPage = (array) => {
  quizData.currentQuestionIndex = array[0];
  array.shift();
  initQuestionPage();

  const prevBtn = document.getElementById(PREV_QUESTION_BUTTON_ID);
  const nextBtn = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  const finishBtn = document.getElementById(FINISH_QUIZ_BUTTON_ID);

  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';

  const nextMissedBtn = document.getElementById(NEXT_MISSED_QUESTION_ID);
  nextMissedBtn.addEventListener('click', function nextMissedQuestion() {
    initMissingQuestionPage(array);
  });

  if (array.length >= 1) {
    nextMissedBtn.style.display = 'inline-block';
  } else {
    nextMissedBtn.style.display = 'none';
    finishBtn.style.display = 'inline-block';
  }
};
