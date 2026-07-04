import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useThreeScene(canvasRef, options = {}) {
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const {
      background = '#0A2A1A',
      fogDensity = 0.02,
      fov = 55,
      toneMappingExposure = 1.2,
    } = options

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = toneMappingExposure
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(background)
    scene.fog = new THREE.FogExp2(background, fogDensity)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    cameraRef.current = camera

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [canvasRef, options])

  return { sceneRef, cameraRef, rendererRef }
}
