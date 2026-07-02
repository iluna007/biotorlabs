import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export function LightingRig({ scene, scrollProgress, ambientIntensity, sunIntensity }) {
  const ambientRef = useRef(null)
  const sunRef = useRef(null)
  const rootGlowRef = useRef(null)
  const rimRef = useRef(null)

  useLayoutEffect(() => {
    if (!scene) return
    if (ambientRef.current) return

    const ambient = new THREE.AmbientLight('#1a2a14', 0.8)
    scene.add(ambient)
    ambientRef.current = ambient

    const sun = new THREE.DirectionalLight('#d4f0c0', 2.2)
    sun.position.set(5, 10, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    scene.add(sun)
    sunRef.current = sun

    const rootGlow = new THREE.PointLight('#5bcc3e', 0, 8)
    rootGlow.position.set(0, -6, 0)
    scene.add(rootGlow)
    rootGlowRef.current = rootGlow

    const rim = new THREE.DirectionalLight('#2a5a1a', 0.5)
    rim.position.set(-3, -5, -3)
    scene.add(rim)
    rimRef.current = rim

    return () => {
      ;[ambient, sun, rootGlow, rim].forEach((l) => scene.remove(l))
    }
  }, [scene])

  useEffect(() => {
    if (!sunRef.current || !rootGlowRef.current || !ambientRef.current) return

    if (ambientIntensity !== undefined) {
      gsap.to(ambientRef.current, { intensity: ambientIntensity, duration: 0.5 })
    }
    if (sunIntensity !== undefined) {
      gsap.to(sunRef.current, { intensity: sunIntensity, duration: 0.5 })
    }

    const p = scrollProgress
    const glowZone = p > 0.3 && p < 0.68
    gsap.to(rootGlowRef.current, {
      intensity: glowZone ? 3 + Math.sin(Date.now() * 0.002) * 0.5 : 0,
      duration: 0.5,
    })

    if (rootGlowRef.current) {
      rootGlowRef.current.position.y = -6 - p * 10
    }
  }, [scrollProgress, ambientIntensity, sunIntensity])

  return null
}
