import '../../shared/styles.css'
import { playAnimalSound, preloadAnimalSounds } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const animals = [
  { id: 'cat', emoji: '🐱', name: 'Cat' },
  { id: 'dog', emoji: '🐶', name: 'Dog' },
  { id: 'cow', emoji: '🐮', name: 'Cow' },
  { id: 'bird', emoji: '🐦', name: 'Bird' },
]

const board = document.createElement('div')
board.className = 'animal-grid'

animals.forEach((animal) => {
  const card = document.createElement('button')
  card.type = 'button'
  card.className = 'animal-card'
  card.innerHTML = `
    <span class="animal-emoji">${animal.emoji}</span>
    <span class="animal-name">${animal.name}</span>
  `

  bindTap(card, () => {
    card.classList.remove('bounce')
    void card.offsetWidth
    card.classList.add('bounce')
    playAnimalSound(animal.id)
  })

  board.appendChild(card)
})

setupGameShell({ title: 'Animal Sounds', content: board })

document.addEventListener(
  'pointerdown',
  () => {
    preloadAnimalSounds()
  },
  { once: true },
)
