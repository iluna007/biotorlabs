import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { generateRootSystem, rootsToCurves } from '../../../utils/rootGenerator'
import { applyRootColors } from '../../../config/sceneTheme'
import { applyRootGrowthToMeshes } from '../../../utils/rootGrowthMesh'
import { registerSceneTick } from '../../../utils/sceneTick'

function disposeRootGroup(group) {
  group.traverse((child) => {
    if (child.isMesh) child.geometry?.dispose()
  })
}

function applyGrowth(meshes, material, progress) {
  applyRootGrowthToMeshes(meshes, progress)
  if (material?.uniforms?.uGrowthProgress) {
    material.uniforms.uGrowthProgress.value = progress
  }
}

export function RootSystem({ scene, growthProgress = 0, theme = 'dark' }) {
  const meshesRef = useRef([])
  const materialRef = useRef(null)
  const growthRef = useRef(growthProgress)

  growthRef.current = growthProgress

  useLayoutEffect(() => {
    if (!scene) return undefined

    const existing = scene.getObjectByName('RootSystem')
    if (existing) {
      disposeRootGroup(existing)
      scene.remove(existing)
    }
    meshesRef.current = []
    materialRef.current = null

    const vertexShader = `
      uniform float uTime;
      uniform float uGrowthProgress;
      varying float vProgress;
      varying float vGlow;

      void main() {
        vProgress = uv.x;
        float tipGlow = smoothstep(uGrowthProgress - 0.08, uGrowthProgress, vProgress);
        float pulse = sin(uTime * 2.5 + vProgress * 8.0) * 0.5 + 0.5;
        vGlow = tipGlow * pulse;

        vec3 pos = position;
        float wave = sin(uTime * 0.7 + pos.y * 3.0) * 0.008;
        pos.x += wave * step(vProgress, uGrowthProgress);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragmentShader = `
      uniform float uGrowthProgress;
      uniform vec3 uColorBase;
      uniform vec3 uColorTip;
      uniform vec3 uColorGlow;
      varying float vProgress;
      varying float vGlow;

      void main() {
        if (vProgress > uGrowthProgress + 0.015) discard;

        float t = clamp(vProgress / max(uGrowthProgress, 0.06), 0.0, 1.0);
        vec3 base = mix(uColorBase, uColorTip, t);
        vec3 color = mix(base, uColorGlow, vGlow * 0.7);
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const rootCount = isMobile ? 5 : 8
    const rootData = generateRootSystem({
      rootCount,
      maxDepth: 3,
      maxLength: 7,
      spreadAngle: 0.6,
      seed: 137,
    })

    const curves = rootsToCurves(rootData)

    const sharedMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uGrowthProgress: { value: growthRef.current },
        uColorBase: { value: new THREE.Color() },
        uColorTip: { value: new THREE.Color() },
        uColorGlow: { value: new THREE.Color() },
      },
      transparent: false,
      depthWrite: true,
      side: THREE.DoubleSide,
    })

    applyRootColors(sharedMaterial.uniforms, theme)
    materialRef.current = sharedMaterial

    const rootGroup = new THREE.Group()
    rootGroup.name = 'RootSystem'
    rootGroup.frustumCulled = false

    curves.forEach(({ geometry }, index) => {
      geometry.userData.totalIndices = geometry.index?.count ?? 0
      const mesh = new THREE.Mesh(geometry, sharedMaterial)
      mesh.name = `RootSystem_${index}`
      mesh.frustumCulled = true
      mesh.castShadow = false
      mesh.renderOrder = 2
      rootGroup.add(mesh)
      meshesRef.current.push(mesh)
    })

    scene.add(rootGroup)
    applyGrowth(meshesRef.current, sharedMaterial, growthRef.current)

    const unregisterTick = registerSceneTick(scene, (elapsed) => {
      if (materialRef.current?.uniforms?.uTime) {
        materialRef.current.uniforms.uTime.value = elapsed
      }
    })

    return () => {
      unregisterTick()
      const group = scene.getObjectByName('RootSystem')
      if (group) {
        disposeRootGroup(group)
        scene.remove(group)
      }
      sharedMaterial.dispose()
      meshesRef.current = []
      materialRef.current = null
    }
  }, [scene])

  useLayoutEffect(() => {
    applyGrowth(meshesRef.current, materialRef.current, growthProgress)
  }, [growthProgress])

  useEffect(() => {
    if (!materialRef.current) return
    applyRootColors(materialRef.current.uniforms, theme)
  }, [theme])

  return null
}
