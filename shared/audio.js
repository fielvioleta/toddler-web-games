let audioContext = null
let muted = false

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem('kids-games-muted', value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

export function loadMutePreference() {
  try {
    muted = localStorage.getItem('kids-games-muted') === '1'
  } catch {
    muted = false
  }
  return muted
}

export function resumeAudio() {
  const ctx = getContext()
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
}

function playTone({ frequency, duration = 0.15, type = 'sine', volume = 0.25, delay = 0 }) {
  if (muted) return

  const ctx = getContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  const start = ctx.currentTime + delay

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)

  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.05)
}

function playSequence(notes) {
  notes.forEach((note, index) => {
    playTone({ ...note, delay: (note.delay ?? 0) + index * (note.gap ?? 0.12) })
  })
}

export function playPop() {
  playTone({ frequency: 520, duration: 0.08, type: 'triangle', volume: 0.3 })
  playTone({ frequency: 780, duration: 0.06, type: 'sine', volume: 0.2, delay: 0.04 })
}

export function playSuccess() {
  playSequence([
    { frequency: 523, duration: 0.12, volume: 0.22 },
    { frequency: 659, duration: 0.12, volume: 0.22, gap: 0.1 },
    { frequency: 784, duration: 0.18, volume: 0.25, gap: 0.1 },
  ])
}

import { ANIMAL_SOUND_CLIPS } from './animal-sound-urls.js'

const animalPlayers = {}
let animalSoundsReady = null

function resolveClipSrc(clip) {
  if (clip.url) return clip.url
  if (clip.file) return `${import.meta.env.BASE_URL}${clip.file}`
  return ''
}

function getAnimalPlayer(animal) {
  const clip = ANIMAL_SOUND_CLIPS[animal]
  if (!clip) return null

  if (!animalPlayers[animal]) {
    const audio = new Audio(resolveClipSrc(clip))
    audio.preload = 'auto'
    animalPlayers[animal] = { audio, clip }
  }

  return animalPlayers[animal]
}

export function preloadAnimalSounds() {
  if (muted) return Promise.resolve()

  if (!animalSoundsReady) {
    animalSoundsReady = Promise.all(
      Object.keys(ANIMAL_SOUND_CLIPS).map(
        (animal) =>
          new Promise((resolve) => {
            const player = getAnimalPlayer(animal)
            if (!player) {
              resolve()
              return
            }

            const { audio } = player
            if (audio.readyState >= 2) {
              resolve()
              return
            }

            const done = () => {
              audio.removeEventListener('canplaythrough', done)
              audio.removeEventListener('error', done)
              resolve()
            }

            audio.addEventListener('canplaythrough', done, { once: true })
            audio.addEventListener('error', done, { once: true })
            audio.load()
          }),
      ),
    )
  }

  return animalSoundsReady
}

export function playAnimalSound(animal) {
  if (muted) return

  const player = getAnimalPlayer(animal)
  if (!player) return

  const { audio, clip } = player

  preloadAnimalSounds().then(() => {
    audio.volume = clip.volume
    audio.currentTime = 0
    audio.play().catch(() => {
      /* ignore autoplay / load errors */
    })

    if (clip.duration) {
      window.setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
      }, clip.duration * 1000)
    }
  })
}

const countWords = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
]

export function speakCount(n) {
  if (muted || n < 1 || n > 10) return

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(countWords[n])
    utterance.rate = 0.85
    utterance.pitch = 1.2
    utterance.volume = 0.9
    window.speechSynthesis.speak(utterance)
    return
  }

  playTone({ frequency: 380 + n * 35, duration: 0.25, volume: 0.25 })
}

export function speakPraise() {
  if (muted) return

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('Yay!')
    utterance.rate = 0.9
    utterance.pitch = 1.3
    window.speechSynthesis.speak(utterance)
    return
  }

  playSuccess()
}
