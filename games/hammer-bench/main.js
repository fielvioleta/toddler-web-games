import '../../shared/styles.css'
import { playHammer, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const PEG_COLORS = ['#FF6B6B', '#FFE66D', '#6BCB77', '#4D96FF', '#C77DFF', '#FF9F43']

const board = document.createElement('div')
board.className = 'hammer-bench-board'

const table = document.createElement('div')
table.className = 'hammer-bench-table'

const pegRow = document.createElement('div')
pegRow.className = 'hammer-peg-row'

const hammer = document.createElement('div')
hammer.className = 'hammer-tool'
hammer.textContent = '🔨'
hammer.setAttribute('aria-hidden', 'true')

const hint = document.createElement('div')
hint.className = 'hammer-hint'
hint.textContent = 'Tap a peg! 👆'

table.appendChild(pegRow)
board.append(table, hammer, hint)
setupGameShell({ title: 'Hammer Bench', content: board })

let hammered = 0
let resetting = false

function swingHammer() {
  hammer.classList.remove('swing')
  void hammer.offsetWidth
  hammer.classList.add('swing')
  hammer.addEventListener('animationend', () => hammer.classList.remove('swing'), { once: true })
}

function showStars() {
  const burst = document.createElement('div')
  burst.className = 'stars-burst'
  burst.textContent = '⭐🎉'
  document.body.appendChild(burst)
  burst.addEventListener('animationend', () => burst.remove())
}

function resetPegs() {
  resetting = true
  pegRow.querySelectorAll('.hammer-peg').forEach((peg) => {
    peg.classList.remove('hammered')
    peg.disabled = false
  })
  hammered = 0
  hint.textContent = 'Tap a peg! 👆'
  hint.style.opacity = '1'
  resetting = false
}

function celebrate() {
  playSuccess()
  showStars()
  hint.textContent = 'Yay! All done! 🎉'
  setTimeout(resetPegs, 1400)
}

function buildPegs() {
  pegRow.innerHTML = ''
  hammered = 0

  PEG_COLORS.forEach((color) => {
    const peg = document.createElement('button')
    peg.type = 'button'
    peg.className = 'hammer-peg'
    peg.style.setProperty('--peg-color', color)
    peg.setAttribute('aria-label', 'Peg')
    peg.innerHTML = `
      <span class="hammer-peg-head"></span>
      <span class="hammer-peg-body"></span>
    `

    bindTap(peg, () => {
      if (resetting || peg.classList.contains('hammered')) return

      swingHammer()
      playHammer()
      peg.classList.add('hammered')
      peg.disabled = true
      hammered += 1

      if (hammered >= PEG_COLORS.length) {
        celebrate()
      }
    })

    pegRow.appendChild(peg)
  })
}

buildPegs()
