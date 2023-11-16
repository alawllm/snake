export const generateRandomPosition = (tileCount: number) => {
  const newRandom = Math.floor(Math.random() * tileCount);

  return newRandom;
};

export const generateApplePosition = (
  tileCount: number
): { newAppleX: number; newAppleY: number } => {
  let newAppleX = generateRandomPosition(tileCount);
  let newAppleY = generateRandomPosition(tileCount);
  return { newAppleX, newAppleY };
};

export const checkAppleCollision = (
  appleX: number,
  appleY: number,
  headX: number,
  headY: number
): boolean => {
  if (appleX === headX && appleY === headY) {
    return true;
  }
  return false;
};

type StartNewGameFunction = () => void;

export const enableNewGameOnClick = (
  newGameButton: HTMLButtonElement,
  startNewGame: StartNewGameFunction
): void => {
  newGameButton.addEventListener("click", startNewGame);
};
