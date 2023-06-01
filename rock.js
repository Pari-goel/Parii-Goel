
import { randomGridPosition } from './grid.js'

let rock = getRandomRockPosition()

export function update() {
  //if snake hits rock
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)//snake expanded
    food = getRandomFoodPosition() //food position changed
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  //when food is null or food is on the snake
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

export function hitsRock() {
    //if the head of snake hits rock
    if (snakeBody[0].x === rock[x] && snakeBody[0].y === rock[y]){
        return true;
  }
}