let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break //if we are moving up or down cannot move up
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break //cannot swap directions 180 deg
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}