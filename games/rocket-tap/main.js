import '../../shared/styles.css'
import { playBoost, playSuccess, playPop } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const stage = document.createElement('div')
stage.className = 'canvas-stage'
const canvas = document.createElement('canvas')
stage.appendChild(canvas)
setupGameShell({ title: 'Rocket Tap', content: stage })

const ctx = canvas.getContext('2d')
let w = 0
let h = 0
let rocketY = 0.7
let velocity = 0
let stars = []
let score = 0
let camY = 0

function resize() {
  const r = stage.getBoundingClientRect()
  w = Math.floor(r.width)
  h = Math.floor(r.height)
  canvas.width = w
  canvas.height = h
  if (stars.length === 0) spawnStars()
}

function spawnStars() {
  stars = []
  for (let i = 0; i < 25; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h * 4,
      size: 20 + Math.random() * 16,
      collected: false,
    })
  }
}

bindTap(stage, () => {
  velocity -= 0.035
  if (velocity < -0.12) velocity = -0.12
  playBoost()
})

function update() {
  velocity += 0.0012
  if (velocity > 0.025) velocity = 0.025
  rocketY += velocity
  camY = rocketY * h - h * 0.5
  if (rocketY < 0.05) {
    rocketY = 0.05
    velocity = 0.01
  }

  const rx = w * 0.5
  const ry = rocketY * h
  stars.forEach((s) => {
    if (s.collected) return
    const sy = s.y - camY
    const dx = rx - s.x
    const dy = ry - sy
    if (Math.hypot(dx, dy) < 50) {
      s.collected = true
      score += 1
      playPop()
      if (score % 5 === 0) playSuccess()
    }
  })
}

function draw() {
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#0a0a2e')
  grad.addColorStop(1, '#1a1a4e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  ctx.font = '16px serif'
  stars.forEach((s) => {
    if (s.collected) return
    const sy = s.y - camY
    if (sy < -40 || sy > h + 40) return
    ctx.font = `${s.size}px serif`
    ctx.fillText('⭐', s.x, sy)
  })

  const ry = rocketY * h
  ctx.font = `${h * 0.14}px serif`
  ctx.textAlign = 'center'
  ctx.fillText('🚀', w * 0.5, ry)

  if (velocity < -0.005) {
    ctx.font = `${h * 0.05}px serif`
    ctx.fillText('🔥', w * 0.5, ry + h * 0.08)
  }
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

resize()
loop()
window.addEventListener('resize', resize)
