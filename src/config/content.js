// src/config/content.js
// Contenido alineado a "Estrategia de Marketing Digital — Biotor Labs" (DOS 12 Studio)

import { productImage } from './assets'

export const CONTENT = {

  brand: {
    name:     'Biotor Labs',
    product:  'TrichoMax+',
    tagline:  'Soluciones biológicas con resultados reales.',
    organism: 'Trichoderma asperellum Ta.13 (BCC-101)',
    contact:  'info@biotorlabs.com',
    location: 'Km 109.5 Carretera Panamericana, Sébaco – San Isidro, Nicaragua',
    social: {
      linkedin:  'https://www.linkedin.com/company/biotorlabs/',
      instagram: 'https://www.instagram.com/biotorlabs/',
      facebook:  'https://www.facebook.com/Biotorlabs',
    },
  },

  // ── HERO — Portada estrategia ───────────────────────────────────────────
  hero: {
    eyebrow:     'Ciencia que convence · Marca que lidera',
    title:       ['Ciencia que', 'Marca que lidera.'],
    titleAccent: 'convence.',
    subtitle:    'Posicionando a Biotor Labs como la referencia técnica en biotecnología agrícola de Latinoamérica — con cepas seleccionadas, validación en campo y soporte real para productores y distribuidores en Centroamérica.',
    cta:         'Conoce la ciencia ↓',
    ctaSecondary: 'Quiero ser distribuidor',
    trustBadges: [
      'Autoridad técnica comprobada',
      'Evidencia real de campo',
      'Aliado genuino del productor',
      'Presencia en 5 países de Centroamérica',
    ],
  },

  // ── STATS BAR — Objetivos maestros ──────────────────────────────────────
  statsBar: {
    stats: [
      { num: '6',   label: 'Bioproductos validados',        suffix: '' },
      { num: '5',   label: 'Países en Centroamérica',       suffix: '' },
      { num: '100', label: 'Cepas en cepario',              suffix: '+' },
      { num: '48',  label: 'Profesionales especializados',  suffix: '' },
    ],
  },

  // ── CIENCIA — Pilar 1: Educación Técnica & Científica ───────────────────
  science: {
    eyebrow: 'Educación Técnica & Científica',
    title:   ['La diferencia está', 'en la cepa.'],
    body:    'Hay biológicos que prometen. Y hay biológicos que funcionan. La diferencia está en la cepa. No todos los Trichoderma son iguales. No todos los Bacillus controlan lo mismo. En Biotor, cada cepa que llevamos al campo pasó por un proceso de selección riguroso. No comercializamos por catálogo. Seleccionamos por desempeño.',
    mechanisms: [
      {
        id:    'species',
        icon:  '🧬',
        title: 'Especie y cepa específica',
        desc:  'La efectividad de un producto biológico depende de la especie y cepa utilizada — no del nombre comercial en la etiqueta.',
      },
      {
        id:    'mechanism',
        icon:  '⚔',
        title: 'Mecanismo de acción',
        desc:  'Cada cepa fue elegida por su capacidad de acción contra el patógeno objetivo: competencia, micoparasitismo o endofitismo comprobado.',
      },
      {
        id:    'soil',
        icon:  '🌱',
        title: 'Adaptación al suelo local',
        desc:  'Seleccionamos cepas que se establecen en las condiciones reales de los suelos centroamericanos — no en condiciones de laboratorio genéricas.',
      },
      {
        id:    'ufc',
        icon:  '📐',
        title: 'Concentración de UFC viables',
        desc:  'La calidad del proceso de fermentación y la concentración real de unidades formadoras de colonias al momento de aplicar marca la diferencia.',
      },
    ],
  },

  // ── DETRÁS DE LA CIENCIA — Pilar 3 ──────────────────────────────────────
  howItWorks: {
    eyebrow: 'Detrás de la Ciencia',
    title:   ['Selección rigurosa.', 'Validación en campo.'],
    steps: [
      {
        num:   '01',
        title: 'Evaluación en laboratorio',
        desc:  'Antes de que llegue a tu campo, cada cepa pasó por meses de evaluación: selección, microscopía, notación técnica y pruebas de viabilidad.',
      },
      {
        num:   '02',
        title: 'Selección por desempeño',
        desc:  'No comercializamos por catálogo. Desarrollamos tecnología que demuestra su valor en las condiciones reales de tu cultivo.',
      },
      {
        num:   '03',
        title: 'Validación en campo',
        desc:  'Ensayos con cultivos reales, productores reales y datos verificables. Los productos no se aprueban por marketing — se aprueban en campo.',
      },
      {
        num:   '04',
        title: 'Soporte técnico continuo',
        desc:  'Alianza genuina: acompañamiento real antes, durante y después de cada aplicación. No vendemos y desaparecemos.',
      },
    ],
  },

  // ── VOZ DE MARCA — Pilares de mensaje ───────────────────────────────────
  whyBiotor: {
    eyebrow:     'Cómo habla Biotor',
    title:       'Técnica sin arrogancia.',
    titleAccent: 'Confianza sin prepotencia.',
    body:        'La voz de Biotor es la de un científico apasionado que también es un aliado genuino del campo. Técnica sin arrogancia. Confianza sin prepotencia. Innovación con propósito. Orientada a evidencia, directa y sofisticada sin ser distante.',
    differentiators: [
      {
        title: 'Ciencia Real',
        body:  'Cepas seleccionadas, validadas, con mecanismos de acción comprobados. Terminología científica con claridad — nunca genérica.',
        icon:  '🔬',
      },
      {
        title: 'Resultados Comprobables',
        body:  'Ensayos de campo, datos concretos, testimonios verificables. Siempre con datos, siempre con sustento. Nunca promesas vacías.',
        icon:  '📊',
      },
      {
        title: 'Alianza Genuina',
        body:  'Soporte técnico real antes, durante y después de cada aplicación. Habla con respeto y cercanía al campo — sin condescendencia.',
        icon:  '🤝',
      },
    ],
  },

  // ── EVIDENCIA — Pilar 2: Resultados de Campo ────────────────────────────
  results: {
    eyebrow: 'Evidencia & Resultados de Campo',
    title:   ['Datos reales.', 'Resultados comprobables.'],
    stats: [
      { value: 78,  unit: '%', label: 'Reducción incidencia Botrytis' },
      { value: 70,  unit: '%', label: 'Parasitismo nematodos (1.er ciclo)' },
      { value: 340, unit: '%', label: 'Más biomasa radicular' },
      { value: 45,  unit: ' días', label: 'Evaluación de ensayo' },
    ],
    disclaimer: 'Ensayos realizados en condiciones reales de campo en Centroamérica. Resultado de referencia: tomate bajo invernadero, Guatemala — protocolo con biofungicida en 3 aplicaciones preventivas. Los datos completos están disponibles para distribuidores y agrónomos.',
    crops: ['Tomate', 'Arroz', 'Caña de Azúcar', 'Café'],
  },

  // ── TESTIMONIOS — Casos de evidencia ────────────────────────────────────
  testimonials: {
    eyebrow: 'Evidencia de Campo',
    title: ['Resultados reales.', 'Productores reales.'],
    items: [
      {
        quote: 'Cultivo de tomate bajo invernadero con alta presión de Botrytis. Tras 3 aplicaciones preventivas: 78% de reducción en incidencia, sin presión residual en fruto y cero días de carencia. El productor renovó protocolo para el siguiente ciclo.',
        author: 'Caso de referencia',
        role: 'Tomate · Guatemala',
      },
      {
        quote: 'Muchos biológicos en el mercado prometen y no cumplen. Con Biotor tenemos una línea que podemos recomendar con confianza — con soporte técnico real detrás y datos de ensayo que respaldan cada recomendación.',
        author: 'Distribuidor estratégico',
        role: 'Centroamérica',
      },
      {
        quote: 'Había probado biológicos que no funcionaron. Necesitaba ver evidencia real, no promesas. Los ensayos de Biotor me mostraron datos concretos antes de cambiar mis prácticas de manejo de cultivos.',
        author: 'Productor tecnificado',
        role: 'Hortalizas · CA',
      },
    ],
  },

  // ── CTA DISTRIBUIDORES — Objetivo 2 ─────────────────────────────────────
  distributorCTA: {
    eyebrow:    'Atracción de Distribuidores',
    title:      '¿Querés construir mercado con biológicos que tus clientes puedan recomendar con confianza?',
    body:       'Buscamos distribuidores estratégicos en Centroamérica que compartan nuestra filosofía técnica. Generamos alianzas con empresas que valoran el respaldo técnico para sus productores y toman decisiones basadas en datos y resultados de campo.',
    cta:        'Aplicar como distribuidor',
    ctaMailSubject: 'Aplicar como distribuidor Biotor',
    secondaryLink: 'Conocer más sobre Biotor →',
  },

  // ── PRODUCTO / COMPRA ───────────────────────────────────────────────────
  buy: {
    eyebrow: 'TrichoMax+',
    title:   'Elige tu presentación',
    productName: 'TrichoMax+ WP',
    productDesc: 'Biofungicida y Bioestimulante a base de Trichoderma asperellum Ta.13. Formulación en polvo mojable (WP) de alta concentración — cepa exclusiva con selección rigurosa y validación en campo.',
    plans: [
      {
        name:     'Pequeño Productor',
        weight:   '500 g',
        treats:   'Hasta 500 kg de semilla tratada',
        price:    'Consultar',
        note:     'Ideal para parcelas pequeñas y ensayos',
        cta:      'Solicitar Info',
        featured: false,
      },
      {
        name:     'Productor Comercial',
        weight:   '1 kg',
        treats:   'Hasta 1,000 kg de semilla tratada',
        price:    'Consultar',
        note:     'La presentación más solicitada',
        cta:      'Contactar Distribuidor',
        featured: true,
      },
      {
        name:     'Agro Industrial',
        weight:   '5 kg',
        treats:   'Cultivos de gran escala',
        price:    'Consultar',
        note:     'Para operaciones comerciales grandes',
        cta:      'Contactar Equipo',
        featured: false,
      },
    ],
    guarantees: [
      'Cepa exclusiva certificada BCC-101',
      'Seleccionada por desempeño, no por catálogo',
      'Soporte técnico agronómico en campo',
      'Datos de ensayo disponibles para distribuidores',
    ],
  },

  // ── NAVBAR ──────────────────────────────────────────────────────────────
  nav: {
    brand: 'BIOTOR',
    brandAccent: 'LABS',
    links: [
      { label: 'Ciencia Real', href: '#science' },
      { label: 'Detrás de la Ciencia', href: '#how-it-works' },
      { label: 'Evidencia', href: '#results' },
    ],
    about: 'Sobre Nosotros',
    cta:   'Solicitar Info',
  },

  ui: {
    scroll: 'Scroll',
    strainBadge: 'Cepa Ta.13 (BCC-101) — Exclusiva Biotor',
    cropsLabel: 'Cultivos:',
    requestInfo: 'Solicitar Info',
    learnMore: 'Ver más ↗',
    premium: '★ Premium',
    prevProduct: 'Producto anterior',
    nextProduct: 'Producto siguiente',
    goToProduct: (name) => `Ir a ${name}`,
    grayscaleOn: 'Restaurar color',
    grayscaleOff: 'Escala de grises',
    languageToggle: 'Cambiar idioma',
    accessToolbarLabel: 'Accesibilidad e idioma',
  },

  buyCarousel: {
    eyebrow: 'Marca & Propuesta de Valor',
    titlePrefix: 'Portafolio',
    titleAccent: 'Biotor Labs',
    subtitle: 'En Biotor no vendemos por precio. Vendemos por resultado. Cada producto fue seleccionado por desempeño en las condiciones reales de Centroamérica.',
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────
  footer: {
    tagline:   'Soluciones biológicas con resultados reales.',
    copyright: '© 2026 Biotor Labs. Todos los derechos reservados.',
    location:  'Km 109.5 Carretera Panamericana, Sébaco – San Isidro, Nicaragua',
    countries: 'Nicaragua · Guatemala · El Salvador · Honduras · Costa Rica',
    columns: [
      {
        heading: 'Empresa',
        links: [
          { label: 'Ciencia Real', href: '/#science' },
          { label: 'Detrás de la Ciencia', href: '/#how-it-works' },
          { label: 'Sobre Nosotros', href: '/nosotros', internal: true },
        ],
      },
      {
        heading: 'Productos',
        links: [
          { label: 'TrichoMax+',  href: 'https://www.biotorlabs.com/trichomax-1' },
          { label: 'TrichoMax',   href: 'https://www.biotorlabs.com/trichomax' },
          { label: 'Klamic',      href: 'https://www.biotorlabs.com/klamic' },
          { label: 'Cronox Plus', href: 'https://www.biotorlabs.com/cronox' },
          { label: 'Atropos',     href: 'https://www.biotorlabs.com/atropos' },
          { label: 'Invictus',    href: 'https://www.biotorlabs.com/invictus' },
        ],
      },
      {
        heading: 'Contacto',
        links: [
          { label: 'info@biotorlabs.com', href: 'mailto:info@biotorlabs.com' },
          { label: 'LinkedIn',   href: 'https://www.linkedin.com/company/biotorlabs/' },
          { label: 'Instagram',  href: 'https://www.instagram.com/biotorlabs/' },
          { label: 'Facebook',   href: 'https://www.facebook.com/Biotorlabs' },
        ],
      },
    ],
  },

  products: [
    {
      id: 'trichomax-plus',
      name: 'TrichoMax+',
      tagline: 'Control Biológico Premium',
      type: 'Biofungicida · Bioestimulante',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'Cepa seleccionada y exclusiva de Biotor — no comercializada por catálogo, sino por desempeño comprobado. Alta patogenicidad y notable capacidad de estimular el crecimiento. Validada en Arroz, Caña de Azúcar y Maní.',
      badges: ['Biofungicida', 'Bioestimulante'],
      crops: ['Arroz', 'Caña de Azúcar', 'Maní'],
      color: '#A8E063',
      accentColor: '#4CAF7D',
      url: 'https://www.biotorlabs.com/trichomax-1',
      imageUrl: productImage('trichomax-plus'),
      contactUrl: 'https://www.biotorlabs.com/fc-tr-1',
      featured: true,
    },
    {
      id: 'trichomax',
      name: 'TrichoMax',
      tagline: 'Trichoderma para Suelo',
      type: 'Biofungicida · Bioestimulante',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'La formulación original con la cepa Ta.13 de Biotor. Potencia la actividad microbiana rizosférica y favorece el equilibrio biológico del suelo con evidencia de campo verificable.',
      badges: ['Biofungicida', 'Bioestimulante'],
      crops: ['Múltiples cultivos'],
      color: '#2E8B57',
      accentColor: '#A8E063',
      url: 'https://www.biotorlabs.com/trichomax',
      imageUrl: productImage('trichomax'),
      contactUrl: 'https://www.biotorlabs.com/fc-tr-1',
      featured: false,
    },
    {
      id: 'klamic',
      name: 'Klamic',
      tagline: 'Control de Nemátodos',
      type: 'Bionematicida · Bioestimulante',
      organism: 'Pochonia chlamydosporia IMI SD-187 (=BCC-201)',
      description: 'Control biológico premium de nematodos fitoparásitos con datos reales de eficacia: hasta 70% de parasitismo de huevos en el primer ciclo. Recupera la salud radicular con sustento técnico.',
      badges: ['Bionematicida', 'Bioestimulante'],
      crops: ['Tomate', 'Pepino', 'Plátano', 'Otros'],
      color: '#e8a020',
      accentColor: '#ffeaaa',
      url: 'https://www.biotorlabs.com/klamic',
      imageUrl: productImage('klamic'),
      contactUrl: 'https://www.biotorlabs.com/fc-kl',
      featured: false,
    },
    {
      id: 'cronox',
      name: 'Cronox Plus',
      tagline: 'Control Hongos y Nemátodos',
      type: 'Biofungicida · Bionematicida · Bioestimulante',
      organism: 'T. asperellum Ta.13 + P. chlamydosporia IMI SD-187',
      description: 'Consorcio microbiano de doble acción con cepas seleccionadas por Biotor. Combina control antifúngico y nematicida en una sola aplicación — tecnología que demuestra su valor en campo.',
      badges: ['Biofungicida', 'Bionematicida', 'Bioestimulante'],
      crops: ['Múltiples cultivos'],
      color: '#2a9d8f',
      accentColor: '#a8ede8',
      url: 'https://www.biotorlabs.com/cronox',
      imageUrl: productImage('cronox'),
      contactUrl: 'https://www.biotorlabs.com/fc-cr',
      featured: false,
    },
    {
      id: 'atropos',
      name: 'Atropos',
      tagline: 'Beauveria & Metarhizium',
      type: 'Bioinsecticida · Endófito',
      organism: 'Beauveria bassiana BCC-403 + Metarhizium anisopliae BCC-305',
      description: 'Consorcio de cepas entomopatógenas seleccionadas para control de insectos plagas del suelo y follaje. Cepas con mecanismos de acción comprobados — no promesas genéricas.',
      badges: ['Bioinsecticida', 'Endófito'],
      crops: ['Café', 'Cítricos', 'Hortalizas'],
      color: '#e76f51',
      accentColor: '#ffd4c8',
      url: 'https://www.biotorlabs.com/atropos',
      imageUrl: productImage('atropos'),
      contactUrl: 'https://www.biotorlabs.com/fc-at',
      featured: false,
    },
    {
      id: 'invictus',
      name: 'Invictus',
      tagline: 'Sistema de Defensa Biológica',
      type: 'Bioinsecticida de Consorcio Triple',
      organism: 'B. bassiana BCC-411, BCC-414 + B. brongniartii BCC-405',
      description: 'Tres cepas de Beauveria en un solo producto — máxima versatilidad con selección rigurosa. Plasticidad ecológica superior para control de broca del café, Diaphorina citri y coleópteros.',
      badges: ['Bioinsecticida', 'Consorcio triple'],
      crops: ['Café', 'Cítricos', 'Coleópteros'],
      color: '#9b5de5',
      accentColor: '#e8d4ff',
      url: 'https://www.biotorlabs.com/invictus',
      imageUrl: productImage('invictus'),
      contactUrl: 'https://www.biotorlabs.com/fc-in',
      featured: false,
    },
  ],
}
