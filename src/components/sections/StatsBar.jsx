import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/SitePreferencesContext'

gsap.registerPlugin(ScrollTrigger)

export function StatsBar() {
  const ref = useRef(null)
  const { statsBar } = useContent()

  useEffect(() => {
    if (!ref.current) return
    const nums = ref.current.querySelectorAll('[data-num]')
    nums.forEach((el, i) => {
      const target = parseInt(el.dataset.num, 10)
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val)
        },
      })
    })
  }, [statsBar])

  return (
    <section
      ref={ref}
      className="section--interactive"
      style={{
        position: 'relative', zIndex: 10,
        padding: '3rem var(--pad-x)',
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div className="stats-grid" style={{
        gap: '0.5rem',
        width: '100%', maxWidth: '860px',
        background: 'var(--surface-bg-soft)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem 2rem',
      }}>
        {statsBar.stats.map(stat => (
          <div key={stat.label} style={{ textAlign: 'center', padding: '0.8rem 0.5rem' }}>
            <div className="stats-bar__num">
              <span data-num={stat.num}>0</span>{stat.suffix}
            </div>
            <p className="stats-bar__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
