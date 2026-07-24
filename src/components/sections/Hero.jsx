import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'
import { ASSETS } from '../../config/assets'
import { SocialLinks } from '../ui/SocialLinks'

export function Hero({ variant = 'default' }) {
  const { hero, ui } = useContent()
  const isBarrelOverlay = variant === 'barrel-overlay'
  const titleRef = useRef(null)
  const sublinesRef = useRef(null)
  const socialRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const targets = [
      titleRef.current,
      sublinesRef.current,
      socialRef.current,
      !isBarrelOverlay ? scrollHintRef.current : null,
    ].filter(Boolean)

    if (!targets.length) return undefined

    if (isBarrelOverlay) {
      gsap.set(targets, { opacity: 1, y: 0, filter: 'none' })
      return undefined
    }

    const tl = gsap.timeline({ delay: 0.4 })
    tl.from(titleRef.current, {
      opacity: 0, y: 48, filter: 'blur(8px)',
      duration: 1.1, ease: 'power3.out',
    })
    .from(sublinesRef.current, {
      opacity: 0, y: 16, duration: 0.65, ease: 'power2.out',
    }, '-=0.55')
    .from(socialRef.current, {
      opacity: 0, y: 24, duration: 0.85, ease: 'power2.out',
    }, '-=0.4')
    .from(scrollHintRef.current, {
      opacity: 0, duration: 0.7,
    }, '-=0.35')

    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        y: 8, repeat: -1, yoyo: true, duration: 1.4,
        ease: 'power1.inOut', delay: 2,
      })
    }

    return () => {
      tl.kill()
    }
  }, [isBarrelOverlay])

  return (
    <section
      className={`section hero-section${isBarrelOverlay ? ' hero-section--barrel-overlay' : ''}`}
      style={isBarrelOverlay ? undefined : {
        height: '120vh', flexDirection: 'column',
        justifyContent: 'center', padding: '0 var(--pad-x)',
        position: 'relative',
      }}
    >
      <div className="hero-inner">
        <div className={isBarrelOverlay ? 'hero-copy hero-copy--centered' : undefined} style={isBarrelOverlay ? undefined : { maxWidth: '680px', flex: '1 1 340px' }}>
          <h1 ref={titleRef}>
            {hero.titleLine1} {hero.titleLine2}
          </h1>

          <div ref={sublinesRef} className="hero-sublines">
            {hero.subline1 && <p className="hero-badge">{hero.subline1}</p>}
            {!isBarrelOverlay && hero.subline2 && (
              <p className="hero-eyebrow">{hero.subline2}</p>
            )}
          </div>

          <div ref={socialRef}>
            <SocialLinks
              className="hero-social"
              variant="icon"
              ariaLabel={ui.socialNavLabel}
            />
          </div>

          {!isBarrelOverlay && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#science" className="hero-cta-primary">{hero.cta}</a>
              <button
                type="button"
                className="hero-cta-secondary"
                onClick={() => window.open('mailto:info@biotorlabs.com?subject=Quiero ser distribuidor', '_blank')}
              >{hero.ctaSecondary}</button>
            </div>
          )}
        </div>

        {!isBarrelOverlay && (
          <div className="hero-visual" aria-hidden="true">
            <img src={ASSETS.hero.brotes} alt="" loading="eager" />
            <div className="hero-visual__fade" />
          </div>
        )}
      </div>

      {!isBarrelOverlay && (
        <div ref={scrollHintRef} className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <p className="hero-scroll-label">{ui.scroll}</p>
        </div>
      )}
    </section>
  )
}
