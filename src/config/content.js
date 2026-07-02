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

  products: [
    {
      id: 'trichomax-plus',
      name: 'TrichoMax+',
      tagline: 'Control Biológico Premium',
      type: 'Biofungicida · Bioestimulante',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'Cepa seleccionada y exclusiva de Biotor. Alta patogenicidad, notable capacidad de estimular el crecimiento. Diseñado especialmente para Arroz, Caña de Azúcar y Maní.',
      badges: ['Biofungicida', 'Bioestimulante'],
      crops: ['Arroz', 'Caña de Azúcar', 'Maní'],
      color: '#8bc34a',
      accentColor: '#d4ffba',
      url: 'https://www.biotorlabs.com/trichomax-1',
      imageUrl: 'https://static.wixstatic.com/media/144032_2fc47823dcbd4898a1e3e28459cbba56~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_395,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/TrichoMax%20Plus%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-tr-1',
      featured: true,
    },
    {
      id: 'trichomax',
      name: 'TrichoMax',
      tagline: 'Trichoderma para Suelo',
      type: 'Biofungicida · Bioestimulante',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'La formulación original de Trichoderma asperellum de Biotor. Potencia la actividad microbiana rizosférica y favorece el equilibrio biológico del suelo.',
      badges: ['Biofungicida', 'Bioestimulante'],
      crops: ['Múltiples cultivos'],
      color: '#6fa832',
      accentColor: '#c8f5a0',
      url: 'https://www.biotorlabs.com/trichomax',
      imageUrl: 'https://static.wixstatic.com/media/144032_2fc47823dcbd4898a1e3e28459cbba56~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_395,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/TrichoMax%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-tr-1',
      featured: false,
    },
    {
      id: 'klamic',
      name: 'Klamic',
      tagline: 'Control de Nemátodos',
      type: 'Bionematicida · Bioestimulante',
      organism: 'Pochonia chlamydosporia IMI SD-187 (=BCC-201)',
      description: 'Control biológico premium de nematodos fitoparásitos. Alta eficiencia: hasta 70% de parasitismo de huevos en el primer ciclo. Recupera la salud radicular del suelo.',
      badges: ['Bionematicida', 'Bioestimulante'],
      crops: ['Tomate', 'Pepino', 'Plátano', 'Otros'],
      color: '#e8a020',
      accentColor: '#ffeaaa',
      url: 'https://www.biotorlabs.com/klamic',
      imageUrl: 'https://static.wixstatic.com/media/144032_be43215a30c64b0eac77a09bd1d594c7~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_396,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Klamic%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-kl',
      featured: false,
    },
    {
      id: 'cronox',
      name: 'Cronox Plus',
      tagline: 'Control Hongos y Nemátodos',
      type: 'Biofungicida · Bionematicida · Bioestimulante',
      organism: 'T. asperellum Ta.13 + P. chlamydosporia IMI SD-187',
      description: 'Consorcio microbiano de doble acción. Combina el poder antifúngico de Trichoderma con el control nematicida de Pochonia en una sola aplicación.',
      badges: ['Biofungicida', 'Bionematicida', 'Bioestimulante'],
      crops: ['Múltiples cultivos'],
      color: '#2a9d8f',
      accentColor: '#a8ede8',
      url: 'https://www.biotorlabs.com/cronox',
      imageUrl: 'https://static.wixstatic.com/media/144032_a16816cf627e4027b8acf8043250941e~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_396,h_644,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cronox%20Plus.png',
      contactUrl: 'https://www.biotorlabs.com/fc-cr',
      featured: false,
    },
    {
      id: 'atropos',
      name: 'Atropos',
      tagline: 'Beauveria & Metarhizium',
      type: 'Bioinsecticida · Endófito',
      organism: 'Beauveria bassiana BCC-403 + Metarhizium anisopliae BCC-305',
      description: 'Consorcio de dos cepas entomopatógenas para control de insectos plagas del suelo y follaje. Causa epizootias: las esporas se dispersan entre insectos tras la infección.',
      badges: ['Bioinsecticida', 'Endófito'],
      crops: ['Café', 'Cítricos', 'Hortalizas'],
      color: '#e76f51',
      accentColor: '#ffd4c8',
      url: 'https://www.biotorlabs.com/atropos',
      imageUrl: 'https://static.wixstatic.com/media/144032_3179727de8cc4d4d89f3f354859adf36~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_395,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Atropos%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-at',
      featured: false,
    },
    {
      id: 'invictus',
      name: 'Invictus',
      tagline: 'Sistema de Defensa Biológica',
      type: 'Bioinsecticida de Consorcio Triple',
      organism: 'B. bassiana BCC-411, BCC-414 + B. brongniartii BCC-405',
      description: 'Tres cepas de Beauveria en un solo producto. Máxima versatilidad para control de broca del café, Diaphorina citri y coleópteros. Plasticidad ecológica superior.',
      badges: ['Bioinsecticida', 'Consorcio triple'],
      crops: ['Café', 'Cítricos', 'Coleópteros'],
      color: '#9b5de5',
      accentColor: '#e8d4ff',
      url: 'https://www.biotorlabs.com/invictus',
      imageUrl: 'https://static.wixstatic.com/media/144032_8a27a83e63964d8980d30636e6377bd9~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_395,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Invictus%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-in',
      featured: false,
    },
  ],
}
