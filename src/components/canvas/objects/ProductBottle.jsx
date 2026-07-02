// src/components/canvas/objects/ProductBottle.jsx
// MAQUETA: bolsa tipo sachet/sobre WP (Wettable Powder) de TrichoMax+
//
// PARA REEMPLAZAR con modelo de Rhino:
//   - Modela una bolsa sellada tipo stand-up pouch o sobre plano
//   - Pivot en la base de la bolsa
//   - Alto aprox: 0.8 unidades, Ancho: 0.55 unidades
//   - Exportar: /public/models/trichomax_bag.glb

import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const BAG_POSITION = new THREE.Vector3(0, -15.5, 0)

export function ProductBottle({ scene, visible = false }) {
  const groupRef = useRef(null)
  const rafIdRef = useRef(null)

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('ProductBag')) {
      groupRef.current = scene.getObjectByName('ProductBag')
      return
    }

    const group = new THREE.Group()
    group.name = 'ProductBag'
    group.position.copy(BAG_POSITION)
    group.scale.set(0, 0, 0)

    // ── MAQUETA: BOLSA STAND-UP POUCH ────────────────────────────────────

    const bagMat = new THREE.MeshStandardMaterial({
      color: '#dde8d0',
      metalness: 0.15,
      roughness: 0.35,
      transparent: false,
    })

    const labelMat = new THREE.MeshStandardMaterial({
      color: '#1a3d0a',
      metalness: 0.0,
      roughness: 0.6,
    })

    const sealMat = new THREE.MeshStandardMaterial({
      color: '#8fbe4a',
      metalness: 0.2,
      roughness: 0.4,
    })

    const bodyGeo = new THREE.BoxGeometry(0.50, 0.72, 0.18, 4, 8, 2)
    const bodyPos = bodyGeo.attributes.position
    for (let i = 0; i < bodyPos.count; i++) {
      const x = bodyPos.getX(i)
      const y = bodyPos.getY(i)
      const inflate = Math.cos((y / 0.72) * Math.PI * 0.8) * 0.04
      bodyPos.setZ(i, bodyPos.getZ(i) + Math.sign(bodyPos.getZ(i) || 1) * inflate)
      bodyPos.setX(i, x * (1 - Math.abs(y / 0.36) * 0.08))
    }
    bodyGeo.computeVertexNormals()

    const body = new THREE.Mesh(bodyGeo, bagMat)
    body.name = 'Bag_Body'
    body.position.y = 0.0
    body.castShadow = true
    group.add(body)

    const frontPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.40, 0.52),
      labelMat
    )
    frontPanel.name = 'Bag_Label_Front'
    frontPanel.position.set(0, 0.02, 0.092)
    group.add(frontPanel)

    const topSeal = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.08, 0.19),
      sealMat
    )
    topSeal.name = 'Bag_TopSeal'
    topSeal.position.y = 0.40
    group.add(topSeal)

    const leftGusset = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.70, 0.16),
      bagMat
    )
    leftGusset.name = 'Bag_GussetL'
    leftGusset.position.set(-0.259, 0.0, 0)
    group.add(leftGusset)

    const rightGusset = leftGusset.clone()
    rightGusset.name = 'Bag_GussetR'
    rightGusset.position.set(0.259, 0.0, 0)
    group.add(rightGusset)

    const bottomBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.06, 0.16),
      new THREE.MeshStandardMaterial({ color: '#c8d8b5', roughness: 0.5 })
    )
    bottomBase.name = 'Bag_Base'
    bottomBase.position.y = -0.39
    group.add(bottomBase)

    // ── FIN MAQUETA ────────────────────────────────────────────────────────

    // ── GLTFLoader para modelo final de Rhino ─────────────────────────────
    /*
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    const loader = new GLTFLoader()
    loader.load('/models/trichomax_bag.glb', (gltf) => {
      const model = gltf.scene
      model.name = 'ProductBag_GLB'
      // model.scale.set(0.001, 0.001, 0.001)  // si modelaste en mm
      group.add(model)
    })
    */
    // ──────────────────────────────────────────────────────────────────────

    scene.add(group)
    groupRef.current = group

    const rotate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.004
        groupRef.current.rotation.z = Math.sin(Date.now() * 0.0008) * 0.03
      }
      rafIdRef.current = requestAnimationFrame(rotate)
    }
    rotate()

    return () => {
      cancelAnimationFrame(rafIdRef.current)
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
    gsap.to(groupRef.current.scale, {
      x: visible ? 1.2 : 0.0,
      y: visible ? 1.2 : 0.0,
      z: visible ? 1.2 : 0.0,
      duration: 1.2,
      ease: 'back.out(1.5)',
    })
  }, [visible])

  return null
}
