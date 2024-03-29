import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
const snakeBody = [
  { x: 10, y: 11 },
  { x: 11, y: 11 },
  { x: 12, y: 11 }

]  //snakebody beginning
let newSegments = 0

export function update() {
  addSegments()

  const inputDirection = getInputDirection()

  //snake movement
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] } //set a new object
  }

  //update the head
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() {
  return snakeBody[0]
}


//checks the head against every other position of snake and if any of them are same = snake has touched itself
export function snakeIntersection() {
  //if the head of snake is touching its body
  return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0 //getting rid of new segments
}