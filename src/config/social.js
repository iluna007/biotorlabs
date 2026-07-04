/** Enlaces oficiales — única fuente de verdad para redes sociales. */
export const SOCIAL_LINKS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/biotorlabs/',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/biotorlabs/',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/Biotorlabs',
  },
]

export const SOCIAL_BY_KEY = Object.fromEntries(
  SOCIAL_LINKS.map((item) => [item.key, item.url]),
)
