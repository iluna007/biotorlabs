import { useRef } from 'react'
import { SectionOverlay } from '../ui/SectionOverlay'
import { StatCounter } from '../ui/StatCounter'
import { useContent } from '../../context/SitePreferencesContext'
import { useSectionReveal } from '../../hooks/useSectionReveal'

export function Results() {
  const sectionRef = useRef(null)
  const { results } = useContent()
  useSectionReveal(sectionRef)

  return (
    <section id="results" ref={sectionRef} className="section section--results">
      <SectionOverlay triggerSection="#results" align="center">
        <p className="section-eyebrow" data-reveal="up" style={{ marginBottom: '1.2rem' }}>{results.eyebrow}</p>
        <h2 className="section-title section-title--results" data-reveal="up">
          {results.title[0]}<br />{results.title[1]}
        </h2>

        <div className="results-crops">
          {results.crops.map((crop) => (
            <span key={crop} className="results-crop-tag" data-reveal="up">{crop}</span>
          ))}
        </div>

        <div className="results-stats-grid">
          {results.stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              className="results-card"
              data-reveal={i % 2 === 0 ? 'left' : 'right'}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
              triggerEl="#results"
            />
          ))}
        </div>

        <p className="results-disclaimer" data-reveal="up">{results.disclaimer}</p>
      </SectionOverlay>
    </section>
  )
}
