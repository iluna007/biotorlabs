import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CONTENT } from '../../config/content'

const { nav } = CONTENT

const LINK_HREFS = {
  'La Ciencia': '#science',
  'Cómo Funciona': '#how-it-works',
  'Resultados': '#results',
}

export function Navbar() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' }
    )
  }, [])

  return (
    <nav ref={ref} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.5rem 3rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(139, 195, 74, 0.12)',
    }}>
      <div style={{
        fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.01em', color: '#d4ffba',
      }}>
        {nav.brand}<span style={{ color: '#8bc34a' }}>{nav.brandAccent}</span>
      </div>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {nav.links.map(link => (
          <a key={link} href={LINK_HREFS[link] ?? '#'} style={{
            color: '#7a9f6a', textDecoration: 'none',
            fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = '#d4ffba'}
          onMouseLeave={e => e.target.style.color = '#7a9f6a'}
          >{link}</a>
        ))}
        <button
          onClick={() => window.open('mailto:info@biotorlabs.com', '_blank')}
          style={{
            background: 'linear-gradient(135deg, #4a7c2a, #8bc34a)',
            color: '#0a0f07', border: 'none',
            padding: '0.65rem 1.5rem', borderRadius: '2px',
            fontWeight: 700, fontSize: '0.78rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-1px)'
            e.target.style.boxShadow = '0 6px 20px rgba(139, 195, 74, 0.4)'
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >{nav.cta}</button>
      </div>
    </nav>
  )
}
