import { Link } from 'react-router-dom'
import { useContent } from '../../context/SitePreferencesContext'

export function Footer() {
  const { footer } = useContent()

  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      background: 'rgba(5,8,4,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(139,195,74,0.12)',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 2rem',
      pointerEvents: 'all',
    }}>
      <div className="footer-grid" style={{
        maxWidth: '1100px', margin: '0 auto',
        marginBottom: '3rem',
      }}>
        <div style={{ gridColumn: 'span 1' }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <img
              src="/images/logo-slogan.png"
              alt="Biotor Labs"
              style={{
                height: '58px', width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
              }}
            />
          </Link>
          <p style={{
            fontSize: '0.8rem', color: '#4a6a40',
            lineHeight: 1.7, maxWidth: '200px',
            marginBottom: '0.8rem',
          }}>
            {footer.tagline}
          </p>
          <p style={{ fontSize: '0.68rem', color: '#3a5030', lineHeight: 1.6 }}>
            {footer.countries}
          </p>
        </div>

        {footer.columns.map(col => (
          <div key={col.heading}>
            <p style={{
              fontSize: '0.62rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#8bc34a',
              fontWeight: 700, marginBottom: '1.2rem',
            }}>
              {col.heading}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {col.links.map(link => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link to={link.href} style={{
                      fontSize: '0.82rem', color: '#5a7a4a',
                      textDecoration: 'none', transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8bc34a' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5a7a4a' }}
                    >{link.label}</Link>
                  ) : (
                    <a href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.82rem', color: '#5a7a4a',
                        textDecoration: 'none', transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#8bc34a' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#5a7a4a' }}
                    >{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(139,195,74,0.08)',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center',
        gap: '0.8rem',
      }}>
        <p style={{ fontSize: '0.72rem', color: '#2d4428' }}>{footer.copyright}</p>
        <p style={{ fontSize: '0.68rem', color: '#2a3a24' }}>{footer.location}</p>
      </div>
    </footer>
  )
}
