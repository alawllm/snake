export const generateRandomApplePosition = (tileCount: number) => {
  const newAppleX = Math.floor(Math.random() * tileCount);
  const newAppleY = Math.floor(Math.random() * tileCount);

  return { newAppleX, newAppleY };
};

type StartNewGameFunction = () => void;

export const enableNewGameOnClick = (
  newGameButton: HTMLButtonElement,
  startNewGame: StartNewGameFunction
): void => {
  newGameButton.addEventListener("click", startNewGame);
};
