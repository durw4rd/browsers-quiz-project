import { ANSWERS_LIST_ID } from '../constants.js';
import {
  PREV_QUESTION_BUTTON_ID,
  NEXT_QUESTION_BUTTON_ID,
  FINISH_QUIZ_BUTTON_ID,
  NEXT_MISSED_QUESTION_ID,
} from '../constants.js';
import { quizData } from '../data.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  const questionNumber = quizData.currentQuestionIndex + 1;
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
    <h1>${questionNumber}. ${question}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>
    <button id="${PREV_QUESTION_BUTTON_ID}">
      Previous question
    </button>
    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>
        <button id="${FINISH_QUIZ_BUTTON_ID}">
      Finish quiz
     </button>
        <button id="${NEXT_MISSED_QUESTION_ID}">
      Next missed question
    </button>
  `;

  return element;
};
