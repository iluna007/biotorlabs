import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'

export function Navbar() {
  const ref = useRef(null)
  const location = useLocation()
  const isAbout = location.pathname === '/nosotros'
  const { nav } = useContent()

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.4, ease: 'power3.out' },
    )
  }, [])

  return (
    <nav ref={ref} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.3rem 3rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(139,195,74,0.1)',
      background: 'rgba(10,15,7,0.75)',
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.01em', color: '#d4ffba' }}>
          {nav.brand}<span style={{ color: '#8bc34a' }}>{nav.brandAccent}</span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {!isAbout && nav.links.map(link => (
          <a key={link.href} href={link.href} style={{
            color: '#7a9f6a', textDecoration: 'none',
            fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#d4ffba' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7a9f6a' }}
          >{link.label}</a>
        ))}

        <Link to="/nosotros" style={{
          color: isAbout ? '#8bc34a' : '#7a9f6a',
          textDecoration: 'none',
          fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase',
          transition: 'color 0.3s',
          fontWeight: isAbout ? 700 : 400,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#d4ffba' }}
        onMouseLeave={e => { e.currentTarget.style.color = isAbout ? '#8bc34a' : '#7a9f6a' }}
        >
          {nav.about}
        </Link>

        <button
          type="button"
          onClick={() => window.open('mailto:info@biotorlabs.com', '_blank')}
          style={{
            background: 'linear-gradient(135deg, #4a7c2a, #8bc34a)',
            color: '#0a0f07', border: 'none',
            padding: '0.6rem 1.4rem', borderRadius: '2px',
            fontWeight: 700, fontSize: '0.76rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,195,74,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >{nav.cta}</button>
      </div>
    </nav>
  )
}
