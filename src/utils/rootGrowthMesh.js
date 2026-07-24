/** Recorta índices desde la corona; complementa el discard del shader. */
export function applyRootGrowthToMeshes(meshes, progress) {
  const t = Math.max(0, Math.min(1, progress))

  meshes.forEach((mesh) => {
    const geo = mesh.geometry
    const total = geo.userData.totalIndices ?? geo.index?.count
    if (!total || !geo.index) return

    geo.userData.totalIndices = total

    if (t <= 0.01) {
      geo.setDrawRange(0, 0)
      return
    }

    const visible = Math.max(48, Math.ceil(total * t))
    geo.setDrawRange(0, Math.min(total, visible))
  })
}
