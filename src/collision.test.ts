import {
  checkSnakeCollision,
  checkSnakeWithBoardCollision,
  checkAppleCollision,
} from "./collision"; 

describe("Game collision functions", () => {
  describe("checkSnakeCollision", () => {
    test("returns true if snake collides with itself", () => {
      const snakePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ];
      const headX = 2;
      const headY = 2;

      expect(checkSnakeCollision(snakePositions, headX, headY)).toBe(true);
    });

    test("returns false if snake does not collide with itself", () => {
      const snakePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ];
      const headX = 4;
      const headY = 4;

      expect(checkSnakeCollision(snakePositions, headX, headY)).toBe(false);
    });

    test("returns false for an empty snake body", () => {
      const snakePositions: { x: number; y: number }[] = [];
      const headX = 0;
      const headY = 0;

      expect(checkSnakeCollision(snakePositions, headX, headY)).toBe(false);
    });
  });

  describe("checkSnakeWithBoardCollision", () => {
    test("returns true if snake head is out of bounds (negative position)", () => {
      const headX = -1;
      const headY = 5;
      const tileCount = 10;

      expect(checkSnakeWithBoardCollision(headX, headY, tileCount)).toBe(true);
    });

    test("returns true if snake head is out of bounds (beyond board size)", () => {
      const headX = 10;
      const headY = 5;
      const tileCount = 10;

      expect(checkSnakeWithBoardCollision(headX, headY, tileCount)).toBe(true);
    });

    test("returns false if snake head is within bounds", () => {
      const headX = 5;
      const headY = 5;
      const tileCount = 10;

      expect(checkSnakeWithBoardCollision(headX, headY, tileCount)).toBe(false);
    });
  });

  describe("checkAppleCollision", () => {
    test("returns true if snake head collides with apple", () => {
      const appleX = 5;
      const appleY = 5;
      const headX = 5;
      const headY = 5;

      expect(checkAppleCollision(appleX, appleY, headX, headY)).toBe(true);
    });

    test("returns false if snake head does not collide with apple", () => {
      const appleX = 5;
      const appleY = 5;
      const headX = 4;
      const headY = 4;

      expect(checkAppleCollision(appleX, appleY, headX, headY)).toBe(false);
    });

    test("returns false if apple and snake head coordinates are distinct", () => {
      const appleX = 0;
      const appleY = 10;
      const headX = 10;
      const headY = 0;

      expect(checkAppleCollision(appleX, appleY, headX, headY)).toBe(false);
    });
  });
});
