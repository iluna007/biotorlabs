import { SectionOverlay } from '../ui/SectionOverlay'
import { CONTENT } from '../../config/content'

const { science } = CONTENT

export function Science() {
  return (
    <section id="science" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#science" align="left">
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8bc34a', marginBottom: '1.2rem' }}>
          {science.eyebrow}
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800,
          lineHeight: 1.1, color: '#edf0e8', letterSpacing: '-0.03em', marginBottom: '1.2rem',
        }}>
          {science.title[0]}<br />
          <span style={{ color: '#8bc34a' }}>{science.title[1]}</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#7a9f6a', lineHeight: 1.75, marginBottom: '1.8rem' }}>
          {science.body}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {science.mechanisms.map(mech => (
            <div key={mech.id} style={{
              display: 'flex', gap: '1rem', padding: '1rem 1.2rem',
              border: '1px solid rgba(139,195,74,0.15)', borderRadius: '4px',
              background: 'rgba(10,15,7,0.5)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>{mech.icon}</span>
              <div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#d4ffba', marginBottom: '0.3rem' }}>
                  {mech.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#7a9f6a', lineHeight: 1.6 }}>{mech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
