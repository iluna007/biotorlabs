import { CONTENT } from '../../config/content'

const { buy, brand, footer } = CONTENT

export function BuySection() {
  return (
    <section id="buy" className="section section--interactive" style={{
      minHeight: '120vh', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '10vh 3rem', textAlign: 'center',
    }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8bc34a', marginBottom: '1rem' }}>
        {buy.eyebrow}
      </p>
      <h2 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900,
        color: '#edf0e8', letterSpacing: '-0.04em', marginBottom: '0.8rem',
      }}>
        {buy.title}
      </h2>
      <p style={{ fontSize: '0.92rem', color: '#7a9f6a', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        {buy.productDesc}
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px', width: '100%', marginBottom: '3rem' }}>
        {buy.plans.map(plan => (
          <div key={plan.name} style={{
            flex: '1 1 240px', padding: '2rem',
            border: plan.featured ? '1px solid #8bc34a' : '1px solid rgba(139,195,74,0.18)',
            borderRadius: '6px',
            background: plan.featured ? 'rgba(139,195,74,0.06)' : 'rgba(10,15,7,0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
            position: 'relative',
          }}>
            {plan.featured && (
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: '#8bc34a', color: '#0a0f07',
                fontSize: '0.62rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.25rem 0.8rem', borderRadius: '2px',
              }}>Más Solicitado</div>
            )}

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#d4ffba' }}>{plan.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#8bc34a', marginTop: '0.25rem', fontFamily: 'monospace' }}>{plan.weight}</p>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#7a9f6a', lineHeight: 1.5 }}>{plan.treats}</p>

            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#edf0e8', letterSpacing: '-0.02em' }}>
              {plan.price}
            </div>

            <p style={{ fontSize: '0.72rem', color: '#4a6a40' }}>{plan.note}</p>

            <button
              type="button"
              onClick={() => window.open(`mailto:${brand.contact}?subject=Consulta ${plan.name} - TrichoMax+`, '_blank')}
              style={{
                background: plan.featured ? 'linear-gradient(135deg, #4a7c2a, #8bc34a)' : 'transparent',
                border: plan.featured ? 'none' : '1px solid #2a4a1a',
                color: plan.featured ? '#0a0f07' : '#7a9f6a',
                padding: '0.85rem', borderRadius: '3px',
                fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.06em', cursor: 'pointer',
                transition: 'all 0.25s', marginTop: 'auto',
              }}
            >{plan.cta}</button>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
        justifyContent: 'center', marginBottom: '3rem',
      }}>
        {buy.guarantees.map(g => (
          <span key={g} style={{ fontSize: '0.78rem', color: '#8bc34a' }}>✓ {g}</span>
        ))}
      </div>

      <div style={{
        paddingTop: '2rem', borderTop: '1px solid rgba(139,195,74,0.1)',
        width: '100%', maxWidth: '900px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <p style={{ fontSize: '0.78rem', color: '#4a6a40' }}>{footer.copyright}</p>
          <p style={{ fontSize: '0.72rem', color: '#3a5a30', marginTop: '0.2rem' }}>
            {brand.location}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {Object.entries(brand.social).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer"
              style={{ color: '#4a6a40', fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'capitalize',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = '#8bc34a'}
              onMouseLeave={e => e.target.style.color = '#4a6a40'}
            >{key}</a>
          ))}
        </div>
      </div>
    </section>
  )
}
