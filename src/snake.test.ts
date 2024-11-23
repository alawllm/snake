import {
  shortenSnake,
  addNewHeadPosition,
  drawSnake,
  updateHeadPosition,
  updateSnakeLengthAndScore,
} from "./snake"; // Adjust the import path as needed

describe("Snake game utility functions", () => {
  describe("shortenSnake", () => {
    test("removes the last position if snake is longer than or equal to its length", () => {
      const snakePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ];
      const snakeLength = 2;

      shortenSnake(snakePositions, snakeLength);

      expect(snakePositions).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]);
    });

    test("does not modify snake if length is not exceeded", () => {
      const snakePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      const snakeLength = 3;

      shortenSnake(snakePositions, snakeLength);

      expect(snakePositions).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ]);
    });
  });

  describe("addNewHeadPosition", () => {
    test("adds a new head position at the beginning of the snake", () => {
      const snakePositions = [
        { x: 2, y: 2 },
        { x: 1, y: 1 },
      ];
      addNewHeadPosition(snakePositions, 3, 3);

      expect(snakePositions).toEqual([
        { x: 3, y: 3 },
        { x: 2, y: 2 },
        { x: 1, y: 1 },
      ]);
    });
  });

  describe("drawSnake", () => {
    test("draws the snake on the canvas", () => {
      const mockCtx = {
        fillStyle: "",
        fillRect: jest.fn(),
      } as unknown as CanvasRenderingContext2D;

      const snakePositions = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      const tileCount = 16;
      const tileSize = 16;

      drawSnake(mockCtx, snakePositions, tileCount, tileSize);

      expect(mockCtx.fillStyle).toBe("green");
      expect(mockCtx.fillRect).toHaveBeenCalledWith(16, 16, 16, 16);
      expect(mockCtx.fillRect).toHaveBeenCalledWith(32, 32, 16, 16); 
      expect(mockCtx.fillRect).toHaveBeenCalledTimes(snakePositions.length);
    });
  });

  describe("updateHeadPosition", () => {
    test("updates head position based on valid direction", () => {
      const result = updateHeadPosition(5, 5, "up");

      expect(result).toEqual({ newHeadX: 5, newHeadY: 4 });

      const result2 = updateHeadPosition(5, 5, "down");
      expect(result2).toEqual({ newHeadX: 5, newHeadY: 6 });
    });

    test("returns the same position for an invalid direction", () => {
      const result = updateHeadPosition(5, 5, "invalid");
      expect(result).toEqual({ newHeadX: 5, newHeadY: 5 });
    });
  });

  describe("updateSnakeLengthAndScore", () => {
    test("increments snake length and score", () => {
      const result = updateSnakeLengthAndScore(3, 10);

      expect(result).toEqual({ newSnakeLength: 4, newScore: 11 });
    });
  });
});
