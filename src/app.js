import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { initQuestionPage } from './pages/questionPage.js';
const loadApp = () => {
  const currentQuestionStored = Number(localStorage.getItem('currentQuestion'));

  if (currentQuestionStored) {
    quizData.currentQuestionIndex = currentQuestionStored;
    initQuestionPage();
  } else {
    quizData.currentQuestionIndex = 0;
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);
