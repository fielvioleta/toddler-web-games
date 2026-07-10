import '../../shared/styles.css'
import { playBoost } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const FISH = ['🐠', '🐟', '🐡', '🦈']

const stage = document.createElement('div')
stage.className = 'canvas-stage'
const canvas = document.createElement('canvas')
stage.appendChild(canvas)
setupGameShell({ title: 'Fish Swim', content: stage })

const ctx = canvas.getContext('2d')
const fish = FISH[Math.floor(Math.random() * FISH.length)]
let w = 0
let h = 0
let fishY = 0.5
let fishVy = 0
let scrollX = 0
let bubbles = []

function resize() {
  const r = stage.getBoundingClientRect()
  w = Math.floor(r.width)
  h = Math.floor(r.height)
  canvas.width = w
  canvas.height = h
  bubbles = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 4 + Math.random() * 10,
    speed: 0.3 + Math.random() * 0.5,
  }))
}

bindTap(stage, () => {
  fishVy -= 0.04
  if (fishVy < -0.1) fishVy = -0.1
  playBoost()
})

function update() {
  fishVy += 0.0015
  if (fishVy > 0.02) fishVy = 0.02
  fishY += fishVy
  if (fishY < 0.12) fishY = 0.12
  if (fishY > 0.88) fishY = 0.88
  scrollX += 2

  bubbles.forEach((b) => {
    b.y -= b.speed
    b.x -= 0.5
    if (b.y < -20) {
      b.y = h + 20
      b.x = Math.random() * w
    }
  })
}

function draw() {
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#4FC3F7')
  grad.addColorStop(1, '#01579B')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  bubbles.forEach((b) => {
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fill()
  })

  ctx.font = `${h * 0.04}px serif`
  for (let i = 0; i < 5; i++) {
    const sx = ((scrollX + i * 200) % (w + 100)) - 50
    ctx.fillText('🌿', sx, h * 0.85 + Math.sin(scrollX * 0.02 + i) * 10)
  }

  const fy = fishY * h
  const wobble = Math.sin(Date.now() * 0.005) * 5
  ctx.font = `${h * 0.13}px serif`
  ctx.textAlign = 'center'
  ctx.fillText(fish, w * 0.35 + wobble, fy)
}

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

resize()
loop()
window.addEventListener('resize', resize)
