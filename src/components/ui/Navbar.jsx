import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useContent } from '../../context/SitePreferencesContext'
import { useBrandLogo } from '../../hooks/useBrandLogo'
import { NavPortfolioDropdown } from './NavPortfolioDropdown'

export function Navbar() {
  const ref = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/nosotros'
  const { nav } = useContent()
  const brandLogo = useBrandLogo()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.4, ease: 'power3.out' },
    )
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)

  const sectionLinks = isHome ? (
    nav.links.map(link => (
      <a key={link.href} href={link.href.replace(/^\//, '')} className="nav-link"
        onClick={closeMenu}
      >{link.label}</a>
    ))
  ) : (
    nav.links.map(link => (
      <Link key={link.href} to={link.href} className="nav-link"
        onClick={closeMenu}
      >{link.label}</Link>
    ))
  )

  const desktopLinks = (
    <>
      {sectionLinks}
      <Link to="/nosotros" className={`nav-link${isAbout ? ' nav-link--active' : ''}`}>
        {nav.about}
      </Link>
      <NavPortfolioDropdown />
    </>
  )

  const mobileLinks = (
    <>
      {sectionLinks}
      <Link to="/nosotros" className={`nav-link${isAbout ? ' nav-link--active' : ''}`} onClick={closeMenu}>
        {nav.about}
      </Link>
      <NavPortfolioDropdown variant="mobile" onNavigate={closeMenu} />
    </>
  )

  return (
    <>
      <nav ref={ref} className="site-nav">
        <Link to="/" className="nav-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }}>
          <img
            className="nav-logo"
            src={brandLogo}
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

        <div className="nav-links-desktop">{desktopLinks}</div>

        <div className="nav-hamburger-wrap">
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
        </div>
      </nav>

      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`} onClick={closeMenu}>
        <div className="nav-drawer__inner" onClick={e => e.stopPropagation()}>
          {mobileLinks}
        </div>
      </div>
    </>
  )
}
