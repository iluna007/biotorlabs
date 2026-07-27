import { BARREL_CONTENT_DELAY } from '../config/barrelScroll'
import { PHASE2_UNDERGROUND_MAX } from './barrelPhase2'

/**
 * Progreso 0→1 del video de raíces, sincronizado con scroll (adelante y atrás).
 */
export function computeRootsVideoProgress(barrelPhase, rootGrowthProgress) {
  const phase = barrelPhase ?? {}
  const { inBarrel, phaseIndex, local = 0, wipeOutProgress = 0 } = phase
  const tail = PHASE2_UNDERGROUND_MAX
  const post = Math.max(0, Math.min(1, rootGrowthProgress))

  if (inBarrel && phaseIndex === 2) {
    const explore = Math.max(
      0,
      Math.min(1, (local - BARREL_CONTENT_DELAY) / (1 - BARREL_CONTENT_DELAY)),
    )
    const fromExplore = explore * tail
    const fromWipe = wipeOutProgress * tail
    return Math.min(tail, Math.max(fromExplore, fromWipe))
  }

  if (inBarrel) return 0

  // Fuera del barril: continuar solo si ya hubo wipe o scroll en #results+
  if (post > 0) {
    return tail + post * (1 - tail)
  }

  if (wipeOutProgress > 0) {
    return Math.min(tail, wipeOutProgress * tail)
  }

  return 0
}
