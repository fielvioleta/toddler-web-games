import '../../shared/styles.css'
import { playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const COLOR_POOL = [
  { id: 'red', color: '#FF6B6B', slotBg: '#FFE0E0' },
  { id: 'blue', color: '#4D96FF', slotBg: '#D6E8FF' },
  { id: 'yellow', color: '#FFE66D', slotBg: '#FFF8D6' },
  { id: 'green', color: '#6BCB77', slotBg: '#D6F5DA' },
  { id: 'purple', color: '#A78BFA', slotBg: '#EDE5FF' },
  { id: 'orange', color: '#FF9F43', slotBg: '#FFE8D6' },
]

let currentPairs = pickRandomPairs()
let selectedCircle = null
let matchedCount = 0

const board = document.createElement('div')
board.className = 'color-match-board'

const circlesRow = document.createElement('div')
circlesRow.className = 'color-row'

const slotsRow = document.createElement('div')
slotsRow.className = 'color-row'

board.append(circlesRow, slotsRow)
setupGameShell({ title: 'Color Match', content: board })

buildBoard(currentPairs)

function pickRandomPairs(count = 2) {
  const shuffled = [...COLOR_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function buildBoard(pairs) {
  circlesRow.innerHTML = ''
  slotsRow.innerHTML = ''

  const shuffledSlots = [...pairs].sort(() => Math.random() - 0.5)

  pairs.forEach((pair) => {
    circlesRow.appendChild(createCircle(pair))
  })

  shuffledSlots.forEach((pair) => {
    slotsRow.appendChild(createSlot(pair))
  })
}

function createCircle(pair) {
  const circle = document.createElement('button')
  circle.type = 'button'
  circle.className = 'color-item'
  circle.style.background = pair.color
  circle.dataset.colorId = pair.id
  circle.setAttribute('aria-label', `${pair.id} circle`)
  bindTap(circle, () => selectCircle(circle, pair.id))
  return circle
}

function createSlot(pair) {
  const slot = document.createElement('button')
  slot.type = 'button'
  slot.className = 'color-slot'
  slot.dataset.colorId = pair.id
  slot.style.setProperty('--slot-color', pair.color)
  slot.style.background = pair.slotBg
  slot.setAttribute('aria-label', `${pair.id} box`)
  bindTap(slot, () => tryMatch(slot, pair.id))
  return slot
}

function selectCircle(circle, colorId) {
  if (circle.classList.contains('matched')) return

  document.querySelectorAll('.color-item.selected').forEach((el) => {
    if (!el.classList.contains('matched')) el.classList.remove('selected')
  })

  if (selectedCircle === circle) {
    selectedCircle = null
    circle.classList.remove('selected')
    return
  }

  selectedCircle = circle
  circle.classList.add('selected')
}

function tryMatch(slot, slotColorId) {
  if (!selectedCircle || slot.querySelector('.color-item')) return

  document.querySelectorAll('.color-slot.highlight').forEach((el) => el.classList.remove('highlight'))
  slot.classList.add('highlight')

  if (selectedCircle.dataset.colorId === slotColorId) {
    const clone = selectedCircle.cloneNode(true)
    clone.classList.remove('selected')
    clone.classList.add('matched')
    slot.classList.add('filled')
    slot.appendChild(clone)
    selectedCircle.classList.add('matched')
    selectedCircle.style.visibility = 'hidden'
    selectedCircle.style.pointerEvents = 'none'
    selectedCircle = null
    matchedCount += 1
    playSuccess()
    showStars()

    if (matchedCount === currentPairs.length) {
      setTimeout(resetBoard, 1500)
    }
  } else {
    setTimeout(() => slot.classList.remove('highlight'), 300)
  }
}

function showStars() {
  const burst = document.createElement('div')
  burst.className = 'stars-burst'
  burst.textContent = '⭐✨'
  document.body.appendChild(burst)
  burst.addEventListener('animationend', () => burst.remove())
}

function resetBoard() {
  matchedCount = 0
  selectedCircle = null
  currentPairs = pickRandomPairs()
  buildBoard(currentPairs)
}
