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

export function preventDoubleTapZoom() {
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
}
