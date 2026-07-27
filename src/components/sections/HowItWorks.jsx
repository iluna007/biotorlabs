import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'
import { ASSETS } from '../../config/assets'

function HowItWorksContent({ embedded = false }) {
  const { howItWorks } = useContent()

  return (
    <div className={embedded ? 'barrel-phase-content barrel-phase-content--center barrel-phase-content--grid' : undefined}>
      <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>{howItWorks.eyebrow}</p>
      <h2 className="section-title" style={{
        fontSize: 'clamp(1.65rem, 3vw, 2.35rem)', marginBottom: '1.25rem',
      }}>
        {howItWorks.title[0]}<br />{howItWorks.title[1]}
      </h2>

      <div className="science-mechanisms-grid science-mechanisms-grid--row">
        {howItWorks.steps.map((step, i) => (
          <article
            key={step.num}
            className="science-mechanism-card science-mechanism-card--illustrated"
            style={{ '--step-i': i }}
          >
            <div className="science-mechanism-card__media">
              <img src={ASSETS.howItWorks[i]} alt={step.title} loading="lazy" decoding="async" />
            </div>
            <span className="science-mechanism-card__num">{step.num}</span>
            <h3 className="science-mechanism-card__title">{step.title}</h3>
            <p className="section-body science-mechanism-card__desc">{step.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function HowItWorks({ embedded = false }) {
  if (embedded) {
    return (
      <div id="how-it-works" className="barrel-how-block">
        <HowItWorksContent embedded />
      </div>
    )
  }

  return (
    <section id="how-it-works" className="section" style={{
      minHeight: '140vh', flexDirection: 'column',
      justifyContent: 'center', padding: '10vh 0',
    }}>
      <SectionOverlay triggerSection="#how-it-works" align="right">
        <HowItWorksContent />
      </SectionOverlay>
    </section>
  )
}
