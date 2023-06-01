import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let score = 0;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    gameOverSound.play();
    musicSound.pause();
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/' //refresh page
    }
    musicSound.play();
    score = 0; 
    return
  }


// Main logic starts here
musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}

  window.requestAnimationFrame(main)
  //to check if seconds since our last render is less than time bw renders
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  console.log('Render')
  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = '' //clear everything in view, doesnt show prev pieces
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

//if snake runs hits the wall or itself or any obstacle
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || hitsRock()
}