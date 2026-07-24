import * as THREE from 'three'

/** Punto único de nacimiento — superficie del suelo / base del tallo */
export const ROOT_CROWN = new THREE.Vector3(0, 0, 0)

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

  function generateBranch(
    startPoint,
    direction,
    depth,
    length,
    thickness,
    parentIndex,
    pathPrefixPoints = [],
  ) {
    if (depth > maxDepth || length < 0.15) return

    const points = pathPrefixPoints.map((p) => p.clone())
    if (points.length === 0) {
      points.push(startPoint.clone())
    } else {
      const last = points[points.length - 1]
      if (last.distanceToSquared(startPoint) > 1e-8) {
        points.push(startPoint.clone())
      }
    }

    const segments = Math.floor(6 + rand() * 6)
    let currentPos = points[points.length - 1].clone()
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
      const branchProgress = 0.35 + rand() * 0.4
      const branchIdx = Math.max(1, Math.floor(branchProgress * (points.length - 1)))
      const branchPoint = points[branchIdx].clone()
      const prefix = points.slice(0, branchIdx + 1)

      const branchDir = new THREE.Vector3(
        currentDir.x + randSign() * randRange(0.3, spreadAngle),
        -Math.abs(currentDir.y) * randRange(0.75, 1.0) - randRange(0.05, 0.2),
        currentDir.z + randSign() * randRange(0.2, 0.4),
      ).normalize()

      generateBranch(
        branchPoint,
        branchDir,
        depth + 1,
        length * randRange(0.45, 0.65),
        thickness * 0.7,
        roots.length - 1,
        prefix,
      )
    }
  }

  for (let i = 0; i < rootCount; i++) {
    const angle = (i / rootCount) * Math.PI * 2 + randRange(-0.06, 0.06)
    const initialDir = new THREE.Vector3(
      Math.cos(angle) * randRange(0.2, 0.55),
      -randRange(0.85, 1.0),
      Math.sin(angle) * randRange(0.2, 0.55),
    ).normalize()

    generateBranch(
      ROOT_CROWN,
      initialDir,
      0,
      randRange(maxLength * 0.7, maxLength),
      1.0,
      -1,
    )
  }

  return roots
}

export function rootsToCurves(roots) {
  return roots.map((root) => {
    const segments = Math.max(6, Math.floor(root.curve.points.length * 3))
    const geo = new THREE.TubeGeometry(root.curve, segments, root.thickness, 6, false)
    geo.userData.totalIndices = geo.index?.count ?? 0
    return { geometry: geo, root }
  })
}
