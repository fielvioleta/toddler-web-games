import '../../shared/styles.css'
import { playSplash } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F472B6', '#60A5FA', '#FF9F43', '#6BCB77']

const board = document.createElement('div')
board.className = 'splash-board'

const canvas = document.createElement('div')
canvas.className = 'splash-canvas'
board.appendChild(canvas)

const clearBtn = document.createElement('button')
clearBtn.type = 'button'
clearBtn.className = 'splash-clear-btn'
clearBtn.textContent = '🔄 Clear'
board.appendChild(clearBtn)

setupGameShell({ title: 'Splash Paint', content: board })

let colorIndex = 0

function splat(x, y) {
  const color = COLORS[colorIndex % COLORS.length]
  colorIndex += 1
  const size = 70 + Math.random() * 50
  const splat = document.createElement('div')
  splat.className = 'paint-splat'
  splat.style.left = `${x - size / 2}px`
  splat.style.top = `${y - size / 2}px`
  splat.style.width = `${size}px`
  splat.style.height = `${size}px`
  splat.style.background = color
  canvas.appendChild(splat)
  playSplash()
}

canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect()
  splat(e.clientX - rect.left, e.clientY - rect.top)
})

bindTap(clearBtn, () => {
  canvas.innerHTML = ''
  colorIndex = 0
})
