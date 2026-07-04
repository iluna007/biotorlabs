import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getContent } from '../config/getContent'

const SitePreferencesContext = createContext(null)

const STORAGE_LOCALE = 'biotor-locale'
const STORAGE_THEME = 'biotor-theme'

function readStoredLocale() {
  const stored = localStorage.getItem(STORAGE_LOCALE)
  return stored === 'en' ? 'en' : 'es'
}

function readStoredTheme() {
  const stored = localStorage.getItem(STORAGE_THEME)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export function SitePreferencesProvider({ children }) {
  const [locale, setLocale] = useState(readStoredLocale)
  const [theme, setTheme] = useState(() => {
    const stored = readStoredTheme()
    document.documentElement.classList.toggle('light-mode', stored === 'light')
    return stored
  })

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(STORAGE_LOCALE, locale)
  }, [locale])

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light')
    localStorage.setItem(STORAGE_THEME, theme)
  }, [theme])

  const value = useMemo(() => ({
    locale,
    setLocale,
    toggleLocale: () => setLocale((l) => (l === 'es' ? 'en' : 'es')),
    theme,
    isLight: theme === 'light',
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    setTheme,
    content: getContent(locale),
  }), [locale, theme])

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  )
}

export function useSitePreferences() {
  const ctx = useContext(SitePreferencesContext)
  if (!ctx) throw new Error('useSitePreferences must be used within SitePreferencesProvider')
  return ctx
}

export function useContent() {
  return useSitePreferences().content
}
