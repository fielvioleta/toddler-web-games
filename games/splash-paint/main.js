import '../../shared/styles.css'
import { playSplash, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'
import { COLOR_PAGES } from './drawings.js'

preventDoubleTapZoom()

const COLORS = ['#FF6B6B', '#FF9F43', '#FFE66D', '#6BCB77', '#4ECDC4', '#60A5FA', '#A78BFA', '#F472B6']
const VIEW = 200
const BRUSH = 14

const board = document.createElement('div')
board.className = 'splash-board'

const pageLabel = document.createElement('div')
pageLabel.className = 'splash-page-label'

const hint = document.createElement('div')
hint.className = 'splash-hint'
hint.textContent = 'Swipe to color! 👆'

const artFrame = document.createElement('div')
artFrame.className = 'splash-canvas'

const paintCanvas = document.createElement('canvas')
paintCanvas.className = 'splash-paint-layer'

const outlineLayer = document.createElement('div')
outlineLayer.className = 'splash-outline-layer'

artFrame.append(paintCanvas, outlineLayer)

const palette = document.createElement('div')
palette.className = 'splash-palette'

const actions = document.createElement('div')
actions.className = 'splash-actions'

const clearBtn = document.createElement('button')
clearBtn.type = 'button'
clearBtn.className = 'splash-action-btn splash-clear-btn'
clearBtn.textContent = '🔄 Clear'

const nextBtn = document.createElement('button')
nextBtn.type = 'button'
nextBtn.className = 'splash-action-btn splash-next-btn'
nextBtn.textContent = 'Next ➡️'

actions.append(clearBtn, nextBtn)
board.append(pageLabel, hint, artFrame, palette, actions)
setupGameShell({ title: 'Color & Paint', content: board })

const ctx = paintCanvas.getContext('2d')
let pageIndex = 0
let currentColor = COLORS[0]
let selectedSwatch = null
let regionPaths = []
let painting = false
let lastPoint = null
let lastSplash = 0

COLORS.forEach((color) => {
  const swatch = document.createElement('button')
  swatch.type = 'button'
  swatch.className = 'splash-swatch'
  swatch.style.background = color
  swatch.setAttribute('aria-label', 'Pick color')

  bindTap(swatch, () => {
    currentColor = color
    if (selectedSwatch) selectedSwatch.classList.remove('selected')
    swatch.classList.add('selected')
    selectedSwatch = swatch
    playSplash()
  })

  palette.appendChild(swatch)
})

palette.firstChild.classList.add('selected')
selectedSwatch = palette.firstChild

function resizeCanvas() {
  const rect = artFrame.getBoundingClientRect()
  const width = Math.max(1, Math.floor(rect.width))
  const height = Math.max(1, Math.floor(rect.height))
  paintCanvas.width = width
  paintCanvas.height = height
  fillWhiteRegions()
}

function toViewBox(clientX, clientY) {
  const rect = paintCanvas.getBoundingClientRect()
  return {
    x: ((clientX - rect.left) / rect.width) * VIEW,
    y: ((clientY - rect.top) / rect.height) * VIEW,
  }
}

function withViewBoxTransform(drawFn) {
  const sx = paintCanvas.width / VIEW
  const sy = paintCanvas.height / VIEW
  ctx.save()
  ctx.scale(sx, sy)
  drawFn()
  ctx.restore()
}

function fillWhiteRegions() {
  withViewBoxTransform(() => {
    regionPaths.forEach((d) => {
      ctx.fillStyle = '#FFFFFF'
      ctx.fill(new Path2D(d))
    })
  })
}

function paintInRegions(drawFn) {
  regionPaths.forEach((d) => {
    withViewBoxTransform(() => {
      ctx.save()
      ctx.clip(new Path2D(d))
      drawFn()
      ctx.restore()
    })
  })
}

function paintDab(point) {
  paintInRegions(() => {
    ctx.fillStyle = currentColor
    ctx.beginPath()
    ctx.arc(point.x, point.y, BRUSH / 2, 0, Math.PI * 2)
    ctx.fill()
  })

  const now = Date.now()
  if (now - lastSplash > 80) {
    playSplash()
    lastSplash = now
  }
}

function paintStroke(from, to) {
  paintInRegions(() => {
    ctx.strokeStyle = currentColor
    ctx.fillStyle = currentColor
    ctx.lineWidth = BRUSH
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(to.x, to.y, BRUSH / 2, 0, Math.PI * 2)
    ctx.fill()
  })

  const now = Date.now()
  if (now - lastSplash > 80) {
    playSplash()
    lastSplash = now
  }
}

function updateLabel() {
  const page = COLOR_PAGES[pageIndex]
  pageLabel.textContent = `${page.emoji} ${page.title}`
}

function loadPage() {
  const page = COLOR_PAGES[pageIndex]
  regionPaths = page.regions
  outlineLayer.innerHTML = page.outline
  const svg = outlineLayer.querySelector('svg')
  if (svg) {
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  }
  resizeCanvas()
  updateLabel()
}

paintCanvas.addEventListener('pointerdown', (event) => {
  painting = true
  paintCanvas.setPointerCapture(event.pointerId)
  const point = toViewBox(event.clientX, event.clientY)
  lastPoint = point
  paintDab(point)
})

paintCanvas.addEventListener('pointermove', (event) => {
  if (!painting) return
  const point = toViewBox(event.clientX, event.clientY)
  if (lastPoint) {
    paintStroke(lastPoint, point)
  }
  lastPoint = point
})

function endPaint(event) {
  if (!painting) return
  painting = false
  lastPoint = null
  if (paintCanvas.hasPointerCapture(event.pointerId)) {
    paintCanvas.releasePointerCapture(event.pointerId)
  }
}

paintCanvas.addEventListener('pointerup', endPaint)
paintCanvas.addEventListener('pointercancel', endPaint)
paintCanvas.addEventListener('pointerleave', endPaint)

bindTap(clearBtn, fillWhiteRegions)

bindTap(nextBtn, () => {
  pageIndex = (pageIndex + 1) % COLOR_PAGES.length
  loadPage()
  playSuccess()
})

loadPage()
window.addEventListener('resize', resizeCanvas)
