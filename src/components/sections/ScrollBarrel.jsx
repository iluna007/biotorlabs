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
  getBarrelBlendMotion,
  getWebglRevealProgress,
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
    imageClass: 'barrel-face__img--field',
  },
  {
    type: 'image',
    src: ASSETS.barrel.brotes,
    label: 'Brotes',
    imageClass: 'barrel-face__img--soil',
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

function getVisualSlide(rotation) {
  if (rotation < FACE_DEG * 0.55) return 0
  if (rotation < FACE_DEG * 1.55) return 1
  return 2
}

function getPhaseState(progress) {
  let accumulated = 0
  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i]
    const start = accumulated / TOTAL_VH
    accumulated += phase.heightVh
    const end = accumulated / TOTAL_VH

    if (progress <= end || i === PHASES.length - 1) {
      const span = end - start || 1
      const local = Math.max(0, Math.min(1, (progress - start) / span))
      const rotStart = i === 0 ? 0 : PHASES[i - 1].rotation
      const rotEnd = phase.rotation

      const rotT = i === 0 ? 0 : Math.min(1, local / CONTENT_DELAY)
      const rotation = i === 0 ? 0 : rotStart + (rotEnd - rotStart) * rotT

      const visualSlide = getVisualSlide(rotation)
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

export function ScrollBarrel({ onSlideChange, onWebglReveal }) {
  const wrapperRef = useRef(null)
  const barrelRef = useRef(null)
  const phase1ScrollRef = useRef(null)
  const phase1InnerRef = useRef(null)
  const [contentSlide, setContentSlide] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)
  const [visualSlide, setVisualSlide] = useState(0)
  const [barrelRotation, setBarrelRotation] = useState(0)
  const [radius, setRadius] = useState(() => computeBarrelRadius(N))
  const radiusRef = useRef(radius)

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

    const applyBarrelState = (self) => {
      const progress = typeof self.progress === 'number' ? self.progress : 0
      const state = getPhaseState(progress)
      const r = radiusRef.current

      gsap.set(barrel, { rotateX: state.rotation, z: -r })
      wrapper.dataset.activeSlide = String(state.visualSlide)
      wrapper.dataset.contentSlide = String(state.contentSlide)

      setVisualSlide(state.visualSlide)
      setContentSlide(state.contentSlide)
      setContentVisible(state.contentVisible)
      setBarrelRotation(state.rotation)
      onSlideChange?.(state.visualSlide)
      onWebglReveal?.(getWebglRevealProgress(state.rotation, N))
      updateDots(state.visualSlide)

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
      scrub: 0.55,
      onUpdate: applyBarrelState,
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
  }, [onSlideChange, onWebglReveal, updateDots, syncRadius])

  const showPhase = (index) => {
    if (index === 0) {
      return visualSlide === 0 || (contentSlide === 0 && !contentVisible)
    }
    return contentVisible && contentSlide === index
  }
  const imageBlend = getBarrelImageBlend(barrelRotation, N)
  const imageSlides = SLIDES.filter((s) => s.type === 'image')

  const renderBlendLayer = () => {
    if (imageBlend.mode === 'single' && imageBlend.slide >= imageSlides.length) {
      return null
    }

    const motion = imageBlend.mode === 'blend' ? getBarrelBlendMotion(imageBlend.t) : null

    const renderImage = (slideIndex, className, style) => {
      const slide = SLIDES[slideIndex]
      if (!slide || slide.type !== 'image') return null
      const variantClass = slide.imageClass?.replace('barrel-face__img', 'barrel-blend__img') ?? ''
      return (
        <img
          src={slide.src}
          alt={slide.label}
          className={`barrel-blend__img${variantClass ? ` ${variantClass}` : ''}${className ? ` ${className}` : ''}`}
          style={style}
          loading={slideIndex === 0 ? 'eager' : 'lazy'}
        />
      )
    }

    if (imageBlend.mode === 'single') {
      return (
        <div className="barrel-blend">
          {renderImage(imageBlend.slide, 'barrel-blend__img--solo', {
            transform: getBarrelBlendMotion(0).soloTransform,
          })}
        </div>
      )
    }

    const { from, to, t } = imageBlend
    const toWebgl = SLIDES[to]?.type === 'webgl'
    const m = motion ?? getBarrelBlendMotion(t)

    const stageStyle = {
      transform: `perspective(1400px) rotateX(${m.stageRotateX.toFixed(2)}deg)`,
    }

    if (toWebgl) {
      return (
        <div className="barrel-blend barrel-blend--transition" style={stageStyle}>
          {renderImage(from, 'barrel-blend__img--outgoing', {
            opacity: m.outOpacity,
            transform: m.outTransform,
          })}
        </div>
      )
    }

    return (
      <div className="barrel-blend barrel-blend--transition" style={stageStyle}>
        {renderImage(from, 'barrel-blend__img--outgoing', {
          opacity: m.outOpacity,
          transform: m.outTransform,
        })}
        {renderImage(to, 'barrel-blend__img--incoming', {
          opacity: m.inOpacity,
          transform: m.inTransform,
        })}
      </div>
    )
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
        {renderBlendLayer()}

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
