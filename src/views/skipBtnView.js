import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
/**
 * Create a Skip Button
 * @returns {Element}
 */
export const createSkipBtn = () => {
  const element = document.createElement('button');
  element.textContent = 'Skip';
  element.id = SKIP_QUESTION_BUTTON_ID;
  return element;
};
