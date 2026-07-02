import { SectionOverlay } from '../ui/SectionOverlay'

const TESTIMONIALS = [
  {
    quote:
      'En dos semanas vi el doble de raíces en mis tomates. RootForce cambió mi forma de fertilizar.',
    author: 'María G.',
    role: 'Agricultora, Jalisco',
  },
  {
    quote:
      'Mis rosales nunca habían enraizado tan rápido. El producto se paga solo en la primera cosecha.',
    author: 'Carlos R.',
    role: 'Viverista, Valencia',
  },
  {
    quote:
      'Lo uso en café y cacao. Menos estrés hídrico y plantas más vigorosas desde el trasplante.',
    author: 'Ana L.',
    role: 'Productora, Antioquia',
  },
]

export function Testimonials() {
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
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#5bcc3e',
            marginBottom: '1.2rem',
          }}
        >
          Testimonios
        </p>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#f0ede8',
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
          }}
        >
          Lo que dicen
          <br />
          los cultivadores
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(91, 204, 62, 0.12)',
                borderRadius: '4px',
                background: 'rgba(10, 15, 7, 0.5)',
                backdropFilter: 'blur(8px)',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#d4ffba',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <cite
                  style={{
                    fontSize: '0.85rem',
                    color: '#7ecb6e',
                    fontStyle: 'normal',
                    fontWeight: 700,
                  }}
                >
                  {t.author}
                </cite>
                <p style={{ fontSize: '0.75rem', color: '#8a9f82', marginTop: '0.25rem' }}>
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
