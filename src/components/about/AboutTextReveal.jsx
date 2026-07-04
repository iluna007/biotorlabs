import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutTextReveal({
  children,
  className = '',
  as: Tag = 'div',
  start = 'top 78%',
  stagger = 0.07,
  delay = 0,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const lines = root.querySelectorAll('.about-line')
    if (!lines.length) return

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 105, opacity: 0 })

      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [start, stagger, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

export function AboutLines({ lines, className = '' }) {
  return (
    <div className={className}>
      {lines.map((line) => (
        <span key={line} className="about-line-mask">
          <span className="about-line">{line}</span>
        </span>
      ))}
    </div>
  )
}
