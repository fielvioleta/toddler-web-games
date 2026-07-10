import { resumeAudio } from './audio.js'

const PRESS_CLASS = 'pressed'
const TAP_THRESHOLD_MS = 400
const MOVE_THRESHOLD_PX = 12

export function bindTap(element, handler) {
  let startX = 0
  let startY = 0
  let startTime = 0
  let active = false

  const onStart = (event) => {
    const point = getPoint(event)
    if (!point) return

    active = true
    startX = point.x
    startY = point.y
    startTime = Date.now()
    element.classList.add(PRESS_CLASS)
    resumeAudio()
  }

  const onEnd = (event) => {
    if (!active) return
    active = false
    element.classList.remove(PRESS_CLASS)

    const point = getPoint(event)
    if (!point) return

    const elapsed = Date.now() - startTime
    const dx = Math.abs(point.x - startX)
    const dy = Math.abs(point.y - startY)

    if (elapsed <= TAP_THRESHOLD_MS && dx <= MOVE_THRESHOLD_PX && dy <= MOVE_THRESHOLD_PX) {
      event.preventDefault()
      handler(event)
    }
  }

  const onCancel = () => {
    active = false
    element.classList.remove(PRESS_CLASS)
  }

  element.addEventListener('pointerdown', onStart, { passive: true })
  element.addEventListener('pointerup', onEnd)
  element.addEventListener('pointerleave', onCancel)
  element.addEventListener('pointercancel', onCancel)

  element.addEventListener('click', (event) => {
    event.preventDefault()
  })
}

function getPoint(event) {
  if (event.changedTouches?.length) {
    return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
  }
  if (typeof event.clientX === 'number') {
    return { x: event.clientX, y: event.clientY }
  }
  return null
}

export function installAppViewport() {
  const set = () => {
    const h = window.visualViewport?.height ?? window.innerHeight
    document.documentElement.style.setProperty('--app-height', `${Math.round(h)}px`)
  }

  set()
  window.visualViewport?.addEventListener('resize', set)
  window.addEventListener('resize', set)
  window.addEventListener('orientationchange', () => {
    setTimeout(set, 100)
  })
}

export function preventDoubleTapZoom() {
  installAppViewport()

  let lastTouchEnd = 0

  document.addEventListener(
    'touchend',
    (event) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    { passive: false },
  )

  // Stop page scroll / rubber-band when tapping and dragging on mobile
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.target.closest('.launcher-scroll')) return
      if (event.target.closest('.splash-paint-layer')) return
      event.preventDefault()
    },
    { passive: false },
  )

  // Prevent accidental scroll when touch starts outside interactive elements
  document.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    },
    { passive: false },
  )
}
