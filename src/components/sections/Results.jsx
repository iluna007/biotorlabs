import { SectionOverlay } from '../ui/SectionOverlay'
import { StatCounter } from '../ui/StatCounter'
import { useContent } from '../../context/SitePreferencesContext'

export function Results() {
  const { results } = useContent()
  return (
    <section id="results" className="section" style={{
      minHeight: '130vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 3rem',
    }}>
      <SectionOverlay triggerSection="#results" align="left">
        <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{results.eyebrow}</p>
        <h2 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '2rem',
        }}>
          {results.title[0]}<br />{results.title[1]}
        </h2>

        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {results.crops.map(crop => (
            <span key={crop} style={{
              padding: '0.3rem 0.8rem',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--lime)', letterSpacing: '0.08em',
              background: 'rgba(168, 224, 99, 0.08)',
            }}>
              {crop}
            </span>
          ))}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem',
        }}>
          {results.stats.map(stat => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
              triggerEl="#results"
            />
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem', color: 'var(--green-light)', lineHeight: 1.6,
          borderLeft: '2px solid var(--green-accent)', paddingLeft: '1rem',
        }}>
          {results.disclaimer}
        </p>
      </SectionOverlay>
    </section>
  )
}
