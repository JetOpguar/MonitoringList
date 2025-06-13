const bird = document.getElementById("bird");
const obstacleTop = document.getElementById("obstacle-top");
const obstacleBottom = document.getElementById("obstacle-bottom");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("start-screen");

let birdTop = 250;
let gravity = 0.6;
let velocity = 0;
let gameInterval;
let obstacleInterval;
let score = 0;
let gameStarted = false;

// Show start screen initially
startScreen.style.display = "block";

// Start the game when spacebar is pressed
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !gameStarted) {
    startGame();
  }
});

// Make the bird jump
document.addEventListener("keydown", () => {
  if (gameStarted) {
    velocity = -10;
  }
});

function updateBird() {
  velocity += gravity;
  birdTop += velocity;
  bird.style.top = birdTop + "px";

  // Check for collision with ground or ceiling
  if (birdTop > 560 || birdTop < 0) {
    endGame();
  }
}

function updateObstacles() {
  let obstacleLeft = parseInt(window.getComputedStyle(obstacleTop).left);

  if (obstacleLeft < -60) {
    obstacleLeft = 400;
    const randomHeight = Math.random() * 200 + 100;
    obstacleTop.style.height = randomHeight + "px";
    obstacleBottom.style.height = (400 - randomHeight - 150) + "px";
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }

  obstacleTop.style.left = obstacleLeft - 2 + "px";
  obstacleBottom.style.left = obstacleLeft - 2 + "px";

  // Check for collision with obstacles
  const birdBottom = birdTop + 40; // Bird height is 40px
  const birdRight = 50 + 40; // Bird width is 40px, and it's positioned at left: 50px

  const obstacleTopBottom = parseInt(obstacleTop.style.height);
  const obstacleBottomTop = 400 - parseInt(obstacleBottom.style.height);

  if (
    obstacleLeft < birdRight && // Bird is within the horizontal range of the obstacle
    obstacleLeft + 60 > 50 && // Obstacle is within the horizontal range of the bird
    (birdTop < obstacleTopBottom || birdBottom > obstacleBottomTop) // Bird collides with top or bottom obstacle
  ) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert("Game Over! Your score: " + score);
  location.reload();
}

function startGame() {
  gameStarted = true;
  startScreen.style.display = "none"; // Hide start screen
  bird.style.display = "block"; // Show bird
  obstacleTop.style.display = "block"; // Show obstacles
  obstacleBottom.style.display = "block";
  scoreDisplay.style.display = "block"; // Show score

  gameInterval = setInterval(updateBird, 20);
  obstacleInterval = setInterval(updateObstacles, 20);
}