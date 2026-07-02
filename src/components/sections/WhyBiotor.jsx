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
        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: '#8bc34a', marginBottom: '1rem',
        }}>
          {whyBiotor.eyebrow}
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900,
          lineHeight: 1.05, color: '#edf0e8', letterSpacing: '-0.04em',
          marginBottom: '1rem',
        }}>
          {whyBiotor.title}<br />
          <span style={{ color: '#8bc34a' }}>{whyBiotor.titleAccent}</span>
        </h2>
        <p style={{
          fontSize: '0.9rem', color: '#7a9f6a', lineHeight: 1.8, marginBottom: '2rem',
        }}>
          {whyBiotor.body}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {whyBiotor.differentiators.map(d => (
            <div key={d.title} style={{
              display: 'flex', gap: '1rem', padding: '1.2rem 1.4rem',
              border: '1px solid rgba(139,195,74,0.12)', borderRadius: '6px',
              background: 'rgba(10,15,7,0.5)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{d.icon}</span>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#d4ffba', marginBottom: '0.3rem' }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#7a9f6a', lineHeight: 1.65 }}>{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
