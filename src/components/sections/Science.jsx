import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'

function ScienceContent({ embedded = false }) {
  const { science } = useContent()

  return (
    <div className={embedded ? 'barrel-phase-content barrel-science-content' : undefined}>
      <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{science.eyebrow}</p>
      <h2 className="section-title" style={{
        fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.2rem',
      }}>
        {science.title[0]}<br />
        <span className="section-accent">{science.title[1]}</span>
      </h2>
      <p className="section-body" style={{ fontSize: '0.92rem', marginBottom: '1.8rem' }}>
        {science.body}
      </p>

      <div className="science-mechanisms-grid">
        {science.mechanisms.map(mech => (
          <article key={mech.id} className="science-mechanism-card">
            <span className="science-mechanism-card__icon" aria-hidden="true">{mech.icon}</span>
            <h3 className="science-mechanism-card__title">{mech.title}</h3>
            <p className="section-body science-mechanism-card__desc">{mech.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Science({ embedded = false }) {
  if (embedded) {
    return (
      <div id="science" className="barrel-science-block">
        <ScienceContent embedded />
      </div>
    )
  }

  return (
    <section id="science" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#science" align="left">
        <ScienceContent />
      </SectionOverlay>
    </section>
  )
}
