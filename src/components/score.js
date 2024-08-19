import { updateScoreElement } from '../views/scoreView.js';

export let currentScore = 0;

export const updateScoreValue = (currentQuestion, userAnswer) => {
  if (currentQuestion.correct === userAnswer) {
    currentScore++;
    updateScoreElement(currentScore);
  }
};
