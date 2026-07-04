import { Link } from 'react-router-dom'
import { useContent } from '../../context/SitePreferencesContext'
import { useBrandLogo } from '../../hooks/useBrandLogo'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { footer } = useContent()
  const brandLogo = useBrandLogo()

  return (
    <footer className="site-footer">
      <div className="footer-grid" style={{
        maxWidth: '1100px', margin: '0 auto',
        marginBottom: '3rem',
      }}>
        <div className="footer-brand-col">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <img
              className="footer-logo"
              src={brandLogo}
              alt="Biotor Labs"
            />
          </Link>
          <p style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', color: 'var(--green-light)',
            lineHeight: 1.7, maxWidth: 'min(280px, 100%)',
            marginBottom: '0.8rem',
          }}>
            {footer.tagline}
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem', color: 'var(--color-text-muted)', lineHeight: 1.6,
            marginBottom: '1rem',
          }}>
            {footer.countries}
          </p>
          <SocialLinks
            className="footer-social"
            variant="icon"
            iconSize={18}
            ariaLabel={footer.socialLabel}
          />
        </div>

        {footer.columns.map(col => (
          <div key={col.heading}>
            <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>
              {col.heading}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {col.links.map(link => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link to={link.href} className="footer-link">{link.label}</Link>
                  ) : (
                    <a href={link.href}
                      className="footer-link"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
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
        borderTop: '1px solid var(--color-border)',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center',
        gap: '0.8rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem', color: 'var(--color-text-muted)',
        }}>{footer.copyright}</p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem', color: 'var(--color-text-muted)',
        }}>{footer.location}</p>
      </div>
    </footer>
  )
}
