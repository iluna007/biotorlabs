import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(scopeRef, enabled = true) {
  useEffect(() => {
    if (!enabled || !scopeRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.results-card, .testimonial-card, .buy-product-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      gsap.utils.toArray('.section-title, .section-eyebrow').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, scopeRef)

    return () => ctx.revert()
  }, [scopeRef, enabled])
}
