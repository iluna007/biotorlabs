export function CTAButton({ children, href = '#buy', variant = 'outline', onClick }) {
  const isPrimary = variant === 'primary'
  const className = isPrimary ? 'btn-primary' : 'btn-ghost'

  if (href) {
    return (
      <a href={href} className={className} style={{ display: 'inline-block', textDecoration: 'none' }}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}
