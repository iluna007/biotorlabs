// Paquete 3D con texturas reales de producto — rota imagen según scroll (desde “Datos reales”)

import { useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import {
  PRODUCT_PACK_URLS,
  fitTextureContain,
} from '../../../utils/productPack3d'

const BAG_POSITION = new THREE.Vector3(0, -15.5, 0)
const PLANE_W = 0.58
const PLANE_H = 0.92
const DEPTH = 0.07

function loadTexture(url) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(url, resolve, undefined, reject)
  })
}

function applyPackTexture(material, texture, planeW, planeH) {
  const tex = texture.clone()
  tex.needsUpdate = true
  fitTextureContain(tex, planeW, planeH)
  material.map = tex
  material.needsUpdate = true
  return tex
}

export function ProductBottle({ scene, visible = false, productIndex = 0 }) {
  const groupRef = useRef(null)
  const rafIdRef = useRef(null)
  const texturesRef = useRef([])
  const clonedTexturesRef = useRef([])
  const frontsRef = useRef([])
  const matsRef = useRef([])
  const activeSlotRef = useRef(0)
  const currentIndexRef = useRef(-1)
  const crossfadeRef = useRef(null)

  useLayoutEffect(() => {
    if (!scene) return
    if (scene.getObjectByName('ProductBag')) {
      groupRef.current = scene.getObjectByName('ProductBag')
      return undefined
    }

    const group = new THREE.Group()
    group.name = 'ProductBag'
    group.position.copy(BAG_POSITION)
    group.scale.set(0, 0, 0)

    const edgeMat = new THREE.MeshStandardMaterial({
      color: '#d4dcc8',
      metalness: 0.12,
      roughness: 0.55,
    })

    const backMat = new THREE.MeshStandardMaterial({
      color: '#c8d4bc',
      metalness: 0.08,
      roughness: 0.65,
    })

    const depthBox = new THREE.Mesh(
      new THREE.BoxGeometry(PLANE_W * 0.98, PLANE_H * 0.98, DEPTH),
      edgeMat,
    )
    depthBox.name = 'Bag_Depth'
    depthBox.castShadow = true
    depthBox.receiveShadow = true
    group.add(depthBox)

    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(PLANE_W, PLANE_H),
      backMat,
    )
    back.name = 'Bag_Back'
    back.position.z = -DEPTH / 2 - 0.001
    back.rotation.y = Math.PI
    group.add(back)

    const matA = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 1,
      roughness: 0.38,
      metalness: 0.06,
      depthWrite: true,
    })
    const matB = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0,
      roughness: 0.38,
      metalness: 0.06,
      depthWrite: false,
    })

    const frontA = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), matA)
    frontA.name = 'Bag_Front_A'
    frontA.position.z = DEPTH / 2 + 0.002
    frontA.castShadow = true

    const frontB = new THREE.Mesh(new THREE.PlaneGeometry(PLANE_W, PLANE_H), matB)
    frontB.name = 'Bag_Front_B'
    frontB.position.z = DEPTH / 2 + 0.003
    frontB.renderOrder = 1

    group.add(frontA, frontB)

    const topSeal = new THREE.Mesh(
      new THREE.BoxGeometry(PLANE_W, 0.07, DEPTH + 0.01),
      new THREE.MeshStandardMaterial({ color: '#eef2e8', roughness: 0.5, metalness: 0.1 }),
    )
    topSeal.name = 'Bag_TopSeal'
    topSeal.position.y = PLANE_H / 2 - 0.02
    topSeal.position.z = 0
    group.add(topSeal)

    const packLight = new THREE.PointLight('#fafaf7', 2.8, 14)
    packLight.name = 'Bag_Light'
    packLight.position.set(0.8, 0.6, 3.2)
    group.add(packLight)

    scene.add(group)
    groupRef.current = group
    frontsRef.current = [frontA, frontB]
    matsRef.current = [matA, matB]

    let cancelled = false
    Promise.all(PRODUCT_PACK_URLS.map(loadTexture))
      .then((textures) => {
        if (cancelled) {
          textures.forEach((t) => t.dispose())
          return
        }
        texturesRef.current = textures
        textures.forEach((tex) => fitTextureContain(tex, PLANE_W, PLANE_H))

        currentIndexRef.current = productIndex
        const applied = applyPackTexture(matA, textures[productIndex], PLANE_W, PLANE_H)
        clonedTexturesRef.current.push(applied)
      })
      .catch(() => {})

    const rotate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.004
        groupRef.current.rotation.z = Math.sin(Date.now() * 0.0008) * 0.03
      }
      rafIdRef.current = requestAnimationFrame(rotate)
    }
    rotate()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafIdRef.current)
      crossfadeRef.current?.kill()
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
      clonedTexturesRef.current.forEach((t) => t.dispose())
      clonedTexturesRef.current = []
      texturesRef.current.forEach((t) => t.dispose())
      texturesRef.current = []
      groupRef.current = null
    }
  }, [scene])

  useEffect(() => {
    if (!groupRef.current) return
    gsap.to(groupRef.current.scale, {
      x: visible ? 1.25 : 0.0,
      y: visible ? 1.25 : 0.0,
      z: visible ? 1.25 : 0.0,
      duration: 1.2,
      ease: 'back.out(1.5)',
    })
  }, [visible])

  useEffect(() => {
    const textures = texturesRef.current
    const mats = matsRef.current
    if (!textures.length || mats.length < 2) return

    const nextIndex = productIndex
    if (nextIndex === currentIndexRef.current) return

    const prevSlot = activeSlotRef.current
    const nextSlot = prevSlot === 0 ? 1 : 0
    const outMat = mats[prevSlot]
    const inMat = mats[nextSlot]

    crossfadeRef.current?.kill()

    const applied = applyPackTexture(inMat, textures[nextIndex], PLANE_W, PLANE_H)
    clonedTexturesRef.current.push(applied)

    inMat.opacity = 0
    inMat.depthWrite = false
    outMat.depthWrite = true

    crossfadeRef.current = gsap.timeline({
      onComplete: () => {
        outMat.map?.dispose()
        outMat.map = null
        outMat.opacity = 0
        outMat.depthWrite = false
        inMat.opacity = 1
        inMat.depthWrite = true
        activeSlotRef.current = nextSlot
        currentIndexRef.current = nextIndex
      },
    })
    crossfadeRef.current.to(inMat, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0)
    crossfadeRef.current.to(outMat, { opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
  }, [productIndex])

  return null
}
