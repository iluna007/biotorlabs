import { useSitePreferences } from '../../context/SitePreferencesContext'

const btnBase = {
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--toolbar-bg)',
  backdropFilter: 'blur(12px)',
  cursor: 'pointer',
  color: 'var(--toolbar-fg)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  transition: 'all 0.25s',
  pointerEvents: 'all',
}

export function AccessToolbar() {
  const { locale, toggleLocale, theme, toggleTheme, content } = useSitePreferences()
  const { ui } = content
  const isLight = theme === 'light'

  return (
    <aside className="access-toolbar" aria-label={ui.accessToolbarLabel}>
      <button
        type="button"
        className={`access-toolbar__btn${isLight ? ' access-toolbar__btn--active' : ''}`}
        style={btnBase}
        onClick={toggleTheme}
        aria-pressed={isLight}
        aria-label={isLight ? ui.themeDarkOn : ui.themeLightOn}
        title={isLight ? ui.themeDarkOn : ui.themeLightOn}
      >
        {isLight ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
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
