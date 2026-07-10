import { resolve } from 'path'
import { readdirSync, existsSync } from 'fs'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

function gameInputs(rootDir) {
  const gamesDir = resolve(rootDir, 'games')
  const inputs = { main: resolve(rootDir, 'index.html') }

  for (const dir of readdirSync(gamesDir)) {
    const htmlPath = resolve(gamesDir, dir, 'index.html')
    if (!existsSync(htmlPath)) continue
    const key = dir.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    inputs[key] = htmlPath
  }

  return inputs
}

export default defineConfig({
  base: '/',
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    rollupOptions: {
      input: gameInputs(process.cwd()),
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg', 'icons/*.png', 'sounds/*.wav'],
      manifest: {
        name: 'Kids Learning Games',
        short_name: 'Kids Games',
        description: 'Educational tap games for toddlers',
        theme_color: '#6C63FF',
        background_color: '#FFF8E7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3,wav}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
