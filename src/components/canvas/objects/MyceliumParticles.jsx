import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getSceneTheme } from '../../../config/sceneTheme'

const PARTICLE_COUNT = 1200

export function MyceliumParticles({ scene, opacity = 0, rootProgress = 0, theme = 'dark' }) {
  const pointsRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const r = Math.random() * 3.5
      const angle = Math.random() * Math.PI * 2
      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = -2 - Math.random() * 16
      positions[i3 + 2] = Math.sin(angle) * r
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [])

  const applyMyceliumTheme = (mat, themeKey) => {
    if (!mat?.uniforms) return
    const { mycelium } = getSceneTheme(themeKey)
    mat.uniforms.uColorLow.value.set(...mycelium.low)
    mat.uniforms.uColorHigh.value.set(...mycelium.high)
    mat.blending = themeKey === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending
    mat.depthWrite = themeKey === 'light'
    mat.needsUpdate = true
  }

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('MyceliumParticles')) {
      pointsRef.current = scene.getObjectByName('MyceliumParticles')
      applyMyceliumTheme(pointsRef.current.material, theme)
      return
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const initial = getSceneTheme(theme).mycelium

    const vertShader = `
      precision mediump float;
      attribute float aPhase;
      uniform float uTime;
      uniform float uRootProgress;
      varying float vPulse;
      varying float vDepth;

      void main() {
        vDepth = (-position.y - 2.0) / 16.0;

        float alive = step(vDepth, uRootProgress * 1.1);

        vPulse = sin(uTime * 2.0 + aPhase) * 0.5 + 0.5;
        vPulse *= alive;

        vec3 pos = position;
        pos.y += sin(uTime * 1.2 + aPhase * 3.0) * 0.04;
        pos.x += cos(uTime * 0.8 + aPhase * 2.0) * 0.03;

        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (3.5 + vPulse * 2.5) * (1.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `

    const fragShader = `
      precision mediump float;
      uniform float uOpacity;
      uniform vec3 uColorLow;
      uniform vec3 uColorHigh;
      varying float vPulse;

      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d);

        vec3 col = mix(uColorLow, uColorHigh, vPulse);

        gl_FragColor = vec4(col, alpha * vPulse * uOpacity);
      }
    `

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uRootProgress: { value: 0 },
        uColorLow: { value: new THREE.Vector3(...initial.low) },
        uColorHigh: { value: new THREE.Vector3(...initial.high) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    points.name = 'MyceliumParticles'
    scene.add(points)
    pointsRef.current = points

    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (mat.uniforms) {
        mat.uniforms.uTime.value = clockRef.current.getElapsedTime()
      }
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      scene.remove(points)
      geo.dispose()
      mat.dispose()
    }
  }, [scene, positions, phases])

  useEffect(() => {
    if (!pointsRef.current?.material?.uniforms) return
    gsap.to(pointsRef.current.material.uniforms.uOpacity, {
      value: opacity,
      duration: 0.8,
    })
    gsap.to(pointsRef.current.material.uniforms.uRootProgress, {
      value: rootProgress,
      duration: 0.6,
    })
  }, [opacity, rootProgress])

  useEffect(() => {
    applyMyceliumTheme(pointsRef.current?.material, theme)
  }, [theme])

  return null
}
