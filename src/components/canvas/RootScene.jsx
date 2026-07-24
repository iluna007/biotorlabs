import { useEffect, useRef, useState, useLayoutEffect } from 'react'

import * as THREE from 'three'

import { getCurrentScene, deriveObjectState, lerp } from '../../utils/sceneUtils'

import { getSceneTheme } from '../../config/sceneTheme'

import { runSceneTicks } from '../../utils/sceneTick'

import { PlantAboveGround } from './objects/PlantAboveGround'

import { SoilSurface } from './objects/SoilSurface'

import { SoilStrata } from './objects/SoilStrata'

import { RootSystem } from './objects/RootSystem'

import { SoilParticles } from './objects/SoilParticles'

import { MyceliumParticles } from './objects/MyceliumParticles'

import { ProductBottle } from './objects/ProductBottle'

import { LightingRig } from './objects/LightingRig'

import { useProductVisualState } from '../../hooks/useProductVisualState'

import {

  getUndergroundCamera,

  getRootShaderProgress,

  deriveUndergroundObjectState,

  getSurfacePlantCamera,

  deriveSurfacePlantState,

  getResultsSectionProgress,

  applyResultsCameraOrbit,

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

  const clockRef = useRef(new THREE.Clock())

  const renderActiveRef = useRef(renderActive)

  const fovTargetRef = useRef(52)

  const camTargetPos = useRef(new THREE.Vector3(0.8, 2.2, 7.0))

  const camTargetLookAt = useRef(new THREE.Vector3(0.0, 0.8, 0.0))

  const camCurrentLookAt = useRef(new THREE.Vector3(0.0, 0.8, 0.0))
  const undergroundPeakRef = useRef(0)

  const [glScene, setGlScene] = useState(null)

  const [objectState, setObjectState] = useState(() => deriveObjectState(0))

  const { productIndex, activeBias } = useProductVisualState(scrollProgress)



  renderActiveRef.current = renderActive

  const onSurface = isPlantSurfaceView(barrelPhase2Progress)
  let undergroundT = 0

  if (undergroundActive && !onSurface) {
    undergroundT = resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)
    undergroundPeakRef.current = Math.max(undergroundPeakRef.current, undergroundT)
    undergroundT = undergroundPeakRef.current
  } else {
    undergroundPeakRef.current = 0
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

    scene.background = new THREE.Color(themeCfg.sky)

    scene.fog = new THREE.FogExp2(themeCfg.sky, 0.018)

    scene.userData.tickHandlers = []

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

      if (!sc || !cam || !r || !renderActiveRef.current) return



      const elapsed = clockRef.current.getElapsedTime()

      runSceneTicks(sc, elapsed)



      cam.position.lerp(camTargetPos.current, 0.04)

      camCurrentLookAt.current.lerp(camTargetLookAt.current, 0.04)

      cam.lookAt(camCurrentLookAt.current)



      cam.fov += (fovTargetRef.current - cam.fov) * 0.06

      cam.updateProjectionMatrix()



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

      if (isPlantSurfaceView(barrelPhase2Progress)) {

        const cam = getSurfacePlantCamera()

        const surface = deriveSurfacePlantState()



        camTargetPos.current.set(cam.pos.x, cam.pos.y, cam.pos.z)

        camTargetLookAt.current.set(cam.target.x, cam.target.y, cam.target.z)

        fovTargetRef.current = cam.fov



        const fogColor = adjustEnvColor('#142610', theme, 0)

        if (sceneRef.current.fog) {

          sceneRef.current.fog.density = 0.006

          sceneRef.current.fog.color.set(fogColor)

        }

        sceneRef.current.background?.set(fogColor)



        applyState({

          plantOpacity: surface.plantOpacity,

          strataOpacity: surface.strataOpacity,

          rootProgress: surface.rootProgress,

          myceliumOpacity: surface.myceliumOpacity,

          productVisible: false,

          productOpacity: 0,

          cameraY: surface.cameraY,

          ambientIntensity: surface.ambientIntensity,

          sunIntensity: surface.sunIntensity,

        })

        return

      }



      const uT = resolveUndergroundProgress(rootGrowthProgress, barrelPhase2Progress)

      const resultsOrbitT = getResultsSectionProgress(scrollProgress)
      const cam = applyResultsCameraOrbit(getUndergroundCamera(uT), resultsOrbitT)

      const underground = deriveUndergroundObjectState(uT)



      camTargetPos.current.set(cam.pos.x, cam.pos.y, cam.pos.z)

      camTargetLookAt.current.set(cam.target.x, cam.target.y, cam.target.z)

      fovTargetRef.current = cam.fov



      const fogColor = adjustEnvColor('#060c03', theme, uT)

      if (sceneRef.current.fog) {

        sceneRef.current.fog.density = 0.012 + (1 - uT) * 0.02

        sceneRef.current.fog.color.set(fogColor)

      }

      sceneRef.current.background?.set(fogColor)



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

      return

    }



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



    const fogDensity = lerp(cur.env.fogDensity, next.env.fogDensity, t)

    const fogColor = adjustEnvColor(

      lerpColor(cur.env.fogColor, next.env.fogColor, t),

      theme,

      scrollProgress,

    )

    if (sceneRef.current.fog) {

      sceneRef.current.fog.density = fogDensity

      sceneRef.current.fog.color.set(fogColor)

    }



    const bgA = new THREE.Color(adjustEnvColor(cur.env.bgColor, theme, scrollProgress))

    const bgB = new THREE.Color(adjustEnvColor(next.env.bgColor, theme, scrollProgress))

    sceneRef.current.background?.copy(bgA.lerp(bgB, t))



    applyState(deriveObjectState(scrollProgress))

  }, [scrollProgress, rootGrowthProgress, undergroundActive, barrelPhase2Progress, theme])



  useEffect(() => {

    if (!rendererRef.current) return

    rendererRef.current.toneMappingExposure = getSceneTheme(theme).exposure

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



          <SoilSurface scene={glScene} cameraY={objectState.cameraY} theme={theme} />



          <SoilStrata scene={glScene} opacity={objectState.strataOpacity} theme={theme} />



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



          <ProductBottle

            scene={glScene}

            visible={!undergroundActive && objectState.productVisible}

            productIndex={productIndex}

            animate={renderActive}

          />

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



const LIGHT_SKY = new THREE.Color('#dce8df')



function getLightSkyBlend(scrollProgress) {

  if (scrollProgress <= 0.18) {

    return 0.28 + ((0.18 - scrollProgress) / 0.18) * 0.22

  }

  if (scrollProgress <= 0.45) {

    return 0.28 - ((scrollProgress - 0.18) / 0.27) * 0.2

  }

  return Math.max(0.06, 0.08 - (scrollProgress - 0.45) * 0.04)

}



function adjustEnvColor(hex, theme, scrollProgress = 0) {

  if (theme !== 'light') return hex

  const blend = getLightSkyBlend(scrollProgress)

  const color = new THREE.Color(hex)

  color.lerp(LIGHT_SKY, blend)

  return color.getHex()

}


