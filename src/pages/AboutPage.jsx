// src/pages/AboutPage.jsx
// Página "Sobre Nosotros" — consolida concepto, quiénes somos y qué hacemos

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ABOUT = {
  philosophy: {
    eyebrow: 'Nuestra Filosofía',
    title: 'Cepas seleccionadas y exclusivas',
    intro: 'En Biotor aislamos de la naturaleza microorganismos benéficos para las plantas. Cada microorganismo, incluso de una misma especie, presenta diferentes características y cualidades que definen sus potencialidades. Basamos nuestro éxito en el estudio y selección de cada cepa, asegurando los máximos estándares de calidad.',
    soilTitle: 'El suelo: un ecosistema vivo',
    soilBody: 'El suelo no es un elemento estático, por el contrario, es todo un ecosistema vivo y dinámico compuesto por materia orgánica y seres vivos de todo tipo. El reto es alcanzar una productividad agrícola óptima manteniendo un equilibrio biológico que garantice un suelo vivo y saludable.',
    soilFact: 'Según la FAO, el 95% de nuestros alimentos se producen directa o indirectamente en los suelos.',
    problemTitle: 'El problema: degradación del equilibrio microbiano',
    problemBody: 'Con el fin de asegurar una alta producción y rentabilidad, la agricultura intensiva ha dado lugar al uso excesivo de sustancias agroquímicas. Este sistema conduce a la pérdida de biodiversidad microbiana, generando un desequilibrio a favor de microorganismos oportunistas y patógenos, acelerando la reducción de la actividad microbiana y las propiedades del suelo.',
    problemItems: [
      'Menor retorno de materia orgánica y nutrientes',
      'Aumento de microorganismos oportunistas y patógenos',
      'Menor diversidad microbiana y rendimiento de cultivos',
    ],
    solutionTitle: 'Nuestra solución: microorganismos benéficos',
    solutionBody: 'Los microorganismos beneficiosos son los compañeros ideales de las plantas: transforman materia orgánica y minerales en nutrientes, controlan plagas y enfermedades, y mejoran la absorción de agua. Biotor propone una estrategia centrada en el uso de microorganismos seleccionados y exclusivos como agentes de control biológico y bioestimulantes.',
    solutionFootnote: 'Según la FAO, los suelos saludables contribuyen a mitigar el cambio climático al mantener o aumentar su contenido de carbono.',
  },

  who: {
    eyebrow: 'Quiénes Somos',
    title: 'Biotecnología agrícola de alto desempeño',
    intro: 'En Biotor somos expertos en investigación, desarrollo y producción de soluciones biológicas innovadoras para la agricultura. Ayudamos a los agricultores a potenciar el rendimiento de sus cultivos y superar el reto de la sostenibilidad.',
    vision: {
      label: 'Visión',
      text: 'Ser líderes en el sector de la Biotecnología Agrícola a través de soluciones innovadoras y apoyo técnico para satisfacer las necesidades del agricultor.',
    },
    mission: {
      label: 'Misión',
      text: 'Desarrollar y producir Bioproductos para la agricultura, a partir de cepas seleccionadas y exclusivas por su efectividad y excelente adaptabilidad, brindando el respaldo técnico y científico a nuestros distribuidores exclusivos.',
    },
    teamTitle: 'Nuestro Equipo',
    teamBody: 'Contamos con un equipo de 48 profesionales altamente calificados, liderados por Ingenieros Agrónomos, Masters en Administración de Empresas y Doctores en Ciencias Agrícolas, especializados en desarrollo comercial e investigación agrícola.',
    teamNote: 'En Biotor crecemos gracias al trabajo y compromiso de nuestro capital humano. Somos una compañía con valores sólidos y nos esforzamos por atraer y retener el talento para buscar siempre la excelencia.',
    team: [
      {
        name: 'Ing. Luis Fernando Torres MBA',
        role: 'Gerente General',
        img: 'https://static.wixstatic.com/media/144032_63ea1dd3231945a082961b6d6e2f971f~mv2.jpg/v1/fill/w_193,h_194,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Foto%20Luis%20v2.jpg',
      },
      {
        name: 'Ing. Milton Pineda',
        role: 'Gerente Comercial',
        img: 'https://static.wixstatic.com/media/144032_03c0086c8be0463fb3c2509e9d341f04~mv2.jpg/v1/fill/w_193,h_194,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Foto%20Milton%20v2.jpg',
      },
    ],
    presenceTitle: 'Presencia Internacional',
    presenceBody: 'Biotor comparte su experiencia en el ámbito internacional a través de sus socios comerciales.',
    countries: ['Nicaragua', 'Costa Rica', 'Panamá', 'República Dominicana', 'Honduras', 'Perú', 'México'],
    commitment: 'Biotor se encuentra comprometido con el desarrollo local. Fomentamos el uso de agentes de control microbiano en una agricultura sostenible, aumentando la confianza en los bioproductos como factores claves en mercados con estándares cada vez más altos.',
  },

  what: {
    eyebrow: 'Áreas de Especialidad Biológica',
    title: 'De la investigación a la cosecha',
    intro: 'Biotor se centra en comprender los mecanismos de los microorganismos como formas de control natural de plagas y promotores del crecimiento de las plantas y sus raíces.',
    cepario: 'Mediante aislamientos microbianos dirigidos, contamos con un cepario de más de 100 microorganismos seleccionados de diversos ecosistemas.',
    steps: [
      {
        num: '01',
        title: 'Investigar',
        body: 'Realizamos una exhaustiva prospección y selección de los microorganismos que, por sus características, pueden ayudar a los agricultores a maximizar sus cosechas.',
        icon: '🔬',
      },
      {
        num: '02',
        title: 'Desarrollar',
        body: 'Según las necesidades del mercado, se estudian y prueban los candidatos en nuestro Departamento de Innovación y Desarrollo de Soluciones (IDS). El resultado es una cepa competitiva y exclusiva que se convierte en una solución biotecnológica.',
        icon: '🧬',
      },
      {
        num: '03',
        title: 'Producir',
        body: 'Los resultados de nuestras investigaciones son los productos que desarrollamos, evaluamos y producimos en nuestras instalaciones, bajo un estricto control de calidad que asegura la consistencia.',
        icon: '🏭',
      },
      {
        num: '04',
        title: 'Comercializar',
        body: 'Nuestro Equipo IDS, con el soporte de nuestro Laboratorio de Diagnóstico, brinda apoyo especializado al agricultor y distribuidor exclusivo en cada mercado.',
        icon: '🌍',
      },
    ],
    specialties: [
      { label: 'Biofungicidas', color: '#8bc34a', desc: 'Control de hongos fitopatógenos del suelo' },
      { label: 'Bionematicidas', color: '#e8a020', desc: 'Control de nematodos fitoparásitos' },
      { label: 'Bioinsecticidas', color: '#e76f51', desc: 'Control de insectos plaga del suelo y follaje' },
      { label: 'Bioestimulantes', color: '#2a9d8f', desc: 'Estimulación del crecimiento y absorción de nutrientes' },
    ],
  },

  contact: {
    address: 'Kilómetro 109.5 Carretera Panamericana, Sébaco – San Isidro, Nicaragua',
    email: 'info@biotorlabs.com',
    social: {
      LinkedIn: 'https://www.linkedin.com/company/biotorlabs/',
      Instagram: 'https://www.instagram.com/biotorlabs/',
      Facebook: 'https://www.facebook.com/Biotorlabs',
    },
  },
}

function FadeInBlock({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      },
    )
  }, [delay])
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

function TeamMember({ member }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{
      border: '1px solid rgba(139,195,74,0.14)',
      borderRadius: '8px',
      background: 'rgba(15,22,10,0.6)',
      backdropFilter: 'blur(12px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', textAlign: 'center',
      padding: '2rem 1.5rem', minWidth: '200px',
    }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        overflow: 'hidden', marginBottom: '1rem',
        border: '2px solid rgba(139,195,74,0.3)',
        background: 'rgba(139,195,74,0.08)',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem',
      }}>
        {!imgError ? (
          <img
            src={member.img}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">👤</span>
        )}
      </div>
      <p style={{ fontSize: '0.6rem', color: '#8bc34a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
        {member.role}
      </p>
      <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#d4ffba', lineHeight: 1.3 }}>
        {member.name}
      </p>
    </div>
  )
}

const S = {
  page: {
    background: '#0a0f07',
    color: '#edf0e8',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  hero: {
    minHeight: '55vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center',
    padding: '120px 2rem 4rem',
    borderBottom: '1px solid rgba(139,195,74,0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  section: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '6rem 2rem',
    borderBottom: '1px solid rgba(139,195,74,0.08)',
  },
  eyebrow: {
    fontSize: '0.65rem', letterSpacing: '0.4em',
    textTransform: 'uppercase', color: '#8bc34a',
    marginBottom: '1rem', fontWeight: 600,
  },
  h2: {
    fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
    fontWeight: 900, lineHeight: 1.05,
    color: '#edf0e8', letterSpacing: '-0.04em',
    marginBottom: '1.5rem',
  },
  body: {
    fontSize: '0.96rem', color: '#7a9f6a',
    lineHeight: 1.8, maxWidth: '680px',
  },
  card: {
    padding: '1.4rem 1.6rem',
    border: '1px solid rgba(139,195,74,0.14)',
    borderRadius: '8px',
    background: 'rgba(15,22,10,0.6)',
    backdropFilter: 'blur(12px)',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.2rem',
  },
}

export default function AboutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div style={S.page}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.2rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(139,195,74,0.1)',
        background: 'rgba(10,15,7,0.85)',
      }}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            background: 'transparent', border: 'none',
            color: '#8bc34a', cursor: 'pointer',
            fontSize: '0.82rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', display: 'flex',
            alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0',
          }}
        >
          ← Volver al inicio
        </button>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#d4ffba', letterSpacing: '-0.01em' }}>
          BIOTOR<span style={{ color: '#8bc34a' }}>LABS</span>
        </div>
        <a
          href={`mailto:${ABOUT.contact.email}`}
          style={{
            color: '#6a8a5a', fontSize: '0.78rem',
            textDecoration: 'none', letterSpacing: '0.05em',
          }}
        >{ABOUT.contact.email}</a>
      </nav>

      <header style={S.hero}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(139,195,74,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ ...S.eyebrow, marginBottom: '1.2rem' }}>Biotor Labs</p>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: '-0.05em', marginBottom: '1.5rem',
            color: '#edf0e8',
          }}>
            Microbiología<br />
            <span style={{
              background: 'linear-gradient(135deg, #8bc34a, #d4ffba)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>al servicio</span><br />
            de la agricultura
          </h1>
          <p style={{ ...S.body, margin: '0 auto', textAlign: 'center', maxWidth: '560px' }}>
            Empresa de biotecnología agrícola especializada en soluciones biológicas de alto desempeño.
            Innovación, ciencia y sostenibilidad al servicio del agricultor.
          </p>
          <div style={{
            display: 'flex', gap: '3rem', justifyContent: 'center',
            marginTop: '3rem', flexWrap: 'wrap',
          }}>
            {[
              { num: '48', label: 'Profesionales' },
              { num: '100+', label: 'Cepas en cepario' },
              { num: '7', label: 'Países' },
              { num: '6', label: 'Bioproductos' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.2rem', fontWeight: 900,
                  color: '#8bc34a', letterSpacing: '-0.04em', lineHeight: 1,
                }}>{stat.num}</div>
                <div style={{ fontSize: '0.7rem', color: '#5a7a4a', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section style={S.section}>
        <FadeInBlock>
          <p style={S.eyebrow}>{ABOUT.who.eyebrow}</p>
          <h2 style={S.h2}>{ABOUT.who.title}</h2>
          <p style={{ ...S.body, marginBottom: '2.5rem' }}>{ABOUT.who.intro}</p>
        </FadeInBlock>

        <div style={S.grid2}>
          {[ABOUT.who.vision, ABOUT.who.mission].map((item, i) => (
            <FadeInBlock key={item.label} delay={i * 0.12}>
              <div style={S.card}>
                <p style={{
                  fontSize: '0.62rem', letterSpacing: '0.3em',
                  textTransform: 'uppercase', color: '#8bc34a',
                  marginBottom: '0.7rem', fontWeight: 700,
                }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '0.92rem', color: '#8a9f7a', lineHeight: 1.75 }}>
                  {item.text}
                </p>
              </div>
            </FadeInBlock>
          ))}
        </div>
      </section>

      <section style={S.section}>
        <FadeInBlock>
          <p style={S.eyebrow}>{ABOUT.philosophy.eyebrow}</p>
          <h2 style={S.h2}>{ABOUT.philosophy.title}</h2>
          <p style={{ ...S.body, marginBottom: '1rem' }}>{ABOUT.philosophy.intro}</p>
        </FadeInBlock>

        <FadeInBlock delay={0.1} style={{ margin: '3rem 0' }}>
          <div style={{
            ...S.card,
            borderColor: 'rgba(139,195,74,0.25)',
            padding: '2rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d4ffba', marginBottom: '0.8rem' }}>
                {ABOUT.philosophy.soilTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#7a9f6a', lineHeight: 1.8, marginBottom: '1rem' }}>
                {ABOUT.philosophy.soilBody}
              </p>
              <p style={{
                fontSize: '0.78rem', color: '#8bc34a',
                fontStyle: 'italic', paddingLeft: '0.8rem',
                borderLeft: '2px solid #8bc34a40',
              }}>
                {ABOUT.philosophy.soilFact}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffd4aa', marginBottom: '0.8rem' }}>
                {ABOUT.philosophy.problemTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#7a9f6a', lineHeight: 1.75, marginBottom: '1rem' }}>
                {ABOUT.philosophy.problemBody}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {ABOUT.philosophy.problemItems.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e76f51', flexShrink: 0, marginTop: '0.3rem', fontSize: '0.7rem' }}>▸</span>
                    <p style={{ fontSize: '0.82rem', color: '#6a8a5a', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInBlock>

        <FadeInBlock delay={0.2}>
          <div style={{
            ...S.card,
            borderColor: 'rgba(139,195,74,0.3)',
            background: 'rgba(139,195,74,0.04)',
            padding: '2rem 2.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d4ffba', marginBottom: '0.8rem' }}>
              {ABOUT.philosophy.solutionTitle}
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#8a9f7a', lineHeight: 1.8, marginBottom: '0.8rem' }}>
              {ABOUT.philosophy.solutionBody}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#5a7a4a', fontStyle: 'italic' }}>
              {ABOUT.philosophy.solutionFootnote}
            </p>
          </div>
        </FadeInBlock>
      </section>

      <section style={S.section}>
        <FadeInBlock>
          <p style={S.eyebrow}>{ABOUT.what.eyebrow}</p>
          <h2 style={S.h2}>{ABOUT.what.title}</h2>
          <p style={{ ...S.body, marginBottom: '0.8rem' }}>{ABOUT.what.intro}</p>
          <p style={{ ...S.body, fontSize: '0.85rem', color: '#5a7a4a', marginBottom: '3rem' }}>
            {ABOUT.what.cepario}
          </p>
        </FadeInBlock>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {ABOUT.what.steps.map((step, i) => (
            <FadeInBlock key={step.num} delay={i * 0.08}>
              <div style={{
                ...S.card,
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '1px solid rgba(139,195,74,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: '#8bc34a',
                    letterSpacing: '0.05em', fontFamily: 'monospace',
                    background: 'rgba(139,195,74,0.06)',
                    flexShrink: 0,
                  }}>{step.num}</div>
                  {i < ABOUT.what.steps.length - 1 && (
                    <div style={{ width: '1px', height: '100%', minHeight: '20px', background: 'rgba(139,195,74,0.15)', marginTop: '0.5rem' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{step.icon}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#d4ffba' }}>{step.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#7a9f6a', lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </div>
            </FadeInBlock>
          ))}
        </div>

        <FadeInBlock delay={0.1}>
          <p style={{ ...S.eyebrow, marginBottom: '1.2rem' }}>Áreas de especialidad</p>
          <div style={S.grid2}>
            {ABOUT.what.specialties.map(spec => (
              <div key={spec.label} style={{
                ...S.card,
                borderColor: spec.color + '30',
                background: spec.color + '06',
                display: 'flex', gap: '1rem', alignItems: 'center',
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: spec.color, flexShrink: 0,
                }} />
                <div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: spec.color, marginBottom: '0.2rem' }}>
                    {spec.label}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#5a7a4a', lineHeight: 1.5 }}>{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInBlock>
      </section>

      <section style={S.section}>
        <FadeInBlock>
          <p style={S.eyebrow}>Nuestro Equipo</p>
          <h2 style={S.h2}>{ABOUT.who.teamTitle}</h2>
          <p style={{ ...S.body, marginBottom: '0.8rem' }}>{ABOUT.who.teamBody}</p>
          <p style={{ ...S.body, fontSize: '0.85rem', color: '#5a7a4a', marginBottom: '2.5rem' }}>
            {ABOUT.who.teamNote}
          </p>
        </FadeInBlock>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {ABOUT.who.team.map((member, i) => (
            <FadeInBlock key={member.name} delay={i * 0.1}>
              <TeamMember member={member} />
            </FadeInBlock>
          ))}
        </div>

        <FadeInBlock delay={0.15}>
          <div style={{ ...S.card, padding: '2rem 2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d4ffba', marginBottom: '0.8rem' }}>
              {ABOUT.who.presenceTitle}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#7a9f6a', lineHeight: 1.75, marginBottom: '1.2rem' }}>
              {ABOUT.who.presenceBody}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {ABOUT.who.countries.map(country => (
                <span key={country} style={{
                  padding: '0.3rem 0.8rem',
                  border: '1px solid rgba(139,195,74,0.25)',
                  borderRadius: '2px', fontSize: '0.75rem',
                  color: '#8bc34a', letterSpacing: '0.05em',
                  background: 'rgba(139,195,74,0.05)',
                }}>{country}</span>
              ))}
            </div>
          </div>
        </FadeInBlock>
      </section>

      <section style={{ ...S.section, borderBottom: 'none' }}>
        <FadeInBlock>
          <p style={S.eyebrow}>Contacto</p>
          <h2 style={{ ...S.h2, marginBottom: '2rem' }}>Hablemos</h2>
        </FadeInBlock>

        <FadeInBlock delay={0.1}>
          <div style={{
            ...S.card,
            padding: '2.5rem',
            display: 'flex', flexWrap: 'wrap',
            gap: '2.5rem', alignItems: 'flex-start',
          }}>
            <div style={{ flex: '1 1 260px' }}>
              <p style={{ fontSize: '0.65rem', color: '#8bc34a', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Ubicación</p>
              <p style={{ fontSize: '0.9rem', color: '#8a9f7a', lineHeight: 1.7 }}>
                {ABOUT.contact.address}
              </p>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <p style={{ fontSize: '0.65rem', color: '#8bc34a', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</p>
              <a href={`mailto:${ABOUT.contact.email}`} style={{ fontSize: '0.9rem', color: '#8bc34a', textDecoration: 'none' }}>
                {ABOUT.contact.email}
              </a>
            </div>
            <div style={{ flex: '1 1 160px' }}>
              <p style={{ fontSize: '0.65rem', color: '#8bc34a', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Redes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(ABOUT.contact.social).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.82rem', color: '#6a8a5a', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8bc34a' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#6a8a5a' }}
                  >↗ {name}</a>
                ))}
              </div>
            </div>
          </div>
        </FadeInBlock>
      </section>
    </div>
  )
}
