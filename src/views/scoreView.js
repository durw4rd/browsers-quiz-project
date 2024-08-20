import { SCORE_VALUE_ID } from '../constants.js';
/**
 * Create a Score element
 * @returns {Element}
 */
export const createScoreElement = (score) => {
  const element = document.createElement('div');
  element.classList.add('score');
  element.classList.add('score-container');
  element.innerHTML = String.raw`
  Your score: <span id="${SCORE_VALUE_ID}">${score}</span> / 10
  `;
  return element;
};
