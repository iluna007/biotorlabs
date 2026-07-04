import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getSceneTheme } from '../../../config/sceneTheme'

function tweenLightColor(light, hex, duration = 0.6) {
  if (!light) return
  const target = new THREE.Color(hex)
  gsap.to(light.color, {
    r: target.r,
    g: target.g,
    b: target.b,
    duration,
  })
}

export function LightingRig({ scene, scrollProgress, ambientIntensity, sunIntensity, theme = 'dark' }) {
  const ambientRef = useRef(null)
  const sunRef = useRef(null)
  const rootGlowRef = useRef(null)
  const rimRef = useRef(null)
  const themeCfgRef = useRef(getSceneTheme(theme).lighting)

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('BiotorLightingRig')) return

    const cfg = getSceneTheme(theme).lighting
    themeCfgRef.current = cfg

    const rig = new THREE.Group()
    rig.name = 'BiotorLightingRig'

    const ambient = new THREE.AmbientLight(cfg.ambient, 0.8 * cfg.ambientMult)
    rig.add(ambient)
    ambientRef.current = ambient

    const sun = new THREE.DirectionalLight(cfg.sun, 2.2 * cfg.sunMult)
    sun.position.set(5, 10, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    rig.add(sun)
    sunRef.current = sun

    const rootGlow = new THREE.PointLight(cfg.rootGlow, 0, 8)
    rootGlow.position.set(0, -6, 0)
    rig.add(rootGlow)
    rootGlowRef.current = rootGlow

    const rim = new THREE.DirectionalLight(cfg.rim, 0.5 * cfg.rimMult)
    rim.position.set(-3, -5, -3)
    rig.add(rim)
    rimRef.current = rim

    scene.add(rig)

    return () => {
      scene.remove(rig)
      ambientRef.current = null
      sunRef.current = null
      rootGlowRef.current = null
      rimRef.current = null
    }
  }, [scene])

  useEffect(() => {
    const cfg = getSceneTheme(theme).lighting
    themeCfgRef.current = cfg

    tweenLightColor(ambientRef.current, cfg.ambient)
    tweenLightColor(sunRef.current, cfg.sun)
    tweenLightColor(rimRef.current, cfg.rim)
    tweenLightColor(rootGlowRef.current, cfg.rootGlow)

    if (ambientRef.current && ambientIntensity !== undefined) {
      gsap.to(ambientRef.current, { intensity: ambientIntensity * cfg.ambientMult, duration: 0.5 })
    }
    if (sunRef.current && sunIntensity !== undefined) {
      gsap.to(sunRef.current, { intensity: sunIntensity * cfg.sunMult, duration: 0.5 })
    }
    if (rimRef.current) {
      gsap.to(rimRef.current, { intensity: 0.5 * cfg.rimMult, duration: 0.5 })
    }
  }, [theme, ambientIntensity, sunIntensity])

  useEffect(() => {
    if (!rootGlowRef.current) return

    const cfg = themeCfgRef.current
    const p = scrollProgress
    const glowZone = p > 0.3 && p < 0.68
    gsap.to(rootGlowRef.current, {
      intensity: glowZone ? (3 + Math.sin(Date.now() * 0.002) * 0.5) * cfg.rootGlowMult : 0,
      duration: 0.5,
    })
    rootGlowRef.current.position.y = -6 - p * 10
  }, [scrollProgress])

  return null
}
