import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'
import { ASSETS } from '../../config/assets'
import { SocialLinks } from '../ui/SocialLinks'

export function Hero() {
  const { hero, ui } = useContent()
  const titleRef = useRef(null)
  const socialRef = useRef(null)
  const scrollHintRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 })
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.3',
    )
    .fromTo(socialRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.6',
    )
    .fromTo(scrollHintRef.current,
      { opacity: 0 }, { opacity: 0.7, duration: 0.8 }, '-=0.3',
    )

    gsap.to(scrollHintRef.current, {
      y: 8, repeat: -1, yoyo: true, duration: 1.4,
      ease: 'power1.inOut', delay: 2.5,
    })
  }, [])

  return (
    <section id="hero" className="section hero-section" style={{
      height: '120vh', flexDirection: 'column',
      justifyContent: 'center', padding: '0 var(--pad-x)',
      position: 'relative',
    }}>
      <div className="hero-inner">
        <div style={{ maxWidth: '680px', flex: '1 1 340px' }}>
          {hero.badge && (
            <p className="hero-badge">{hero.badge}</p>
          )}
          <p ref={eyebrowRef} className="hero-eyebrow">
            {hero.eyebrow}
          </p>

          <h1 ref={titleRef}>
            {hero.title[0]}<br />
            <span className="hero-accent">{hero.titleAccent}</span><br />
            {hero.title[1]}
          </h1>

        <div ref={socialRef}>
          <SocialLinks
            className="hero-social"
            variant="icon"
            ariaLabel={ui.socialNavLabel}
          />
        </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#science" className="hero-cta-primary">{hero.cta}</a>
            <button
              type="button"
              className="hero-cta-secondary"
              onClick={() => window.open('mailto:info@biotorlabs.com?subject=Quiero ser distribuidor', '_blank')}
            >{hero.ctaSecondary}</button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <img src={ASSETS.hero.brotes} alt="" loading="eager" />
          <div className="hero-visual__fade" />
        </div>
      </div>

      <div ref={scrollHintRef} style={{
        position: 'absolute', bottom: '3rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <div className="hero-scroll-line" />
        <p className="hero-scroll-label">{ui.scroll}</p>
      </div>
    </section>
  )
}
