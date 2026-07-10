import '../../shared/styles.css'
import { playChomp, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const PETS = ['🐶', '🐱', '🐰', '🐻']
const FOODS = [
  { emoji: '🍎', label: 'apple' },
  { emoji: '🍌', label: 'banana' },
  { emoji: '🥕', label: 'carrot' },
  { emoji: '🍪', label: 'cookie' },
]

const board = document.createElement('div')
board.className = 'feed-board'

const pet = document.createElement('div')
pet.className = 'feed-pet'
pet.textContent = PETS[Math.floor(Math.random() * PETS.length)]

const foodRow = document.createElement('div')
foodRow.className = 'feed-food-row'

board.append(pet, foodRow)
setupGameShell({ title: 'Feed the Pet', content: board })

let fed = 0

FOODS.forEach((food) => {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'feed-food-btn'
  btn.textContent = food.emoji
  btn.setAttribute('aria-label', food.label)

  bindTap(btn, () => {
    const fly = document.createElement('span')
    fly.className = 'feed-fly'
    fly.textContent = food.emoji
    const petRect = pet.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    fly.style.left = `${btnRect.left + btnRect.width / 2}px`
    fly.style.top = `${btnRect.top}px`
    document.body.appendChild(fly)

    requestAnimationFrame(() => {
      fly.style.left = `${petRect.left + petRect.width / 2}px`
      fly.style.top = `${petRect.top + petRect.height / 2}px`
      fly.style.transform = 'translate(-50%, -50%) scale(0.5)'
      fly.style.opacity = '0'
    })

    setTimeout(() => {
      fly.remove()
      pet.classList.add('bounce')
      playChomp()
      fed += 1
      if (fed % 4 === 0) {
        playSuccess()
        pet.textContent = PETS[Math.floor(Math.random() * PETS.length)]
      }
      setTimeout(() => pet.classList.remove('bounce'), 500)
    }, 450)
  })

  foodRow.appendChild(btn)
})
