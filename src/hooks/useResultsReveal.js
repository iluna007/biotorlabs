import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollThrottler } from '../utils/scrollThrottle'

gsap.registerPlugin(ScrollTrigger)

const EMIT_MS = 48

/** Misma ventana que SectionOverlay: texto visible ≈ top 60% del viewport */
export function computeResultsRevealProgress() {
  const section = document.getElementById('results')
  if (!section) return 0

  const vh = window.innerHeight
  const top = section.getBoundingClientRect().top
  const start = vh * 0.6
  const end = vh * 0.38

  if (top >= start) return 0
  if (top <= end) return 1
  return (start - top) / (start - end)
}

export function useResultsReveal(enabled = true) {
  const [reveal, setReveal] = useState(0)

  useEffect(() => {
    if (!enabled) return undefined

    const emit = createScrollThrottler(EMIT_MS)
    const update = () => emit(computeResultsRevealProgress(), setReveal)

    update()

    const trigger = ScrollTrigger.create({
      trigger: '#results',
      start: 'top bottom',
      end: 'top 38%',
      onUpdate: update,
    })

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
      update()
    }, 600)

    window.addEventListener('resize', update)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('resize', update)
      trigger.kill()
    }
  }, [enabled])

  return reveal
}
