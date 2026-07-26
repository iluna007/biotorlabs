import { useRef } from 'react'
import { SectionOverlay } from '../ui/SectionOverlay'
import { StatCounter } from '../ui/StatCounter'
import { useContent } from '../../context/SitePreferencesContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Results() {
  const sectionRef = useRef(null)
  const { results } = useContent()
  useScrollReveal(sectionRef)

  return (
    <section id="results" ref={sectionRef} className="section section--results">
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
              className="results-card"
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
