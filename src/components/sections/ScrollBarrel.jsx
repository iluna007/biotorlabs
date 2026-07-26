// Barrel scroll — 3 caras: caña → brotes → laboratorio

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ASSETS } from '../../config/assets'
import {
  BARREL_CONTENT_DELAY,
  computeBarrelRadius,
  getBarrelImageBlend,
  getDiagonalWipeClips,
  getBarrelRotationFromProgress,
  getExplorationParallax,
} from '../../config/barrelScroll'
import { getBarrelPhaseVh, getBarrelTotalVh, isCoarsePointer, isMobileViewport } from '../../utils/responsive'
import { Hero } from './Hero'
import { StatsBar } from './StatsBar'
import { Science } from './Science'
import { HowItWorks } from './HowItWorks'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  {
    src: ASSETS.barrel.cana,
    label: 'Cultivo',
    imageClass: 'barrel-blend__img--field',
  },
  {
    src: ASSETS.barrel.brotes,
    label: 'Brotes',
    imageClass: 'barrel-blend__img--soil',
  },
  {
    src: ASSETS.barrel.lab,
    label: 'Laboratorio',
    imageClass: 'barrel-blend__img--lab',
  },
]

const N = SLIDES.length
const FACE_DEG = 360 / N
const MAX_ROTATION = 360 - FACE_DEG
const CONTENT_DELAY = BARREL_CONTENT_DELAY
const LAB_SLIDE = 2
const PROGRESS_STEPS = 4
const WIPE_OUT_FRAC = 0.25

function buildPhases(phaseVh) {
  return phaseVh.map((heightVh, i) => ({
    heightVh,
    slide: i,
    rotation: i * (360 / SLIDES.length),
  }))
}

function getProgressStep(visualSlide, scrollProgress, wipeOutProgress = 0) {
  if (wipeOutProgress > 0.05 || scrollProgress >= 0.975) return 3
  return Math.min(visualSlide, PROGRESS_STEPS - 2)
}

function imgPanTransform(panY = 0) {
  return `translate(-50%, calc(-50% + ${panY.toFixed(2)}%)) scale(1)`
}

function getVisualSlide(phaseIndex) {
  if (phaseIndex <= 0) return 0
  if (phaseIndex === 1) return 1
  return LAB_SLIDE
}

function isCanaOverlayActive(rotation) {
  const blend = getBarrelImageBlend(rotation, N)
  if (blend.mode === 'single') return blend.slide === 0
  return blend.from === 0
}

function getPhaseState(progress, phaseVh) {
  const totalVh = getBarrelTotalVh(phaseVh)
  const phases = buildPhases(phaseVh)
  const rotation = getBarrelRotationFromProgress(progress, N, CONTENT_DELAY, phaseVh)

  let accumulated = 0
  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i]
    const start = accumulated / totalVh
    accumulated += phase.heightVh
    const end = accumulated / totalVh

    if (progress <= end || i === phases.length - 1) {
      const local = Math.max(0, Math.min(1, (progress - start) / (end - start || 1)))
      const visualSlide = getVisualSlide(i)
      const contentVisible = i === 0 || local >= CONTENT_DELAY
      const contentSlide = contentVisible ? i : Math.max(0, i - 1)
      const wipeOutProgress = (i === 2 && local > (1 - WIPE_OUT_FRAC))
        ? (local - (1 - WIPE_OUT_FRAC)) / WIPE_OUT_FRAC
        : 0

      return {
        visualSlide,
        contentSlide,
        contentVisible,
        local,
        rotation,
        phaseIndex: i,
        wipeOutProgress,
      }
    }
  }

  return {
    visualSlide: LAB_SLIDE,
    contentSlide: 2,
    contentVisible: true,
    local: 1,
    rotation: MAX_ROTATION,
    phaseIndex: 2,
    wipeOutProgress: 1,
  }
}

function updateBlendVisuals(rotation, refs, parallax = { scale: 1.0, panY: 0 }, wipeOutProgress = 0) {
  const { root, imgA, imgB, imgC, wipeLayer, wipeLayer2 } = refs
  if (!root || !imgA || !imgB || !imgC || !wipeLayer || !wipeLayer2) return

  const fullWipe = getDiagonalWipeClips(1).incoming

  if (wipeOutProgress > 0) {
    imgA.style.visibility = 'hidden'
    imgA.style.opacity = '0'
    imgB.style.transform = imgPanTransform(0)
    imgC.style.transform = imgPanTransform(parallax.panY)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = fullWipe
    wipeLayer2.style.display = 'block'
    wipeLayer2.style.clipPath = fullWipe
    root.style.visibility = 'visible'
    root.style.background = ''
    const { outgoingWebgl } = getDiagonalWipeClips(wipeOutProgress)
    root.style.clipPath = outgoingWebgl
    return
  }

  root.style.clipPath = ''

  const blend = getBarrelImageBlend(rotation, N)

  const hideWipes = () => {
    wipeLayer.style.display = 'none'
    wipeLayer2.style.display = 'none'
  }

  const showCana = () => {
    imgA.style.visibility = 'visible'
    imgA.style.opacity = '1'
    root.style.background = ''
  }

  const hideCana = () => {
    imgA.style.visibility = 'hidden'
    imgA.style.opacity = '0'
  }

  root.style.visibility = 'visible'

  if (blend.mode === 'single' && blend.slide === 0) {
    showCana()
    imgA.style.clipPath = 'none'
    imgA.style.transform = imgPanTransform(parallax.panY)
    hideWipes()
    return
  }

  if (blend.mode === 'single' && blend.slide === 1) {
    hideCana()
    root.style.background = ''
    imgA.style.clipPath = 'none'
    imgA.style.transform = imgPanTransform(0)
    imgB.style.transform = imgPanTransform(parallax.panY)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = fullWipe
    wipeLayer2.style.display = 'none'
    return
  }

  if (blend.mode === 'single' && blend.slide === LAB_SLIDE) {
    hideCana()
    root.style.background = ''
    imgB.style.transform = imgPanTransform(0)
    imgC.style.transform = imgPanTransform(parallax.panY)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = fullWipe
    wipeLayer2.style.display = 'block'
    wipeLayer2.style.clipPath = fullWipe
    return
  }

  const clips = getDiagonalWipeClips(blend.t)

  if (blend.to === LAB_SLIDE) {
    hideCana()
    root.style.background = ''
    imgB.style.transform = imgPanTransform(0)
    imgC.style.transform = imgPanTransform(0)
    wipeLayer.style.display = 'block'
    wipeLayer.style.clipPath = fullWipe
    wipeLayer2.style.display = 'block'
    wipeLayer2.style.clipPath = clips.incoming
    return
  }

  showCana()
  imgA.style.clipPath = 'none'
  imgA.style.transform = imgPanTransform(parallax.panY)
  imgB.style.transform = imgPanTransform(0)
  wipeLayer.style.display = 'block'
  wipeLayer.style.clipPath = clips.incoming
  wipeLayer2.style.display = 'none'
}

export function ScrollBarrel({ onBarrelPhaseUpdate, modelStepActive = false }) {
  const wrapperRef = useRef(null)
  const barrelRef = useRef(null)
  const blendRef = useRef(null)
  const imgARef = useRef(null)
  const imgBRef = useRef(null)
  const imgCRef = useRef(null)
  const wipeRef = useRef(null)
  const wipe2Ref = useRef(null)
  const phase1ScrollRef = useRef(null)
  const phase1InnerRef = useRef(null)
  const [contentSlide, setContentSlide] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)
  const [visualSlide, setVisualSlide] = useState(0)
  const [progressStep, setProgressStep] = useState(0)
  const [phaseVh, setPhaseVh] = useState(() => getBarrelPhaseVh())
  const [totalVh, setTotalVh] = useState(() => getBarrelTotalVh(getBarrelPhaseVh()))
  const [radius, setRadius] = useState(() => computeBarrelRadius(N))
  const radiusRef = useRef(radius)
  const phaseVhRef = useRef(phaseVh)
  const nativePhase1ScrollRef = useRef(isCoarsePointer())
  const lastUiRef = useRef({
    visualSlide: 0,
    contentSlide: 0,
    contentVisible: true,
    progressStep: 0,
  })

  const activeProgressStep = modelStepActive ? 3 : progressStep

  const syncViewport = useCallback(() => {
    const nextPhaseVh = getBarrelPhaseVh()
    phaseVhRef.current = nextPhaseVh
    setPhaseVh(nextPhaseVh)
    setTotalVh(getBarrelTotalVh(nextPhaseVh))
    nativePhase1ScrollRef.current = isCoarsePointer()

    const r = computeBarrelRadius(N, window.innerHeight)
    radiusRef.current = r
    setRadius(r)
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--barrel-r', `${r}px`)
      wrapperRef.current.style.setProperty('--barrel-perspective', `${Math.round(r * 3.4)}px`)
    }
  }, [])

  useEffect(() => {
    const barrel = barrelRef.current
    const wrapper = wrapperRef.current
    if (!barrel || !wrapper) return

    syncViewport()
    gsap.set(barrel, { rotateX: 0, z: -radiusRef.current })

    const blendRefs = {
      root: blendRef.current,
      imgA: imgARef.current,
      imgB: imgBRef.current,
      imgC: imgCRef.current,
      wipeLayer: wipeRef.current,
      wipeLayer2: wipe2Ref.current,
    }

    const syncUiState = (state, scrollProgress) => {
      const prev = lastUiRef.current
      const nextStep = getProgressStep(state.visualSlide, scrollProgress, state.wipeOutProgress ?? 0)

      if (prev.visualSlide !== state.visualSlide) {
        setVisualSlide(state.visualSlide)
      }
      if (prev.progressStep !== nextStep) {
        setProgressStep(nextStep)
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
        progressStep: nextStep,
      }
    }

    const applyBarrelState = (self) => {
      const progress = typeof self.progress === 'number' ? self.progress : 0
      const state = getPhaseState(progress, phaseVhRef.current)

      wrapper.dataset.activeSlide = String(state.visualSlide)
      wrapper.dataset.contentSlide = String(state.contentSlide)
      wrapper.dataset.canaOverlay = isCanaOverlayActive(state.rotation) ? '1' : '0'

      let parallax = getExplorationParallax(
        state.phaseIndex,
        state.local,
        CONTENT_DELAY,
      )
      if (isMobileViewport()) {
        parallax = { ...parallax, panY: parallax.panY * 0.45 }
      }

      updateBlendVisuals(state.rotation, blendRefs, parallax, state.wipeOutProgress ?? 0)

      onBarrelPhaseUpdate?.({
        phaseIndex: state.phaseIndex,
        local: state.local,
        contentVisible: state.contentVisible,
        contentSlide: state.contentSlide,
        inBarrel: self.isActive,
        wipeOutProgress: state.wipeOutProgress ?? 0,
      })
      syncUiState(state, progress)

      if (
        !nativePhase1ScrollRef.current &&
        phase1InnerRef.current &&
        phase1ScrollRef.current &&
        state.contentVisible
      ) {
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
      scrub: 0.35,
      onUpdate: applyBarrelState,
      onLeave: () => {
        onBarrelPhaseUpdate?.((prev) => ({ ...prev, inBarrel: false }))
      },
    })

    applyBarrelState(trigger)

    const onResize = () => {
      syncViewport()
      ScrollTrigger.refresh()
      applyBarrelState(trigger)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      trigger.kill()
    }
  }, [onBarrelPhaseUpdate, syncViewport, totalVh, modelStepActive])

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
        height: `${totalVh}vh`,
        '--barrel-r': `${radius}px`,
        '--barrel-perspective': `${Math.round(radius * 3.4)}px`,
      }}
      data-active-slide="0"
      data-content-slide="0"
      data-cana-overlay="1"
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
          <div ref={wipe2Ref} className="barrel-blend__wipe-layer barrel-blend__wipe-layer--lab">
            <img
              ref={imgCRef}
              src={SLIDES[2].src}
              alt={SLIDES[2].label}
              className="barrel-blend__img barrel-blend__img--lab barrel-blend__img--incoming"
              style={{ transform: imgPanTransform(0) }}
              loading="eager"
            />
          </div>
        </div>

        <div className="barrel-scene barrel-scene--hidden">
          <div ref={barrelRef} className="barrel-drum">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.label}
                className="barrel-face barrel-face--hidden"
                style={{ transform: `rotateX(${-FACE_DEG * i}deg) translateZ(${radius}px)` }}
              />
            ))}
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

        <nav
          className="barrel-progress"
          aria-label="Progreso del recorrido"
          style={{ '--progress-step': activeProgressStep }}
        >
          <div className="barrel-progress__track" aria-hidden="true">
            <div className="barrel-progress__fill" aria-hidden="true" />
          </div>
          <ol className="barrel-progress__marks">
            {Array.from({ length: PROGRESS_STEPS }, (_, i) => (
              <li
                key={i}
                className={`barrel-progress__mark${activeProgressStep === i ? ' is-active' : ''}`}
                aria-current={activeProgressStep === i ? 'step' : undefined}
              >
                <span className="sr-only">{`Fase ${i + 1}`}</span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
