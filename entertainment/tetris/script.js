// Global variables
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const highScoreDisplay = document.createElement('div'); // High score element

highScoreDisplay.style.color = 'white';
highScoreDisplay.style.fontSize = '20px';
highScoreDisplay.style.marginTop = '5px';
document.body.insertBefore(highScoreDisplay, restartButton);

const grid = 32;
const tetrominoSequence = [];
let playfield = [];
let tetromino;
let rAF;
let gameOver = false;
let count = 0;
let score = 0;
let level = 1;
let dropSpeed = 35; // Initial drop speed
let highScore = localStorage.getItem('tetrisHighScore') || 0;

highScoreDisplay.textContent = `High Score: ${highScore}`;
// Initialize playfield
for (let row = -2; row < 20; row++) {
  playfield[row] = [];
  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

// Tetromino data
const tetrominos = {
  'I': [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  'J': [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  'L': [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  'O': [[1, 1], [1, 1]],
  'S': [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  'Z': [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  'T': [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
};

const colors = {
  'I': 'cyan',
  'O': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange',
};

// Generate a random tetromino sequence
function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  while (sequence.length) {
    const rand = Math.floor(Math.random() * sequence.length);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

// Get the next tetromino
function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }
  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];
  const col = Math.floor((playfield[0].length - matrix[0].length) / 2);
  const row = name === 'I' ? -1 : -2;
  return { name, matrix, row, col };
}

// Rotate a matrix 90 degrees
function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

// Check if a move is valid
function isValidMove(matrix, cellRow, cellCol) {
  return matrix.every((row, r) =>
    row.every((cell, c) =>
      !cell ||
      (cellCol + c >= 0 &&
        cellCol + c < playfield[0].length &&
        cellRow + r < playfield.length &&
        !playfield[cellRow + r][cellCol + c])
    )
  );
}

// Place tetromino on playfield
function placeTetromino() {
  tetromino.matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        if (tetromino.row + r < 0) {
          showGameOver();
        } else {
          playfield[tetromino.row + r][tetromino.col + c] = tetromino.name;
        }
      }
    });
  });
  clearLines();
  tetromino = getNextTetromino();
}

// Clear full lines
function clearLines() {
  let linesCleared = 0;
  for (let row = playfield.length - 1; row >= 0; row--) {
    if (playfield[row].every(cell => cell)) {
      playfield.splice(row, 1);
      playfield.unshift(new Array(10).fill(0));
      row++;
      linesCleared++;
    }
  }
  // Increase score based on lines cleared
  if (linesCleared > 0) {
    score += linesCleared * 100; // 100 points per line cleared
    updateScore();
  }
}

// Show game over screen
function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;
  context.fillStyle = 'black';
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  context.globalAlpha = 1;
  context.fillStyle = 'white';
  context.font = '36px Poppins, sans-serif';
  context.textAlign = 'center';
  context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
  restartButton.classList.remove('hidden'); // Show restart button
}




// Update the score display
// Update score and high score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('tetrisHighScore', highScore);
    highScoreDisplay.textContent = `High Score: ${highScore}`;
  }
}

// Main game loop
function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayfield();
  drawTetromino();
  if (++count > dropSpeed && !gameOver) {
    tetromino.row++;
    if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
      tetromino.row--;
      placeTetromino();
    }
    count = 0;
  }
  if (!gameOver) rAF = requestAnimationFrame(loop);
}

// Draw playfield
function drawPlayfield() {
  playfield.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        context.fillStyle = colors[cell];
        context.fillRect(c * grid, r * grid, grid - 1, grid - 1);
      }
    });
  });
}

// Draw the active tetromino
function drawTetromino() {
  tetromino.matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        context.fillStyle = colors[tetromino.name];
        context.fillRect((tetromino.col + c) * grid, (tetromino.row + r) * grid, grid - 1, grid - 1);
      }
    });
  });
}

function instantDrop() {
  while (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
    tetromino.row++;
  }
  placeTetromino();
}

// Event listeners
document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft' && isValidMove(tetromino.matrix, tetromino.row, tetromino.col - 1)) {
    tetromino.col--;
  } else if (e.key === 'ArrowRight' && isValidMove(tetromino.matrix, tetromino.row, tetromino.col + 1)) {
    tetromino.col++;
  } else if (e.key === 'ArrowUp') {
    const rotated = rotate(tetromino.matrix);
    if (isValidMove(rotated, tetromino.row, tetromino.col)) {
      tetromino.matrix = rotated;
    }
  } else if (e.key === 'ArrowDown') {
    if (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
      tetromino.row++;
    } else {
      placeTetromino();
    }
  } else if (e.key === ' ') {
    instantDrop();
  }
});
document.getElementById('restartButton').addEventListener('click', () => {
  location.reload(); // Refreshes the page completely
});


// Start the game
tetromino = getNextTetromino();
rAF = requestAnimationFrame(loop);
const holdCanvas = document.getElementById('holdCanvas');
const holdContext = holdCanvas.getContext('2d');
let heldTetromino = null;
let canHold = true;

// Draw held piece inside holdCanvas
function drawHeldTetromino() {
  holdContext.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
  if (!heldTetromino) return;

  holdContext.fillStyle = colors[heldTetromino.name];

  const matrix = heldTetromino.matrix;
  const size = matrix.length;
  const offsetX = (holdCanvas.width - size * grid) / 2;
  const offsetY = (holdCanvas.height - size * grid) / 2;

  matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        holdContext.fillRect(offsetX + c * grid, offsetY + r * grid, grid - 1, grid - 1);
      }
    });
  });
}

// Swap current piece with held piece
function holdTetromino() {
  if (!canHold) return;

  if (heldTetromino) {
    // Swap current Tetromino with held Tetromino
    let temp = heldTetromino;
    heldTetromino = tetromino;
    tetromino = temp;
  } else {
    // First time holding, just store the piece
    heldTetromino = tetromino;
    tetromino = getNextTetromino();
  }

  // Reset Tetromino position
  tetromino.row = tetromino.name === 'I' ? -1 : -2;
  tetromino.col = Math.floor((playfield[0].length - tetromino.matrix[0].length) / 2);

  // Prevent multiple holds until a piece is placed
  canHold = false;
  drawHeldTetromino();
}

// Allow holding again after placing a piece
function placeTetromino() {
  tetromino.matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        if (tetromino.row + r < 0) {
          showGameOver();
        } else {
          playfield[tetromino.row + r][tetromino.col + c] = tetromino.name;
        }
      }
    });
  });
  clearLines();
  tetromino = getNextTetromino();
  canHold = true; // Reset hold permission
}

// Modify key event listener
document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'Shift') {
    holdTetromino();
  }
});
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;

  // Increase level every 5000 points
  let newLevel = Math.floor(score / 5000) + 1;
  if (newLevel > level) {
    level = newLevel;
    dropSpeed = Math.max(10, 35 - (level * 3)); // Increase speed, min value is 10
  }
}
