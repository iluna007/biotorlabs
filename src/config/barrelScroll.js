/** Altura de scroll (vh) por fase del barril */
export const BARREL_PHASE_VH = [100, 200, 240]

/** vh acumulados donde empieza fase 3 (WebGL + Detrás de la Ciencia) */
export const BARREL_ROOT_START_VH = BARREL_PHASE_VH[0] + BARREL_PHASE_VH[1]

export const BARREL_TOTAL_VH = BARREL_PHASE_VH.reduce((sum, h) => sum + h, 0)

/** Fracción de cada fase (≥1) dedicada a la transición de imagen */
export const BARREL_CONTENT_DELAY = 0.34

export function computeBarrelRadius(panelCount, faceHeightPx = typeof window !== 'undefined' ? window.innerHeight : 900) {
  const n = Math.max(3, panelCount)
  return (faceHeightPx * 0.5) / Math.tan(Math.PI / n)
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Crossfade suave con parallax ligero — sin costura dura visible.
 * Funciona igual al subir y al bajar.
 */
export function getBarrelBlendMotion(t) {
  const raw = Math.max(0, Math.min(1, t))
  const p = smoothstep(0, 1, raw)

  const outOpacity = 1 - smoothstep(0.12, 0.88, p)
  const inOpacity = smoothstep(0.12, 0.88, p)
  const outY = -p * 2.2
  const inY = (1 - p) * 2.2
  const scale = 1.12 + Math.sin(p * Math.PI) * 0.025

  return {
    outOpacity,
    inOpacity,
    stageRotateX: (p - 0.5) * -2.5,
    outTransform: `translate(-50%, calc(-50% + ${outY.toFixed(2)}%)) scale(${scale.toFixed(3)})`,
    inTransform: `translate(-50%, calc(-50% + ${inY.toFixed(2)}%)) scale(${scale.toFixed(3)})`,
    soloTransform: 'translate(-50%, -50%) scale(1.12)',
  }
}

export function getBarrelImageBlend(rotation, faceCount = 3) {
  const faceDeg = 360 / faceCount
  const maxRot = 360 - faceDeg

  if (rotation <= 0.01) return { mode: 'single', slide: 0 }
  if (rotation >= maxRot - 0.01) return { mode: 'single', slide: faceCount - 1 }

  const segment = Math.min(faceCount - 2, Math.floor(rotation / faceDeg))
  const local = (rotation - segment * faceDeg) / faceDeg

  if (local <= 0.003) return { mode: 'single', slide: segment }
  if (local >= 0.997) return { mode: 'single', slide: Math.min(segment + 1, faceCount - 1) }

  return { mode: 'blend', from: segment, to: segment + 1, t: local }
}

/** Progreso 0→1 del fade hacia WebGL (brotes → raíces) */
export function getWebglRevealProgress(rotation, faceCount = 3) {
  const blend = getBarrelImageBlend(rotation, faceCount)
  if (blend.mode === 'blend' && blend.to === faceCount - 1) {
    return smoothstep(0, 1, blend.t)
  }
  return blend.mode === 'single' && blend.slide === faceCount - 1 ? 1 : 0
}
