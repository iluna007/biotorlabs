const lerp = (a, b, t) => a + (b - a) * t

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

const CAMERA_KEYS = [
  { t: 0.0, pos: [0.6, 1.55, 5.6], target: [0.0, 1.25, 0.0], fov: 44 },
  { t: 0.25, pos: [1.0, -1.8, 5.4], target: [0.1, -2.2, 0.0], fov: 55 },
  { t: 0.55, pos: [0.7, -4.5, 4.9], target: [0.0, -4.8, 0.0], fov: 53 },
  { t: 0.82, pos: [0.4, -6.5, 4.4], target: [0.15, -6.2, 0.0], fov: 51 },
  { t: 1.0, pos: [0.2, -7.0, 4.0], target: [0.1, -6.5, 0.0], fov: 50 },
]

function interpolateKeys(keys, t, field) {
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (t >= a.t && t <= b.t) {
      const local = (t - a.t) / (b.t - a.t)
      const eased = easeInOut(Math.max(0, Math.min(1, local)))
      if (field === 'fov') return lerp(a.fov, b.fov, eased)
      return [
        lerp(a[field][0], b[field][0], eased),
        lerp(a[field][1], b[field][1], eased),
        lerp(a[field][2], b[field][2], eased),
      ]
    }
  }
  const last = keys[keys.length - 1]
  return field === 'fov' ? last.fov : last[field]
}

/** Vista de superficie — planta detrás del contenido "Detrás de la Ciencia" */
export function getSurfacePlantCamera() {
  const pos = CAMERA_KEYS[0].pos
  const target = CAMERA_KEYS[0].target
  return {
    pos: { x: pos[0], y: pos[1], z: pos[2] },
    target: { x: target[0], y: target[1], z: target[2] },
    fov: CAMERA_KEYS[0].fov,
  }
}

export function deriveSurfacePlantState() {
  return {
    plantOpacity: 1,
    strataOpacity: 0,
    rootProgress: 0,
    myceliumOpacity: 0,
    cameraY: 0.35,
    ambientIntensity: 1.2,
    sunIntensity: 0.85,
  }
}

/** Camera path that follows root growth underground (never drops below root tips) */
export function getUndergroundCamera(rootGrowth) {
  const t = easeInOut(Math.max(0, Math.min(1, rootGrowth)))
  const pos = interpolateKeys(CAMERA_KEYS, t, 'pos')
  const target = interpolateKeys(CAMERA_KEYS, t, 'target')
  const fov = interpolateKeys(CAMERA_KEYS, t, 'fov')

  return {
    pos: { x: pos[0], y: pos[1], z: pos[2] },
    target: { x: target[0], y: target[1], z: target[2] },
    fov,
  }
}

/** Alineado con scenes.js → id: 'results' */
export const RESULTS_SCROLL_START = 0.68
export const RESULTS_SCROLL_END = 0.84

export function getResultsSectionProgress(scrollProgress) {
  const p = Math.max(0, Math.min(1, scrollProgress))
  if (p <= RESULTS_SCROLL_START) return 0
  if (p >= RESULTS_SCROLL_END) return 1
  return (p - RESULTS_SCROLL_START) / (RESULTS_SCROLL_END - RESULTS_SCROLL_START)
}

/** Órbita leve en Resultados reales para mostrar las raíces desde otros ángulos. */
export function applyResultsCameraOrbit(camera, orbitT) {
  const t = easeInOut(Math.max(0, Math.min(1, orbitT)))
  if (t <= 0.001) return camera

  const pivot = { x: 0.05, y: camera.target.y, z: 0.0 }
  const yaw = lerp(-0.32, 0.36, t)
  const cosY = Math.cos(yaw)
  const sinY = Math.sin(yaw)

  const ox = camera.pos.x - pivot.x
  const oz = camera.pos.z - pivot.z
  const rx = ox * cosY - oz * sinY
  const rz = ox * sinY + oz * cosY

  return {
    pos: {
      x: pivot.x + rx,
      y: camera.pos.y + Math.sin(t * Math.PI) * 0.35,
      z: pivot.z + rz,
    },
    target: {
      x: lerp(camera.target.x, -0.22, t * 0.5),
      y: camera.target.y,
      z: lerp(camera.target.z, 0.12, t * 0.4),
    },
    fov: camera.fov + Math.sin(t * Math.PI) * 1.2,
  }
}

/** Shader growth 0→1 — ligado al scroll subterráneo */
export function getRootShaderProgress(rootGrowth) {
  const t = Math.max(0, Math.min(1, rootGrowth))
  if (t <= 0) return 0
  return easeInOut(t)
}

export function deriveUndergroundObjectState(rootGrowth) {
  const t = Math.max(0, Math.min(1, rootGrowth))
  const e = easeInOut(t)

  return {
    // Planta visible en superficie; fade gradual al bajar bajo tierra
    plantOpacity: Math.max(0, 1 - Math.max(0, t - 0.06) * 2.8),
    strataOpacity: Math.min(0.9, 0.1 + e * 0.75),
    myceliumOpacity: Math.min(1, 0.15 + e * 0.9),
    cameraY: lerp(0.35, -7.0, e),
    ambientIntensity: lerp(0.9, 0.3, e),
    sunIntensity: Math.max(0, 0.4 - e * 0.4),
  }
}
