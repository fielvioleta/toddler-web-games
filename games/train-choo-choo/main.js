import '../../shared/styles.css'
import { playHonk, playBoost, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const stage = document.createElement('div')
stage.className = 'canvas-stage'
const canvas = document.createElement('canvas')
stage.appendChild(canvas)
setupGameShell({ title: 'Train Choo Choo', content: stage })

const ctx = canvas.getContext('2d')
let w = 0
let h = 0
let trainX = 60
let velocity = 0.5
let cameraX = 0
let stations = 0

function trackY(x) {
  return h * 0.68 + Math.sin(x * 0.005) * h * 0.06
}

function resize() {
  const r = stage.getBoundingClientRect()
  w = Math.floor(r.width)
  h = Math.floor(r.height)
  canvas.width = w
  canvas.height = h
}

bindTap(stage, () => {
  velocity += 1.8
  if (velocity > 7) velocity = 7
  playHonk()
  playBoost()
})

function update() {
  velocity *= 0.988
  if (velocity < 0.5) velocity = 0.5
  trainX += velocity
  cameraX = trainX - w * 0.25
  const st = Math.floor(trainX / 500)
  if (st > stations) {
    stations = st
    playSuccess()
  }
}

function draw() {
  ctx.fillStyle = '#87CEEB'
  ctx.fillRect(0, 0, w, h)
  ctx.font = `${h * 0.07}px serif`
  ctx.fillText('☁️', 40, h * 0.15)
  ctx.fillText('☁️', w - 60, h * 0.12)

  const start = cameraX - 20
  const end = cameraX + w + 20
  ctx.strokeStyle = '#654321'
  ctx.lineWidth = 6
  ctx.beginPath()
  for (let x = start; x < end; x += 10) {
    const px = x - cameraX
    const py = trackY(x)
    if (x === start) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()

  for (let x = Math.floor(start / 80) * 80; x < end; x += 80) {
    const px = x - cameraX
    const py = trackY(x)
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(px - 3, py, 6, 20)
  }

  const tx = trainX - cameraX
  const ty = trackY(trainX)
  ctx.font = `${h * 0.12}px serif`
  ctx.textAlign = 'center'
  ctx.fillText('🚂', tx, ty - 8)

  if (trainX % 500 < 60) {
    ctx.font = `${h * 0.08}px serif`
    ctx.fillText('🚉', tx + 100, ty - 20)
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
