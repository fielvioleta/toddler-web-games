import '../shared/styles.css'
import { loadMutePreference, resumeAudio } from '../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../shared/touch.js'

preventDoubleTapZoom()
loadMutePreference()

const games = [
  { href: '/games/animal-sounds/', emoji: '🐱', label: 'Animals', color: '#FFE8D6' },
  { href: '/games/bubble-pop/', emoji: '🫧', label: 'Bubbles', color: '#DFF6FF' },
  { href: '/games/color-match/', emoji: '🔴', label: 'Colors', color: '#FFE0E0' },
  { href: '/games/count-with-me/', emoji: '⭐', label: 'Count', color: '#FFF3BF' },
  { href: '/games/hill-climb/', emoji: '🚗', label: 'Hill Climb', color: '#D6F5DA' },
]

const app = document.getElementById('app')
app.innerHTML = `
  <div class="launcher">
    <header class="launcher-header">
      <p>Tap a game!</p>
      <h1>🎮 Play & Learn</h1>
    </header>
    <div class="game-grid" id="game-grid"></div>
  </div>
`

const grid = document.getElementById('game-grid')

games.forEach((game) => {
  const tile = document.createElement('a')
  tile.className = 'game-tile'
  tile.href = game.href
  tile.style.background = game.color
  tile.innerHTML = `
    <span class="game-tile-emoji">${game.emoji}</span>
    <span class="game-tile-label">${game.label}</span>
  `
  bindTap(tile, () => {
    resumeAudio()
    window.location.href = game.href
  })
  grid.appendChild(tile)
})

document.addEventListener('pointerdown', () => resumeAudio(), { once: true })
