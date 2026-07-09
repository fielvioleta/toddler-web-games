import { isMuted, setMuted, loadMutePreference, resumeAudio } from './audio.js'
import { bindTap } from './touch.js'

export function setupGameShell({ title, content }) {
  loadMutePreference()

  const shell = document.createElement('div')
  shell.className = 'app-shell'
  shell.innerHTML = `
    <header class="top-bar">
      <button type="button" class="icon-btn home-btn" aria-label="Home">🏠</button>
      <h1 class="game-title">${title}</h1>
      <button type="button" class="icon-btn mute-btn" aria-label="Sound">🔊</button>
    </header>
    <main class="game-area"></main>
  `

  document.body.appendChild(shell)
  const main = shell.querySelector('.game-area')
  main.appendChild(content)

  const homeBtn = shell.querySelector('.home-btn')
  const muteBtn = shell.querySelector('.mute-btn')

  updateMuteButton(muteBtn)

  bindTap(homeBtn, () => {
    window.location.href = import.meta.env.BASE_URL
  })

  bindTap(muteBtn, () => {
    resumeAudio()
    setMuted(!isMuted())
    updateMuteButton(muteBtn)
  })

  return { shell, main }
}

function updateMuteButton(button) {
  button.textContent = isMuted() ? '🔇' : '🔊'
  button.classList.toggle('muted', isMuted())
  button.setAttribute('aria-label', isMuted() ? 'Sound off' : 'Sound on')
}
