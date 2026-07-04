export function AboutRevealImage({ src, alt = '', className = '', caption }) {
  return (
    <figure className={`about-reveal-media ${className}`.trim()} data-about-reveal>
      <div className="about-reveal-media__frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption className="about-reveal-media__caption">{caption}</figcaption>}
    </figure>
  )
}
