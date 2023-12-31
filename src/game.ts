import { StateObject } from "./types";

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

type DrawGame = () => void;

export const startNewGame = (state: object, drawGame: DrawGame) => {
  console.log("start new game!");
  state = resetGameState();
  drawGame();
};

export const newGameListener = (
  newGameButton: HTMLButtonElement,
  state: object,
  drawGame: DrawGame,
  startNewGame: (state: object, drawGame: DrawGame) => void
): void => {
  newGameButton.addEventListener("click", () => startNewGame(state, drawGame));
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
  nextDirection: string
): string => {
  if (event.key === "ArrowUp" && direction !== "down") {
    nextDirection = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    nextDirection = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    nextDirection = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    nextDirection = "right";
  }
  return nextDirection;
};

export const handleInput = (nextDirection: string, direction: string): void => {
  //adding arguments to the callback function?
  document.addEventListener("keydown", (event) => {
    nextDirection = arrowInputHandler(event, direction, nextDirection);
    console.log(nextDirection);
  });
};
