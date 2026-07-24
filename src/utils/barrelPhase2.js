import { BARREL_CONTENT_DELAY } from '../config/barrelScroll'

/** Fracción de fase 2 dedicada a planta en superficie (antes de raíces). */
export const SURFACE_END = 0.45

/** Progreso subterráneo al terminar el barril (continúa en el resto de la página). */
export const PHASE2_UNDERGROUND_MAX = 0.72

/** Progreso 0→1 de "Detrás de la Ciencia" dentro del barril, o null fuera de fase 2. */
export function getBarrelPhase2Explore(barrelPhase) {
  if (!barrelPhase?.inBarrel) return null
  if (barrelPhase.phaseIndex !== 2) return null

  // Aún en transición de contenido — no usar mapeo post-barril
  if (!barrelPhase.contentVisible || barrelPhase.contentSlide !== 2) {
    return 0
  }

  const explore = (barrelPhase.local - BARREL_CONTENT_DELAY) / (1 - BARREL_CONTENT_DELAY)
  return Math.max(0, Math.min(1, explore))
}

export function isPlantSurfaceView(barrelPhase2Progress) {
  return barrelPhase2Progress !== null && barrelPhase2Progress < SURFACE_END
}

/** Continúa el viaje subterráneo tras el barril sin reiniciar desde 0. */
export function mapPostBarrelRootProgress(rootGrowthProgress) {
  const t = Math.max(0, Math.min(1, rootGrowthProgress))
  return PHASE2_UNDERGROUND_MAX + t * (1 - PHASE2_UNDERGROUND_MAX)
}

/**
 * Progreso subterráneo unificado 0→1:
 * - Fase 2 barril: planta → raíces hasta PHASE2_UNDERGROUND_MAX
 * - Resto del sitio: continúa de PHASE2_UNDERGROUND_MAX → 1 (sin retroceso)
 */
export function resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress) {
  if (barrelPhase2Progress === null) {
    return mapPostBarrelRootProgress(rootGrowthProgress)
  }

  if (barrelPhase2Progress < SURFACE_END) {
    return 0
  }

  return (
    ((barrelPhase2Progress - SURFACE_END) / (1 - SURFACE_END)) * PHASE2_UNDERGROUND_MAX
  )
}
