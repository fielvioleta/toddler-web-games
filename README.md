# Kids Learning Games

Educational tap games for toddlers (age 2+). Web-first PWA that works on tablet and can wrap to a native app later.

## Games

- **Animal Sounds** — tap animals to hear sounds
- **Bubble Pop** — pop floating bubbles
- **Color Match** — match red and blue circles to boxes
- **Count with Me** — tap and count from 1 to 3

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal. For tablet testing on the same Wi‑Fi:

1. Run `npm run dev`
2. On your tablet, open the **Network** URL (e.g. `http://192.168.30.97:5173/`)
3. Both devices must be on the same Wi‑Fi network

Touch optimizations included: 80px+ tap targets, no pinch-zoom, and double-tap zoom prevention.

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Netlify

1. Push this folder to GitHub
2. Connect the repo at [netlify.com](https://netlify.com)
3. Build command: `npm run build`, publish directory: `dist`

Or drag-and-drop the `dist` folder to Netlify after running `npm run build`.

### GitHub Pages

1. Push to `main` or `master`
2. Enable GitHub Pages (Settings → Pages → GitHub Actions)
3. The included workflow deploys automatically on push

## Add to Home Screen (tablet)

1. Open the deployed site or local network URL in Chrome (Android) or Safari (iOS)
2. Use **Add to Home Screen**
3. Games work offline after the first visit

## Native app (later)

When ready for Play Store / App Store:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Kids Learning Games" com.kidsgames.learning --web-dir dist
npm run build
npx cap add android
npx cap sync
npx cap open android
```

`capacitor.config.json` is already included. iOS requires a Mac.

## Design notes

- Touch targets are at least 80×80px
- No failure states or timers
- Mute toggle saves preference in localStorage
- Sounds use Web Audio API (works offline); counting uses device speech when available

## Project structure

```
index.html              Launcher
games/                  One folder per game
shared/                 Styles, audio, touch helpers
public/                 Icons and favicon
```
