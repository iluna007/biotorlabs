import * as THREE from 'three'

export function generateRootSystem({
  rootCount = 12,
  maxDepth = 4,
  maxLength = 6,
  spreadAngle = 0.6,
  seed = 42,
}) {
  const roots = []

  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const randRange = (min, max) => min + rand() * (max - min)
  const randSign = () => (rand() > 0.5 ? 1 : -1)

  function generateBranch(startPoint, direction, depth, length, thickness, parentIndex) {
    if (depth > maxDepth || length < 0.15) return

    const points = [startPoint.clone()]
    const segments = Math.floor(6 + rand() * 6)

    let currentPos = startPoint.clone()
    let currentDir = direction.clone().normalize()

    for (let i = 0; i < segments; i++) {
      const gravity = new THREE.Vector3(
        randRange(-0.1, 0.1),
        -randRange(0.3, 0.6),
        randRange(-0.1, 0.1),
      )
      currentDir.add(gravity).normalize()

      const step = (length / segments) * randRange(0.8, 1.2)
      currentPos = currentPos.clone().addScaledVector(currentDir, step)
      points.push(currentPos.clone())
    }

    if (points.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(points)
      roots.push({
        curve,
        depth,
        thickness: thickness * 0.012,
        length,
        parentIndex,
        index: roots.length,
      })
    }

    const branchCount = depth < 2 ? 3 : 2
    for (let b = 0; b < branchCount; b++) {
      const branchProgress = 0.3 + rand() * 0.5
      const branchPoint = new THREE.Vector3().lerpVectors(
        startPoint,
        currentPos,
        branchProgress,
      )

      const branchDir = new THREE.Vector3(
        currentDir.x + randSign() * randRange(0.3, spreadAngle),
        currentDir.y * randRange(0.6, 0.9),
        currentDir.z + randSign() * randRange(0.2, 0.4),
      ).normalize()

      generateBranch(
        branchPoint,
        branchDir,
        depth + 1,
        length * randRange(0.45, 0.65),
        thickness * 0.7,
        roots.length - 1,
      )
    }
  }

  for (let i = 0; i < rootCount; i++) {
    const angle = (i / rootCount) * Math.PI * 2
    const startPoint = new THREE.Vector3(
      Math.cos(angle) * randRange(0.1, 0.4),
      randRange(-0.1, 0.1),
      Math.sin(angle) * randRange(0.1, 0.4),
    )
    const initialDir = new THREE.Vector3(
      Math.cos(angle) * randRange(0.1, 0.3),
      -randRange(0.7, 1.0),
      Math.sin(angle) * randRange(0.1, 0.3),
    )

    generateBranch(startPoint, initialDir, 0, randRange(maxLength * 0.7, maxLength), 1.0, -1)
  }

  return roots
}

export function rootsToCurves(roots) {
  return roots.map((root) => {
    const segments = Math.max(3, Math.floor(root.curve.points.length * 4))
    const geo = new THREE.TubeGeometry(root.curve, segments, root.thickness, 6, false)
    return { geometry: geo, root }
  })
}
