import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { initQuestionPage } from './questionPage.js';

let playerName = 'Player';

export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const welcomeElement = document.createElement('div');
  welcomeElement.classList.add('fade-in');

  const nameForm = document.createElement('form');
  nameForm.setAttribute('id', 'name-form');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'Enter your name');
  nameInput.setAttribute('id', 'player-name-input');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Submit';

  nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    playerName = nameInput.value.trim() || 'Player';
    updateWelcomeMessage();
  });

  nameForm.appendChild(nameInput);
  nameForm.appendChild(submitButton);

  const welcomeMessage = document.createElement('h1');
  welcomeMessage.setAttribute('id', 'welcome-message');
  welcomeMessage.textContent = `Welcome, ${playerName}!`;

  const gameDescription = document.createElement('p');
  gameDescription.setAttribute('id', 'game-description');
  gameDescription.textContent =
    'This is a 10-question quiz game. Answer correctly to gain a score of 1 point per correct answer. Are you ready to challenge yourself and achieve the highest score?';

  welcomeElement.appendChild(nameForm);
  welcomeElement.appendChild(welcomeMessage);
  welcomeElement.appendChild(gameDescription);

  const startButton = document.createElement('button');
  startButton.setAttribute('id', START_QUIZ_BUTTON_ID);
  startButton.textContent = 'Start Quiz';
  welcomeElement.appendChild(startButton);

  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const updateWelcomeMessage = () => {
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${playerName}!`;
};

const startQuiz = () => {
  initQuestionPage();
};
