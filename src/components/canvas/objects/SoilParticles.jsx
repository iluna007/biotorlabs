import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import {
  applySphereMaterialTheme,
  buildPortfolioParticleColors,
  createSpherePointsMaterial,
  stableParticleSlot,
  tweenColorAttribute,
} from '../../../utils/productPack3d'

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 3000 : 8000

export function SoilParticles({
  scene,
  scrollProgress = 0,
  theme = 'dark',
  productIndex = 0,
  activeBias = 0,
}) {
  const pointsRef = useRef(null)
  const tweenRef = useRef(null)
  const lastKeyRef = useRef('')

  const { positions, scales, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const scales = new Float32Array(PARTICLE_COUNT)
    const colors = buildPortfolioParticleColors(PARTICLE_COUNT, 'dark', 0, 0)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = Math.random() * 4
      const angle = Math.random() * Math.PI * 2
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = -Math.random() * 20
      positions[i3 + 2] = Math.sin(angle) * radius
      scales[i] = 0.65 + (stableParticleSlot(i, 100) / 100) * 0.7
    }

    return { positions, scales, colors }
  }, [])

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('SoilParticles')) {
      const existing = scene.getObjectByName('SoilParticles')
      if (!(existing.material?.uniforms?.uLightMode)) {
        existing.material?.dispose?.()
        existing.material = createSpherePointsMaterial(
          theme,
          theme === 'light' ? 0.05 : 0.04,
        )
      }
      pointsRef.current = existing
      return undefined
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors.slice(), 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const material = createSpherePointsMaterial(theme, theme === 'light' ? 0.046 : 0.04)
    const points = new THREE.Points(geometry, material)
    points.name = 'SoilParticles'
    scene.add(points)
    pointsRef.current = points

    return () => {
      tweenRef.current?.kill()
      scene.remove(points)
      geometry.dispose()
      material.dispose()
    }
  }, [scene, positions, scales, colors, theme])

  useEffect(() => {
    if (!pointsRef.current?.material?.uniforms) return
    const scrollOpacity = 0.72 + scrollProgress * 0.28
    const isLight = theme === 'light'
    const baseSize = isLight ? 0.05 : 0.04
    applySphereMaterialTheme(pointsRef.current.material, theme, baseSize)
    pointsRef.current.material.uniforms.uOpacity.value = Math.min(
      scrollOpacity,
      isLight ? 0.98 : 0.9,
    )
  }, [scrollProgress, theme])

  useEffect(() => {
    if (!pointsRef.current) return

    const key = `${theme}-${productIndex}-${activeBias.toFixed(2)}`
    if (key === lastKeyRef.current) return
    lastKeyRef.current = key

    const attr = pointsRef.current.geometry.attributes.aColor
    const nextColors = buildPortfolioParticleColors(
      PARTICLE_COUNT,
      theme,
      productIndex,
      activeBias,
    )

    tweenRef.current?.kill()
    tweenRef.current = tweenColorAttribute(attr, nextColors, 0.6)
  }, [theme, productIndex, activeBias])

  useEffect(() => {
    if (!pointsRef.current) return
    let animId
    const posAttr = pointsRef.current.geometry.attributes.position

    const animate = (time) => {
      for (let i = 0; i < PARTICLE_COUNT; i += 20) {
        const i3 = i * 3
        posAttr.array[i3] += Math.sin(time * 0.0005 + i) * 0.0002
        posAttr.array[i3 + 2] += Math.cos(time * 0.0004 + i) * 0.0002
      }
      posAttr.needsUpdate = true
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return null
}
