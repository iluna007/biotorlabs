import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'

export function HowItWorks() {
  const { howItWorks } = useContent()
  return (
    <section id="how-it-works" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#how-it-works" align="right">
        <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{howItWorks.eyebrow}</p>
        <h2 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem',
        }}>
          {howItWorks.title[0]}<br />{howItWorks.title[1]}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {howItWorks.steps.map(step => (
            <div key={step.num} style={{
              display: 'flex', gap: '1.2rem', padding: '1.1rem 1.3rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-bg-soft)', backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--lime)', fontWeight: 600, paddingTop: '0.2rem', flexShrink: 0,
              }}>{step.num}</span>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem', fontWeight: 600,
                  color: 'var(--cream)', marginBottom: '0.35rem',
                }}>
                  {step.title}
                </h3>
                <p className="section-body" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
