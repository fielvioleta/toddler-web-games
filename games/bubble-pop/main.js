import '../../shared/styles.css'
import { playPop } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F472B6', '#60A5FA']
const MAX_BUBBLES = 12
const SPAWN_INTERVAL_MS = 800

const stage = document.createElement('div')
stage.className = 'bubble-stage'

setupGameShell({ title: 'Bubble Pop', content: stage })

let bubbleCount = 0

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function spawnBubble() {
  if (bubbleCount >= MAX_BUBBLES) return

  const size = randomBetween(96, 140)
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const left = randomBetween(4, 100 - (size / stage.clientWidth) * 100 - 4)
  const duration = randomBetween(9, 14)
  const travelPx = stage.clientHeight + size + 140

  const bubble = document.createElement('button')
  bubble.type = 'button'
  bubble.className = 'bubble'
  bubble.setAttribute('aria-label', 'Pop bubble')
  bubble.style.width = `${size}px`
  bubble.style.height = `${size}px`
  bubble.style.left = `${left}%`
  bubble.style.bottom = '-140px'
  bubble.style.setProperty('--float-distance', `-${travelPx}px`)
  bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${color} 55%, ${color} 100%)`
  bubble.style.animationDuration = `${duration}s`

  bindTap(bubble, () => popBubble(bubble, color))

  stage.appendChild(bubble)
  bubbleCount += 1

  bubble.addEventListener('animationend', () => {
    if (bubble.parentNode && !bubble.classList.contains('popping')) {
      bubble.remove()
      bubbleCount -= 1
    }
  })
}

function popBubble(bubble, color) {
  if (bubble.classList.contains('popping')) return

  bubble.classList.add('popping')
  playPop()
  spawnParticles(bubble, color)

  setTimeout(() => {
    bubble.remove()
    bubbleCount -= 1
  }, 350)
}

function spawnParticles(bubble, color) {
  const rect = bubble.getBoundingClientRect()
  const stageRect = stage.getBoundingClientRect()
  const cx = rect.left + rect.width / 2 - stageRect.left
  const cy = rect.top + rect.height / 2 - stageRect.top

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('span')
    particle.className = 'particle'
    particle.style.left = `${cx}px`
    particle.style.top = `${cy}px`
    particle.style.background = color
    const angle = (Math.PI * 2 * i) / 8
    const dist = randomBetween(40, 90)
    particle.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
    particle.style.setProperty('--ty', `${Math.sin(angle) * dist}px`)
    stage.appendChild(particle)
    particle.addEventListener('animationend', () => particle.remove())
  }
}

spawnBubble()
setInterval(spawnBubble, SPAWN_INTERVAL_MS)
