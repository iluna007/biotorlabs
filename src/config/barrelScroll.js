/** Altura de scroll (vh) por fase del barril */
export const BARREL_PHASE_VH = [5, 150, 180]

/** vh acumulados donde empieza fase 3 (WebGL + Detrás de la Ciencia) */
export const BARREL_ROOT_START_VH = BARREL_PHASE_VH[0] + BARREL_PHASE_VH[1]

export const BARREL_TOTAL_VH = BARREL_PHASE_VH.reduce((sum, h) => sum + h, 0)

/**
 * Fracción de cada fase dedicada a la transición de imagen.
 * El resto (1 - BARREL_CONTENT_DELAY) es exploración con parallax vertical.
 */
export const BARREL_CONTENT_DELAY = 0.22

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
  const clamped = Math.max(0, Math.min(1, t))
  const raw = smoothstep(0, 1, clamped)
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

/** Rotación ligada al scroll — pausa durante fases de exploración */
export function getBarrelRotationFromProgress(
  progress,
  faceCount = 3,
  contentDelay = BARREL_CONTENT_DELAY,
  phaseVh = BARREL_PHASE_VH,
) {
  const faceDeg = 360 / faceCount
  const total = phaseVh.reduce((sum, h) => sum + h, 0)
  const p = Math.max(0, Math.min(1, progress))

  const phase0End = phaseVh[0] / total
  const trans1End = (phaseVh[0] + phaseVh[1] * contentDelay) / total
  const phase1End = (phaseVh[0] + phaseVh[1]) / total

  const phase2Duration = phaseVh[2] / total
  const trans2End = phase1End + phase2Duration * contentDelay

  if (p <= phase0End) return 0
  if (p <= trans1End) return ((p - phase0End) / (trans1End - phase0End)) * faceDeg
  if (p <= phase1End) return faceDeg
  if (p <= trans2End) {
    return faceDeg + ((p - phase1End) / (trans2End - phase1End)) * faceDeg
  }
  return faceDeg * 2
}

/**
 * Parallax de exploración: solo desplazamiento vertical (sin zoom).
 * panY = 0 → centrada; panY = -10 → sube 10% con el scroll.
 */
export function getExplorationParallax(phaseIndex, local, contentDelay = BARREL_CONTENT_DELAY) {
  if (phaseIndex === 2) {
    if (local < contentDelay) {
      return { scale: 1.0, panY: 0 }
    }
    const postT = (local - contentDelay) / (1 - contentDelay)
    return { scale: 1.0, panY: -postT * 10 }
  }

  const postT = Math.max(0, (local - contentDelay) / (1 - contentDelay))
  return {
    scale: 1.0,
    panY: -postT * 10,
  }
}
