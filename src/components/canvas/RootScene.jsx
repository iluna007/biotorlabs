import { useEffect, useRef, useState, useLayoutEffect } from 'react'

import * as THREE from 'three'

import { getCurrentScene, deriveObjectState, lerp } from '../../utils/sceneUtils'

import { getSceneTheme } from '../../config/sceneTheme'

import { runSceneTicks } from '../../utils/sceneTick'

import { PlantAboveGround } from './objects/PlantAboveGround'

import { RootSystem } from './objects/RootSystem'

import { SoilParticles } from './objects/SoilParticles'

import { MyceliumParticles } from './objects/MyceliumParticles'

import { LightingRig } from './objects/LightingRig'

import { useProductVisualState } from '../../hooks/useProductVisualState'

import {

  getUndergroundCamera,

  getRootShaderProgress,

  deriveUndergroundObjectState,

  getSurfacePlantCamera,

} from '../../hooks/useRootGrowthProgress'

import {

  isPlantSurfaceView,

  resolveUndergroundProgress,

} from '../../utils/barrelPhase2'



export function RootScene({

  scrollProgress,

  rootGrowthProgress = 0,

  undergroundActive = false,

  renderActive = true,

  loadPlantModel = false,

  barrelPhase2Progress = null,

  theme = 'dark',

  style,

}) {

  const canvasRef = useRef(null)

  const sceneRef = useRef(null)

  const cameraRef = useRef(null)

  const rendererRef = useRef(null)

  const timerRef = useRef(new THREE.Timer())

  const renderActiveRef = useRef(renderActive)

  const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 768)

  const initialPlantCam = getSurfacePlantCamera(isMobileRef.current)

  const fovTargetRef = useRef(initialPlantCam.fov)

  const camTargetPos = useRef(new THREE.Vector3(
    initialPlantCam.pos.x,
    initialPlantCam.pos.y,
    initialPlantCam.pos.z,
  ))

  const camTargetLookAt = useRef(new THREE.Vector3(
    initialPlantCam.target.x,
    initialPlantCam.target.y,
    initialPlantCam.target.z,
  ))

  const camCurrentLookAt = useRef(new THREE.Vector3(
    initialPlantCam.target.x,
    initialPlantCam.target.y,
    initialPlantCam.target.z,
  ))
  const camLerpRef = useRef(0.04)
  const wasUndergroundRef = useRef(false)

  const [glScene, setGlScene] = useState(null)

  const [objectState, setObjectState] = useState(() => deriveObjectState(0))

  const { productIndex, activeBias } = useProductVisualState(scrollProgress)



  renderActiveRef.current = renderActive

  const onSurface = isPlantSurfaceView(barrelPhase2Progress)
  let undergroundT = 0

  if (undergroundActive && !onSurface) {
    undergroundT = resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)
  }

  const rootShaderProgress = getRootShaderProgress(undergroundT)



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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5))

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.shadowMap.enabled = true

    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.outputColorSpace = THREE.SRGBColorSpace

    renderer.toneMapping = THREE.ACESFilmicToneMapping

    const themeCfg = getSceneTheme(theme)

    renderer.toneMappingExposure = themeCfg.exposure

    rendererRef.current = renderer



    const scene = new THREE.Scene()

    applyMinimalSceneBackground(scene, theme)

    scene.userData.tickHandlers = []

    sceneRef.current = scene

    setGlScene(scene)



    const camera = new THREE.PerspectiveCamera(

      initialPlantCam.fov,

      window.innerWidth / window.innerHeight,

      0.05,

      120,

    )

    camera.position.set(
      initialPlantCam.pos.x,
      initialPlantCam.pos.y,
      initialPlantCam.pos.z,
    )

    camCurrentLookAt.current.set(0, 0.8, 0)

    camera.lookAt(camCurrentLookAt.current)

    cameraRef.current = camera



    let rafId

    const animate = (timestamp) => {

      rafId = requestAnimationFrame(animate)



      const sc = sceneRef.current

      const cam = cameraRef.current

      const r = rendererRef.current

      if (!sc || !cam || !r || !renderActiveRef.current) return



      timerRef.current.update(timestamp)

      const elapsed = timerRef.current.getElapsed()

      runSceneTicks(sc, elapsed)



      cam.position.lerp(camTargetPos.current, camLerpRef.current)

      camCurrentLookAt.current.lerp(camTargetLookAt.current, camLerpRef.current)

      cam.lookAt(camCurrentLookAt.current)



      cam.fov += (fovTargetRef.current - cam.fov) * 0.06

      cam.updateProjectionMatrix()



      r.render(sc, cam)

    }

    animate()



    const onResize = () => {

      isMobileRef.current = window.innerWidth <= 768

      const cam = cameraRef.current

      const r = rendererRef.current

      if (!cam || !r) return

      cam.aspect = window.innerWidth / window.innerHeight

      cam.updateProjectionMatrix()

      r.setSize(window.innerWidth, window.innerHeight)
      r.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.5))
    }

    window.addEventListener('resize', onResize)



    return () => {

      cancelAnimationFrame(rafId)

      window.removeEventListener('resize', onResize)

      timerRef.current?.dispose()

      rendererRef.current?.dispose()

      rendererRef.current = null

      sceneRef.current = null

      cameraRef.current = null

      setGlScene(null)

    }

  }, [])



  useEffect(() => {

    if (!undergroundActive || !cameraRef.current) {

      wasUndergroundRef.current = undergroundActive

      return

    }



    if (!wasUndergroundRef.current) {

      const uT = resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)

      const cam = getUndergroundCamera(uT, isMobileRef.current)

      const camera = cameraRef.current



      camTargetPos.current.set(cam.pos.x, cam.pos.y, cam.pos.z)

      camTargetLookAt.current.set(cam.target.x, cam.target.y, cam.target.z)

      fovTargetRef.current = cam.fov

      camera.position.set(cam.pos.x, cam.pos.y, cam.pos.z)

      camCurrentLookAt.current.set(cam.target.x, cam.target.y, cam.target.z)

      camera.lookAt(camCurrentLookAt.current)

      camera.fov = cam.fov

      camera.updateProjectionMatrix()

    }



    wasUndergroundRef.current = undergroundActive

  }, [undergroundActive, rootGrowthProgress, barrelPhase2Progress])



  useEffect(() => {

    if (!sceneRef.current || !cameraRef.current) return



    const applyState = (next) => {

      setObjectState((prev) => {

        if (

          prev.plantOpacity === next.plantOpacity &&

          prev.strataOpacity === next.strataOpacity &&

          prev.rootProgress === next.rootProgress &&

          prev.myceliumOpacity === next.myceliumOpacity &&

          prev.productVisible === next.productVisible &&

          prev.productOpacity === next.productOpacity &&

          prev.cameraY === next.cameraY &&

          Math.abs(prev.ambientIntensity - next.ambientIntensity) < 0.02 &&

          Math.abs(prev.sunIntensity - next.sunIntensity) < 0.02

        ) {

          return prev

        }

        return next

      })

    }



    if (undergroundActive) {

      const uT = resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)

      const cam = getUndergroundCamera(uT, isMobileRef.current)

      const onSurface = isPlantSurfaceView(barrelPhase2Progress)



      camLerpRef.current = 0.055

      camTargetPos.current.set(cam.pos.x, cam.pos.y, cam.pos.z)

      camTargetLookAt.current.set(cam.target.x, cam.target.y, cam.target.z)

      fovTargetRef.current = cam.fov



      applyMinimalSceneBackground(sceneRef.current, theme)



      if (onSurface) {

        applyState({

          plantOpacity: 1,

          strataOpacity: 0,

          rootProgress: 0,

          myceliumOpacity: 0,

          productVisible: false,

          productOpacity: 0,

          cameraY: 0.35,

          ambientIntensity: 1.2,

          sunIntensity: 0.85,

        })

      } else {

        const underground = deriveUndergroundObjectState(uT)

        applyState({

          plantOpacity: underground.plantOpacity,

          strataOpacity: underground.strataOpacity,

          rootProgress: getRootShaderProgress(uT),

          myceliumOpacity: underground.myceliumOpacity,

          productVisible: false,

          productOpacity: 0,

          cameraY: underground.cameraY,

          ambientIntensity: underground.ambientIntensity,

          sunIntensity: underground.sunIntensity,

        })

      }

      return

    }



    camLerpRef.current = 0.04



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

    fovTargetRef.current = lerp(cur.camera.fov, next.camera.fov, t)



    applyMinimalSceneBackground(sceneRef.current, theme)



    applyState(deriveObjectState(scrollProgress))

  }, [scrollProgress, rootGrowthProgress, undergroundActive, barrelPhase2Progress, theme])



  useEffect(() => {

    if (!rendererRef.current) return

    rendererRef.current.toneMappingExposure = getSceneTheme(theme).exposure

    applyMinimalSceneBackground(sceneRef.current, theme)

  }, [theme])



  return (

    <>

      <canvas id="root-canvas" ref={canvasRef} style={style} />



      {glScene && (

        <>

          <LightingRig

            scene={glScene}

            scrollProgress={scrollProgress}

            ambientIntensity={objectState.ambientIntensity}

            sunIntensity={objectState.sunIntensity}

            theme={theme}

          />



          <PlantAboveGround
            scene={glScene}
            opacity={objectState.plantOpacity}
            theme={theme}
          />



          <SoilParticles

            scene={glScene}

            scrollProgress={scrollProgress}

            theme={theme}

            productIndex={productIndex}

            activeBias={activeBias}

            active={renderActive}

          />



          <RootSystem scene={glScene} growthProgress={rootShaderProgress} theme={theme} />



          <MyceliumParticles

            scene={glScene}

            opacity={

              objectState.myceliumOpacity *

              Math.max(

                0.2,

                isPlantSurfaceView(barrelPhase2Progress)

                  ? 0

                  : resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress),

              )

            }

            rootProgress={resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)}

            theme={theme}

            productIndex={productIndex}

            activeBias={activeBias}

          />

        </>

      )}

    </>

  )

}



function getMinimalSceneBackground(theme) {

  return theme === 'light' ? '#ffffff' : '#000000'

}



function applyMinimalSceneBackground(scene, theme) {

  if (!scene) return

  if (!scene.background) {

    scene.background = new THREE.Color(getMinimalSceneBackground(theme))

  } else {

    scene.background.set(getMinimalSceneBackground(theme))

  }

  scene.fog = null

}


