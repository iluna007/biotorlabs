import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BARREL_ROOT_START_VH } from '../config/barrelScroll'
import { createScrollThrottler } from '../utils/scrollThrottle'

gsap.registerPlugin(ScrollTrigger)

const EMIT_MS = 48

/**
 * Progreso 0→1 del crecimiento radicular:
 * inicio = fase 3 del barril (Detrás de la Ciencia)
 * fin = final del carrusel Portafolio (#buy)
 */
export function computeRootGrowthProgress() {
  const barrel = document.getElementById('hero')
  const buy = document.getElementById('buy')
  if (!barrel || !buy) return 0

  const vhPx = window.innerHeight / 100
  const startY = barrel.offsetTop + BARREL_ROOT_START_VH * vhPx
  const endY = buy.offsetTop + buy.offsetHeight
  const scrollY = getScrollY()

  if (endY <= startY) return 0
  if (scrollY <= startY) return 0
  if (scrollY >= endY) return 1
  return (scrollY - startY) / (endY - startY)
}

export function useRootGrowthProgress(enabled = true) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) return undefined

    const emit = createScrollThrottler(EMIT_MS)
    const update = () => emit(computeRootGrowthProgress(), setProgress)

    update()

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: update,
    })

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
      update()
    }, 600)

    window.addEventListener('resize', update)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('resize', update)
      trigger.kill()
    }
  }, [enabled])

  return progress
}

/** Mapea crecimiento → progreso de escena bajo tierra (cámara) */
export {
  getUndergroundCamera,
  getRootShaderProgress,
  deriveUndergroundObjectState,
  getSurfacePlantCamera,
  deriveSurfacePlantState,
  getResultsSectionProgress,
  applyResultsCameraOrbit,
} from '../utils/undergroundCamera'

function getScrollY() {
  return ScrollTrigger.getScrollFunc(document.documentElement)()
}
