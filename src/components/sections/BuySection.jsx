// src/components/sections/BuySection.jsx
// Carrusel de todos los productos Biotor Labs
// Navegación: flechas + dots + teclado + touch swipe

import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../context/SitePreferencesContext'

function ProductImage({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{
      width: 'clamp(160px, 28vw, 240px)',
      height: 'clamp(260px, 42vw, 380px)',
      position: 'relative',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(160deg, ${product.color}18, ${product.color}08)`,
        border: `1px solid ${product.color}30`,
        borderRadius: '8px',
        gap: '0.6rem',
        opacity: imgLoaded && !imgError ? 0 : 1,
        transition: 'opacity 0.4s',
      }}>
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none" aria-hidden="true">
          <rect x="14" y="28" width="52" height="76" rx="4"
            fill={product.color + '22'} stroke={product.color} strokeWidth="1.5" />
          <rect x="14" y="20" width="52" height="12" rx="2"
            fill={product.color + '44'} stroke={product.color} strokeWidth="1" />
          <line x1="14" y1="40" x2="66" y2="40" stroke={product.color + '40'} strokeWidth="0.8" />
          <line x1="14" y1="85" x2="66" y2="85" stroke={product.color + '40'} strokeWidth="0.8" />
          <rect x="20" y="45" width="40" height="34" rx="2"
            fill={product.color + '30'} />
          <rect x="24" y="50" width="32" height="3" rx="1" fill={product.color + '80'} />
          <rect x="27" y="56" width="26" height="2" rx="1" fill={product.color + '50'} />
          <rect x="29" y="62" width="22" height="2" rx="1" fill={product.color + '40'} />
          <rect x="26" y="68" width="28" height="2" rx="1" fill={product.color + '40'} />
          <rect x="14" y="98" width="52" height="8" rx="2"
            fill={product.color + '33'} stroke={product.color + '50'} strokeWidth="0.8" />
        </svg>
        <span style={{
          fontSize: '0.65rem', color: product.color,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          opacity: 0.8,
        }}>
          {product.name}
        </span>
      </div>

      {!imgError && (
        <img
          src={product.imageUrl}
          alt={`${product.name} — Biotor Labs`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            borderRadius: '8px',
          }}
        />
      )}
    </div>
  )
}

function ProductCard({ product, isActive, style, ui }) {
  return (
    <div className="product-card-inner" style={{
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'center',
      padding: '2.5rem 3rem',
      border: `1px solid ${product.color}${isActive ? '50' : '20'}`,
      borderRadius: '12px',
      background: isActive
        ? `linear-gradient(135deg, ${product.color}08, ${product.color}03)`
        : 'rgba(10,15,7,0.4)',
      backdropFilter: 'blur(16px)',
      flexWrap: 'wrap',
      justifyContent: 'center',
      minHeight: '360px',
      ...style,
    }}>
      <ProductImage product={product} />

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

        <h3 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900, lineHeight: 1.0,
          color: product.accentColor,
          letterSpacing: '-0.04em',
          marginBottom: '0.3rem',
        }}>{product.name}</h3>

        <p style={{
          fontSize: '0.8rem', color: product.color,
          letterSpacing: '0.05em', marginBottom: '1rem',
          textTransform: 'uppercase', fontWeight: 600,
        }}>{product.tagline}</p>

        <p style={{
          fontSize: '0.75rem', color: 'var(--green-light)',
          fontStyle: 'italic', marginBottom: '1rem',
          fontFamily: 'monospace', lineHeight: 1.5,
        }}>{product.organism}</p>

        <p style={{
          fontSize: '0.88rem', color: '#8a9f7a',
          lineHeight: 1.75, marginBottom: '1.5rem',
          maxWidth: '420px',
        }}>{product.description}</p>

        {product.crops.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--green-light)', alignSelf: 'center' }}>{ui.cropsLabel}</span>
            {product.crops.map(crop => (
              <span key={crop} style={{
                fontSize: '0.68rem', padding: '0.2rem 0.6rem',
                border: `1px solid ${product.color}30`,
                borderRadius: '2px', color: product.color + 'cc',
              }}>{crop}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => window.open(product.contactUrl, '_blank')}
            style={{
              background: `linear-gradient(135deg, ${product.color}cc, ${product.color})`,
              border: 'none', color: 'var(--green-dark)',
              padding: '0.8rem 1.8rem', borderRadius: '3px',
              fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              pointerEvents: 'all',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${product.color}50`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >{ui.requestInfo}</button>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'transparent',
              border: `1px solid ${product.color}40`,
              color: product.color,
              padding: '0.8rem 1.4rem', borderRadius: '3px',
              fontWeight: 600, fontSize: '0.78rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              pointerEvents: 'all',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = product.color
              e.currentTarget.style.color = product.accentColor
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = product.color + '40'
              e.currentTarget.style.color = product.color
            }}
          >{ui.learnMore}</a>
        </div>
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
          {buyCarousel.titlePrefix} <span style={{
            background: `linear-gradient(135deg, ${current.color}, ${current.accentColor})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            transition: 'all 0.4s',
          }}>{buyCarousel.titleAccent}</span>
        </h2>
        <p className="section-body" style={{ fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
          {buyCarousel.subtitle}
        </p>
      </div>

      <div style={{
        width: '100%', maxWidth: '860px',
        position: 'relative',
      }}>
        <div ref={cardRef} style={{ width: '100%' }}>
          <ProductCard product={current} isActive={true} ui={ui} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}>
          <button
            type="button"
            onClick={prev}
            style={{
              background: 'transparent',
              border: `1px solid ${current.color}40`,
              color: current.color,
              width: '44px', height: '44px',
              borderRadius: '50%', fontSize: '1.2rem',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s', pointerEvents: 'all',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = current.color + '20'
              e.currentTarget.style.borderColor = current.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = current.color + '40'
            }}
            aria-label={ui.prevProduct}
          >←</button>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i, i > active ? 1 : -1)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? p.color : (p.color + '30'),
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.35s ease',
                  padding: 0,
                  pointerEvents: 'all',
                }}
                aria-label={ui.goToProduct(p.name)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            style={{
              background: 'transparent',
              border: `1px solid ${current.color}40`,
              color: current.color,
              width: '44px', height: '44px',
              borderRadius: '50%', fontSize: '1.2rem',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s', pointerEvents: 'all',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = current.color + '20'
              e.currentTarget.style.borderColor = current.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = current.color + '40'
            }}
            aria-label={ui.nextProduct}
          >→</button>
        </div>

        <div className="product-thumbnails-grid" style={{
          marginTop: '1.8rem',
        }}>
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
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                background: i === active
                  ? `${p.color}12`
                  : 'rgba(10,15,7,0.5)',
                cursor: 'pointer',
                transition: 'all 0.25s',
                pointerEvents: 'all',
              }}
              onMouseEnter={e => {
                if (i !== active) {
                  e.currentTarget.style.borderColor = p.color + '40'
                  e.currentTarget.style.background = p.color + '08'
                }
              }}
              onMouseLeave={e => {
                if (i !== active) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(10,15,7,0.5)'
                }
              }}
              aria-label={p.name}
            >
              <img
                src={p.imageUrl}
                alt=""
                style={{
                  height: '44px', width: 'auto', maxWidth: '52px',
                  objectFit: 'contain',
                  opacity: i === active ? 1 : 0.65,
                  transition: 'opacity 0.25s',
                }}
              />
              <span style={{
                fontSize: '0.58rem', letterSpacing: '0.04em',
                color: i === active ? p.color : '#4a6a40',
                fontWeight: i === active ? 700 : 400,
                transition: 'color 0.25s',
                maxWidth: '70px', textAlign: 'center',
                lineHeight: 1.2,
              }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
