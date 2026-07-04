import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../context/SitePreferencesContext'
import { useLenis } from '../hooks/useLenis'
import { ASSETS } from '../config/assets'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { SocialLinks } from '../components/ui/SocialLinks'
import { AboutScene } from '../components/canvas/AboutScene'
import { AboutWebGLGallery } from '../components/canvas/AboutWebGLGallery'
import { AboutTextReveal, AboutLines } from '../components/about/AboutTextReveal'
import { AboutRevealImage } from '../components/about/AboutRevealImage'
import { AboutPinnedChapter } from '../components/about/AboutPinnedChapter'

gsap.registerPlugin(ScrollTrigger)

function TeamMember({ member }) {
  const [imgError, setImgError] = useState(false)
  return (
    <article className="about-team-card">
      <div className="about-team-card__avatar">
        {!imgError ? (
          <img src={member.img} alt={member.name} loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <span aria-hidden="true">👤</span>
        )}
      </div>
      <p className="about-team-card__role">{member.role}</p>
      <p className="about-team-card__name">{member.name}</p>
    </article>
  )
}

function splitParagraph(text, maxLen = 88) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLen && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  })
  if (current) lines.push(current)
  return lines
}

const STEP_IMAGES = [
  ASSETS.about.research,
  ASSETS.about.microscope,
  ASSETS.about.facility,
  ASSETS.about.cropsField,
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const railRef = useRef(null)
  const { about: ABOUT, ui } = useContent()
  const { page } = ABOUT
  useLenis()

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero__content > *',
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.35 },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const steps = gsap.utils.toArray('.about-process-step')
    if (!steps.length) return

    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: step,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('.about-page [data-chapter-link]')
    if (!links.length) return

    const triggers = []
    links.forEach((link) => {
      const id = link.getAttribute('data-chapter-link')
      triggers.push(ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          document
            .querySelectorAll(`.about-page [data-chapter-link="${id}"]`)
            .forEach((el) => el.classList.toggle('is-active', self.isActive))
        },
      }))
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const philosophyBeats = [
    {
      id: 'intro',
      image: ASSETS.about.soilTexture,
      imageAlt: 'Textura de suelo vivo',
      caption: page.imageCaptions?.soil,
      content: (
        <>
          <p className="section-eyebrow">{ABOUT.philosophy.eyebrow}</p>
          <h2 className="section-title about-pinned-copy__title">{ABOUT.philosophy.title}</h2>
          <p className="section-body">{ABOUT.philosophy.intro}</p>
        </>
      ),
    },
    {
      id: 'soil',
      image: ASSETS.about.cropsField,
      imageAlt: 'Cultivos en campo',
      caption: page.imageCaptions?.crops,
      content: (
        <>
          <p className="about-pinned-copy__step">{page.philosophySteps?.[0] || '01 — El suelo'}</p>
          <h3 className="about-beat__heading">{ABOUT.philosophy.soilTitle}</h3>
          <p className="section-body">{ABOUT.philosophy.soilBody}</p>
          <p className="about-quote">{ABOUT.philosophy.soilFact}</p>
        </>
      ),
    },
    {
      id: 'problem',
      image: ASSETS.about.research,
      imageAlt: 'Investigación agrícola',
      caption: page.imageCaptions?.research,
      content: (
        <>
          <p className="about-pinned-copy__step">{page.philosophySteps?.[1] || '02 — El reto'}</p>
          <h3 className="about-beat__heading about-beat__heading--warn">{ABOUT.philosophy.problemTitle}</h3>
          <p className="section-body">{ABOUT.philosophy.problemBody}</p>
          <ul className="about-list">
            {ABOUT.philosophy.problemItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </>
      ),
    },
    {
      id: 'solution',
      image: ASSETS.about.microscope,
      imageAlt: 'Microbiología aplicada',
      caption: page.imageCaptions?.microscope,
      layout: 'portrait',
      content: (
        <>
          <p className="about-pinned-copy__step">{page.philosophySteps?.[2] || '03 — La respuesta'}</p>
          <h3 className="about-beat__heading">{ABOUT.philosophy.solutionTitle}</h3>
          <p className="section-body">{ABOUT.philosophy.solutionBody}</p>
          <p className="about-footnote">{ABOUT.philosophy.solutionFootnote}</p>
        </>
      ),
    },
  ]

  return (
    <div className="about-page">
      <div className="about-page__media" aria-hidden="true">
        <video className="about-page__video" autoPlay muted loop playsInline poster={ASSETS.about.poster}>
          <source src={ASSETS.about.video} type="video/mp4" />
        </video>
        <AboutScene />
        <div className="about-page__scrim" />
      </div>

      <AboutWebGLGallery />
      <Navbar />

      <nav className="about-mobile-nav" aria-label={page.railLabel}>
        {page.chapters.map(({ id, label }) => (
          <a key={id} href={`#${id}`} data-chapter-link={id} className="about-mobile-nav__link">
            {label}
          </a>
        ))}
      </nav>

      <nav ref={railRef} className="about-rail" aria-label={page.railLabel}>
        {page.chapters.map(({ id, label }) => (
          <a key={id} href={`#${id}`} data-chapter-link={id} className="about-rail__link">
            <span className="about-rail__dot" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>

      <main className="about-page__main">
        <header ref={heroRef} className="about-hero">
          <div className="about-hero__content">
            <p className="section-eyebrow">{page.heroEyebrow}</p>
            <h1 className="about-hero__title">
              {page.heroLine1}<br />
              <span className="about-hero__accent">{page.heroAccent}</span><br />
              {page.heroLine2}
            </h1>
            <p className="about-hero__subtitle">{page.heroSubtitle}</p>
            {page.flowLabel && (
              <p className="about-hero__flow">{page.flowLabel}</p>
            )}
            {page.trustPills?.length > 0 && (
              <ul className="about-hero__trust" aria-label={page.trustLabel}>
                {page.trustPills.map((pill) => (
                  <li key={pill}>{pill}</li>
                ))}
              </ul>
            )}
            <div className="about-hero__stats">
              {page.stats.map((stat) => (
                <div key={stat.label} className="about-hero__stat">
                  <span className="about-hero__stat-num">{stat.num}</span>
                  <span className="about-hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="origins" className="about-chapter" data-chapter="origins">
          <div className="about-editorial about-editorial--feature">
            <div className="about-editorial__text">
              <AboutTextReveal>
                <p className="section-eyebrow about-line-mask"><span className="about-line">{ABOUT.who.eyebrow}</span></p>
                <h2 className="section-title about-editorial__title about-line-mask">
                  <span className="about-line">{ABOUT.who.title}</span>
                </h2>
                <AboutLines lines={splitParagraph(ABOUT.who.intro)} className="about-editorial__body" />
              </AboutTextReveal>
              <div className="about-editorial__cards">
                {[ABOUT.who.vision, ABOUT.who.mission].map((item) => (
                  <div key={item.label} className="about-card">
                    <p className="about-card__label">{item.label}</p>
                    <p className="about-card__text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <AboutRevealImage
              src={ASSETS.about.brotesField}
              alt="Brotes en campo"
              className="about-editorial__media about-editorial__media--tall"
              caption={page.imageCaptions?.brotes}
            />
          </div>
        </section>

        <AboutPinnedChapter
          id="philosophy"
          label={ABOUT.philosophy.eyebrow}
          beats={philosophyBeats}
          end="+=320%"
        />

        <section id="process" className="about-chapter" data-chapter="process">
          <div className="about-process-intro">
            <AboutTextReveal start="top 80%">
              <p className="section-eyebrow about-line-mask"><span className="about-line">{ABOUT.what.eyebrow}</span></p>
              <h2 className="section-title about-line-mask"><span className="about-line">{ABOUT.what.title}</span></h2>
              <AboutLines lines={splitParagraph(ABOUT.what.intro)} />
              <p className="about-footnote about-line-mask"><span className="about-line">{ABOUT.what.cepario}</span></p>
            </AboutTextReveal>
            <AboutRevealImage src={ASSETS.about.labTubes} alt="Laboratorio" className="about-process-intro__media" />
          </div>

          <div className="about-process-grid">
            {ABOUT.what.steps.map((step, i) => (
              <article key={step.num} className={`about-process-step about-process-step--${i + 1}`}>
                <AboutRevealImage src={STEP_IMAGES[i]} alt={step.title} className="about-process-step__media" />
                <div className="about-process-step__body">
                  <span className="about-step__num">{step.num}</span>
                  <h3 className="about-step__title"><span aria-hidden="true">{step.icon}</span> {step.title}</h3>
                  <p className="section-body">{step.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="about-specialties-wrap">
            <p className="section-eyebrow">{page.specialtiesEyebrow}</p>
            <div className="about-specialties">
              {ABOUT.what.specialties.map((spec) => (
                <div key={spec.label} className="about-specialty" style={{ '--spec-color': spec.color }}>
                  <span className="about-specialty__dot" />
                  <div>
                    <p className="about-specialty__label">{spec.label}</p>
                    <p className="about-specialty__desc">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="about-chapter" data-chapter="team">
          <div className="about-editorial about-editorial--feature about-editorial--reverse">
            <div className="about-editorial__text">
              <AboutTextReveal>
                <p className="section-eyebrow about-line-mask"><span className="about-line">{page.teamEyebrow}</span></p>
                <h2 className="section-title about-line-mask"><span className="about-line">{ABOUT.who.teamTitle}</span></h2>
                <AboutLines lines={splitParagraph(ABOUT.who.teamBody)} />
                <p className="about-footnote about-line-mask"><span className="about-line">{ABOUT.who.teamNote}</span></p>
              </AboutTextReveal>
              <div className="about-team-grid">
                {ABOUT.who.team.map((member) => (
                  <TeamMember key={member.name} member={member} />
                ))}
              </div>
            </div>
            <AboutRevealImage src={ASSETS.about.facility} alt="Instalaciones Biotor" className="about-editorial__media" />
          </div>

          <div className="about-card about-card--wide about-presence">
            <h3 className="about-beat__heading">{ABOUT.who.presenceTitle}</h3>
            <p className="section-body">{ABOUT.who.presenceBody}</p>
            <div className="about-countries">
              {ABOUT.who.countries.map((country) => (
                <span key={country} className="about-country-tag">{country}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="about-chapter about-chapter--contact" data-chapter="contact">
          <AboutTextReveal>
            <p className="section-eyebrow about-line-mask"><span className="about-line">{page.contactEyebrow}</span></p>
            <h2 className="section-title about-line-mask"><span className="about-line">{page.contactTitle}</span></h2>
          </AboutTextReveal>
          <div className="about-contact-grid">
            <div>
              <p className="about-contact__label">{page.locationLabel}</p>
              <p className="section-body">{ABOUT.contact.address}</p>
            </div>
            <div>
              <p className="about-contact__label">{page.emailLabel}</p>
              <a href={`mailto:${ABOUT.contact.email}`} className="about-contact__link">{ABOUT.contact.email}</a>
            </div>
            <div>
              <p className="about-contact__label">{page.socialLabel}</p>
              <SocialLinks className="about-contact-social" variant="icon" iconSize={22} ariaLabel={ui.socialNavLabel} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
