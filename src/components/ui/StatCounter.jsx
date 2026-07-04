import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StatCounter({ value, unit, label, triggerEl }) {
  const numRef = useRef(null)

  useEffect(() => {
    if (!numRef.current || !triggerEl) return

    gsap.set(numRef.current, { innerText: 0 })

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: function () {
              if (numRef.current) {
                numRef.current.innerText = Math.floor(this.targets()[0].val)
              }
            },
          },
        )
      },
    })

    return () => trigger.kill()
  }, [value, triggerEl])

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-bg)',
        backdropFilter: 'blur(8px)',
        minWidth: '140px',
      }}
    >
      <div className="stat-counter__num">
        <span ref={numRef}>0</span>
        <span className="stat-counter__unit">{unit}</span>
      </div>
      <p className="stat-counter__label">{label}</p>
    </div>
  )
}
