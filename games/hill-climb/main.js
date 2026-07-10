import '../../shared/styles.css'
import { playBoost, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const CARS = ['🚗', '🚙', '🏎️', '🚕', '🛻']
const AUTO_SPEED = 0.4
const TAP_BOOST = 2.8
const FRICTION = 0.992
const MILESTONE_EVERY = 420

const stage = document.createElement('div')
stage.className = 'hill-climb-stage'

const canvas = document.createElement('canvas')
canvas.className = 'hill-climb-canvas'
stage.appendChild(canvas)

const hint = document.createElement('div')
hint.className = 'hill-climb-hint'
hint.textContent = 'Tap to go! 👆'
stage.appendChild(hint)

setupGameShell({ title: 'Hill Climb', content: stage })

const ctx = canvas.getContext('2d')
const car = CARS[Math.floor(Math.random() * CARS.length)]

let width = 0
let height = 0
let carX = 80
let velocity = AUTO_SPEED
let cameraX = 0
let lastMilestone = 0
let hintVisible = true
let animId = 0

function groundY(x) {
  const base = height * 0.72
  return (
    base +
    Math.sin(x * 0.007) * height * 0.1 +
    Math.sin(x * 0.019 + 1.2) * height * 0.05 +
    Math.sin(x * 0.003) * height * 0.06
  )
}

function groundSlope(x) {
  const dx = 2
  return Math.atan2(groundY(x + dx) - groundY(x - dx), dx * 2)
}

function resize() {
  const rect = stage.getBoundingClientRect()
  width = Math.floor(rect.width)
  height = Math.floor(rect.height)
  canvas.width = width
  canvas.height = height
}

function boost() {
  velocity += TAP_BOOST
  if (velocity > 9) velocity = 9
  playBoost()
  hintVisible = false
  hint.style.opacity = '0'
}

bindTap(stage, boost)

function drawSky() {
  const grad = ctx.createLinearGradient(0, 0, 0, height)
  grad.addColorStop(0, '#87CEEB')
  grad.addColorStop(0.55, '#B8E4FF')
  grad.addColorStop(1, '#E8F8FF')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  ctx.font = `${Math.floor(height * 0.08)}px serif`
  ctx.fillText('☁️', width * 0.12 - (cameraX * 0.05) % width, height * 0.14)
  ctx.fillText('☁️', width * 0.55 - (cameraX * 0.03) % width, height * 0.1)
  ctx.fillText('☀️', width * 0.82, height * 0.12)
}

function drawGround() {
  const startX = cameraX - 40
  const endX = cameraX + width + 40

  ctx.beginPath()
  ctx.moveTo(startX - cameraX, height)

  for (let x = startX; x <= endX; x += 6) {
    ctx.lineTo(x - cameraX, groundY(x))
  }

  ctx.lineTo(endX - cameraX, height)
  ctx.closePath()

  const grass = ctx.createLinearGradient(0, height * 0.5, 0, height)
  grass.addColorStop(0, '#7BC96F')
  grass.addColorStop(1, '#4A9E3F')
  ctx.fillStyle = grass
  ctx.fill()

  ctx.strokeStyle = '#3D8B32'
  ctx.lineWidth = 4
  ctx.beginPath()
  for (let x = startX; x <= endX; x += 6) {
    const px = x - cameraX
    const py = groundY(x)
    if (x === startX) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()
}

function drawCar() {
  const x = carX - cameraX
  const y = groundY(carX)
  const angle = groundSlope(carX)
  const size = Math.min(width, height) * 0.14

  ctx.save()
  ctx.translate(x, y - size * 0.35)
  ctx.rotate(angle)

  ctx.font = `${size}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(car, 0, 0)

  ctx.restore()
}

function drawMilestoneMarkers() {
  const nextMark = Math.ceil(carX / MILESTONE_EVERY) * MILESTONE_EVERY
  for (let mx = nextMark - MILESTONE_EVERY * 2; mx < carX + width; mx += MILESTONE_EVERY) {
    if (mx < MILESTONE_EVERY) continue
    const px = mx - cameraX
    const py = groundY(mx)
    ctx.font = `${Math.floor(height * 0.06)}px serif`
    ctx.textAlign = 'center'
    ctx.fillText('🚩', px, py - height * 0.08)
  }
}

function checkMilestone() {
  const milestone = Math.floor(carX / MILESTONE_EVERY)
  if (milestone > lastMilestone && carX > MILESTONE_EVERY) {
    lastMilestone = milestone
    playSuccess()
    showStars()
  }
}

function showStars() {
  const burst = document.createElement('div')
  burst.className = 'stars-burst'
  burst.textContent = '⭐🎉'
  document.body.appendChild(burst)
  burst.addEventListener('animationend', () => burst.remove())
}

function update() {
  velocity *= FRICTION
  if (velocity < AUTO_SPEED) velocity = AUTO_SPEED

  carX += velocity
  cameraX = carX - width * 0.28

  checkMilestone()
}

function draw() {
  drawSky()
  drawGround()
  drawMilestoneMarkers()
  drawCar()
}

function loop() {
  update()
  draw()
  animId = requestAnimationFrame(loop)
}

resize()
loop()

window.addEventListener('resize', resize)
