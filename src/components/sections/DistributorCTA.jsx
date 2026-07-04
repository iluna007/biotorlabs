import { useContent } from '../../context/SitePreferencesContext'

export function DistributorCTA() {
  const { distributorCTA } = useContent()

  return (
    <section className="section--interactive" style={{
      position: 'relative', zIndex: 10,
      padding: '4rem var(--pad-x)',
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        maxWidth: '860px', width: '100%',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
        border: '1px solid var(--color-border-strong)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--cta-gradient)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ flex: '1 1 320px' }}>
          <p className="section-eyebrow" style={{ marginBottom: '0.6rem' }}>
            {distributorCTA.eyebrow}
          </p>
          <h2 className="section-title" style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            lineHeight: 1.2, marginBottom: '0.8rem',
          }}>
            {distributorCTA.title}
          </h2>
          <p className="section-body" style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
            {distributorCTA.body}
          </p>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          flexShrink: 0, pointerEvents: 'all',
        }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => window.open(`mailto:info@biotorlabs.com?subject=${encodeURIComponent(distributorCTA.ctaMailSubject)}`, '_blank')}
            style={{ whiteSpace: 'nowrap' }}
          >
            {distributorCTA.cta}
          </button>
          <a
            href="/nosotros"
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem', color: 'var(--green-light)',
              textDecoration: 'none', letterSpacing: '0.05em',
            }}
          >{distributorCTA.secondaryLink}</a>
        </div>
      </div>
    </section>
  )
}
