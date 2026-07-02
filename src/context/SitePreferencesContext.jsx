import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getContent } from '../config/getContent'

const SitePreferencesContext = createContext(null)

const STORAGE_GRAYSCALE = 'biotor-grayscale'
const STORAGE_LOCALE = 'biotor-locale'

function readStoredLocale() {
  const stored = localStorage.getItem(STORAGE_LOCALE)
  return stored === 'en' ? 'en' : 'es'
}

export function SitePreferencesProvider({ children }) {
  const [grayscale, setGrayscale] = useState(
    () => localStorage.getItem(STORAGE_GRAYSCALE) === '1',
  )
  const [locale, setLocale] = useState(readStoredLocale)

  useEffect(() => {
    document.documentElement.classList.toggle('grayscale-mode', grayscale)
    localStorage.setItem(STORAGE_GRAYSCALE, grayscale ? '1' : '0')
  }, [grayscale])

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(STORAGE_LOCALE, locale)
  }, [locale])

  const value = useMemo(() => ({
    grayscale,
    toggleGrayscale: () => setGrayscale((on) => !on),
    locale,
    setLocale,
    toggleLocale: () => setLocale((l) => (l === 'es' ? 'en' : 'es')),
    content: getContent(locale),
  }), [grayscale, locale])

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
