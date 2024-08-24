import { USER_INTERFACE_ID, RESTART_QUIZ_BUTTON_ID } from '../constants.js';
import { createResultElement } from '../views/resultView.js';
import { initWelcomePage } from './welcomePage.js';

export const initResultPage = (score) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  const { playerName, playerAvatar } = JSON.parse(localStorage.getItem('user'));
  const resultElement = createResultElement(score, playerName, playerAvatar);
  userInterface.appendChild(resultElement);

  document
    .getElementById(RESTART_QUIZ_BUTTON_ID)
    .addEventListener('click', restartQuiz);

  localStorage.removeItem('user');
};

const restartQuiz = () => {
  initWelcomePage();
};
