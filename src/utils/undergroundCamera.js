const lerp = (a, b, t) => a + (b - a) * t

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

const CAMERA_KEYS = [
  { t: 0.0, pos: [0.5, 0.35, 6.0], target: [0.0, -0.2, 0.0], fov: 56 },
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

/** Shader growth 0→1 — roots visible from the first frame underground */
export function getRootShaderProgress(rootGrowth) {
  if (rootGrowth <= 0) return 0.1
  return 0.1 + easeInOut(rootGrowth) * 0.9
}

export function deriveUndergroundObjectState(rootGrowth) {
  const t = Math.max(0, Math.min(1, rootGrowth))
  const e = easeInOut(t)

  return {
    plantOpacity: Math.max(0, 1 - t * 5),
    strataOpacity: Math.min(0.9, 0.1 + e * 0.75),
    myceliumOpacity: Math.min(1, 0.15 + e * 0.9),
    cameraY: lerp(0.35, -7.0, e),
    ambientIntensity: lerp(0.9, 0.3, e),
    sunIntensity: Math.max(0, 0.4 - e * 0.4),
  }
}
