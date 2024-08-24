import { SCORE_VALUE_ID } from '../constants.js';
/**
 * Create a Score element
 * @returns {Element}
 */
export const createScoreElement = (score) => {
  const userAvatar =
    JSON.parse(localStorage.getItem('user')) !== null
      ? JSON.parse(localStorage.getItem('user')).playerAvatar
      : 'tiger.png';
  const userName =
    JSON.parse(localStorage.getItem('user')) !== null
      ? JSON.parse(localStorage.getItem('user')).playerName
      : 'Player';

  const element = document.createElement('div');
  element.classList.add('score');
  element.classList.add('score-container');
  element.innerHTML = String.raw`
    <img src="./public/${userAvatar}" alt="User avatar" class="question-avatar-image">
    <p>${userName}, your score: <span id="${SCORE_VALUE_ID}">${score}</span> / 10</p>
  `;
  return element;
};
