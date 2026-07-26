import { SectionOverlay } from '../ui/SectionOverlay'
import { StatCounter } from '../ui/StatCounter'
import { useContent } from '../../context/SitePreferencesContext'

export function Results() {
  const { results } = useContent()
  return (
    <section id="results" className="section section--results">
      <SectionOverlay triggerSection="#results" align="center">
        <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{results.eyebrow}</p>
        <h2 className="section-title section-title--results">
          {results.title[0]}<br />{results.title[1]}
        </h2>

        <div className="results-crops">
          {results.crops.map(crop => (
            <span key={crop} className="results-crop-tag">{crop}</span>
          ))}
        </div>

        <div className="results-stats-grid">
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

        <p className="results-disclaimer">{results.disclaimer}</p>
      </SectionOverlay>
    </section>
  )
}
