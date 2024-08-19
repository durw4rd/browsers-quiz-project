/**
 * Create a Score element
 * @returns {Element}
 */
export const createScoreElement = (score) => {
  const element = document.createElement('div');
  element.classList.add('score');
  element.innerHTML = innerScoreText(score);
  return element;
};

export const updateScoreElement = (score) => {
  document.querySelector('.score').innerHTML = innerScoreText(score);
};

const innerScoreText = (score) => {
  return String.raw`
  <p>Your score: ${score} / 10</p>
  `;
};
