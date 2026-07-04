import { useSitePreferences } from '../context/SitePreferencesContext'
import { ASSETS } from '../config/assets'

export function useBrandLogo() {
  const { theme } = useSitePreferences()
  return theme === 'light' ? ASSETS.brand.symbolGreen : ASSETS.brand.symbolWhite
}
