import '../../shared/styles.css'
import { playJump, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const HEROES = ['🐰', '🦘', '🐶', '🐻', '🐱']
const PLAYER_SCREEN_X = 0.28
const GROUND_RATIO = 0.8
const RUN_SPEED = 200
const OBSTACLE_GAP = 340
const JUMP_POWER = -520
const GRAVITY = 1400

const stage = document.createElement('div')
stage.className = 'canvas-stage'
const canvas = document.createElement('canvas')
stage.appendChild(canvas)
setupGameShell({ title: 'Jump Jump', content: stage })

const ctx = canvas.getContext('2d')
const hero = HEROES[Math.floor(Math.random() * HEROES.length)]

let w = 0
let h = 0
let groundY = 0
let scrollX = 0
let jumpOffset = 0
let jumpVelocity = 0
let onGround = true
let cleared = new Set()
let lastTime = 0
let skyGradient = null

function resize() {
  const rect = stage.getBoundingClientRect()
  w = Math.max(1, Math.floor(rect.width))
  h = Math.max(1, Math.floor(rect.height))
  canvas.width = w
  canvas.height = h
  groundY = h * GROUND_RATIO
  skyGradient = null
}

function playerWorldX() {
  return scrollX + w * PLAYER_SCREEN_X
}

function doJump() {
  if (onGround) {
    jumpVelocity = JUMP_POWER
    onGround = false
    playJump()
  }
}

bindTap(stage, doJump)

function update(dt) {
  scrollX += RUN_SPEED * dt

  if (!onGround) {
    jumpVelocity += GRAVITY * dt
    jumpOffset += jumpVelocity * dt
    if (jumpOffset >= 0) {
      jumpOffset = 0
      jumpVelocity = 0
      onGround = true
    }
  }

  const px = playerWorldX()
  const obstacleIndex = Math.floor(px / OBSTACLE_GAP)
  const obstacleX = obstacleIndex * OBSTACLE_GAP + OBSTACLE_GAP * 0.55

  if (
    Math.abs(px - obstacleX) < 28 &&
    onGround &&
    jumpOffset > -35 &&
    !cleared.has(obstacleIndex)
  ) {
    cleared.add(obstacleIndex)
    if (cleared.size % 3 === 0) playSuccess()
  }
}

function drawGround() {
  ctx.fillStyle = '#5CB85C'
  ctx.fillRect(0, groundY, w, h - groundY)

  ctx.strokeStyle = '#3D8B32'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(w, groundY)
  ctx.stroke()
}

function drawObstacles() {
  const start = Math.floor((scrollX - 50) / OBSTACLE_GAP)
  const end = Math.ceil((scrollX + w + 50) / OBSTACLE_GAP)

  ctx.font = `${Math.floor(h * 0.09)}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'

  for (let i = start; i <= end; i++) {
    const worldX = i * OBSTACLE_GAP + OBSTACLE_GAP * 0.55
    const screenX = worldX - scrollX
    if (screenX < -60 || screenX > w + 60) continue
    ctx.fillText('🪨', screenX, groundY - 4)
  }
}

function drawPlayer() {
  const screenX = w * PLAYER_SCREEN_X
  const screenY = groundY + jumpOffset
  const size = Math.floor(h * 0.11)

  ctx.font = `${size}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText(hero, screenX, screenY - 4)
}

function draw() {
  if (!skyGradient || skyGradient.height !== h) {
    skyGradient = ctx.createLinearGradient(0, 0, 0, h)
    skyGradient.addColorStop(0, '#B8E8FF')
    skyGradient.addColorStop(1, '#E8FFF0')
    skyGradient.height = h
  }

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, w, h)

  ctx.font = `${Math.floor(h * 0.07)}px serif`
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('☁️', w * 0.15, h * 0.18)
  ctx.fillText('☁️', w * 0.7, h * 0.14)

  drawGround()
  drawObstacles()
  drawPlayer()
}

function loop(time) {
  if (!lastTime) lastTime = time
  const dt = Math.min((time - lastTime) / 1000, 0.032)
  lastTime = time

  update(dt)
  draw()
  requestAnimationFrame(loop)
}

resize()
requestAnimationFrame(loop)
window.addEventListener('resize', resize)
