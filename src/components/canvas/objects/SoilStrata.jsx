import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getSceneTheme } from '../../../config/sceneTheme'

export function SoilStrata({ scene, opacity = 1, theme = 'dark' }) {
  const groupRef = useRef(null)

  const applyStrataTheme = (group, themeKey) => {
    const layers = getSceneTheme(themeKey).strata
    group.children.forEach((child) => {
      if (!child.isMesh || !child.material) return
      const layer = layers.find((l) => child.name === l.name || child.name === `${l.name}_line`)
      if (!layer) return
      if (child.name.includes('_line')) {
        child.material.color.set(layer.line)
      } else {
        child.material.color.set(layer.color)
      }
    })
  }

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('SoilStrata')) {
      groupRef.current = scene.getObjectByName('SoilStrata')
      applyStrataTheme(groupRef.current, theme)
      return
    }

    const group = new THREE.Group()
    group.name = 'SoilStrata'

    getSceneTheme(theme).strata.forEach((layer) => {
      const geo = new THREE.PlaneGeometry(60, layer.thickness, 1, 1)
      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        roughness: 0.97,
        metalness: 0.0,
        transparent: true,
        opacity: 0.0,
      })

      const mesh = new THREE.Mesh(geo, mat)
      mesh.name = layer.name
      mesh.rotation.x = -Math.PI / 2
      mesh.position.set(0, layer.y - layer.thickness / 2, 0)
      mesh.receiveShadow = true
      group.add(mesh)

      const lineGeo = new THREE.PlaneGeometry(60, 0.015)
      const lineMat = new THREE.MeshBasicMaterial({
        color: layer.line,
        transparent: true,
        opacity: 0.0,
      })
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.name = `${layer.name}_line`
      line.rotation.x = -Math.PI / 2
      line.position.set(0, layer.y + 0.01, 0)
      group.add(line)
    })

    scene.add(group)
    groupRef.current = group

    return () => {
      scene.remove(group)
      group.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose()
          child.material.dispose()
        }
      })
    }
  }, [scene])

  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        gsap.to(child.material, {
          opacity: opacity * (child.name.includes('_line') ? 0.4 : 0.85),
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    })
  }, [opacity])

  useEffect(() => {
    if (!groupRef.current) return
    applyStrataTheme(groupRef.current, theme)
  }, [theme])

  return null
}
