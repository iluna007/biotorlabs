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
        border: '1px solid rgba(139,195,74,0.3)',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(139,195,74,0.07), rgba(10,15,7,0.9))',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ flex: '1 1 320px' }}>
          <p style={{
            fontSize: '0.62rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#8bc34a', marginBottom: '0.6rem',
          }}>
            {distributorCTA.eyebrow}
          </p>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
            color: '#edf0e8', lineHeight: 1.2, letterSpacing: '-0.03em',
            marginBottom: '0.8rem',
          }}>
            {distributorCTA.title}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#7a9f6a', lineHeight: 1.7 }}>
            {distributorCTA.body}
          </p>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          flexShrink: 0, pointerEvents: 'all',
        }}>
          <button
            type="button"
            onClick={() => window.open(`mailto:info@biotorlabs.com?subject=${encodeURIComponent(distributorCTA.ctaMailSubject)}`, '_blank')}
            style={{
              background: 'linear-gradient(135deg, #4a7c2a, #8bc34a)',
              color: '#0a0f07', border: 'none',
              padding: '1rem 2rem', borderRadius: '4px',
              fontWeight: 700, fontSize: '0.82rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(139,195,74,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {distributorCTA.cta}
          </button>
          <a
            href="/nosotros"
            style={{
              textAlign: 'center',
              fontSize: '0.75rem', color: '#5a7a4a',
              textDecoration: 'none', letterSpacing: '0.05em',
            }}
          >{distributorCTA.secondaryLink}</a>
        </div>
      </div>
    </section>
  )
}
