import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSectionReveal(ref, selector = '[data-reveal]') {
  useEffect(() => {
    if (!ref.current) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el, i) => {
        const dir = el.dataset.reveal || 'up'
        const from = {
          up: { y: 60, x: 0 },
          down: { y: -40, x: 0 },
          left: { x: -60, y: 0 },
          right: { x: 60, y: 0 },
        }[dir] || { y: 60, x: 0 }

        gsap.fromTo(
          el,
          { ...from, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: (i % 4) * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [ref, selector])
}
