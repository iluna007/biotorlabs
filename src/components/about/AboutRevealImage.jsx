export function AboutRevealImage({ src, alt = '', className = '', caption, native = false }) {
  return (
    <figure
      className={`about-reveal-media${native ? ' about-reveal-media--native' : ''} ${className}`.trim()}
      {...(!native && { 'data-about-reveal': true })}
    >
      <div className="about-reveal-media__frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption className="about-reveal-media__caption">{caption}</figcaption>}
    </figure>
  )
}
