import { PROGRESS_BAR_ID } from '../constants.js';

/**
 * Create a progress bar element
 * @returns {Element}
 */

export const createProgressBarElement = () => {
  const element = document.createElement('div');
  element.classList.add('progress-bar-container');

  element.innerHTML = String.raw`
    <div id="${PROGRESS_BAR_ID}"></div>
  `;
  return element;
};
