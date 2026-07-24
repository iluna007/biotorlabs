import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollThrottler } from '../utils/scrollThrottle'

gsap.registerPlugin(ScrollTrigger)

const EMIT_MS = 48

export function useScrollProgress(enabled = true) {
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const throttlerRef = useRef(createScrollThrottler(EMIT_MS))

  useEffect(() => {
    if (!enabled) return undefined

    const emit = throttlerRef.current
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress
        emit(self.progress, setProgress)
      },
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => trigger.kill()
  }, [enabled])

  return { progress, progressRef }
}
