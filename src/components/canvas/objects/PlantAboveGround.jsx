// Planta única en el ancla — GLB solo cuando la escena WebGL está activa.

import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { PLANT_ANCHOR } from '../../../config/plantAnchor'
import { getSceneTheme } from '../../../config/sceneTheme'

const GLB_PATH = '/models/plant_trichomax.glb'
const MAQUETA_PREFIX = 'Maqueta_'

function fitModelToAnchor(model) {
  const box = new THREE.Box3().setFromObject(model)
  let size = box.getSize(new THREE.Vector3())

  if (size.y > 20) {
    model.scale.setScalar(0.001)
    box.setFromObject(model)
    size = box.getSize(new THREE.Vector3())
  }

  const targetHeight = PLANT_ANCHOR.boundingBox.height
  const uniformScale = targetHeight / Math.max(size.y, 0.001)
  model.scale.multiplyScalar(uniformScale)

  box.setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  model.position.x -= center.x
  model.position.z -= center.z
  model.position.y -= box.min.y
}

function prepareModelMaterials(model) {
  model.traverse((child) => {
    if (!child.isMesh) return
    child.castShadow = true
    child.receiveShadow = true
    child.frustumCulled = true

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((mat, index) => {
      if (!mat) {
        const fallback = new THREE.MeshStandardMaterial({
          color: '#4a7c2f',
          roughness: 0.75,
          metalness: 0.05,
          side: THREE.DoubleSide,
        })
        if (Array.isArray(child.material)) child.material[index] = fallback
        else child.material = fallback
        return
      }

      mat.side = THREE.DoubleSide
      if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace
      if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace
      mat.needsUpdate = true
    })
  })
}

function buildMaqueta() {
  const group = new THREE.Group()
  group.name = `${MAQUETA_PREFIX}Plant`

  const stemMat = new THREE.MeshStandardMaterial({ color: '#3a6b1a', roughness: 0.8 })
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.10, 2.4, 6), stemMat)
  stem.name = `${MAQUETA_PREFIX}Stem_Main`
  stem.position.y = 1.2
  group.add(stem)

  for (let i = 0; i < 4; i++) {
    const node = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.06, 8),
      new THREE.MeshStandardMaterial({ color: '#5a3d15', roughness: 0.9 }),
    )
    node.name = `${MAQUETA_PREFIX}Stem_Node_${i}`
    node.position.y = 0.4 + i * 0.55
    group.add(node)
  }

  const leafPositions = [
    { y: 1.0, rx: 0.1, ry: 0.0, rz: -0.5, w: 0.12, h: 1.1 },
    { y: 1.3, rx: 0.2, ry: 1.0, rz: 0.5, w: 0.11, h: 1.0 },
    { y: 1.6, rx: -0.1, ry: 2.1, rz: -0.4, w: 0.13, h: 0.9 },
    { y: 1.9, rx: 0.15, ry: 3.2, rz: 0.6, w: 0.10, h: 0.85 },
    { y: 2.1, rx: -0.2, ry: 4.5, rz: -0.3, w: 0.09, h: 0.7 },
  ]

  const leafMat = new THREE.MeshStandardMaterial({
    color: '#4d8a22',
    roughness: 0.85,
    side: THREE.DoubleSide,
  })

  leafPositions.forEach((lp, i) => {
    const leaf = new THREE.Mesh(new THREE.PlaneGeometry(lp.w, lp.h, 1, 4), leafMat)
    leaf.name = `${MAQUETA_PREFIX}Leaf_${i}`
    leaf.position.set(0, lp.y, 0)
    leaf.rotation.set(lp.rx, lp.ry, lp.rz)
    group.add(leaf)
  })

  return group
}

function removeMaqueta(group) {
  const toRemove = []
  group.traverse((child) => {
    if (child.name?.startsWith(MAQUETA_PREFIX)) toRemove.push(child)
  })
  toRemove.forEach((child) => {
    group.remove(child)
    if (child.isMesh) {
      child.geometry?.dispose()
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose())
      else child.material?.dispose()
    }
  })
}

function applyOpacity(group, opacity) {
  if (!group) return
  group.traverse((child) => {
    if (!child.isMesh || !child.material) return
    child.visible = opacity > 0.01
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((mat) => {
      if (!mat) return
      mat.transparent = opacity < 0.999
      mat.opacity = opacity < 0.999 ? opacity : 1
      mat.needsUpdate = true
    })
  })
}

function applyPlantColors(group, themeKey) {
  const colors = getSceneTheme(themeKey).plant
  group.traverse((child) => {
    if (!child.isMesh || !child.material) return
    const name = child.name.replace(MAQUETA_PREFIX, '')
    if (name === 'Stem_Main') child.material.color.set(colors.stem)
    else if (name.startsWith('Stem_Node')) child.material.color.set(colors.node)
    else if (name.startsWith('Leaf_')) child.material.color.set(colors.leaf)
  })
}

function disposeGroup(group) {
  group.traverse((child) => {
    if (!child.isMesh) return
    child.geometry?.dispose()
    if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose())
    else child.material?.dispose()
  })
}

export function PlantAboveGround({ scene, opacity = 1, theme = 'dark' }) {
  const groupRef = useRef(null)
  const opacityRef = useRef(opacity)
  const loadStartedRef = useRef(false)

  opacityRef.current = opacity

  useLayoutEffect(() => {
    if (!scene) return undefined

    let group = scene.getObjectByName('PlantAboveGround')
    if (!group) {
      group = new THREE.Group()
      group.name = 'PlantAboveGround'
      group.position.set(
        PLANT_ANCHOR.position.x,
        PLANT_ANCHOR.position.y,
        PLANT_ANCHOR.position.z,
      )
      group.add(buildMaqueta())
      scene.add(group)
    }

    groupRef.current = group
    applyOpacity(group, opacityRef.current)
    applyPlantColors(group, theme)

    if (loadStartedRef.current) return undefined

    loadStartedRef.current = true
    let cancelled = false
    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)

    loader.load(
      GLB_PATH,
      (gltf) => {
        if (cancelled || !groupRef.current) return

        const model = gltf.scene
        model.name = 'MiscanthusModel'
        fitModelToAnchor(model)
        prepareModelMaterials(model)

        removeMaqueta(groupRef.current)
        groupRef.current.add(model)
        applyOpacity(groupRef.current, opacityRef.current)
        applyPlantColors(groupRef.current, theme)
      },
      undefined,
      (error) => {
        if (cancelled) return
        console.warn('No se pudo cargar plant_trichomax.glb, se mantiene la maqueta:', error)
      },
    )

    return () => {
      cancelled = true
    }
  }, [scene, theme])

  useLayoutEffect(() => {
    applyOpacity(groupRef.current, opacity)
  }, [opacity])

  useLayoutEffect(() => {
    if (!groupRef.current) return
    applyPlantColors(groupRef.current, theme)
  }, [theme])

  useLayoutEffect(() => {
    return () => {
      if (!scene) return
      const group = scene.getObjectByName('PlantAboveGround')
      if (group) {
        scene.remove(group)
        disposeGroup(group)
        groupRef.current = null
        loadStartedRef.current = false
      }
    }
  }, [scene])

  return null
}
