import { SCENES } from '../config/scenes'

export const lerp = (a, b, t) => a + (b - a) * t

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export function getCurrentScene(progress) {
  for (let i = 0; i < SCENES.length - 1; i++) {
    const cur = SCENES[i]
    const next = SCENES[i + 1]
    if (progress >= cur.scrollStart && progress <= next.scrollStart) {
      const range = next.scrollStart - cur.scrollStart
      const localT = range > 0 ? (progress - cur.scrollStart) / range : 0
      return { cur, next, t: easeInOut(Math.max(0, Math.min(1, localT))) }
    }
  }
  return { cur: SCENES[SCENES.length - 1], next: SCENES[SCENES.length - 1], t: 1 }
}

export function deriveObjectState(progress) {
  const { cur, next, t } = getCurrentScene(progress)
  return {
    plantOpacity: lerp(cur.objects.plant.opacity, next.objects.plant.opacity, t),
    strataOpacity: lerp(cur.objects.strata.opacity, next.objects.strata.opacity, t),
    rootProgress: lerp(
      cur.objects.roots.growthProgress,
      next.objects.roots.growthProgress,
      t,
    ),
    myceliumOpacity: lerp(
      cur.objects.mycelium.opacity,
      next.objects.mycelium.opacity,
      t,
    ),
    productVisible: cur.objects.product.visible || next.objects.product.visible,
    productOpacity: lerp(cur.objects.product.opacity, next.objects.product.opacity, t),
    cameraY: lerp(cur.camera.pos.y, next.camera.pos.y, t),
    ambientIntensity: lerp(cur.env.ambientIntensity, next.env.ambientIntensity, t),
    sunIntensity: lerp(cur.env.sunIntensity, next.env.sunIntensity, t),
  }
}
