import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { generateRootSystem, rootsToCurves } from '../../../utils/rootGenerator'
import { PALETTE } from '../../../utils/colorPalette'

export function RootSystem({ scene, growthProgress = 0 }) {
  const meshesRef = useRef([])
  const materialRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())

  useLayoutEffect(() => {
    if (!scene) return
    if (materialRef.current) return

    const vertexShader = `
      uniform float uTime;
      uniform float uGrowthProgress;
      varying float vProgress;
      varying float vGlow;

      void main() {
        vProgress = uv.x;
        float alive = step(vProgress, uGrowthProgress);
        float tipGlow = smoothstep(uGrowthProgress - 0.06, uGrowthProgress, vProgress);
        float pulse = sin(uTime * 2.5 + vProgress * 8.0) * 0.5 + 0.5;
        vGlow = tipGlow * pulse;

        vec3 pos = position;
        float wave = sin(uTime * 0.7 + pos.y * 3.0) * 0.008 * alive;
        pos.x += wave;

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
        if (vProgress > uGrowthProgress + 0.005) discard;
        float t = clamp(vProgress / max(uGrowthProgress, 0.01), 0.0, 1.0);
        vec3 base = mix(uColorBase, uColorTip, t);
        vec3 color = mix(base, uColorGlow, vGlow * 0.7);
        float alpha = 1.0 - smoothstep(uGrowthProgress - 0.015, uGrowthProgress, vProgress) * 0.4;
        gl_FragColor = vec4(color, alpha);
      }
    `

    const rootData = generateRootSystem({
      rootCount: 14,
      maxDepth: 4,
      maxLength: 7,
      spreadAngle: 0.65,
      seed: 137,
    })

    const curves = rootsToCurves(rootData)

    const sharedMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uGrowthProgress: { value: 0 },
        uColorBase: { value: PALETTE.rootBase },
        uColorTip: { value: PALETTE.rootTip },
        uColorGlow: { value: PALETTE.rootGlow },
      },
      transparent: true,
      side: THREE.DoubleSide,
    })

    materialRef.current = sharedMaterial

    curves.forEach(({ geometry }) => {
      const mesh = new THREE.Mesh(geometry, sharedMaterial)
      mesh.name = 'RootSystem'
      mesh.position.y = -1
      mesh.castShadow = true
      scene.add(mesh)
      meshesRef.current.push(mesh)
    })

    let animId
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = clockRef.current.getElapsedTime()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      meshesRef.current.forEach((m) => {
        scene.remove(m)
        m.geometry.dispose()
      })
      sharedMaterial.dispose()
      meshesRef.current = []
    }
  }, [scene])

  useEffect(() => {
    if (!materialRef.current) return
    gsap.to(materialRef.current.uniforms.uGrowthProgress, {
      value: growthProgress,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [growthProgress])

  return null
}
