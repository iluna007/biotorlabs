import { useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import {
  buildPortfolioParticleColors,
  getProductMyceliumColors,
  stableParticleSlot,
  tweenColorAttribute,
  tweenMyceliumColors,
} from '../../../utils/productPack3d'

const PARTICLE_COUNT = 1200

export function MyceliumParticles({
  scene,
  opacity = 0,
  rootProgress = 0,
  theme = 'dark',
  productIndex = 0,
  activeBias = 0,
}) {
  const pointsRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())
  const tweenRef = useRef(null)
  const colorTweenRef = useRef(null)
  const lastKeyRef = useRef('')

  const { positions, phases, scales, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)
    const scales = new Float32Array(PARTICLE_COUNT)
    const colors = buildPortfolioParticleColors(PARTICLE_COUNT, 'dark', 0, 0)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const r = Math.random() * 3.5
      const angle = Math.random() * Math.PI * 2
      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = -2 - Math.random() * 16
      positions[i3 + 2] = Math.sin(angle) * r
      phases[i] = Math.random() * Math.PI * 2
      scales[i] = 0.7 + (stableParticleSlot(i, 80) / 80) * 0.6
    }
    return { positions, phases, scales, colors }
  }, [])

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('MyceliumParticles')) {
      const existing = scene.getObjectByName('MyceliumParticles')
      const hasLightShader = existing.material?.uniforms?.uLightMode
      if (!hasLightShader) {
        existing.material?.dispose?.()
        existing.geometry?.dispose?.()
        scene.remove(existing)
      } else {
        pointsRef.current = existing
        return undefined
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors.slice(), 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const initial = getProductMyceliumColors(0, 'dark')

    const vertShader = `
      precision mediump float;
      attribute float aPhase;
      attribute vec3 aColor;
      attribute float aScale;
      uniform float uTime;
      uniform float uRootProgress;
      uniform float uBaseSize;
      varying float vPulse;
      varying vec3 vColor;

      void main() {
        float vDepth = (-position.y - 2.0) / 16.0;
        float alive = step(vDepth, uRootProgress * 1.1);

        vPulse = sin(uTime * 2.0 + aPhase) * 0.5 + 0.5;
        vPulse *= alive;
        vColor = aColor;

        vec3 pos = position;
        pos.y += sin(uTime * 1.2 + aPhase * 3.0) * 0.04;
        pos.x += cos(uTime * 0.8 + aPhase * 2.0) * 0.03;

        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uBaseSize * aScale * (1.0 + vPulse * 0.35) * (280.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `

    const fragShader = `
      precision mediump float;
      uniform float uOpacity;
      uniform float uLightMode;
      varying float vPulse;
      varying vec3 vColor;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        if (d > 0.5) discard;

        float sphere = sqrt(max(0.0, 1.0 - (d * 2.0) * (d * 2.0)));
        float shade = uLightMode > 0.5
          ? (0.88 + sphere * 0.12)
          : (0.45 + sphere * 0.65);
        vec3 col = vColor * shade;

        float edge = uLightMode > 0.5 ? 0.32 : 0.1;
        float alpha = smoothstep(0.5, edge, d) * vPulse * uOpacity;
        gl_FragColor = vec4(col, alpha);
      }
    `

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uRootProgress: { value: 0 },
        uBaseSize: { value: 0.038 },
        uLightMode: { value: 0 },
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
      tweenRef.current?.kill()
      colorTweenRef.current?.kill()
      scene.remove(points)
      geo.dispose()
      mat.dispose()
    }
  }, [scene, positions, phases, scales, colors])

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
    if (!pointsRef.current?.material) return

    const key = `${theme}-${productIndex}-${activeBias.toFixed(2)}`
    if (key === lastKeyRef.current) return
    lastKeyRef.current = key

    const mat = pointsRef.current.material
    const isLight = theme === 'light'
    mat.uniforms.uLightMode.value = isLight ? 1 : 0
    mat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
    mat.depthWrite = isLight
    mat.uniforms.uBaseSize.value = isLight ? 0.046 : 0.038

    const colorAttr = pointsRef.current.geometry.attributes.aColor
    const nextColors = buildPortfolioParticleColors(
      PARTICLE_COUNT,
      theme,
      productIndex,
      activeBias,
    )
    colorTweenRef.current?.kill()
    colorTweenRef.current = tweenColorAttribute(colorAttr, nextColors, 0.6)

    const target = getProductMyceliumColors(productIndex, theme)
    tweenRef.current?.kill()
    tweenRef.current = tweenMyceliumColors(mat.uniforms, target, 0.65)
  }, [theme, productIndex, activeBias])

  return null
}
