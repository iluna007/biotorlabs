import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getCurrentScene, deriveObjectState, lerp } from '../../utils/sceneUtils'
import { getSceneTheme } from '../../config/sceneTheme'
import { PlantAboveGround } from './objects/PlantAboveGround'
import { SoilSurface } from './objects/SoilSurface'
import { SoilStrata } from './objects/SoilStrata'
import { RootSystem } from './objects/RootSystem'
import { SoilParticles } from './objects/SoilParticles'
import { MyceliumParticles } from './objects/MyceliumParticles'
import { ProductBottle } from './objects/ProductBottle'
import { LightingRig } from './objects/LightingRig'

export function RootScene({ scrollProgress, theme = 'dark' }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const camTargetPos = useRef(new THREE.Vector3(0.8, 2.2, 7.0))
  const camTargetLookAt = useRef(new THREE.Vector3(0.0, 0.8, 0.0))
  const camCurrentLookAt = useRef(new THREE.Vector3(0.0, 0.8, 0.0))

  const [glScene, setGlScene] = useState(null)
  const [objectState, setObjectState] = useState(() => deriveObjectState(0))

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || rendererRef.current) return

    const isMobile = window.innerWidth < 768
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    const themeCfg = getSceneTheme(theme)
    renderer.toneMappingExposure = themeCfg.exposure
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(themeCfg.sky)
    scene.fog = new THREE.FogExp2(themeCfg.sky, 0.018)
    sceneRef.current = scene
    setGlScene(scene)

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.05,
      120,
    )
    camera.position.set(0.8, 2.2, 7.0)
    camCurrentLookAt.current.set(0, 0.8, 0)
    camera.lookAt(camCurrentLookAt.current)
    cameraRef.current = camera

    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const sc = sceneRef.current
      const cam = cameraRef.current
      const r = rendererRef.current
      if (!sc || !cam || !r) return

      cam.position.lerp(camTargetPos.current, 0.04)
      camCurrentLookAt.current.lerp(camTargetLookAt.current, 0.04)
      cam.lookAt(camCurrentLookAt.current)

      r.render(sc, cam)
    }
    animate()

    const onResize = () => {
      const cam = cameraRef.current
      const r = rendererRef.current
      if (!cam || !r) return
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
      r.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      rendererRef.current?.dispose()
      rendererRef.current = null
      sceneRef.current = null
      cameraRef.current = null
      setGlScene(null)
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current) return

    const { cur, next, t } = getCurrentScene(scrollProgress)

    camTargetPos.current.set(
      lerp(cur.camera.pos.x, next.camera.pos.x, t),
      lerp(cur.camera.pos.y, next.camera.pos.y, t),
      lerp(cur.camera.pos.z, next.camera.pos.z, t),
    )
    camTargetLookAt.current.set(
      lerp(cur.camera.target.x, next.camera.target.x, t),
      lerp(cur.camera.target.y, next.camera.target.y, t),
      lerp(cur.camera.target.z, next.camera.target.z, t),
    )

    const targetFov = lerp(cur.camera.fov, next.camera.fov, t)
    gsap.to(cameraRef.current, {
      fov: targetFov,
      duration: 0.5,
      onUpdate: () => cameraRef.current?.updateProjectionMatrix(),
    })

    const fogDensity = lerp(cur.env.fogDensity, next.env.fogDensity, t)
    const fogColor = adjustEnvColor(
      lerpColor(cur.env.fogColor, next.env.fogColor, t),
      theme,
    )
    if (sceneRef.current.fog) {
      sceneRef.current.fog.density = fogDensity
      sceneRef.current.fog.color.set(fogColor)
    }

    const bgA = new THREE.Color(adjustEnvColor(cur.env.bgColor, theme))
    const bgB = new THREE.Color(adjustEnvColor(next.env.bgColor, theme))
    sceneRef.current.background?.copy(bgA.lerp(bgB, t))

    setObjectState(deriveObjectState(scrollProgress))
  }, [scrollProgress, theme])

  useEffect(() => {
    if (!rendererRef.current) return
    rendererRef.current.toneMappingExposure = getSceneTheme(theme).exposure
  }, [theme])

  return (
    <>
      <canvas id="root-canvas" ref={canvasRef} />

      {glScene && (
        <>
          <LightingRig
            scene={glScene}
            scrollProgress={scrollProgress}
            ambientIntensity={objectState.ambientIntensity}
            sunIntensity={objectState.sunIntensity}
            theme={theme}
          />

          <PlantAboveGround scene={glScene} opacity={objectState.plantOpacity} theme={theme} />

          <SoilSurface scene={glScene} cameraY={objectState.cameraY} theme={theme} />

          <SoilStrata scene={glScene} opacity={objectState.strataOpacity} theme={theme} />

          <SoilParticles scene={glScene} scrollProgress={scrollProgress} theme={theme} />

          <RootSystem scene={glScene} growthProgress={objectState.rootProgress} theme={theme} />

          <MyceliumParticles
            scene={glScene}
            opacity={objectState.myceliumOpacity}
            rootProgress={objectState.rootProgress}
            theme={theme}
          />

          <ProductBottle scene={glScene} visible={objectState.productVisible} />
        </>
      )}
    </>
  )
}

function lerpColor(a, b, t) {
  const colorA = new THREE.Color(a)
  const colorB = new THREE.Color(b)
  return colorA.lerp(colorB, t).getHex()
}

const LIGHT_SKY = new THREE.Color('#e8f2ea')

function adjustEnvColor(hex, theme) {
  if (theme !== 'light') return hex
  const adjust = getSceneTheme('light').skyAdjust
  const color = new THREE.Color(hex)
  color.lerp(LIGHT_SKY, adjust)
  return color.getHex()
}
