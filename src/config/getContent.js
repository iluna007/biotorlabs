import { CONTENT } from './content'
import { CONTENT_EN } from './content.en'
import { ABOUT_ES } from './about.es'
import { ABOUT_EN } from './about.en'

export function getContent(locale) {
  const base = locale === 'en' ? CONTENT_EN : CONTENT
  const about = locale === 'en' ? ABOUT_EN : ABOUT_ES
  return { ...base, about }
}
