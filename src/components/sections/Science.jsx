import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'

export function Science() {
  const { science } = useContent()
  return (
    <section id="science" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#science" align="left">
        <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{science.eyebrow}</p>
        <h2 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.2rem',
        }}>
          {science.title[0]}<br />
          <span className="section-accent">{science.title[1]}</span>
        </h2>
        <p className="section-body" style={{ fontSize: '0.92rem', marginBottom: '1.8rem' }}>
          {science.body}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {science.mechanisms.map(mech => (
            <div key={mech.id} style={{
              display: 'flex', gap: '1rem', padding: '1rem 1.2rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'rgba(10, 42, 26, 0.55)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>{mech.icon}</span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem', fontWeight: 600,
                  color: 'var(--cream)', marginBottom: '0.3rem',
                }}>
                  {mech.title}
                </h3>
                <p className="section-body" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>{mech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
