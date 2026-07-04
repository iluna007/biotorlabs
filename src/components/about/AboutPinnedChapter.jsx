import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery, BP } from '../../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

/**
 * Capítulo pinned en desktop; apilado en tablet/móvil y con movimiento reducido.
 */
export function AboutPinnedChapter({ id, label, beats, end = '+=280%' }) {
  const ref = useRef(null)
  const isTablet = useMediaQuery(BP.tablet)
  const prefersReducedMotion = useMediaQuery(BP.reducedMotion)
  const useStackedLayout = isTablet || prefersReducedMotion

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [useStackedLayout])

  useEffect(() => {
    const root = ref.current
    if (!root || !beats?.length || useStackedLayout) return

    const visuals = gsap.utils.toArray('.about-pinned-visual', root)
    const copies = gsap.utils.toArray('.about-pinned-copy', root)

    const ctx = gsap.context(() => {
      gsap.set(visuals, { autoAlpha: 0, scale: 1.06, clipPath: 'inset(100% 0 0 0)' })
      gsap.set(copies, { autoAlpha: 0, y: 40 })
      gsap.set(visuals[0], { autoAlpha: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' })
      gsap.set(copies[0], { autoAlpha: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end,
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      const hold = 1.15
      const trans = 0.65

      beats.forEach((_, i) => {
        if (i > 0) {
          tl.to(visuals[i - 1], {
            autoAlpha: 0,
            scale: 0.98,
            clipPath: 'inset(0 0 100% 0)',
            duration: trans,
          }, `beat-${i}`)
          tl.to(copies[i - 1], { autoAlpha: 0, y: -28, duration: trans * 0.85 }, `beat-${i}`)
          tl.fromTo(
            visuals[i],
            { autoAlpha: 0, scale: 1.05, clipPath: 'inset(100% 0 0 0)' },
            { autoAlpha: 1, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: trans },
            `beat-${i}+=0.08`,
          )
          tl.fromTo(
            copies[i],
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: trans },
            `beat-${i}+=0.12`,
          )
        }
        tl.to({}, { duration: i === beats.length - 1 ? hold * 0.7 : hold })
      })
    }, root)

    return () => ctx.revert()
  }, [beats, end, useStackedLayout])

  if (useStackedLayout) {
    return (
      <section ref={ref} id={id} className="about-pinned-chapter about-pinned-chapter--stacked" data-chapter={id}>
        {label && <div className="about-chapter__label"><span>{label}</span></div>}
        <div className="about-pinned-chapter__stack">
          {beats.map((beat, i) => (
            <article key={beat.id || i} className="about-pinned-beat">
              <figure className={`about-pinned-visual about-pinned-visual--${beat.layout || 'cover'}`}>
                <img src={beat.image} alt={beat.imageAlt || ''} loading="lazy" decoding="async" />
                {beat.caption && <figcaption>{beat.caption}</figcaption>}
              </figure>
              <div className="about-pinned-copy">{beat.content}</div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id={id} className="about-pinned-chapter" data-chapter={id}>
      {label && <div className="about-chapter__label"><span>{label}</span></div>}

      <div className="about-pinned-chapter__stage">
        <div className="about-pinned-chapter__visual-col">
          <div className="about-pinned-chapter__visual-stack">
            {beats.map((beat, i) => (
              <figure
                key={beat.id || i}
                className={`about-pinned-visual about-pinned-visual--${beat.layout || 'cover'}`}
                data-beat={i}
              >
                <img src={beat.image} alt={beat.imageAlt || ''} loading="lazy" decoding="async" />
                {beat.caption && <figcaption>{beat.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>

        <div className="about-pinned-chapter__copy-col">
          {beats.map((beat, i) => (
            <div key={beat.id || i} className="about-pinned-copy" data-beat={i}>
              {beat.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
