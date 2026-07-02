import { useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { getCurrentScene, lerp } from '../../utils/sceneUtils'

/**
 * SceneController — interpola cámara, ambiente y estado de objetos según scroll.
 * La lógica principal vive en RootScene; este módulo expone helpers reutilizables
 * para extender el sistema sin tocar geometrías.
 */
export function useSceneController({ scrollProgress, scene, camera, onStateChange }) {
  useEffect(() => {
    if (!camera || !scene) return

    const { cur, next, t } = getCurrentScene(scrollProgress)

    const targetPos = new THREE.Vector3(
      lerp(cur.camera.pos.x, next.camera.pos.x, t),
      lerp(cur.camera.pos.y, next.camera.pos.y, t),
      lerp(cur.camera.pos.z, next.camera.pos.z, t),
    )

    const targetLookAt = new THREE.Vector3(
      lerp(cur.camera.target.x, next.camera.target.x, t),
      lerp(cur.camera.target.y, next.camera.target.y, t),
      lerp(cur.camera.target.z, next.camera.target.z, t),
    )

    const targetFov = lerp(cur.camera.fov, next.camera.fov, t)
    gsap.to(camera, {
      fov: targetFov,
      duration: 0.5,
      onUpdate: () => camera.updateProjectionMatrix(),
    })

    if (scene.fog) {
      gsap.to(scene.fog, {
        density: lerp(cur.env.fogDensity, next.env.fogDensity, t),
        duration: 0.6,
      })
    }

    const bgA = new THREE.Color(cur.env.bgColor)
    const bgB = new THREE.Color(next.env.bgColor)
    if (scene.background) scene.background.copy(bgA.lerp(bgB, t))

    const state = {
      plantOpacity: lerp(cur.objects.plant.opacity, next.objects.plant.opacity, t),
      strataOpacity: lerp(cur.objects.strata.opacity, next.objects.strata.opacity, t),
      rootProgress: lerp(
        cur.objects.roots.growthProgress,
        next.objects.roots.growthProgress,
        t,
      ),
      myceliumOpacity: lerp(
        cur.objects.mycelium.opacity,
        next.objects.mycelium.opacity,
        t,
      ),
      productVisible: cur.objects.product.visible || next.objects.product.visible,
      productOpacity: lerp(cur.objects.product.opacity, next.objects.product.opacity, t),
      cameraY: targetPos.y,
      targetPos,
      targetLookAt,
    }

    onStateChange?.(state)
  }, [scrollProgress, scene, camera, onStateChange])
}
