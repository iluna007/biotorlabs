export function CTAButton({ children, href = '#buy', variant = 'outline', onClick }) {
  const isPrimary = variant === 'primary'

  const baseStyle = {
    display: 'inline-block',
    background: isPrimary
      ? 'linear-gradient(135deg, #3a7a2a, #5bcc3e)'
      : 'transparent',
    border: isPrimary ? 'none' : '1px solid #5bcc3e',
    color: isPrimary ? '#0a0f07' : '#5bcc3e',
    padding: '1rem 2.5rem',
    fontSize: '0.85rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'all 0.3s',
    pointerEvents: 'all',
    textDecoration: 'none',
    fontWeight: 700,
  }

  if (href) {
    return (
      <a
        href={href}
        style={baseStyle}
        onMouseEnter={(e) => {
          if (!isPrimary) {
            e.currentTarget.style.background = '#5bcc3e'
            e.currentTarget.style.color = '#0a0f07'
          }
        }}
        onMouseLeave={(e) => {
          if (!isPrimary) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#5bcc3e'
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" style={baseStyle} onClick={onClick}>
      {children}
    </button>
  )
}
