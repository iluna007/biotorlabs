import { CONTENT } from './content'
import { CONTENT_EN } from './content.en'
import { ABOUT_ES } from './about.es'
import { ABOUT_EN } from './about.en'
import { PRODUCT_DETAILS_ES } from './productDetails.es'
import { PRODUCT_DETAILS_EN } from './productDetails.en'

function mergeProductDetails(products, details) {
  return products.map(p => ({
    ...p,
    detail: details[p.id] ?? null,
  }))
}

export function getContent(locale) {
  const base = locale === 'en' ? CONTENT_EN : CONTENT
  const about = locale === 'en' ? ABOUT_EN : ABOUT_ES
  const details = locale === 'en' ? PRODUCT_DETAILS_EN : PRODUCT_DETAILS_ES
  return {
    ...base,
    about,
    products: mergeProductDetails(base.products, details),
  }
}
