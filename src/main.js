import '../shared/styles.css'
import { loadMutePreference, resumeAudio } from '../shared/audio.js'
import { bindTap, preventDoubleTapZoom } from '../shared/touch.js'

preventDoubleTapZoom()
loadMutePreference()

const games = [
  { href: '/games/hammer-bench/', emoji: '🔨', label: 'Hammer', color: '#FFE0C2' },
  { href: '/games/hill-climb/', emoji: '🚗', label: 'Hill Climb', color: '#D6F5DA' },
  { href: '/games/jump-jump/', emoji: '🦘', label: 'Jump', color: '#E8FFD6' },
  { href: '/games/rocket-tap/', emoji: '🚀', label: 'Rocket', color: '#D6E8FF' },
  { href: '/games/train-choo-choo/', emoji: '🚂', label: 'Train', color: '#FFE8D6' },
  { href: '/games/fish-swim/', emoji: '🐠', label: 'Fish', color: '#D6F0FF' },
  { href: '/games/pop-up-friends/', emoji: '🐸', label: 'Pop Up', color: '#D6F5DA' },
  { href: '/games/splash-paint/', emoji: '🎨', label: 'Color', color: '#FFE0F0' },
  { href: '/games/drum-tap/', emoji: '🥁', label: 'Drums', color: '#FFF3BF' },
  { href: '/games/feed-the-pet/', emoji: '🐶', label: 'Feed Pet', color: '#FFE8D6' },
  { href: '/games/peek-a-boo/', emoji: '🙈', label: 'Peek-a-Boo', color: '#EDE5FF' },
  { href: '/games/animal-sounds/', emoji: '🐱', label: 'Animals', color: '#FFE8D6' },
  { href: '/games/bubble-pop/', emoji: '🫧', label: 'Bubbles', color: '#DFF6FF' },
  { href: '/games/color-match/', emoji: '🔴', label: 'Colors', color: '#FFE0E0' },
  { href: '/games/count-with-me/', emoji: '⭐', label: 'Count', color: '#FFF3BF' },
]

const app = document.getElementById('app')
app.innerHTML = `
  <div class="launcher launcher-scroll">
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
