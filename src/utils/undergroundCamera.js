const lerp = (a, b, t) => a + (b - a) * t

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

/** Progreso suave 0→1 para todo el viaje subterráneo. */
function journeyEase(t) {
  return easeInOut(clamp01(t))
}

/** Rampa 0→1 de efectos de espiral (sin saltos al inicio). */
function spiralStrength(t) {
  return easeInOut(clamp01((t - 0.2) / 0.5))
}

/** Vueltas completas de la cámara mientras las raíces crecen (0→1). */
const SPIRAL_TURNS_DESKTOP = 1.6
const SPIRAL_TURNS_MOBILE = 0.0

const SPIRAL_PIVOT_XZ = { x: 0.02, z: 0.01 }

/**
 * Planta en foco al inicio; descenso gradual; espiral en la segunda mitad del recorrido.
 */
const CAMERA_KEYS = [
  { t: 0.0, pos: [0.52, 1.72, 5.85], target: [0.0, 1.2, 0.0], fov: 44 },
  { t: 0.12, pos: [0.54, 1.38, 5.74], target: [0.0, 0.98, 0.0], fov: 44.5 },
  { t: 0.26, pos: [0.62, 0.45, 5.45], target: [0.02, 0.28, 0.0], fov: 46.5 },
  { t: 0.42, pos: [0.74, -1.40, 5.12], target: [0.04, -1.6, 0.0], fov: 48.5 },
  { t: 0.60, pos: [0.60, -3.65, 4.82], target: [0.06, -3.85, 0.0], fov: 50 },
  { t: 0.76, pos: [0.38, -5.65, 4.48], target: [0.08, -5.45, 0.0], fov: 50 },
  { t: 0.90, pos: [0.24, -6.55, 4.18], target: [0.07, -6.25, 0.0], fov: 49.5 },
  { t: 1.0, pos: [0.16, -7.20, 3.88], target: [0.06, -6.80, 0.0], fov: 49 },
]

function interpolateKeys(keys, t, field) {
  const clamped = clamp01(t)

  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (clamped >= a.t && clamped <= b.t) {
      const local = (clamped - a.t) / (b.t - a.t || 1)
      const eased = local * local * (3 - 2 * local)
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

function lerpCameraField(base, next, field, blend) {
  if (field === 'fov') return lerp(base.fov, next.fov, blend)
  return {
    x: lerp(base[field].x, next[field].x, blend),
    y: lerp(base[field].y, next[field].y, blend),
    z: lerp(base[field].z, next[field].z, blend),
  }
}

/** Vista de superficie — planta detrás del contenido "Detrás de la Ciencia" */
export function getSurfacePlantCamera(isMobile = false) {
  return getUndergroundCamera(0, isMobile)
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

/** Camera path that follows root growth underground */
export function getUndergroundCamera(rootGrowth, isMobile = false) {
  const t = clamp01(rootGrowth)
  const pos = interpolateKeys(CAMERA_KEYS, t, 'pos')
  const target = interpolateKeys(CAMERA_KEYS, t, 'target')
  const fov = interpolateKeys(CAMERA_KEYS, t, 'fov')

  const base = {
    pos: { x: pos[0], y: pos[1], z: pos[2] },
    target: { x: target[0], y: target[1], z: target[2] },
    fov,
  }

  return applyUndergroundSpiralOrbit(base, t, isMobile)
}

/**
 * Espiral suave: en t≈0 coincide con la base (planta en foco);
 * giro y profundidad extra entran gradualmente con spiralStrength.
 */
export function applyUndergroundSpiralOrbit(camera, rootGrowth, isMobile = false) {
  const spiralTurns = isMobile ? SPIRAL_TURNS_MOBILE : SPIRAL_TURNS_DESKTOP
  const t = clamp01(rootGrowth)
  const journey = journeyEase(t)
  const strength = spiralStrength(t)

  const angle = journey * spiralTurns * Math.PI * 2
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)

  const pivot = {
    x: SPIRAL_PIVOT_XZ.x,
    y: camera.target.y,
    z: SPIRAL_PIVOT_XZ.z,
  }

  const wobble = 1.0
  const radiusScale = lerp(1, lerp(1.03, 0.91, journey) * wobble, strength)

  const ox = camera.pos.x - pivot.x
  const oz = camera.pos.z - pivot.z
  const rx = ox * cosA - oz * sinA
  const rz = ox * sinA + oz * cosA

  const targetAngle = angle * lerp(0, 0.36, strength)
  const cosT = Math.cos(targetAngle)
  const sinT = Math.sin(targetAngle)
  const tx = camera.target.x - pivot.x
  const tz = camera.target.z - pivot.z

  const spiraled = {
    pos: {
      x: pivot.x + rx * radiusScale,
      y: camera.pos.y - journey * 0.16 * strength,
      z: pivot.z + rz * radiusScale,
    },
    target: {
      x: pivot.x + tx * cosT - tz * sinT,
      y: camera.target.y - journey * 0.08 * strength,
      z: pivot.z + tx * sinT + tz * cosT,
    },
    fov: camera.fov + Math.sin(journey * Math.PI * 2) * 0.75 * strength,
  }

  if (strength <= 0.0001) return camera

  return {
    pos: lerpCameraField(camera, spiraled, 'pos', strength),
    target: lerpCameraField(camera, spiraled, 'target', strength),
    fov: lerpCameraField(camera, spiraled, 'fov', strength),
  }
}

/** Alineado con scenes.js → id: 'results' */
export const RESULTS_SCROLL_START = 0.68
export const RESULTS_SCROLL_END = 0.84

export function getResultsSectionProgress(scrollProgress) {
  const p = clamp01(scrollProgress)
  if (p <= RESULTS_SCROLL_START) return 0
  if (p >= RESULTS_SCROLL_END) return 1
  return (p - RESULTS_SCROLL_START) / (RESULTS_SCROLL_END - RESULTS_SCROLL_START)
}

/** Órbita leve en Resultados reales para mostrar las raíces desde otros ángulos. */
export function applyResultsCameraOrbit(camera, orbitT) {
  const t = journeyEase(orbitT)
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
  const t = clamp01(rootGrowth)
  if (t <= 0) return 0
  return journeyEase(t)
}

export function deriveUndergroundObjectState(rootGrowth) {
  const t = clamp01(rootGrowth)
  const e = journeyEase(t)

  return {
    plantOpacity: Math.max(0, 1 - Math.max(0, t - 0.08) * 2.2),
    strataOpacity: Math.min(0.9, 0.1 + e * 0.75),
    myceliumOpacity: Math.min(1, 0.12 + e * 0.88),
    cameraY: lerp(0.35, -7.0, e),
    ambientIntensity: lerp(0.95, 0.32, e),
    sunIntensity: Math.max(0, 0.42 - e * 0.42),
  }
}
