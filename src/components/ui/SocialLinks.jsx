import { SocialIcon } from './SocialIcon'
import { SOCIAL_LINKS } from '../../config/social'

export function SocialLinks({
  className = '',
  iconSize = 20,
  variant = 'pill',
  ariaLabel,
}) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {SOCIAL_LINKS.map(({ key, label, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={variant === 'icon' ? 'social-link social-link--icon' : 'social-link'}
        >
          {variant === 'icon' ? (
            <SocialIcon network={key} size={iconSize} />
          ) : (
            label
          )}
        </a>
      ))}
    </nav>
  )
}
