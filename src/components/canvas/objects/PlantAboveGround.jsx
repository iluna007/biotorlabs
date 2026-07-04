// src/components/canvas/objects/PlantAboveGround.jsx
// VERSIÓN ACTUALIZADA — usa PLANT_ANCHOR como fuente de verdad
// Incluye helper visual de bounding box (solo en desarrollo)

import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { PLANT_ANCHOR } from '../../../config/plantAnchor'
import { getSceneTheme } from '../../../config/sceneTheme'

// ── PARA REEMPLAZAR CON TU MODELO DE RHINO ────────────────────────────────
// 1. Exporta desde Rhino como plant_trichomax.glb (ver plant_anchor.json)
// 2. Coloca en /public/models/plant_trichomax.glb
// 3. Descomenta el bloque GLTFLoader y comenta el bloque MAQUETA
// import { GLTFLoader }  from 'three/examples/jsm/loaders/GLTFLoader.js'
// ──────────────────────────────────────────────────────────────────────────

const DEV_MODE = import.meta.env.DEV  // true en desarrollo, false en build

export function PlantAboveGround({ scene, opacity = 1, theme = 'dark' }) {
  const groupRef = useRef(null)

  const applyPlantColors = (group, themeKey) => {
    const colors = getSceneTheme(themeKey).plant
    group.traverse((child) => {
      if (!child.isMesh || !child.material || child.name === 'PlantBoundingBoxHelper') return
      if (child.name === 'Stem_Main') child.material.color.set(colors.stem)
      else if (child.name.startsWith('Stem_Node')) child.material.color.set(colors.node)
      else if (child.name.startsWith('Leaf_')) child.material.color.set(colors.leaf)
      else if (child.name === 'DirtDisc') child.material.color.set(colors.dirt)
    })
  }

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('PlantAboveGround')) {
      groupRef.current = scene.getObjectByName('PlantAboveGround')
      return
    }

    const group = new THREE.Group()
    group.name = 'PlantAboveGround'

    // Aplicar transform desde el anchor
    group.position.set(
      PLANT_ANCHOR.position.x,
      PLANT_ANCHOR.position.y,
      PLANT_ANCHOR.position.z,
    )

    // ── BOUNDING BOX HELPER (solo en DEV — te muestra el espacio reservado) ──
    if (DEV_MODE) {
      const { width, height, depth } = PLANT_ANCHOR.boundingBox
      const boxHelper = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshBasicMaterial({
          color: '#00ff88',
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        })
      )
      boxHelper.name = 'PlantBoundingBoxHelper'
      boxHelper.position.y = height / 2  // centrar verticalmente sobre el suelo
      group.add(boxHelper)

      // Punto del pivot (esfera en el origen)
      const pivotHelper = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshBasicMaterial({ color: '#ff4444' })
      )
      pivotHelper.name = 'PlantPivotHelper'
      group.add(pivotHelper)
    }

    // ── MAQUETA LOW-POLY (caña de azúcar estilizada) ─────────────────────
    // Sustituir todo este bloque con GLTFLoader cuando tengas el modelo
    // La maqueta intenta aproximar visualmente una caña de azúcar joven

    const stemMat = new THREE.MeshStandardMaterial({
      color: '#3a6b1a',
      roughness: 0.8,
      transparent: true,
      opacity: 1.0,
    })

    // Tallo principal (caña) — cilindro hexagonal
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.10, 2.4, 6),
      stemMat
    )
    stem.name = 'Stem_Main'
    stem.position.y = 1.2
    group.add(stem)

    // Nodos de la caña (anillos característicos de la caña de azúcar)
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.075, 0.06, 8),
        new THREE.MeshStandardMaterial({ color: '#5a3d15', roughness: 0.9, transparent: true, opacity: 1 })
      )
      node.name = `Stem_Node_${i}`
      node.position.y = 0.4 + i * 0.55
      group.add(node)
    }

    // Hojas largas y estrechas (características de caña/pasto)
    const leafPositions = [
      { y: 1.0, rx: 0.1, ry: 0.0,  rz: -0.5, w: 0.12, h: 1.1 },
      { y: 1.3, rx: 0.2, ry: 1.0,  rz:  0.5, w: 0.11, h: 1.0 },
      { y: 1.6, rx: -0.1, ry: 2.1, rz: -0.4, w: 0.13, h: 0.9 },
      { y: 1.9, rx: 0.15, ry: 3.2, rz:  0.6, w: 0.10, h: 0.85 },
      { y: 2.1, rx: -0.2, ry: 4.5, rz: -0.3, w: 0.09, h: 0.7 },
    ]

    const leafMat = new THREE.MeshStandardMaterial({
      color: '#4d8a22',
      roughness: 0.85,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    })

    leafPositions.forEach((lp, i) => {
      const leaf = new THREE.Mesh(
        new THREE.PlaneGeometry(lp.w, lp.h, 1, 4),
        leafMat
      )
      leaf.name = `Leaf_${i}`
      leaf.position.set(0, lp.y, 0)
      leaf.rotation.set(lp.rx, lp.ry, lp.rz)
      group.add(leaf)
    })

    // Disco de tierra (base)
    const dirtDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.7, 8),
      new THREE.MeshStandardMaterial({ color: '#1f1208', roughness: 0.99 })
    )
    dirtDisc.name = 'DirtDisc'
    dirtDisc.rotation.x = -Math.PI / 2
    dirtDisc.position.y = 0.01
    group.add(dirtDisc)
    // ── FIN MAQUETA ────────────────────────────────────────────────────────

    // ── GLTFLoader (descomentar cuando tengas el .glb de Rhino) ───────────
    /*
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    const loader = new GLTFLoader()
    loader.load('/models/plant_trichomax.glb', (gltf) => {
      const model = gltf.scene
      model.name = 'Plant_GLB'
      // Si modelaste en mm en Rhino:
      // model.scale.set(0.001, 0.001, 0.001)
      // Si modelaste en metros: no necesitas escalar
      group.add(model)
      // Remover la maqueta si ya estaba:
      const maqueta = group.getObjectByName('Stem_Main')
      if (maqueta) group.remove(maqueta)
    }, undefined, (err) => console.error('Plant GLB load error:', err))
    */
    // ──────────────────────────────────────────────────────────────────────

    scene.add(group)
    groupRef.current = group
    applyPlantColors(group, theme)

    return () => {
      scene.remove(group)
      group.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
    }
  }, [scene])

  // Control de opacidad
  useLayoutEffect(() => {
    if (!groupRef.current) return
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material && child.name !== 'PlantBoundingBoxHelper') {
        child.material.opacity = opacity
        child.visible = opacity > 0.01
      }
    })
  }, [opacity])

  useLayoutEffect(() => {
    if (!groupRef.current) return
    applyPlantColors(groupRef.current, theme)
  }, [theme])

  return null
}
