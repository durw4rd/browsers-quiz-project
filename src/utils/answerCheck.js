import { quizData } from '../data.js';

export const answerCheck = (usersAnswer) => {
  const correctAnswer =
    quizData.questions[quizData.currentQuestionIndex].correct;
  const answersListElements = document.querySelectorAll('#answers-list li');
  let correctAnswerElement;

  answersListElements.forEach((li) => {
    if (li.dataset.key === correctAnswer) {
      correctAnswerElement = li;
    }
  });

  /* TODO decide about style */

  if (correctAnswerElement === usersAnswer) {
    usersAnswer.style.backgroundColor = 'green';

    /* TODO call function for updating score */
  } else {
    usersAnswer.style.backgroundColor = 'red';
    correctAnswerElement.style.backgroundColor = 'green';
  }
};
