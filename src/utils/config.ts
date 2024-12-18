import { TStateObject, THeadChangeObject } from "./types";

export const initialGameState: TStateObject = {
  appleX: 15,
  appleY: 10,
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

export const headChangeObject: THeadChangeObject = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
