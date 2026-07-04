import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/SitePreferencesContext'
import { ProductPackImage } from '../ui/ProductPackImage'
import { productPath } from '../../utils/products'

gsap.registerPlugin(ScrollTrigger)

function ProductCard({ product, isActive, style, ui }) {
  return (
    <div className="product-card-inner" style={{
      padding: '2.5rem 3rem',
      border: `1px solid ${product.color}${isActive ? '50' : '20'}`,
      borderRadius: '12px',
      background: isActive
        ? `linear-gradient(135deg, ${product.color}08, ${product.color}03)`
        : 'var(--surface-bg-soft)',
      backdropFilter: 'blur(16px)',
      minHeight: '360px',
      ...style,
    }}>
      <ProductPackImage product={product} />

      <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {product.badges.map(badge => (
            <span key={badge} style={{
              fontSize: '0.6rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 700,
              padding: '0.2rem 0.6rem', borderRadius: '2px',
              background: product.color + '22',
              color: product.color,
              border: `1px solid ${product.color}40`,
            }}>{badge}</span>
          ))}
          {product.featured && (
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 700,
              padding: '0.2rem 0.6rem', borderRadius: '2px',
              background: product.color,
              color: 'var(--green-dark)',
            }}>{ui.premium}</span>
          )}
        </div>

        <h3 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: product.accentColor,
          marginBottom: '0.3rem',
        }}>{product.name}</h3>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem', color: product.color,
          letterSpacing: '0.08em', marginBottom: '1rem',
          textTransform: 'uppercase', fontWeight: 600,
        }}>{product.tagline}</p>

        <p style={{
          fontSize: '0.75rem', color: 'var(--green-light)',
          fontStyle: 'italic', marginBottom: '1rem',
          fontFamily: 'var(--font-mono)', lineHeight: 1.5,
        }}>{product.organism}</p>

        <p className="section-body" style={{
          fontSize: '0.88rem', marginBottom: '1.5rem', maxWidth: '420px',
        }}>{product.description}</p>

        {product.crops.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--green-light)', alignSelf: 'center' }}>{ui.cropsLabel}</span>
            {product.crops.map(crop => (
              <span key={crop} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem', padding: '0.2rem 0.6rem',
                border: `1px solid ${product.color}30`,
                borderRadius: '2px', color: product.color + 'cc',
              }}>{crop}</span>
            ))}
          </div>
        )}

        <Link
          to={productPath(product.id)}
          className="btn-primary"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: `linear-gradient(135deg, ${product.color}cc, ${product.color})`,
            color: 'var(--green-dark)',
          }}
        >{ui.viewPortfolio}</Link>
      </div>
    </div>
  )
}

export function BuySection() {
  const { products, ui, buyCarousel } = useContent()
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const cardRef = useRef(null)
  const sectionRef = useRef(null)
  const touchStartX = useRef(null)

  const total = products.length
  const current = products[active]

  // Sincronizar carrusel con ?product=id en la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pid = params.get('product')
    if (!pid) return
    const idx = products.findIndex(p => p.id === pid)
    if (idx >= 0) setActive(idx)
  }, [products])

  useEffect(() => {
    if (window.location.pathname !== '/') return
    const url = new URL(window.location.href)
    url.searchParams.set('product', products[active].id)
    window.history.replaceState({}, '', url)
  }, [active, products])

  const goTo = useCallback((idx, dir = 1) => {
    if (animating || idx === active) return
    setAnimating(true)

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        x: dir * -40,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setActive(idx)
          gsap.fromTo(cardRef.current,
            { opacity: 0, x: dir * 40 },
            {
              opacity: 1, x: 0, duration: 0.35, ease: 'power2.out',
              onComplete: () => setAnimating(false),
            },
          )
        },
      })
    } else {
      setActive(idx)
      setAnimating(false)
    }
  }, [active, animating])

  const prev = useCallback(() => goTo((active - 1 + total) % total, -1), [active, total, goTo])
  const next = useCallback(() => goTo((active + 1) % total, 1), [active, total, goTo])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.fromTo(sectionRef.current.querySelector('.carousel-header'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      },
    )
  }, [])

  return (
    <section
      id="buy"
      ref={sectionRef}
      className="section section--interactive"
      style={{
        minHeight: '120vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 2rem',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="section-eyebrow" style={{ marginBottom: '0.8rem' }}>
          {buyCarousel.eyebrow}
        </p>
        <h2 className="section-title" style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          letterSpacing: '-0.02em', lineHeight: 1.0,
          marginBottom: '0.8rem',
        }}>
          {buyCarousel.titlePrefix}{' '}
          <span style={{
            background: `linear-gradient(135deg, ${current.color}, ${current.accentColor})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            transition: 'all 0.4s',
          }}>{buyCarousel.titleAccent}</span>
        </h2>
        <p className="section-body" style={{ fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
          {buyCarousel.subtitle}
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '860px', position: 'relative' }}>
        <div ref={cardRef} style={{ width: '100%' }}>
          <ProductCard product={current} isActive={true} ui={ui} />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '1.5rem', paddingLeft: '0.5rem', paddingRight: '0.5rem',
        }}>
          <button type="button" onClick={prev} className="carousel-arrow" style={{
            borderColor: `${current.color}40`, color: current.color,
          }} aria-label={ui.prevProduct}>←</button>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i, i > active ? 1 : -1)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px', borderRadius: '4px',
                  background: i === active ? p.color : (p.color + '30'),
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.35s ease', padding: 0,
                  pointerEvents: 'all',
                }}
                aria-label={ui.goToProduct(p.name)}
              />
            ))}
          </div>

          <button type="button" onClick={next} className="carousel-arrow" style={{
            borderColor: `${current.color}40`, color: current.color,
          }} aria-label={ui.nextProduct}>→</button>
        </div>

        <div className="product-thumbnails-grid" style={{ marginTop: '1.8rem' }}>
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className="product-thumb-btn"
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.35rem',
                padding: '0.55rem 0.75rem',
                border: i === active
                  ? `1px solid ${p.color}80`
                  : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: i === active ? `${p.color}12` : 'var(--surface-bg-soft)',
                cursor: animating ? 'wait' : 'pointer',
                transition: 'all 0.25s',
                pointerEvents: 'all',
              }}
              aria-label={ui.goToProduct(p.name)}
              aria-current={i === active ? 'true' : undefined}
              disabled={animating}
            >
              <img
                src={p.imageUrl}
                alt=""
                style={{
                  height: '44px', width: 'auto', maxWidth: '52px',
                  objectFit: 'contain',
                  opacity: i === active ? 1 : 0.65,
                }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem', letterSpacing: '0.04em',
                color: i === active ? p.color : 'var(--green-light)',
                fontWeight: i === active ? 600 : 400,
                maxWidth: '70px', textAlign: 'center', lineHeight: 1.2,
              }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
