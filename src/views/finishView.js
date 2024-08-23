import { FINISH_ANYWAY_BUTTON_ID, ANSWER_BUTTON_ID } from '../constants.js';
/**
 * Create a Finish quiz page element
 * @returns {Element}
 */
export const createFinishElement = (answers) => {
  const element = document.createElement('div');
  element.classList.add('finish-container');

  element.innerHTML = String.raw`
    <h1>Oops! It looks like you have missed some questions</h1>
    <p>You have answered: ${answers} / 10 questions </p>
    <button id="${FINISH_ANYWAY_BUTTON_ID}">Finish quiz anyway</button>
    <button id="${ANSWER_BUTTON_ID}">Answer right now</button>
  `;
  return element;
};
