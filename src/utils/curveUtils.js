import * as THREE from 'three'

export function createSmoothCurve(points, tension = 0.5) {
  return new THREE.CatmullRomCurve3(
    points.map((p) => (p instanceof THREE.Vector3 ? p.clone() : new THREE.Vector3(...p))),
    false,
    'catmullrom',
    tension,
  )
}

export function sampleCurve(curve, samples = 20) {
  const result = []
  for (let i = 0; i <= samples; i++) {
    result.push(curve.getPoint(i / samples))
  }
  return result
}
