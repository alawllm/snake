import { TStateObject } from "./utils/types";
import { TNextDirection } from "./utils/types";

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

export const resetGameState = (): TStateObject => {
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
export const newGameListener = (
  newGameButton: HTMLButtonElement,
  state: TStateObject,
  drawGame: () => void,
  startNewGame: (state: TStateObject, drawGame: () => void) => void
): void => {
  console.log("hello from new game listener");
  newGameButton.addEventListener("click", () => startNewGame(state, drawGame));
};

export const arrowInputHandler = (
  event: KeyboardEvent,
  direction: TNextDirection,
  nextDirection: TNextDirection
): TNextDirection => {
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

export const handleInput = (state: TStateObject): void => {
  let { direction, nextDirection } = state;
  document.addEventListener("keydown", (event) => {
    state.nextDirection = arrowInputHandler(event, direction, nextDirection);
  });
};
