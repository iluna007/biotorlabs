// src/config/content.js
// Todo el contenido del landing extraído de biotorlabs.com
// Edita aquí para actualizar textos sin tocar los componentes React

export const CONTENT = {

  brand: {
    name:     'Biotor Labs',
    product:  'TrichoMax+',
    tagline:  'Biofungicida & Bioestimulante Premium',
    organism: 'Trichoderma asperellum Ta.13 (BCC-101)',
    contact:  'info@biotorlabs.com',
    location: 'Km 109.5 Carretera Panamericana, Sébaco – San Isidro, Nicaragua',
    social: {
      linkedin:  'https://www.linkedin.com/company/biotorlabs/',
      instagram: 'https://www.instagram.com/biotorlabs/',
      facebook:  'https://www.facebook.com/Biotorlabs',
    },
  },

  // ── HERO ────────────────────────────────────────────────────────────────
  hero: {
    eyebrow:  'Biotor Labs — Control Biológico Premium',
    title:    ['La evolución del', 'suelo vivo'],
    titleAccent: 'empieza aquí abajo',
    subtitle: 'TrichoMax+ activa la cepa exclusiva Trichoderma asperellum Ta.13, diseñada especialmente para Arroz, Caña de Azúcar y Maní. Más raíces, más protección, más cosecha.',
    cta:      'Descubre la Ciencia ↓',
  },

  // ── CIENCIA / MECANISMOS ────────────────────────────────────────────────
  science: {
    eyebrow: 'La Ciencia detrás',
    title:   ['Cepa seleccionada,', 'resultados probados'],
    body:    'TrichoMax+ es la evolución de TrichoMax, basado en la cepa exclusiva y seleccionada de Biotor: Trichoderma asperellum Ta.13 (=BCC-101). Una formulación más concentrada y potente, con alta patogenicidad y notable capacidad de estimular el crecimiento.',
    mechanisms: [
      {
        id:    'competition',
        icon:  '⚔',
        title: 'Competencia',
        desc:  'La cepa Ta.13 se caracteriza por su velocidad de crecimiento y antibiosis: produce metabolitos tóxicos que inhiben hongos fitopatógenos, asegurando un control efectivo por colonización de espacio.',
      },
      {
        id:    'parasitism',
        icon:  '🔬',
        title: 'Micoparasitismo',
        desc:  'Produce una amplia variedad de enzimas —glucanasas, celulasas, proteasas, quitinasas— que destruyen la pared celular de los hongos patógenos del suelo.',
      },
      {
        id:    'endophytism',
        icon:  '🌿',
        title: 'Endofitismo',
        desc:  'La cepa Ta.13 coloniza endofíticamente las raíces, estableciendo una relación simbiótica con la planta. Potencia la actividad microbiana rizosférica y favorece el equilibrio biológico del suelo.',
      },
    ],
  },

  // ── CÓMO FUNCIONA (BIOESTIMULANTE) ─────────────────────────────────────
  howItWorks: {
    eyebrow: 'Bioestimulante',
    title:   ['De la raíz', 'a la cosecha'],
    steps: [
      {
        num:   '01',
        title: 'Resistencia Sistémica',
        desc:  'Induce mecanismos de resistencia sistémica en las plantas, preparándolas para enfrentar el estrés biótico y abiótico.',
      },
      {
        num:   '02',
        title: 'Hormona de Crecimiento',
        desc:  'Produce ácido indolacético (AIA), la principal fitohormona del crecimiento, estimulando directamente el desarrollo de raíces y tallos.',
      },
      {
        num:   '03',
        title: 'Solubilización de Nutrientes',
        desc:  'Solubiliza el fósforo y otros nutrientes poco disponibles para la planta, mejorando la eficiencia de la fertilización.',
      },
      {
        num:   '04',
        title: 'Red de Micelios',
        desc:  'Crea una red de micelios que crece junto a las raíces, a través de la cual transloca nutrientes y agua directamente a la planta.',
      },
    ],
  },

  // ── RESULTADOS ──────────────────────────────────────────────────────────
  results: {
    eyebrow: 'Resultados',
    title:   ['Los números', 'no mienten'],
    stats: [
      { value: 340, unit: '%', label: 'Más biomasa radicular' },
      { value: 40,  unit: '%', label: 'Mayor rendimiento' },
      { value: 72,  unit: 'h', label: 'Primeros efectos' },
      { value: 3,   unit: '+', label: 'Cultivos objetivo' },
    ],
    disclaimer: 'Ensayos realizados en cultivos de Arroz, Caña de Azúcar y Maní en condiciones de campo. Resultados pueden variar según condiciones agronómicas.',
    crops: ['Arroz', 'Caña de Azúcar', 'Maní'],
  },

  // ── PRODUCTO / COMPRA ───────────────────────────────────────────────────
  buy: {
    eyebrow: 'TrichoMax+',
    title:   'Elige tu presentación',
    productName: 'TrichoMax+ WP',
    productDesc: 'Biofungicida y Bioestimulante a base de Trichoderma asperellum Ta.13. Formulación en polvo mojable (WP) de alta concentración.',
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
      'Ambientalmente seguro',
      'Soporte técnico agronómico',
      'Compatible con sistemas convencionales',
    ],
  },

  // ── NAVBAR ──────────────────────────────────────────────────────────────
  nav: {
    brand: 'BIOTOR',
    brandAccent: 'LABS',
    links: ['La Ciencia', 'Cómo Funciona', 'Resultados'],
    cta:   'Solicitar Info',
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────
  footer: {
    copyright: '© 2025 Biotor Labs. Todos los derechos reservados.',
    tagline:   'Microbiología al servicio de la agricultura.',
  },
}
