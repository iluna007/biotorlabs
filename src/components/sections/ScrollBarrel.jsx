// Barrel scroll infinito — 3 caras: caña → brotes → WebGL (raíces)

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ASSETS } from '../../config/assets'
import {
  BARREL_PHASE_VH,
  BARREL_TOTAL_VH,
  BARREL_CONTENT_DELAY,
  computeBarrelRadius,
  getBarrelImageBlend,
  getDiagonalWipeClips,
  getWebglRevealProgress,
  getBarrelRotationFromProgress,
  getExplorationParallax,
} from '../../config/barrelScroll'
import { Hero } from './Hero'
import { StatsBar } from './StatsBar'
import { Science } from './Science'
import { HowItWorks } from './HowItWorks'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  {
    type: 'image',
    src: ASSETS.barrel.cana,
    label: 'Cultivo',
    imageClass: 'barrel-blend__img--field',
  },
  {
    type: 'image',
    src: ASSETS.barrel.brotes,
    label: 'Brotes',
    imageClass: 'barrel-blend__img--soil',
  },
  { type: 'webgl', label: 'Raíces' },
]

const PHASES = BARREL_PHASE_VH.map((heightVh, i) => ({
  heightVh,
  slide: i,
  rotation: i * (360 / SLIDES.length),
}))

const N = SLIDES.length
const FACE_DEG = 360 / N
const TOTAL_VH = BARREL_TOTAL_VH
const MAX_ROTATION = 360 - FACE_DEG
const CONTENT_DELAY = BARREL_CONTENT_DELAY

function imgPanTransform(panY = 0) {
  return `translate(-50%, calc(-50% + ${panY.toFixed(2)}%)) scale(1)`
}

function imgTransform(scale, panY = 0) {
  return `translate(-50%, calc(-50% + ${panY.toFixed(2)}%)) scale(${scale.toFixed(4)})`
}

function getVisualSlide(rotation, phaseIndex) {
  if (phaseIndex <= 0) return 0
  // Toda la fase 1 (transición + exploración Ciencia) = brotes, sin activar WebGL
  if (phaseIndex === 1) return 1
  if (rotation < FACE_DEG * 1.55) return 1
  return 2
}

function getPhaseState(progress) {
  const rotation = getBarrelRotationFromProgress(progress, N, CONTENT_DELAY)

  let accumulated = 0
  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i]
    const start = accumulated / TOTAL_VH
    accumulated += phase.heightVh
    const end = accumulated / TOTAL_VH

    if (progress <= end || i === PHASES.length - 1) {
      const local = Math.max(0, Math.min(1, (progress - start) / (end - start || 1)))
      const visualSlide = getVisualSlide(rotation, i)
      const contentVisible = i === 0 || local >= CONTENT_DELAY
      const contentSlide = contentVisible ? i : Math.max(0, i - 1)

      return {
        visualSlide,
        contentSlide,
        contentVisible,
        local,
        rotation,
        phaseIndex: i,
      }
    }
  }

  return {
    visualSlide: 2,
    contentSlide: 2,
    contentVisible: true,
    local: 1,
    rotation: MAX_ROTATION,
    phaseIndex: 2,
  }
}

function updateBlendVisuals(rotation, refs, parallax = { scale: 1.0, panY: 0 }) {
  const { root, imgA, imgB, wipeLayer } = refs
  if (!root || !imgA || !imgB || !wipeLayer) return

  const blend = getBarrelImageBlend(rotation, N)

  const showCana = () => {
    imgA.style.visibility = 'visible'
    imgA.style.opacity = '1'
    root.style.background = ''
  }

  const hideCana = () => {
    imgA.style.visibility = 'hidden'
    imgA.style.opacity = '0'
  }

  if (blend.mode === 'single' && blend.slide >= 2) {
    hideCana()
    root.style.background = 'transparent'
    root.style.visibility = 'hidden'
    imgA.style.clipPath = 'none'
    wipeLayer.style.display = 'none'
    return
  }

  root.style.visibility = 'visible'

  if (blend.mode === 'single' && blend.slide === 0) {
    showCana()
    imgA.style.clipPath = 'none'
    imgA.style.transform = imgPanTransform(parallax.panY)
    wipeLayer.style.display = 'none'
    return
  }

  if (blend.mode === 'single' && blend.slide === 1) {
    hideCana()
    root.style.background = ''
    imgA.style.clipPath = 'none'
    imgA.style.transform = imgPanTransform(0)
    imgB.style.transform = imgPanTransform(parallax.panY)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = getDiagonalWipeClips(1).incoming
    return
  }

  const clips = getDiagonalWipeClips(blend.t)
  const toWebgl = SLIDES[blend.to]?.type === 'webgl'

  if (toWebgl) {
    // Brotes se retiran con wipe; detrás debe verse WebGL, no la caña (imgA)
    hideCana()
    root.style.background = 'transparent'
    imgB.style.transform = imgTransform(1.0 + clips.raw * 0.08, 0)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = clips.outgoingWebgl
    return
  }

  // Transición caña → brotes (wipe diagonal, sin zoom — solo pan vertical)
  showCana()
  imgA.style.clipPath = 'none'
  imgA.style.transform = imgPanTransform(parallax.panY)
  imgB.style.transform = imgPanTransform(0)
  wipeLayer.style.display = 'block'
  wipeLayer.style.clipPath = clips.incoming
}

export function ScrollBarrel({ onSlideChange, onWebglReveal, onBarrelPhaseUpdate }) {
  const wrapperRef = useRef(null)
  const barrelRef = useRef(null)
  const blendRef = useRef(null)
  const imgARef = useRef(null)
  const imgBRef = useRef(null)
  const wipeRef = useRef(null)
  const phase1ScrollRef = useRef(null)
  const phase1InnerRef = useRef(null)
  const [contentSlide, setContentSlide] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)
  const [visualSlide, setVisualSlide] = useState(0)
  const [radius, setRadius] = useState(() => computeBarrelRadius(N))
  const radiusRef = useRef(radius)
  const lastUiRef = useRef({ visualSlide: 0, contentSlide: 0, contentVisible: true })

  const syncRadius = useCallback(() => {
    const r = computeBarrelRadius(N, window.innerHeight)
    radiusRef.current = r
    setRadius(r)
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--barrel-r', `${r}px`)
      wrapperRef.current.style.setProperty('--barrel-perspective', `${Math.round(r * 3.4)}px`)
    }
  }, [])

  const updateDots = useCallback((slide) => {
    document.querySelectorAll('.barrel-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === slide)
    })
  }, [])

  useEffect(() => {
    const barrel = barrelRef.current
    const wrapper = wrapperRef.current
    if (!barrel || !wrapper) return

    syncRadius()
    gsap.set(barrel, { rotateX: 0, z: -radiusRef.current })

    const blendRefs = {
      root: blendRef.current,
      imgA: imgARef.current,
      imgB: imgBRef.current,
      wipeLayer: wipeRef.current,
    }

    const syncUiState = (state) => {
      const prev = lastUiRef.current
      if (prev.visualSlide !== state.visualSlide) {
        setVisualSlide(state.visualSlide)
        onSlideChange?.(state.visualSlide)
        updateDots(state.visualSlide)
      }
      if (prev.contentSlide !== state.contentSlide) {
        setContentSlide(state.contentSlide)
      }
      if (prev.contentVisible !== state.contentVisible) {
        setContentVisible(state.contentVisible)
      }
      lastUiRef.current = {
        visualSlide: state.visualSlide,
        contentSlide: state.contentSlide,
        contentVisible: state.contentVisible,
      }
    }

    const applyBarrelState = (self) => {
      const progress = typeof self.progress === 'number' ? self.progress : 0
      const state = getPhaseState(progress)
      const r = radiusRef.current

      gsap.set(barrel, { rotateX: state.rotation, z: -r })
      wrapper.dataset.activeSlide = String(state.visualSlide)
      wrapper.dataset.contentSlide = String(state.contentSlide)

      const parallax = getExplorationParallax(
        state.phaseIndex,
        state.local,
        CONTENT_DELAY,
      )

      updateBlendVisuals(state.rotation, blendRefs, parallax)

      const blend = getBarrelImageBlend(state.rotation, N)
      const webglRevealActive =
        state.visualSlide >= 2 ||
        (blend.mode === 'blend' && SLIDES[blend.to]?.type === 'webgl')
      wrapper.dataset.webglReveal = webglRevealActive ? '1' : '0'

      onWebglReveal?.(getWebglRevealProgress(state.rotation, N))
      onBarrelPhaseUpdate?.({
        phaseIndex: state.phaseIndex,
        local: state.local,
        contentVisible: state.contentVisible,
        contentSlide: state.contentSlide,
        inBarrel: self.isActive,
      })
      syncUiState(state)

      if (phase1InnerRef.current && phase1ScrollRef.current && state.contentVisible) {
        const inner = phase1InnerRef.current
        const viewport = phase1ScrollRef.current.clientHeight
        const overflow = Math.max(0, inner.scrollHeight - viewport)
        const scrollLocal = state.phaseIndex === 1
          ? Math.max(0, (state.local - CONTENT_DELAY) / (1 - CONTENT_DELAY))
          : state.phaseIndex > 1 ? 1 : 0
        gsap.set(inner, { y: -scrollLocal * overflow })
      } else if (phase1InnerRef.current) {
        gsap.set(phase1InnerRef.current, { y: 0 })
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.05,
      onUpdate: applyBarrelState,
      onLeave: () => {
        onBarrelPhaseUpdate?.((prev) => ({ ...prev, inBarrel: false }))
      },
    })

    applyBarrelState(trigger)

    const onResize = () => {
      syncRadius()
      ScrollTrigger.refresh()
      applyBarrelState(trigger)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      trigger.kill()
    }
  }, [onSlideChange, onWebglReveal, onBarrelPhaseUpdate, updateDots, syncRadius])

  const showPhase = (index) => {
    if (index === 0) {
      return visualSlide === 0 || (contentSlide === 0 && !contentVisible)
    }
    return contentVisible && contentSlide === index
  }

  return (
    <section
      ref={wrapperRef}
      id="hero"
      className="barrel-wrapper section--interactive"
      style={{
        height: `${TOTAL_VH}vh`,
        '--barrel-r': `${radius}px`,
        '--barrel-perspective': `${Math.round(radius * 3.4)}px`,
      }}
      data-active-slide="0"
      data-content-slide="0"
    >
      <div className="barrel-sticky">
        <div ref={blendRef} className="barrel-blend">
          <img
            ref={imgARef}
            src={SLIDES[0].src}
            alt={SLIDES[0].label}
            className="barrel-blend__img barrel-blend__img--field barrel-blend__img--outgoing"
            style={{ transform: imgPanTransform(0) }}
            loading="eager"
            fetchPriority="high"
          />
          <div ref={wipeRef} className="barrel-blend__wipe-layer">
            <img
              ref={imgBRef}
              src={SLIDES[1].src}
              alt={SLIDES[1].label}
              className="barrel-blend__img barrel-blend__img--soil barrel-blend__img--incoming"
              style={{ transform: imgPanTransform(0) }}
              loading="eager"
            />
          </div>
        </div>

        <div className="barrel-scene barrel-scene--hidden">
          <div ref={barrelRef} className="barrel-drum">
            {SLIDES.map((slide, i) => {
              const faceStyle = {
                transform: `rotateX(${-FACE_DEG * i}deg) translateZ(${radius}px)`,
              }
              const isWebgl = slide.type === 'webgl'

              return (
                <div
                  key={slide.label}
                  className={`barrel-face${isWebgl ? ' barrel-face--webgl' : ' barrel-face--hidden'}`}
                  style={faceStyle}
                >
                  {isWebgl && <div className="barrel-face__webgl-slot" aria-hidden="true" />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="barrel-overlay">
          <div className={`barrel-phase barrel-phase--0${showPhase(0) ? ' is-active' : ''}`}>
            <Hero variant="barrel-overlay" />
          </div>

          <div
            ref={phase1ScrollRef}
            className={`barrel-phase barrel-phase--1${showPhase(1) ? ' is-active' : ''}`}
          >
            <div ref={phase1InnerRef} className="barrel-phase__inner barrel-phase__inner--split">
              <StatsBar embedded runAnimation={showPhase(1)} />
              <Science embedded />
            </div>
          </div>

          <div className={`barrel-phase barrel-phase--2${showPhase(2) ? ' is-active' : ''}`}>
            <div className="barrel-phase__inner barrel-phase__inner--how">
              <HowItWorks embedded />
            </div>
          </div>
        </div>

        <nav className="barrel-dots" aria-label="Fases del recorrido">
          {SLIDES.map((slide, i) => (
            <div key={slide.label} className={`barrel-dot${visualSlide === i ? ' is-active' : ''}`}>
              <span>{slide.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
