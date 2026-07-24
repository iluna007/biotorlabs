/**
 * Optimiza modelos GLB en public/models/
 * Requiere plant_trichomax.source.glb (export original de Blender).
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const MODELS = path.resolve('public/models')

const TARGETS = [
  {
    source: 'plant_trichomax.source.glb',
    output: 'plant_trichomax.glb',
  },
]

const OPTIMIZE_ARGS = [
  'optimize',
  '--compress',
  'meshopt',
  '--texture-compress',
  'webp',
  '--texture-size',
  '1024',
  '--simplify',
  'false',
  '--meshopt-level',
  'high',
]

for (const { source, output } of TARGETS) {
  const input = path.join(MODELS, source)
  const out = path.join(MODELS, output)

  if (!existsSync(input)) {
    console.warn(`Missing source: ${source} (skip ${output})`)
    continue
  }

  execFileSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['@gltf-transform/cli', ...OPTIMIZE_ARGS, input, out],
    { stdio: 'inherit' },
  )

  console.log(`OK ${output}`)
}
