/** Breakpoints alineados con index.css */
export const VIEWPORT = {
  small: 480,
  mobile: 768,
  tablet: 1024,
}

export function getViewportTier(width = typeof window !== 'undefined' ? window.innerWidth : 1280) {
  if (width <= VIEWPORT.small) return 'small'
  if (width <= VIEWPORT.mobile) return 'mobile'
  if (width <= VIEWPORT.tablet) return 'tablet'
  return 'desktop'
}

/** Alturas de scroll del barril por tipo de dispositivo (vh) */
export const BARREL_PHASE_VH_BY_TIER = {
  desktop: [5, 150, 180],
  tablet: [5, 120, 140],
  mobile: [5, 95, 115],
  small: [5, 80, 100],
}

export function getBarrelPhaseVh(width = typeof window !== 'undefined' ? window.innerWidth : 1280) {
  return BARREL_PHASE_VH_BY_TIER[getViewportTier(width)]
}

export function getBarrelTotalVh(phaseVh) {
  return phaseVh.reduce((sum, h) => sum + h, 0)
}

export function isMobileViewport(width = typeof window !== 'undefined' ? window.innerWidth : 1280) {
  return width <= VIEWPORT.mobile
}

export function isCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}
