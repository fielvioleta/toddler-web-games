import '../../shared/styles.css'
import { playDrum } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const DRUMS = [
  { emoji: '🔴', color: '#FF6B6B', pitch: 180 },
  { emoji: '🟡', color: '#FFE66D', pitch: 240 },
  { emoji: '🟢', color: '#6BCB77', pitch: 300 },
  { emoji: '🔵', color: '#4D96FF', pitch: 360 },
]

const board = document.createElement('div')
board.className = 'drum-board'
const grid = document.createElement('div')
grid.className = 'drum-grid'
board.appendChild(grid)

setupGameShell({ title: 'Drum Tap', content: board })

DRUMS.forEach((drum) => {
  const pad = document.createElement('button')
  pad.type = 'button'
  pad.className = 'drum-pad'
  pad.style.background = drum.color
  pad.innerHTML = `<span class="drum-emoji">${drum.emoji}</span><span class="drum-label">🥁</span>`

  bindTap(pad, () => {
    playDrum(drum.pitch)
    pad.classList.add('hit')
    setTimeout(() => pad.classList.remove('hit'), 150)
  })

  grid.appendChild(pad)
})
