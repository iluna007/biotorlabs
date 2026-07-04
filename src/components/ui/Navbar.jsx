import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'
import { ASSETS } from '../../config/assets'

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

  const links = (
    <>
      {!isAbout && nav.links.map(link => (
        <a key={link.href} href={link.href} className="nav-link"
          onClick={() => setMenuOpen(false)}
        >{link.label}</a>
      ))}
      <Link to="/nosotros" className={`nav-link${isAbout ? ' nav-link--active' : ''}`}>
        {nav.about}
      </Link>
      <button type="button" className="nav-cta-btn"
        onClick={() => { window.open('mailto:info@biotorlabs.com', '_blank'); setMenuOpen(false) }}
      >{nav.cta}</button>
    </>
  )

  return (
    <>
      <nav ref={ref} className="site-nav">
        <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }}>
          <img
            className="nav-logo"
            src={ASSETS.brand.symbolWhite}
            alt="Biotor Labs"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <span style={{ display: 'none', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--cream)', letterSpacing: '0.15em' }}>
            BIOTOR<span style={{ color: 'var(--lime)' }}>LABS</span>
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
              background: 'var(--lime)', borderRadius: '1px',
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
