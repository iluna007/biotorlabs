import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutMediaVertex, aboutMediaFragment } from '../../utils/aboutShaders'
import { useMediaQuery, BP } from '../../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

class AboutMediaPlane {
  constructor({ element, scene, sizes }) {
    this.element = element
    this.scene = scene
    this.sizes = sizes
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    this.material = new THREE.ShaderMaterial({
      vertexShader: aboutMediaVertex,
      fragmentShader: aboutMediaFragment,
      transparent: true,
      uniforms: {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uContainerRes: { value: new THREE.Vector2(1, 1) },
        uProgress: { value: 0 },
        uGridSize: { value: 18 },
      },
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.loadTexture()
    this.syncBounds()
    this.observe()
  }

  loadTexture() {
    const loader = new THREE.TextureLoader()
    loader.load(this.element.src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      this.material.uniforms.uTexture.value = tex
      const { naturalWidth, naturalHeight } = this.element
      this.material.uniforms.uResolution.value.set(naturalWidth, naturalHeight)
    })
  }

  syncBounds() {
    const beat = this.element.closest('.about-chapter-beat, .about-pinned-visual')
    if (beat) {
      const opacity = parseFloat(getComputedStyle(beat).opacity)
      if (opacity < 0.05 || getComputedStyle(beat).visibility === 'hidden') {
        this.mesh.visible = false
        return
      }
    }

    const rect = this.element.getBoundingClientRect()
    if (rect.width < 2 || rect.height < 2) {
      this.mesh.visible = false
      return
    }
    this.mesh.visible = true
    const w = (rect.width * this.sizes.width) / window.innerWidth
    const h = (rect.height * this.sizes.height) / window.innerHeight
    this.mesh.scale.set(w, h, 1)
    this.material.uniforms.uContainerRes.value.set(rect.width, rect.height)

    let x = (rect.left * this.sizes.width) / window.innerWidth
    x -= this.sizes.width / 2
    x += w / 2
    let y = (-rect.top * this.sizes.height) / window.innerHeight
    y -= h / 2
    y += this.sizes.height / 2
    this.mesh.position.set(x, y, 0)
  }

  observe() {
    this.scrollTween = gsap.fromTo(
      this.material.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: this.element.closest('[data-about-reveal]') || this.element,
          start: 'top 92%',
          end: 'top 35%',
          scrub: 0.4,
        },
      },
    )
  }

  dispose() {
    this.scrollTween?.scrollTrigger?.kill()
    this.scrollTween?.kill()
    this.scene.remove(this.mesh)
    this.geometry.dispose()
    this.material.dispose()
    this.material.uniforms.uTexture.value?.dispose()
  }
}

function computeViewSize(camera) {
  const fov = camera.fov * (Math.PI / 180)
  const height = camera.position.z * Math.tan(fov / 2) * 2
  return { width: height * camera.aspect, height }
}

export function AboutWebGLGallery() {
  const canvasRef = useRef(null)
  const planesRef = useRef([])
  const isTablet = useMediaQuery(BP.tablet)
  const prefersReducedMotion = useMediaQuery(BP.reducedMotion)
  const enabled = !isTablet && !prefersReducedMotion

  useLayoutEffect(() => {
    if (!enabled) return undefined

    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 10
    scene.add(camera)

    let sizes = computeViewSize(camera)

    const mountPlanes = () => {
      planesRef.current.forEach((p) => p.dispose())
      planesRef.current = []
      document.querySelectorAll('[data-about-reveal] img').forEach((img) => {
        if (img.closest('.about-pinned-chapter')) return
        if (!img.complete) {
          img.addEventListener('load', () => planesRef.current.forEach((p) => p.syncBounds()), { once: true })
        }
        planesRef.current.push(new AboutMediaPlane({ element: img, scene, sizes }))
      })
    }

    mountPlanes()

    const render = () => {
      planesRef.current.forEach((p) => p.syncBounds())
      renderer.render(scene, camera)
    }

    gsap.ticker.add(render)

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      sizes = computeViewSize(camera)
      planesRef.current.forEach((p) => p.syncBounds())
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(render)
      window.removeEventListener('resize', onResize)
      planesRef.current.forEach((p) => p.dispose())
      planesRef.current = []
      renderer.dispose()
    }
  }, [enabled])

  if (!enabled) return null

  return <canvas ref={canvasRef} className="about-webgl-gallery" aria-hidden="true" />
}
