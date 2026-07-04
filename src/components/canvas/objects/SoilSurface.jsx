import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getSceneTheme } from '../../../config/sceneTheme'

export function SoilSurface({ scene, cameraY = 2, theme = 'dark' }) {
  const meshRef = useRef(null)
  const rimRef = useRef(null)

  const applySoilTheme = (mesh, rim, themeKey) => {
    const cfg = getSceneTheme(themeKey).soilSurface
    if (mesh?.material?.uniforms) {
      mesh.material.uniforms.uSoilDark.value.set(cfg.dark[0], cfg.dark[1], cfg.dark[2])
      mesh.material.uniforms.uSoilLight.value.set(cfg.light[0], cfg.light[1], cfg.light[2])
    }
    if (rim?.material) {
      rim.material.color.set(cfg.rim)
    }
  }

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('SoilSurface')) {
      meshRef.current = scene.getObjectByName('SoilSurface')
      rimRef.current = scene.getObjectByName('SoilSurface_Rim')
      applySoilTheme(meshRef.current, rimRef.current, theme)
      return
    }

    const geo = new THREE.PlaneGeometry(40, 40, 24, 24)
    const initial = getSceneTheme(theme).soilSurface

    const vertShader = `
      precision mediump float;
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float elev =
          sin(pos.x * 1.2 + uTime * 0.3) * 0.04 +
          sin(pos.z * 0.9 + uTime * 0.2) * 0.05 +
          sin(pos.x * 2.5 + pos.z * 1.8) * 0.02;
        pos.y += elev;
        vElevation = elev;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragShader = `
      precision mediump float;
      uniform float uCameraY;
      uniform vec3 uSoilDark;
      uniform vec3 uSoilLight;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        float noise = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5);
        vec3 color = mix(uSoilDark, uSoilLight, noise * 0.5 + vElevation * 2.0);

        float distCenter = length(vUv - vec2(0.5, 0.5)) * 2.0;
        color *= 0.7 + distCenter * 0.3;

        float crossingAlpha = smoothstep(-0.5, 0.5, uCameraY);
        crossingAlpha = max(crossingAlpha, 0.1);

        gl_FragColor = vec4(color, crossingAlpha);
      }
    `

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: { value: 0 },
        uCameraY: { value: 2 },
        uSoilDark: { value: new THREE.Vector3(...initial.dark) },
        uSoilLight: { value: new THREE.Vector3(...initial.light) },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.name = 'SoilSurface'
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = 0.0
    mesh.receiveShadow = true
    scene.add(mesh)
    meshRef.current = mesh

    const rimGeo = new THREE.RingGeometry(4, 22, 32)
    const rimMat = new THREE.MeshBasicMaterial({
      color: initial.rim,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const rim = new THREE.Mesh(rimGeo, rimMat)
    rim.name = 'SoilSurface_Rim'
    rim.rotation.x = -Math.PI / 2
    rim.position.y = -0.01
    scene.add(rim)
    rimRef.current = rim

    let rafId
    const clock = new THREE.Clock()
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (mesh.material.uniforms) {
        mesh.material.uniforms.uTime.value = clock.getElapsedTime()
      }
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      scene.remove(mesh)
      scene.remove(rim)
      geo.dispose()
      mat.dispose()
      rimGeo.dispose()
      rimMat.dispose()
    }
  }, [scene])

  useLayoutEffect(() => {
    if (meshRef.current?.material?.uniforms) {
      gsap.to(meshRef.current.material.uniforms.uCameraY, {
        value: cameraY,
        duration: 0.4,
      })
    }
  }, [cameraY])

  useEffect(() => {
    applySoilTheme(meshRef.current, rimRef.current, theme)
  }, [theme])

  return null
}
