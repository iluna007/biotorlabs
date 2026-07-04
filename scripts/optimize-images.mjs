/**
 * Optimiza imágenes usadas en src/config/assets.js → WebP
 * Logos PNG se mantienen sin re-procesar (ya son ligeros).
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('public/images')

const SOURCES = {
  'hero/brotes-campo.webp': { from: 'hero/brotes-campo.jpg', w: 1400, q: 82 },
  'products/trichomax-plus.webp': { from: 'products/trichomax-plus.png', w: 800, q: 85 },
  'products/trichomax.webp':      { from: 'products/trichomax.png',      w: 800, q: 85 },
  'products/klamic.webp':         { from: 'products/klamic.png',         w: 800, q: 85 },
  'products/cronox-plus.webp':    { from: 'products/cronox-plus.png',    w: 800, q: 85 },
  'products/atropos.webp':        { from: 'products/atropos.png',        w: 800, q: 85 },
  'products/invictus.webp':       { from: 'products/invictus.png',       w: 800, q: 85 },
}

for (const [out, cfg] of Object.entries(SOURCES)) {
  const input = path.join(ROOT, cfg.from)
  const output = path.join(ROOT, out)
  if (!existsSync(input)) {
    if (existsSync(output)) continue
    console.warn(`Missing source: ${cfg.from}`)
    continue
  }
  await mkdir(path.dirname(output), { recursive: true })
  await sharp(input)
    .rotate()
    .resize({ width: cfg.w, withoutEnlargement: true })
    .webp({ quality: cfg.q, effort: 6 })
    .toFile(output)
  console.log(`OK ${out}`)
}
