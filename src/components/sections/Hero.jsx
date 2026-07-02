import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'

export function Hero() {
  const { hero, ui } = useContent()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 })
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 }, { opacity: 0.7, duration: 0.8 }, '-=0.3'
    )

    gsap.to(scrollHintRef.current, {
      y: 8, repeat: -1, yoyo: true, duration: 1.4,
      ease: 'power1.inOut', delay: 2.5,
    })
  }, [])

  return (
    <section id="hero" className="section" style={{
      height: '120vh', flexDirection: 'column',
      justifyContent: 'center', padding: `0 var(--pad-x)`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: '680px' }}>
        <p ref={eyebrowRef} style={{
          fontSize: '0.68rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: '#8bc34a',
          marginBottom: '1.2rem', fontWeight: 600,
        }}>
          {hero.eyebrow}
        </p>

        <h1 ref={titleRef} style={{
          fontSize: 'clamp(3rem, 7vw, 5.8rem)',
          fontWeight: 900, lineHeight: 0.95,
          color: '#edf0e8', letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
        }}>
          {hero.title[0]}<br />
          <span style={{
            background: 'linear-gradient(135deg, #8bc34a, #d4ffba)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {hero.titleAccent}
          </span><br />
          {hero.title[1]}
        </h1>

        <p ref={subtitleRef} style={{
          fontSize: '1.05rem', color: '#7a9f6a',
          lineHeight: 1.75, maxWidth: '500px', marginBottom: '2.5rem',
        }}>
          {hero.subtitle}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <a href="#science" style={{
            background: 'transparent',
            border: '1px solid #8bc34a', color: '#8bc34a',
            padding: '0.95rem 1.8rem', fontSize: '0.8rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: '2px',
            transition: 'all 0.3s', pointerEvents: 'all',
            textDecoration: 'none', display: 'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8bc34a'; e.currentTarget.style.color = '#0a0f07' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8bc34a' }}
          >{hero.cta}</a>

          <button
            type="button"
            onClick={() => window.open('mailto:info@biotorlabs.com?subject=Quiero ser distribuidor', '_blank')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(139,195,74,0.3)',
              color: '#7a9f6a',
              padding: '0.95rem 1.8rem',
              fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', borderRadius: '2px',
              transition: 'all 0.3s', pointerEvents: 'all',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8bc34a'; e.currentTarget.style.color = '#d4ffba' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,195,74,0.3)'; e.currentTarget.style.color = '#7a9f6a' }}
          >{hero.ctaSecondary}</button>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.2rem',
          maxWidth: '520px',
        }}>
          {hero.trustBadges.map(badge => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#8bc34a', fontSize: '0.7rem' }}>✓</span>
              <span style={{ fontSize: '0.72rem', color: '#5a7a4a', letterSpacing: '0.04em' }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollHintRef} style={{
        position: 'absolute', bottom: '3rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(180deg, transparent, #8bc34a)' }} />
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: '#8bc34a', textTransform: 'uppercase' }}>
          {ui.scroll}
        </p>
      </div>
    </section>
  )
}
