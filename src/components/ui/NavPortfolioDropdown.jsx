import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/SitePreferencesContext'
import { productPath, portfolioUrl } from '../../utils/products'

function Chevron({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{
        transition: 'transform 0.25s',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function NavPortfolioDropdown({ variant = 'desktop', onNavigate }) {
  const { nav, products } = useContent()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close()
    }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleNav = () => {
    close()
    onNavigate?.()
  }

  if (variant === 'mobile') {
    return (
      <div className="nav-portfolio-mobile">
        <button
          type="button"
          className="nav-portfolio-mobile__trigger"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          {nav.portfolio}
          <Chevron open={open} />
        </button>
        {open && (
          <div className="nav-dropdown__menu nav-dropdown__menu--mobile">
            {products.map(p => (
              <Link
                key={p.id}
                to={productPath(p.id)}
                className="nav-dropdown__item"
                onClick={handleNav}
              >
                <span className="nav-dropdown__item-name">{p.name}</span>
                <span className="nav-dropdown__item-tag">{p.tagline}</span>
              </Link>
            ))}
            <div className="nav-dropdown__footer">
              <Link to={portfolioUrl()} className="nav-dropdown__carousel" onClick={handleNav}>
                {nav.portfolioCarousel}
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className={`nav-dropdown${open ? ' open' : ''}`}>
      <button
        type="button"
        className="nav-dropdown__trigger"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {nav.portfolio}
        <Chevron open={open} />
      </button>

      <div className="nav-dropdown__menu" role="menu">
        {products.map(p => (
          <Link
            key={p.id}
            to={productPath(p.id)}
            className="nav-dropdown__item"
            role="menuitem"
            onClick={handleNav}
          >
            <span className="nav-dropdown__item-name">{p.name}</span>
            <span className="nav-dropdown__item-tag">{p.tagline}</span>
          </Link>
        ))}
        <div className="nav-dropdown__footer">
          <Link to={portfolioUrl()} className="nav-dropdown__carousel" onClick={handleNav}>
            {nav.portfolioCarousel}
          </Link>
        </div>
      </div>
    </div>
  )
}
