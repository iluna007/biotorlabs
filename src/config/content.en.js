// src/config/content.en.js
// English content for the landing page
// Edit here to update texts without touching React components

export const CONTENT_EN = {

  brand: {
    name:     'Biotor Labs',
    product:  'TrichoMax+',
    tagline:  'Premium Biofungicide & Biostimulant',
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
    eyebrow:     'Biological solutions · Central America',
    title:       ['Biologicals that', 'prove'],
    titleAccent: 'their value in the field.',
    subtitle:    'Biotor Labs develops biotechnological solutions with selected strains, scientifically validated and backed by real field data — for growers and distributors who demand more.',
    cta:         'Discover the Science ↓',
    ctaSecondary: 'Become a distributor',
    trustBadges: [
      'Selected and exclusive strains',
      'Field validation with real data',
      'Technical support close to the grower',
      'Presence in 5 Central American countries',
    ],
  },

  statsBar: {
    stats: [
      { num: '6',   label: 'Bioproducts',              suffix: '' },
      { num: '5',   label: 'Central American countries', suffix: '' },
      { num: '100', label: 'Strains in culture collection', suffix: '+' },
      { num: '48',  label: 'Specialized professionals', suffix: '' },
    ],
  },

  whyBiotor: {
    eyebrow:     'Why Biotor?',
    title:       'The difference is',
    titleAccent: 'in the strain.',
    body:        'In a market full of promises, Biotor Labs stands out for one thing: measurable results. Every product went through a rigorous selection process. Every strain was chosen for performance, not price.',
    differentiators: [
      {
        title: 'Scientific strain selection',
        body:  'We do not work with generic strains. Each microorganism was selected and validated for its ability to adapt to Central American soils and deliver consistent results.',
        icon:  '🔬',
      },
      {
        title: 'Field validation, not on paper',
        body:  'Our products are not approved by marketing — they are approved in real trials, with real crops and real growers. Data is available for distributors and agronomists.',
        icon:  '📊',
      },
      {
        title: 'Technical support that stays',
        body:  'Behind every product is a technical team that understands the crop, the soil, and the grower. We do not sell and disappear. We follow every application closely.',
        icon:  '🤝',
      },
    ],
  },

  distributorCTA: {
    eyebrow:    'Distributor Network',
    title:      'Want to build market with biologicals that actually work?',
    body:       'We seek strategic distributors in Central America who share our technical philosophy and commitment to growers.',
    cta:        'Apply as distributor',
    ctaMailSubject: 'Apply as Biotor distributor',
    secondaryLink: 'Learn more about Biotor →',
  },

  // ── SCIENCE / MECHANISMS ────────────────────────────────────────────────
  science: {
    eyebrow: 'The Science Behind It',
    title:   ['Selected strain,', 'proven results'],
    body:    'TrichoMax+ is the evolution of TrichoMax, based on Biotor\'s exclusive and selected strain: Trichoderma asperellum Ta.13 (=BCC-101). A more concentrated and potent formulation, with high pathogenicity and a remarkable ability to stimulate growth.',
    mechanisms: [
      {
        id:    'competition',
        icon:  '⚔',
        title: 'Competition',
        desc:  'The Ta.13 strain is characterized by its growth rate and antibiosis: it produces toxic metabolites that inhibit phytopathogenic fungi, ensuring effective control through space colonization.',
      },
      {
        id:    'parasitism',
        icon:  '🔬',
        title: 'Mycoparasitism',
        desc:  'It produces a wide variety of enzymes — glucanases, cellulases, proteases, chitinases — that break down the cell walls of soil-borne pathogenic fungi.',
      },
      {
        id:    'endophytism',
        icon:  '🌿',
        title: 'Endophytism',
        desc:  'The Ta.13 strain colonizes roots endophytically, establishing a symbiotic relationship with the plant. It enhances rhizospheric microbial activity and promotes biological balance in the soil.',
      },
    ],
  },

  // ── HOW IT WORKS (BIOSTIMULANT) ─────────────────────────────────────────
  howItWorks: {
    eyebrow: 'Biostimulant',
    title:   ['From root', 'to harvest'],
    steps: [
      {
        num:   '01',
        title: 'Systemic Resistance',
        desc:  'Induces systemic resistance mechanisms in plants, preparing them to withstand biotic and abiotic stress.',
      },
      {
        num:   '02',
        title: 'Growth Hormone',
        desc:  'Produces indoleacetic acid (IAA), the primary plant growth hormone, directly stimulating root and stem development.',
      },
      {
        num:   '03',
        title: 'Nutrient Solubilization',
        desc:  'Solubilizes phosphorus and other nutrients with low plant availability, improving fertilization efficiency.',
      },
      {
        num:   '04',
        title: 'Mycelial Network',
        desc:  'Creates a mycelial network that grows alongside roots, through which it translocates nutrients and water directly to the plant.',
      },
    ],
  },

  // ── RESULTS ─────────────────────────────────────────────────────────────
  results: {
    eyebrow: 'Results',
    title:   ['The numbers', 'don\'t lie'],
    stats: [
      { value: 340, unit: '%', label: 'More root biomass' },
      { value: 40,  unit: '%', label: 'Higher yield' },
      { value: 72,  unit: 'h', label: 'First effects' },
      { value: 3,   unit: '+', label: 'Target crops' },
    ],
    disclaimer: 'Trials conducted on Rice, Sugarcane, and Peanut crops under field conditions. Results may vary depending on agronomic conditions.',
    crops: ['Rice', 'Sugarcane', 'Peanut'],
  },

  // ── PRODUCT / BUY ───────────────────────────────────────────────────────
  buy: {
    eyebrow: 'TrichoMax+',
    title:   'Choose your package',
    productName: 'TrichoMax+ WP',
    productDesc: 'Biofungicide and Biostimulant based on Trichoderma asperellum Ta.13. High-concentration wettable powder (WP) formulation.',
    plans: [
      {
        name:     'Small Producer',
        weight:   '500 g',
        treats:   'Up to 500 kg of treated seed',
        price:    'Inquire',
        note:     'Ideal for small plots and trials',
        cta:      'Request Info',
        featured: false,
      },
      {
        name:     'Commercial Producer',
        weight:   '1 kg',
        treats:   'Up to 1,000 kg of treated seed',
        price:    'Inquire',
        note:     'The most requested package',
        cta:      'Contact Distributor',
        featured: true,
      },
      {
        name:     'Agro Industrial',
        weight:   '5 kg',
        treats:   'Large-scale crops',
        price:    'Inquire',
        note:     'For large commercial operations',
        cta:      'Contact Team',
        featured: false,
      },
    ],
    guarantees: [
      'Exclusive certified BCC-101 strain',
      'Environmentally safe',
      'Agronomic technical support',
      'Compatible with conventional systems',
    ],
  },

  // ── NAVBAR ──────────────────────────────────────────────────────────────
  nav: {
    brand: 'BIOTOR',
    brandAccent: 'LABS',
    links: [
      { label: 'The Science', href: '#science' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Results', href: '#results' },
    ],
    about: 'About Us',
    cta:   'Request Info',
  },

  ui: {
    scroll: 'Scroll',
    strainBadge: 'Ta.13 Strain (BCC-101) — Biotor Exclusive',
    cropsLabel: 'Crops:',
    requestInfo: 'Request Info',
    learnMore: 'Learn more ↗',
    premium: '★ Premium',
    prevProduct: 'Previous product',
    nextProduct: 'Next product',
    goToProduct: (name) => `Go to ${name}`,
    grayscaleOn: 'Restore color',
    grayscaleOff: 'Grayscale',
    languageToggle: 'Change language',
    accessToolbarLabel: 'Accessibility & language',
  },

  buyCarousel: {
    eyebrow: 'Biotor Labs Portfolio',
    titlePrefix: 'Choose your',
    titleAccent: 'package',
    subtitle: 'Biological solutions with Biotor Labs\' selected and exclusive strains. Choose the ideal product for your crop.',
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: ['What growers', 'are saying'],
    items: [
      {
        quote: 'In two weeks I saw twice as many roots on my tomatoes. TrichoMax+ changed the way I fertilize.',
        author: 'María G.',
        role: 'Grower, Jalisco',
      },
      {
        quote: 'My crops had never rooted so fast. The product pays for itself in the first harvest.',
        author: 'Carlos R.',
        role: 'Producer, Valencia',
      },
      {
        quote: 'I use it on coffee and cacao. Less water stress and more vigorous plants from transplant.',
        author: 'Ana L.',
        role: 'Producer, Antioquia',
      },
    ],
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────
  footer: {
    tagline:   'Biological solutions with real results.',
    copyright: '© 2026 Biotor Labs. All rights reserved.',
    location:  'Km 109.5 Pan-American Highway, Sébaco – San Isidro, Nicaragua',
    countries: 'Nicaragua · Guatemala · El Salvador · Honduras · Costa Rica',
    columns: [
      {
        heading: 'Company',
        links: [
          { label: 'Our Science',   href: '/#science' },
          { label: 'How It Works',  href: '/#how-it-works' },
          { label: 'About Us',      href: '/nosotros', internal: true },
        ],
      },
      {
        heading: 'Products',
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
        heading: 'Contact',
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
      tagline: 'Premium Biological Control',
      type: 'Biofungicide · Biostimulant',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'Biotor\'s selected and exclusive strain. High pathogenicity and a remarkable ability to stimulate growth. Specially designed for Rice, Sugarcane, and Peanut.',
      badges: ['Biofungicide', 'Biostimulant'],
      crops: ['Rice', 'Sugarcane', 'Peanut'],
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
      tagline: 'Trichoderma for Soil',
      type: 'Biofungicide · Biostimulant',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'Biotor\'s original Trichoderma asperellum formulation. Enhances rhizospheric microbial activity and promotes biological balance in the soil.',
      badges: ['Biofungicide', 'Biostimulant'],
      crops: ['Multiple crops'],
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
      tagline: 'Nematode Control',
      type: 'Bionematicide · Biostimulant',
      organism: 'Pochonia chlamydosporia IMI SD-187 (=BCC-201)',
      description: 'Premium biological control of phytoparasitic nematodes. High efficiency: up to 70% egg parasitism in the first cycle. Restores root health in the soil.',
      badges: ['Bionematicide', 'Biostimulant'],
      crops: ['Tomato', 'Cucumber', 'Banana', 'Others'],
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
      tagline: 'Fungus & Nematode Control',
      type: 'Biofungicide · Bionematicide · Biostimulant',
      organism: 'T. asperellum Ta.13 + P. chlamydosporia IMI SD-187',
      description: 'Dual-action microbial consortium. Combines the antifungal power of Trichoderma with Pochonia\'s nematicidal control in a single application.',
      badges: ['Biofungicide', 'Bionematicide', 'Biostimulant'],
      crops: ['Multiple crops'],
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
      type: 'Bioinsecticide · Endophyte',
      organism: 'Beauveria bassiana BCC-403 + Metarhizium anisopliae BCC-305',
      description: 'Consortium of two entomopathogenic strains for control of soil and foliage insect pests. Causes epizootics: spores spread among insects after infection.',
      badges: ['Bioinsecticide', 'Endophyte'],
      crops: ['Coffee', 'Citrus', 'Vegetables'],
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
      tagline: 'Biological Defense System',
      type: 'Triple Consortium Bioinsecticide',
      organism: 'B. bassiana BCC-411, BCC-414 + B. brongniartii BCC-405',
      description: 'Three Beauveria strains in a single product. Maximum versatility for control of coffee berry borer, Diaphorina citri, and beetles. Superior ecological plasticity.',
      badges: ['Bioinsecticide', 'Triple consortium'],
      crops: ['Coffee', 'Citrus', 'Beetles'],
      color: '#9b5de5',
      accentColor: '#e8d4ff',
      url: 'https://www.biotorlabs.com/invictus',
      imageUrl: 'https://static.wixstatic.com/media/144032_8a27a83e63964d8980d30636e6377bd9~mv2.png/v1/crop/x_239,y_0,w_762,h_1240/fill/w_395,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Invictus%20WP.png',
      contactUrl: 'https://www.biotorlabs.com/fc-in',
      featured: false,
    },
  ],
}
