import '../../shared/styles.css'
import { playPop, playSuccess } from '../../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../../shared/touch.js'
import { setupGameShell } from '../../shared/nav.js'

preventDoubleTapZoom()

const FRIENDS = ['🐸', '🐰', '🐻', '🦊', '🐼', '🐷', '🐥', '🐢']

const board = document.createElement('div')
board.className = 'popup-board'
const grid = document.createElement('div')
grid.className = 'popup-grid'
board.appendChild(grid)

setupGameShell({ title: 'Pop Up Friends', content: board })

const holes = []
let pops = 0

FRIENDS.slice(0, 6).forEach((friend, i) => {
  const hole = document.createElement('div')
  hole.className = 'popup-hole'
  const friendEl = document.createElement('button')
  friendEl.type = 'button'
  friendEl.className = 'popup-friend'
  friendEl.textContent = friend
  friendEl.style.transform = 'translateY(100%)'
  hole.appendChild(friendEl)
  grid.appendChild(hole)
  holes.push({ friendEl, up: false, friend })
})

function randomPop() {
  const available = holes.filter((h) => !h.up)
  if (available.length === 0) return
  const hole = available[Math.floor(Math.random() * available.length)]
  hole.up = true
  hole.friendEl.style.transform = 'translateY(0)'
  hole.friendEl.classList.add('up')

  setTimeout(() => {
    if (hole.up) hideFriend(hole)
  }, 2500)
}

function hideFriend(hole) {
  hole.up = false
  hole.friendEl.style.transform = 'translateY(100%)'
  hole.friendEl.classList.remove('up')
}

holes.forEach((hole) => {
  bindTap(hole.friendEl, () => {
    if (!hole.up) return
    hideFriend(hole)
    pops += 1
    playPop()
    hole.friendEl.classList.add('bounce')
    setTimeout(() => hole.friendEl.classList.remove('bounce'), 400)
    if (pops % 6 === 0) playSuccess()
  })
})

setInterval(randomPop, 1200)
setTimeout(randomPop, 400)
