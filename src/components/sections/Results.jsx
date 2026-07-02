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
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8bc34a', marginBottom: '1.2rem' }}>
          {results.eyebrow}
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800,
          lineHeight: 1.1, color: '#edf0e8', letterSpacing: '-0.03em', marginBottom: '2rem',
        }}>
          {results.title[0]}<br />{results.title[1]}
        </h2>

        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {results.crops.map(crop => (
            <span key={crop} style={{
              padding: '0.3rem 0.8rem',
              border: '1px solid rgba(139,195,74,0.3)',
              borderRadius: '2px', fontSize: '0.72rem',
              color: '#8bc34a', letterSpacing: '0.08em',
              background: 'rgba(139,195,74,0.06)',
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
          fontSize: '0.75rem', color: '#4a6a40', lineHeight: 1.6,
          borderLeft: '2px solid #2a4a1a', paddingLeft: '1rem',
        }}>
          {results.disclaimer}
        </p>
      </SectionOverlay>
    </section>
  )
}
