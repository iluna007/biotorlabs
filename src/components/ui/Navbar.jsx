import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'

export function Navbar() {
  const ref = useRef(null)
  const location = useLocation()
  const isAbout = location.pathname === '/nosotros'
  const { nav } = useContent()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.4, ease: 'power3.out' },
    )
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const linkStyle = (active) => ({
    color: active ? '#8bc34a' : '#7a9f6a',
    textDecoration: 'none', fontSize: '0.8rem',
    letterSpacing: '0.06em', textTransform: 'uppercase',
    fontWeight: active ? 700 : 400, transition: 'color 0.3s',
  })

  const links = (
    <>
      {!isAbout && nav.links.map(link => (
        <a key={link.href} href={link.href} style={linkStyle(false)}
          onMouseEnter={e => { e.currentTarget.style.color = '#d4ffba' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7a9f6a' }}
          onClick={() => setMenuOpen(false)}
        >{link.label}</a>
      ))}
      <Link to="/nosotros" style={linkStyle(isAbout)}
        onMouseEnter={e => { e.currentTarget.style.color = '#d4ffba' }}
        onMouseLeave={e => { e.currentTarget.style.color = isAbout ? '#8bc34a' : '#7a9f6a' }}
      >{nav.about}</Link>
      <button type="button"
        onClick={() => { window.open('mailto:info@biotorlabs.com', '_blank'); setMenuOpen(false) }}
        style={{
          background: 'linear-gradient(135deg, #4a7c2a, #8bc34a)',
          color: '#0a0f07', border: 'none',
          padding: '0.6rem 1.4rem', borderRadius: '2px',
          fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', cursor: 'pointer',
        }}
      >{nav.cta}</button>
    </>
  )

  return (
    <>
      <nav ref={ref} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)',
        padding: '0 var(--pad-x)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(139,195,74,0.1)',
        background: 'rgba(10,15,7,0.82)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/logo-slogan.png"
            alt="Biotor Labs"
            style={{ height: '44px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <span style={{ display: 'none', fontWeight: 800, fontSize: '1.1rem', color: '#d4ffba' }}>
            BIOTOR<span style={{ color: '#8bc34a' }}>LABS</span>
          </span>
        </Link>

        <div className="nav-links-desktop">{links}</div>

        <button
          className="nav-hamburger"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '5px',
            padding: '8px', pointerEvents: 'all',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: '#8bc34a', borderRadius: '1px',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
          onClick={e => e.stopPropagation()}>
          {links}
        </div>
      </div>
    </>
  )
}
