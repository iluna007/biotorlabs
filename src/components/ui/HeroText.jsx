export function HeroText({ eyebrow, title, subtitle, children }) {
  return (
    <div style={{ maxWidth: '700px' }}>
      {eyebrow && (
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#5bcc3e',
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </p>
      )}
      {title}
      {subtitle}
      {children}
    </div>
  )
}
