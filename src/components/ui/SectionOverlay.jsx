import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SectionOverlay({ children, triggerSection, align = 'left' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 40 })

    const show = ScrollTrigger.create({
      trigger: triggerSection,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
      onLeave: () => gsap.to(el, { opacity: 0, y: -30, duration: 0.5 }),
      onEnterBack: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6 }),
      onLeaveBack: () => gsap.to(el, { opacity: 0, y: 40, duration: 0.4 }),
    })

    return () => show.kill()
  }, [triggerSection])

  return (
    <div
      ref={ref}
      style={{
        maxWidth: '520px',
        padding: '0 3rem',
        alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {children}
    </div>
  )
}
