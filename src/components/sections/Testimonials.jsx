import { SectionOverlay } from '../ui/SectionOverlay'
import { useContent } from '../../context/SitePreferencesContext'

export function Testimonials() {
  const { testimonials } = useContent()

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10vh 0',
      }}
    >
      <SectionOverlay triggerSection="#testimonials" align="right">
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
            <blockquote
              key={`${t.author}-${i}`}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(10, 42, 26, 0.55)',
                backdropFilter: 'blur(8px)',
                margin: 0,
              }}
            >
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
