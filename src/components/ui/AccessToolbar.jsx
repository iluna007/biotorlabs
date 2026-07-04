import { useSitePreferences } from '../../context/SitePreferencesContext'

const btnBase = {
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'rgba(10, 42, 26, 0.88)',
  backdropFilter: 'blur(12px)',
  cursor: 'pointer',
  color: 'var(--lime)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  transition: 'all 0.25s',
  pointerEvents: 'all',
}

export function AccessToolbar() {
  const { grayscale, toggleGrayscale, locale, toggleLocale, content } = useSitePreferences()
  const { ui } = content

  return (
    <aside
      className="access-toolbar"
      aria-label={ui.accessToolbarLabel}
    >
      <button
        type="button"
        style={{
          ...btnBase,
          background: grayscale ? 'rgba(168, 224, 99, 0.2)' : btnBase.background,
          borderColor: grayscale ? 'var(--lime)' : 'var(--color-border)',
        }}
        onClick={toggleGrayscale}
        aria-pressed={grayscale}
        aria-label={grayscale ? ui.grayscaleOn : ui.grayscaleOff}
        title={grayscale ? ui.grayscaleOn : ui.grayscaleOff}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" opacity="0.35" />
        </svg>
      </button>

      <button
        type="button"
        style={btnBase}
        onClick={toggleLocale}
        aria-label={ui.languageToggle}
        title={ui.languageToggle}
      >
        {locale === 'es' ? 'EN' : 'ES'}
      </button>
    </aside>
  )
}
