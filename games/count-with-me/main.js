import '../../shared/styles.css'
import { speakCount, speakPraise } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const MAX_COUNT = 10
const ITEMS = ['⭐', '🍎', '🌟', '🎈', '🌸', '🦋', '🐶', '🚗', '🌈', '🐠']

let targetCount = 1
let tappedCount = 0

const board = document.createElement('div')
board.className = 'count-board'

const display = document.createElement('div')
display.className = 'count-display'
display.textContent = ''

const objectsRow = document.createElement('div')
objectsRow.className = 'count-objects'

const nextBtn = document.createElement('button')
nextBtn.type = 'button'
nextBtn.className = 'next-round-btn hidden'
nextBtn.textContent = 'Again! 🎉'

board.append(display, objectsRow, nextBtn)
setupGameShell({ title: 'Count with Me', content: board })

bindTap(nextBtn, () => {
  nextBtn.classList.add('hidden')
  startRound()
})

function getItemLayout(count) {
  if (count <= 4) return { size: 100, fontSize: '3.5rem', gap: '1.25rem' }
  if (count <= 7) return { size: 84, fontSize: '2.8rem', gap: '0.85rem' }
  return { size: 72, fontSize: '2.4rem', gap: '0.65rem' }
}

function startRound() {
  targetCount = Math.floor(Math.random() * MAX_COUNT) + 1
  tappedCount = 0
  display.textContent = ''
  objectsRow.innerHTML = ''

  const emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  const layout = getItemLayout(targetCount)
  objectsRow.style.gap = layout.gap

  for (let i = 0; i < targetCount; i++) {
    const item = document.createElement('button')
    item.type = 'button'
    item.className = 'count-item'
    item.textContent = emoji
    item.style.width = `${layout.size}px`
    item.style.height = `${layout.size}px`
    item.style.fontSize = layout.fontSize
    item.setAttribute('aria-label', 'Count item')

    bindTap(item, () => tapItem(item))
    objectsRow.appendChild(item)
  }
}

function tapItem(item) {
  if (item.classList.contains('tapped')) return

  item.classList.add('tapped', 'bounce')
  tappedCount += 1
  speakCount(tappedCount)
  display.textContent = String(tappedCount)

  if (tappedCount === targetCount) {
    setTimeout(() => {
      speakPraise()
      display.textContent = '🎉'
      nextBtn.classList.remove('hidden')
    }, 500)
  }
}

startRound()
