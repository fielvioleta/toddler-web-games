import '../../shared/styles.css'
import { playPeekaboo, playPop } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const FACES = ['👶', '🐻', '🐼', '🦉', '🐵', '🦁']

const board = document.createElement('div')
board.className = 'peek-board'

const scene = document.createElement('button')
scene.type = 'button'
scene.className = 'peek-scene'

const face = document.createElement('span')
face.className = 'peek-face'
face.textContent = FACES[Math.floor(Math.random() * FACES.length)]

const cover = document.createElement('span')
cover.className = 'peek-cover'
cover.textContent = '🙈'

scene.append(face, cover)
board.appendChild(scene)

setupGameShell({ title: 'Peek-a-Boo', content: board })

let hidden = true

function toggle() {
  hidden = !hidden
  cover.classList.toggle('hidden', !hidden)
  face.classList.toggle('visible', !hidden)
  if (!hidden) {
    playPeekaboo()
    face.classList.add('bounce')
    setTimeout(() => face.classList.remove('bounce'), 500)
  } else {
    playPop()
  }
}

bindTap(scene, toggle)
