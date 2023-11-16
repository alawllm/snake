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

type StateObject = {
  appleX: number;
  appleY: number;
  direction: string;
  nextDirection: any;
  headX: number;
  headY: number;
  score: number;
  snakeLength: number;
  snakePositions: { x: number; y: number }[];
  tileCount: number;
  tileSize: number;
};

export const resetGameState = (): StateObject => {
  return {
    appleX: 15,
    appleY: 18,
    direction: "",
    nextDirection: "",
    headX: 10,
    headY: 10,
    score: 0,
    snakeLength: 1,
    snakePositions: [],
    tileCount: 20,
    tileSize: 16,
  };
};

export const arrowInputHandler = (
  event: KeyboardEvent,
  direction: string,
  nextDirection: any
) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    return (nextDirection = "up");
  } else if (event.key === "ArrowDown" && direction !== "up") {
    return (nextDirection = "down");
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    return (nextDirection = "left");
  } else if (event.key === "ArrowRight" && direction !== "left") {
    return (nextDirection = "right");
  }
};
