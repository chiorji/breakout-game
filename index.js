
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const interval = setInterval(draw, 10);

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
let ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let isRightKeyPressed = false;
let isLeftKeyPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function detectCollision() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game over")
      document.location.reload();
      clearInterval(interval);
    }
  }
}

function checkKeyPress() {
  if (isRightKeyPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (isLeftKeyPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

function draBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#009fe4';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draBall();
  draPaddle();

  detectCollision();
  checkKeyPress();

  x += dx;
  y += dy;
}

function draPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#009fe4';
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    isRightKeyPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    isLeftKeyPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    isRightKeyPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    isLeftKeyPressed = false;
  }
}
