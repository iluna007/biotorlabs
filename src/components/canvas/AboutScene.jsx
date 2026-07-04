import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useSitePreferences } from '../../context/SitePreferencesContext'
import { useMediaQuery, BP } from '../../hooks/useMediaQuery'

function particleCount(isMobile, reducedMotion) {
  if (reducedMotion) return 120
  if (isMobile) return 350
  return 900
}

export function AboutScene() {
  const canvasRef = useRef(null)
  const { theme } = useSitePreferences()
  const isMobile = useMediaQuery(BP.mobile)
  const prefersReducedMotion = useMediaQuery(BP.reducedMotion)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const count = particleCount(isMobile, prefersReducedMotion)
    const isLight = theme === 'light'
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'default' : 'high-performance',
    })
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 80)
    camera.position.z = 8

    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      phases[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(isLight ? '#2E8B57' : '#A8E063') },
        uColorB: { value: new THREE.Color(isLight ? '#1A5C35' : '#4CAF7D') },
        uOpacity: { value: isLight ? 0.35 : 0.55 },
      },
      vertexShader: `
        attribute float aPhase;
        uniform float uTime;
        varying float vPulse;
        void main() {
          vPulse = sin(uTime * 1.4 + aPhase) * 0.5 + 0.5;
          vec3 pos = position;
          pos.x += sin(uTime * 0.35 + aPhase * 2.0) * 0.35;
          pos.y += cos(uTime * 0.28 + aPhase) * 0.25;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (2.0 + vPulse * 2.5) * (8.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        varying float vPulse;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, d) * vPulse * uOpacity;
          vec3 col = mix(uColorB, uColorA, vPulse);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const clock = new THREE.Clock()
    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!prefersReducedMotion) {
        mat.uniforms.uTime.value = clock.getElapsedTime()
        points.rotation.y = clock.getElapsedTime() * 0.03
      }
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [theme, isMobile, prefersReducedMotion])

  return <canvas ref={canvasRef} className="about-scene-canvas" aria-hidden="true" />
}
