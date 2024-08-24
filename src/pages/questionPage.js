import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  FINISH_QUIZ_BUTTON_ID,
  USER_INTERFACE_ID,
  SCORE_VALUE_ID,
  NEXT_MISSED_QUESTION_ID,
  PROGRESS_BAR_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createScoreElement } from '../views/scoreView.js';
import { quizData } from '../data.js';
import { initFinishPage } from './finishPage.js';
import { initResultPage } from './resultPage.js';
import { createSkipBtn } from '../views/skipBtnView.js';
import { createProgressBarElement } from '../views/progressBarView.js';

export let currentScore = Number(localStorage.getItem('currentScore')) || 0;
let answersLS = JSON.parse(localStorage.getItem(`selected`)) || {};

export const initQuestionPage = () => {
  localStorage.setItem('currentQuestion', quizData.currentQuestionIndex);

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const progressBar = createProgressBarElement();
  userInterface.appendChild(progressBar);
  const progressLine = document.getElementById(PROGRESS_BAR_ID);
  showProgress(progressBar, progressLine, answersLS);

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

  const prevBtn = document.getElementById(PREV_QUESTION_BUTTON_ID);

  if (quizData.currentQuestionIndex === 0) {
    prevBtn.style.display = 'none';
  }

  prevBtn.addEventListener('click', prevQuestion);

  const nextBtn = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  const finishBtn = document.getElementById(FINISH_QUIZ_BUTTON_ID);
  const nextMissedBtn = document.getElementById(NEXT_MISSED_QUESTION_ID);
  finishBtn.style.display = 'none';
  nextMissedBtn.style.display = 'none';

  if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'inline-block';
  }

  nextBtn.addEventListener('click', nextQuestion);
  finishBtn.addEventListener('click', finishQuiz);

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
      updateProgressBar(progressBar, progressLine, answersLS);
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

const showProgress = (bar, line, storageData) => {
  const barWidth = bar.offsetWidth;
  const progressWidth = barWidth / 10;
  const progress = Object.keys(storageData).length;
  line.style.width = `${progress * progressWidth}px`;
  line.style.transition = 'none';
};

const updateProgressBar = (bar, line, storageData) => {
  const barWidth = bar.offsetWidth;
  const progressWidth = barWidth / 10;
  const progress = Object.keys(storageData).length + 1;

  line.style.width = `${progress * progressWidth}px`;
  line.style.transition = 'width 0.5s ease';
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
  }
};

const finishQuiz = () => {
  const selectedAnswers = JSON.parse(localStorage.getItem('selected'));
  const answersCount =
    selectedAnswers === null ? 0 : Object.keys(selectedAnswers).length;

  if (answersCount < 10) {
    initFinishPage(answersCount);
  } else {
    initResultPage(currentScore);
    cleanLocalStorage();
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

  if (localStorageSelectedAnswers === null) {
    return null;
  } else {
    return localStorageSelectedAnswers[quizData.currentQuestionIndex] || null;
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

export const cleanLocalStorage = () => {
  quizData.currentQuestionIndex = 0;
  currentScore = 0;
  answersLS = {};
  localStorage.removeItem('currentScore');
  localStorage.removeItem('currentQuestion');
  localStorage.removeItem('selected');
};
