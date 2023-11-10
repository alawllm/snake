const canvas = document.getElementById("game");
//ctx returns reference to canvas' 2d drawing api object
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];

let direction = "right";

function drawGame() {
  clearScreen();
}

// function drawSnake() {
//   ctx.fillStyle = "green";
//   for (let i = 0; i < snake.length; i++) {
//     ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20); // Adjust size as needed
//   }
// }

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowUp" && direction !== "down") {
//     direction = "up";
//   } else if (event.key === "ArrowDown" && direction !== "up") {
//     direction = "down";
//   } else if (event.key === "ArrowLeft" && direction !== "right") {
//     direction = "left";
//   } else if (event.key === "ArrowRight" && direction !== "left") {
//     direction = "right";
//   }
// });
