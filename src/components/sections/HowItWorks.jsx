import { SectionOverlay } from '../ui/SectionOverlay'
import { CONTENT } from '../../config/content'

const { howItWorks } = CONTENT

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#how-it-works" align="right">
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8bc34a', marginBottom: '1.2rem' }}>
          {howItWorks.eyebrow}
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
          lineHeight: 1.1, color: '#edf0e8', letterSpacing: '-0.03em', marginBottom: '2rem',
        }}>
          {howItWorks.title[0]}<br />{howItWorks.title[1]}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {howItWorks.steps.map(step => (
            <div key={step.num} style={{
              display: 'flex', gap: '1.2rem', padding: '1.1rem 1.3rem',
              border: '1px solid rgba(139,195,74,0.12)', borderRadius: '4px',
              background: 'rgba(10,15,7,0.5)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.72rem',
                color: '#8bc34a', fontWeight: 700, paddingTop: '0.2rem', flexShrink: 0,
              }}>{step.num}</span>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#d4ffba', marginBottom: '0.35rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#7a9f6a', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
