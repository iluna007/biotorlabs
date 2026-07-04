import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'

export function WhyBiotor() {
  const { whyBiotor } = useContent()

  return (
    <section id="why-biotor" className="section" style={{
      minHeight: '100vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#why-biotor" align="left">
        <p className="section-eyebrow">{whyBiotor.eyebrow}</p>
        <h2 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1rem',
        }}>
          {whyBiotor.title}<br />
          <span className="section-accent">{whyBiotor.titleAccent}</span>
        </h2>
        <p className="section-body" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
          {whyBiotor.body}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {whyBiotor.differentiators.map(d => (
            <div key={d.title} style={{
              display: 'flex', gap: '1rem', padding: '1.2rem 1.4rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
              background: 'rgba(10, 42, 26, 0.55)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{d.icon}</span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem', fontWeight: 600,
                  color: 'var(--cream)', marginBottom: '0.3rem',
                }}>
                  {d.title}
                </h3>
                <p className="section-body" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
