import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { initQuestionPage } from './questionPage.js';

let playerName = 'Player';
let playerAvatar = 'tiger.png';

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

  nameInput.addEventListener('input', formSubmit);

  const avatarContainer = document.createElement('div');
  avatarContainer.setAttribute('id', 'avatar-container');

  const avatars = [
    'tiger.png',
    'bear.png',
    'penguin.png',
    'cat.png',
    'monkey.png',
  ];

  avatars.forEach((avatar) => {
    const avatarLabel = document.createElement('label');
    const avatarImage = document.createElement('img');
    avatarImage.setAttribute('src', `./public/${avatar}`);
    avatarImage.setAttribute('alt', `Avatar ${avatar}`);
    avatarImage.classList.add('avatar-image');

    const avatarRadio = document.createElement('input');
    avatarRadio.setAttribute('type', 'radio');
    avatarRadio.setAttribute('name', 'avatar');
    avatarRadio.setAttribute('value', avatar);
    if (avatar === playerAvatar) {
      avatarRadio.setAttribute('checked', 'checked');
    }

    avatarLabel.appendChild(avatarRadio);
    avatarLabel.appendChild(avatarImage);
    avatarContainer.appendChild(avatarLabel);
  });

  const onAvatarClick = (event) => {
    if (event.target.tagName === 'INPUT') {
      setPlayerData(playerName, event.target['value']);
    }
  };

  avatarContainer.addEventListener('click', onAvatarClick);

  nameForm.addEventListener('submit', formSubmit);

  function formSubmit(event) {
    event.preventDefault();
    playerName = nameInput.value.trim() || 'Player';
    const selectedAvatar = document.querySelector(
      'input[name="avatar"]:checked'
    );
    if (selectedAvatar) {
      playerAvatar = selectedAvatar.value;
    }
    updateWelcomeMessage();
    setPlayerData(playerName, playerAvatar);
  }

  const selectName = document.createElement('h3');
  const selectNameLabel = document.createElement('label');

  selectName.appendChild(selectNameLabel);
  selectNameLabel.setAttribute('for', 'player-name-input');
  selectNameLabel.textContent = 'What is your name?';

  const selectAvatar = document.createElement('h3');
  selectAvatar.textContent = 'Select your avatar';

  nameForm.appendChild(selectName);
  nameForm.appendChild(nameInput);
  nameForm.appendChild(selectAvatar);
  nameForm.appendChild(avatarContainer);

  const welcomeMessage = document.createElement('h1');
  welcomeMessage.setAttribute('id', 'welcome-message');
  welcomeMessage.textContent = `Welcome, ${playerName}!`;

  const gameDescription = document.createElement('p');
  gameDescription.setAttribute('id', 'game-description');
  gameDescription.textContent =
    'This is a 10-question quiz game. Answer correctly to gain a score of 1 point per correct answer. Are you ready to challenge yourself and achieve the highest score?';

  welcomeElement.appendChild(welcomeMessage);
  welcomeElement.appendChild(gameDescription);
  welcomeElement.appendChild(nameForm);

  const startButton = document.createElement('button');
  startButton.setAttribute('id', START_QUIZ_BUTTON_ID);
  startButton.textContent = 'Start Quiz';
  welcomeElement.appendChild(startButton);

  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const setPlayerData = (playerName, playerAvatar) => {
  localStorage.setItem('user', JSON.stringify({ playerName, playerAvatar }));
};

const updateWelcomeMessage = () => {
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${playerName}!`;
};

const startQuiz = () => {
  initQuestionPage();
};
