export const generateRandomPosition = (tileCount: number) => {
  const newRandom = Math.floor(Math.random() * tileCount);

  return newRandom;
};

type StartNewGameFunction = () => void;

export const enableNewGameOnClick = (
  newGameButton: HTMLButtonElement,
  startNewGame: StartNewGameFunction
): void => {
  newGameButton.addEventListener("click", startNewGame);
};
