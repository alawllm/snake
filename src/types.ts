export type StateObject = {
  appleX: number;
  appleY: number;
  direction: string;
  nextDirection: string | keyof HeadChangeObject;
  headX: number;
  headY: number;
  score: number;
  snakeLength: number;
  snakePositions: { x: number; y: number }[];
  tileCount: number;
  tileSize: number;
};

export type HeadChangeObject = {
  up: { x: number; y: number };
  down: { x: number; y: number };
  left: { x: number; y: number };
  right: { x: number; y: number };
};
