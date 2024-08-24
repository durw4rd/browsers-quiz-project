import { SCORE_VALUE_ID } from '../constants.js';
/**
 * Create a Score element
 * @returns {Element}
 */
export const createScoreElement = (score) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const element = document.createElement('div');
  element.classList.add('score');
  element.classList.add('score-container');
  element.innerHTML = String.raw`
    <img src="./public/${user.playerAvatar}" alt="User avatar" class="question-avatar-image">
    <p>${user.playerName}, your score: <span id="${SCORE_VALUE_ID}">${score}</span> / 10</p>
  `;
  return element;
};
