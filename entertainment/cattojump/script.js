//board
let board;
let boardWidth = 480; // Adjusted size for better gameplay
let boardHeight = 720;
let context;

//doodler
let doodlerWidth = 44;
let doodlerHeight = 44;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = boardHeight * 7 / 8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight
};

//physics
let velocityX = 0;
let velocityY = 0;
let initialVelocityY = -7.9; // Adjusted for smoother jumping
let gravity = 0;

//platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 14;
let platformSpacing = 100; // Minimum vertical space between platforms
let platformImg;

let score = 0;
let maxScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameOver = false;
let gameStarted = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "images/doodler-right.png";
    doodler.img = doodlerRightImg;

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "images/doodler-left.png";

    platformImg = new Image();
    platformImg.src = "images/platform.png";

    drawStartScreen();

    document.addEventListener("keydown", handleInput);
};

function drawStartScreen() {
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "#000";
    context.font = "20px Poppins";
    context.textAlign = "center";
    context.fillText("Press Space to Start", boardWidth / 2, boardHeight / 2);
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    maxScore = 0;
    velocityY = initialVelocityY;
    doodler.x = doodlerX;
    doodler.y = doodlerY;
    placePlatforms();
    requestAnimationFrame(update);
}

function update() {
    if (!gameStarted) return;
    if (gameOver) {
        drawGameOverScreen();
        return;
    }

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // doodler movement
    doodler.x += velocityX;
    if (doodler.x > boardWidth) doodler.x = 0;
    else if (doodler.x + doodler.width < 0) doodler.x = boardWidth;

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height) {
        gameOver = true;
    }

    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    // platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && doodler.y < boardHeight * 3 / 4) {
            platform.y -= initialVelocityY; // slide platform down
        }
        if (detectCollision(doodler, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; // jump
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // clear platforms and add new platform
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
        platformArray.shift();
        newPlatform();
    }

    // score
    updateScore();
    context.fillStyle = "black";
    context.font = "16px Poppins";
    context.fillText(`Score: ${score}`, 50, 30); // Adjusted position
    context.fillText(`High Score: ${highScore}`, 70, 50); // Adjusted position
}

function drawGameOverScreen() {
    context.fillStyle = "#000";
    context.font = "20px Poppins";
    context.textAlign = "center";
    context.fillText("Game Over", boardWidth / 2, boardHeight / 2 - 20);
    context.fillText("Press Space to Restart", boardWidth / 2, boardHeight / 2 + 20);
}

function handleInput(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        velocityX = 4;
        doodler.img = doodlerRightImg;
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    } else if (e.code === "Space") {
        if (gameOver) {
            startGame();
        } else if (!gameStarted) {
            startGame();
        }
    }
}

function placePlatforms() {
    platformArray = [];

    let platform = {
        img: platformImg,
        x: boardWidth / 2,
        y: boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    };
    platformArray.push(platform);

    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * boardWidth * 3 / 4);
        let platform = {
            img: platformImg,
            x: randomX,
            y: boardHeight - platformSpacing * i - 150, // Ensures proper spacing
            width: platformWidth,
            height: platformHeight
        };
        platformArray.push(platform);
    }
}

function newPlatform() {
    let randomX = Math.floor(Math.random() * boardWidth * 3 / 4);
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    };
    platformArray.push(platform);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function updateScore() {
    if (velocityY < 0) {
        maxScore += 1;
        if (score < maxScore) {
            score = maxScore;
        }
    }
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}
