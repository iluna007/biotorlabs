import { useRef } from 'react'
import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Testimonials() {
  const sectionRef = useRef(null)
  const { testimonials } = useContent()
  useScrollReveal(sectionRef)

  return (
    <section id="testimonials" ref={sectionRef} className="section section--testimonials">
      <SectionOverlay triggerSection="#testimonials" align="center">
        <p className="section-eyebrow" style={{ marginBottom: '1.2rem' }}>
          {testimonials.eyebrow}
        </p>

        <h2 className="section-title" style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '2rem',
        }}>
          {testimonials.title[0]}<br />{testimonials.title[1]}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {testimonials.items.map((t, i) => (
            <blockquote key={`${t.author}-${i}`} className="testimonial-card">
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--cream)',
                lineHeight: 1.7,
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <cite style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--lime)',
                  fontStyle: 'normal',
                  fontWeight: 600,
                }}>
                  {t.author}
                </cite>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--green-light)',
                  marginTop: '0.25rem',
                }}>
                  {t.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </SectionOverlay>
    </section>
  )
}
