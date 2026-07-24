/** Altura de scroll (vh) por fase del barril */
export const BARREL_PHASE_VH = [5, 150, 180]

/** vh acumulados donde empieza fase 3 (WebGL + Detrás de la Ciencia) */
export const BARREL_ROOT_START_VH = BARREL_PHASE_VH[0] + BARREL_PHASE_VH[1]

export const BARREL_TOTAL_VH = BARREL_PHASE_VH.reduce((sum, h) => sum + h, 0)

/**
 * Fracción de cada fase dedicada a la transición de imagen.
 * El resto (1 - BARREL_CONTENT_DELAY) es exploración con parallax vertical.
 */
export const BARREL_CONTENT_DELAY = 0.20

export const WIPE_SLOPE = 12

export function computeBarrelRadius(panelCount, faceHeightPx = typeof window !== 'undefined' ? window.innerHeight : 900) {
  const n = Math.max(3, panelCount)
  return (faceHeightPx * 0.5) / Math.tan(Math.PI / n)
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Wipe diagonal vertical — escena entrante desde ABAJO ("\\" sube con el scroll).
 * t = 0: invisible (línea debajo); t = 1: pantalla completa (línea arriba).
 */
export function getDiagonalWipeClips(t) {
  const raw = Math.max(0, Math.min(1, t))
  const leftY = 110 - raw * 120
  const rightY = leftY + WIPE_SLOPE

  return {
    raw,
    incoming: `polygon(0% ${leftY.toFixed(2)}%, 100% ${rightY.toFixed(2)}%, 100% 100%, 0% 100%)`,
    outgoingWebgl: (() => {
      const outLeftY = 100 - raw * 110
      const outRightY = outLeftY + WIPE_SLOPE
      return `polygon(0% 0%, 100% 0%, 100% ${outRightY.toFixed(2)}%, 0% ${outLeftY.toFixed(2)}%)`
    })(),
  }
}

export function getBarrelBlendMotion(t) {
  const { incoming } = getDiagonalWipeClips(t)
  return {
    clipPath: incoming,
    outOpacity: 1,
    inOpacity: 1,
    outTransform: 'translate(-50%, -50%) scale(1.05)',
    inTransform: 'translate(-50%, -50%) scale(1.05)',
    stageRotateX: 0,
    soloTransform: 'translate(-50%, -50%) scale(1.0)',
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

/** Rotación ligada al scroll — pausa durante fases de exploración */
export function getBarrelRotationFromProgress(progress, faceCount = 3, contentDelay = BARREL_CONTENT_DELAY) {
  const faceDeg = 360 / faceCount
  const maxRot = 360 - faceDeg
  const total = BARREL_TOTAL_VH
  const p = Math.max(0, Math.min(1, progress))

  const phase0End = BARREL_PHASE_VH[0] / total
  const trans1End = (BARREL_PHASE_VH[0] + BARREL_PHASE_VH[1] * contentDelay) / total
  const phase1End = (BARREL_PHASE_VH[0] + BARREL_PHASE_VH[1]) / total
  const trans2End = phase1End + (BARREL_PHASE_VH[2] * contentDelay) / total

  if (p <= phase0End) return 0
  if (p <= trans1End) return ((p - phase0End) / (trans1End - phase0End)) * faceDeg
  if (p <= phase1End) return faceDeg
  if (p <= trans2End) return faceDeg + ((p - phase1End) / (trans2End - phase1End)) * faceDeg
  return maxRot
}

/**
 * Parallax de exploración: solo desplazamiento vertical (sin zoom).
 * panY = 0 → centrada; panY = -7 → sube 7% con el scroll.
 */
export function getExplorationParallax(phaseIndex, local, contentDelay = BARREL_CONTENT_DELAY) {
  const postT = Math.max(0, (local - contentDelay) / (1 - contentDelay))
  return {
    scale: 1.0,
    panY: -postT * 7,
  }
}
