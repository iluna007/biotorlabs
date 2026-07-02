import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const STRATA_CONFIG = [
  { y: -1.5, thickness: 1.8, color: '#1e1308', name: 'Topsoil', roughness: 0.95 },
  { y: -3.8, thickness: 2.2, color: '#17100a', name: 'Subsoil_A', roughness: 0.98 },
  { y: -6.5, thickness: 3.0, color: '#120d08', name: 'Subsoil_B', roughness: 0.99 },
  { y: -10.5, thickness: 4.0, color: '#0e0a06', name: 'Parent_Rock', roughness: 0.99 },
  { y: -16.0, thickness: 6.0, color: '#0a0704', name: 'Bedrock', roughness: 0.99 },
]

export function SoilStrata({ scene, opacity = 1 }) {
  const groupRef = useRef(null)

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('SoilStrata')) {
      groupRef.current = scene.getObjectByName('SoilStrata')
      return
    }

    const group = new THREE.Group()
    group.name = 'SoilStrata'

    STRATA_CONFIG.forEach((layer) => {
      const geo = new THREE.PlaneGeometry(60, layer.thickness, 1, 1)
      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        roughness: layer.roughness,
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
        color: '#3a2a18',
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

  return null
}
