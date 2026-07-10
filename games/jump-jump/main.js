import '../../shared/styles.css'
import { playJump, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const HEROES = ['🐰', '🦘', '🐶', '🐻', '🐱']
const stage = document.createElement('div')
stage.className = 'canvas-stage'
const canvas = document.createElement('canvas')
stage.appendChild(canvas)
setupGameShell({ title: 'Jump Jump', content: stage })

const ctx = canvas.getContext('2d')
const hero = HEROES[Math.floor(Math.random() * HEROES.length)]
let w = 0
let h = 0
let scrollX = 0
let jumpVy = 0
let jumpY = 0
let onGround = true
let passed = 0

function resize() {
  const r = stage.getBoundingClientRect()
  w = Math.floor(r.width)
  h = Math.floor(r.height)
  canvas.width = w
  canvas.height = h
}

function groundLevel(x) {
  return h * 0.78 + Math.sin(x * 0.015) * 18
}

function bumpAt(worldX) {
  const n = Math.floor(worldX / 280)
  const local = worldX - n * 280
  if (local > 120 && local < 180) return 55
  return 0
}

function doJump() {
  if (onGround) {
    jumpVy = -11
    onGround = false
    playJump()
  }
}

bindTap(stage, doJump)

function update() {
  scrollX += 3.2
  if (!onGround) {
    jumpVy += 0.45
    jumpY += jumpVy
    if (jumpY >= 0) {
      jumpY = 0
      jumpVy = 0
      onGround = true
    }
  }
  const wx = scrollX + w * 0.22
  const bump = bumpAt(wx)
  if (bump > 40 && onGround && jumpY > -5) {
    passed += 1
    if (passed % 3 === 0) playSuccess()
  }
}

function draw() {
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#B8E8FF')
  grad.addColorStop(1, '#E8FFF0')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  const gx = scrollX
  ctx.beginPath()
  for (let x = 0; x < w + 40; x += 8) {
    const wx = gx + x
    const by = groundLevel(wx) - bumpAt(wx)
    if (x === 0) ctx.moveTo(x, by)
    else ctx.lineTo(x, by)
  }
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.fillStyle = '#4A9E3F'
  ctx.fill()

  const px = w * 0.22
  const bump = bumpAt(scrollX + px)
  const py = groundLevel(scrollX + px) - bump + jumpY
  ctx.font = `${h * 0.12}px serif`
  ctx.textAlign = 'center'
  ctx.fillText(hero, px, py - h * 0.02)

  if (bump > 40) {
    ctx.font = `${h * 0.07}px serif`
    ctx.fillText('🪨', px + 80 - (scrollX % 280), groundLevel(scrollX + px + 80) - 10)
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
