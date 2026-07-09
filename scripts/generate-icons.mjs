import { writeFileSync, mkdirSync } from 'fs'
import { deflateSync } from 'zlib'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(iconsDir, { recursive: true })

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function createPng(size, r, g, b) {
  const row = Buffer.alloc(1 + size * 3)
  const raw = Buffer.alloc((1 + size * 3) * size)
  for (let y = 0; y < size; y++) {
    const offset = y * (1 + size * 3)
    raw[offset] = 0
    for (let x = 0; x < size; x++) {
      const px = offset + 1 + x * 3
      const corner = Math.min(x, y, size - 1 - x, size - 1 - y)
      const radius = size * 0.12
      const onEdge = corner < radius
      raw[px] = onEdge ? 255 : r
      raw[px + 1] = onEdge ? 255 : g
      raw[px + 2] = onEdge ? 255 : b
    }
  }

  const compressed = deflateSync(raw)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 2
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length, 0)
    const typeBuf = Buffer.from(type)
    const crcBuf = Buffer.concat([typeBuf, data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(crcBuf), 0)
    return Buffer.concat([len, typeBuf, data, crc])
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

;[192, 512].forEach((size) => {
  const png = createPng(size, 108, 99, 255)
  writeFileSync(join(iconsDir, `icon-${size}.png`), png)
})

console.log('Generated PWA icons in public/icons/')
