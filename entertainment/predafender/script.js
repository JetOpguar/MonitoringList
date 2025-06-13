// script.js

// Selecting Canvas
const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  stopGame()
})

// Variables & Constants
const c = canvas.getContext('2d')
const scoreEl = document.getElementById('scoreEl')
const highestEl = document.getElementById('highestEl')
const startGameBtn = document.getElementById('startGameBtn')
const modelEl = document.getElementById('modelEl')
const bigScoreEl = document.getElementById('bigScoreEl')
const friction = 0.98
let x = canvas.width / 2
let y = canvas.height / 2
let projectiles = []
let enemies = []
let particles = []
let score = 0
let highest = localStorage.getItem('highest') || 0
let animationId
let spanEnemiesInterval
let spawnTime = 800
highestEl.innerHTML = highest

// Starting Ball Class
class Ball {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false)
    c.fillStyle = this.color
    c.fill()
  }
}

// Shooter Ball for Moving Ball
class Shooter extends Ball {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color)
    this.velocity = velocity
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

// Particle for Exploding Shooter Ball
class Particle extends Shooter {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity)
    this.alpha = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false)
    c.fillStyle = this.color
    c.fill()
    c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x * 2
    this.y = this.y + this.velocity.y * 2
    this.alpha -= 0.01
  }
}

function updateScore(times = 1) {
  spawnTime *= 0.995; // Make spawn intervals faster with each score update
  score += 100 * times;
  scoreEl.innerHTML = score;
}
// Calculate Velocity from center(x, y) to (x1, y1)
function calculateVelocity(x, y, x1 = canvas.width / 2, y1 = canvas.height / 2) {
  const angle = Math.atan2(y1 - y, x1 - x)
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }

  return velocity
}

// Animation
function animate() {
  animationId = requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.draw()

  // Updates and remove particles
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      setTimeout(() => {
        particles.splice(index, 1)
      }, 0)
    } else {
      particle.update()
    }
  })

  // Update and remove projectiles
  projectiles.forEach((projectile, index) => {
    projectile.update()
    if (
      projectile.x + projectile.radius < 1 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    }
  })

  // Update & Destroy Enemies, Create Explosions & Increase Score
  enemies.forEach((enemy, index) => {
    enemy.update()

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if (dist - enemy.radius - player.radius < 1) {
      stopGame()
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      if (dist - enemy.radius - projectile.radius < 0) {
        for (let i = 0; i < enemy.radius * 1; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 3,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 9.8 - 0.5),
                y: (Math.random() - 0.5) * (Math.random() * 9.8 - 0.5),
              }
            )
          )
        }

        if (enemy.radius - 10 > 10) {
          updateScore()
          enemy.radius -= 8
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1)
          }, 0)
        } else {
          updateScore(2.5)
          setTimeout(() => {
            enemies.splice(index, 1)
            projectiles.splice(projectileIndex, 1)
          }, 0)
        }
      }
    })
  })
}

// Shoot Enemy
function shootEnemy(e) {
  let x = canvas.width / 2,
    y = canvas.height / 2;

  const velocity = calculateVelocity(x, y, e.clientX, e.clientY);
  velocity.x *= 6.5; // Faster projectiles (was 5.5)
  velocity.y *= 6.5;
  projectiles.push(new Shooter(x, y, 5, 'white', velocity));
}
// Reinitializing Variables for Starting a New Game
function init() {
  player = new Ball(x, y, 25, 'white'); // Player radius reduced to 8 (was 10)
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  spawnTime = 800; // Reset spawn time for new game
  scoreEl.innerHTML = score;
  highestEl.innerHTML = highest;
}

// Stop Game
function stopGame() {
  clearInterval(spanEnemiesInterval)
  cancelAnimationFrame(animationId)
  canvas.removeEventListener('click', shootEnemy)
  modelEl.style.display = 'flex'
  if (score > highest) {
    highest = score
    localStorage.setItem('highest', highest)
  }
  bigScoreEl.innerHTML = score
}

// Spawning Random Enemies
function spanEnemies() {
  spanEnemiesInterval = setTimeout(() => {
    let x, y;
    const radius = Math.random() * 18 + 12; // Smaller and faster enemies (was 16 + 14)
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const velocity = calculateVelocity(x, y);
    velocity.x *= 1.2; // Increase enemy speed (was 1)
    velocity.y *= 1.2; // Increase enemy speed (was 1)
    enemies.push(new Shooter(x, y, radius, color, velocity));
    spawnTime *= 0.98; // Enemies spawn faster over time
    spanEnemies(); // Recursive call for continuous spawning
  }, spawnTime);
}


// Start New Game
function startGame() {
  x = canvas.width / 2
  y = canvas.height / 2
  canvas.addEventListener('click', shootEnemy)
  init()
  animate()
  clearInterval(spanEnemiesInterval)
  spanEnemies()
  modelEl.style.display = 'none'
}

// Start Game Button
startGameBtn.addEventListener('click', startGame)

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
document.addEventListener('copy', function (e) {
  e.preventDefault();
});
