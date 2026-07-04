import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { getSceneTheme } from '../../../config/sceneTheme'

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 3000 : 8000

function applyParticleMaterial(material, themeKey) {
  const isLight = themeKey === 'light'
  material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
  material.depthWrite = isLight
  material.opacity = isLight ? 0.88 : 0.6
  material.size = isLight ? 0.055 : 0.04
  material.needsUpdate = true
}

function buildParticleColors(themeKey) {
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const soilColors = getSceneTheme(themeKey).soilParticles.map((hex) => new THREE.Color(hex))

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    const color = soilColors[Math.floor(Math.random() * soilColors.length)]
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }
  return colors
}

export function SoilParticles({ scene, scrollProgress = 0, theme = 'dark' }) {
  const pointsRef = useRef(null)

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = Math.random() * 4
      const angle = Math.random() * Math.PI * 2
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = -Math.random() * 20
      positions[i3 + 2] = Math.sin(angle) * radius
      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, sizes }
  }, [])

  const initialColors = useMemo(() => buildParticleColors('dark'), [])

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('SoilParticles')) {
      pointsRef.current = scene.getObjectByName('SoilParticles')
      return
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(initialColors.slice(), 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    points.name = 'SoilParticles'
    scene.add(points)
    pointsRef.current = points

    return () => {
      scene.remove(points)
      geometry.dispose()
      material.dispose()
    }
  }, [scene, positions, sizes, initialColors])

  useEffect(() => {
    if (!pointsRef.current) return
    const opacity = 0.2 + scrollProgress * 0.8
    const maxOpacity = theme === 'light' ? 0.92 : 1.0
    pointsRef.current.material.opacity = Math.min(opacity, maxOpacity)
  }, [scrollProgress, theme])

  useEffect(() => {
    if (!pointsRef.current) return
    const geo = pointsRef.current.geometry
    const colorAttr = geo.attributes.color
    const nextColors = buildParticleColors(theme)
    colorAttr.array.set(nextColors)
    colorAttr.needsUpdate = true
    applyParticleMaterial(pointsRef.current.material, theme)
  }, [theme])

  useEffect(() => {
    if (!pointsRef.current) return
    let animId
    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position

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
