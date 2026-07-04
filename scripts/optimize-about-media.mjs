/**
 * Optimiza video e imágenes de la página Nosotros → public/images/about/
 * Fuentes en public/images/Recursos/ (no versionadas).
 */
import sharp from 'sharp'
import { mkdir, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = path.resolve('public/images')
const SRC = path.join(ROOT, 'Recursos')
const OUT = path.join(ROOT, 'about')

const IMAGES = [
  { out: 'brotes-field.webp', from: 'Brotes (1).jpg', w: 1200, q: 82 },
  { out: 'soil-texture.webp', from: '56_ground texture-seamless.jpg', w: 900, q: 72 },
  { out: 'lab-tubes.webp', from: 'tubos.jpg', w: 1000, q: 82 },
  { out: 'facility.webp', from: '+/0I1A3990.JPG', w: 1200, q: 82 },
  { out: 'research.webp', from: 'laboratorio/shutterstock_1961857333.jpg', w: 1000, q: 82 },
  { out: 'crops-field.webp', from: 'Brotes (10).jpg', w: 1200, q: 82 },
  { out: 'microscope.webp', from: 'laboratorio/shutterstock_2106624800.jpg', w: 1000, q: 82 },
]

const VIDEO_SRC = path.join(SRC, 'videos/shutterstock_1052910950.mp4')
const VIDEO_OUT = path.join(OUT, 'hero-bg.mp4')
const POSTER_OUT = path.join(OUT, 'hero-poster.webp')

await mkdir(OUT, { recursive: true })

for (const cfg of IMAGES) {
  const input = path.join(SRC, cfg.from)
  const output = path.join(OUT, cfg.out)
  if (!existsSync(input)) {
    console.warn(`Missing: ${cfg.from}`)
    continue
  }
  await sharp(input)
    .rotate()
    .resize({ width: cfg.w, withoutEnlargement: true })
    .webp({ quality: cfg.q, effort: 6 })
    .toFile(output)
  console.log(`OK ${cfg.out}`)
}

if (existsSync(VIDEO_SRC)) {
  const ff = spawnSync('ffmpeg', [
    '-y', '-i', VIDEO_SRC,
    '-vf', 'scale=1280:-2',
    '-c:v', 'libx264', '-crf', '26', '-preset', 'medium',
    '-an', '-movflags', '+faststart',
    VIDEO_OUT,
  ], { stdio: 'inherit' })

  if (ff.status === 0) {
    console.log('OK hero-bg.mp4')
    const posterJpg = path.join(OUT, 'hero-poster.jpg')
    spawnSync('ffmpeg', [
      '-y', '-i', VIDEO_OUT, '-ss', '00:00:01.5', '-vframes', '1',
      posterJpg,
    ], { stdio: 'inherit' })

    if (existsSync(posterJpg)) {
      await sharp(posterJpg)
        .webp({ quality: 78, effort: 6 })
        .toFile(POSTER_OUT)
      await import('node:fs/promises').then(({ unlink }) => unlink(posterJpg))
      console.log('OK hero-poster.webp')
    }
  }
} else {
  console.warn('Missing video: shutterstock_1052910950.mp4')
}
