// src/config/content.en.js
// English content aligned to Biotor Labs Marketing Strategy (DOS 12 Studio)

import { productImage } from './assets'
import { SOCIAL_BY_KEY } from './social'

export const CONTENT_EN = {

  brand: {
    name:     'Biotor Labs',
    product:  'TrichoMax+',
    tagline:  'Biological solutions with real results.',
    organism: 'Trichoderma asperellum Ta.13 (BCC-101)',
    contact:  'info@biotorlabs.com',
    location: 'Km 109.5 Pan-American Highway, Sébaco – San Isidro, Nicaragua',
    social: SOCIAL_BY_KEY,
  },

  hero: {
    titleLine1:  'With our feet',
    titleLine2:  'on the ground',
    subline1:    'High-performance agricultural biotechnology · Central America',
    subline2:    'Science that convinces · Brand that leads',
    cta:         'Explore the science ↓',
    ctaSecondary: 'Become a distributor',
  },

  statsBar: {
    stats: [
      { num: '6',   label: 'Validated bioproducts',         suffix: '' },
      { num: '5',   label: 'Countries in Central America',  suffix: '' },
      { num: '100', label: 'Strains in culture collection', suffix: '+' },
      { num: '48',  label: 'Specialized professionals',     suffix: '' },
    ],
  },

  science: {
    eyebrow: 'Technical & Scientific Education',
    title:   ['The difference is', 'in the strain.'],
    body:    'Some biologicals promise. Others deliver. The difference is in the strain. Not all Trichoderma are equal. Not all Bacillus control the same targets. At Biotor, every strain we bring to the field went through rigorous selection. We don\'t sell from a catalog. We select for performance.',
    mechanisms: [
      {
        id:    'species',
        icon:  '🧬',
        title: 'Specific species and strain',
        desc:  'A biological product\'s effectiveness depends on the specific species and strain used — not the commercial name on the label.',
      },
      {
        id:    'mechanism',
        icon:  '⚔',
        title: 'Mode of action',
        desc:  'Each strain was chosen for its proven action against the target pathogen: competition, mycoparasitism, or endophytism.',
      },
      {
        id:    'soil',
        icon:  '🌱',
        title: 'Local soil adaptation',
        desc:  'We select strains that establish in the real conditions of Central American soils — not generic lab conditions.',
      },
      {
        id:    'ufc',
        icon:  '📐',
        title: 'Viable CFU concentration',
        desc:  'Fermentation quality and the real concentration of colony-forming units at application time make the difference.',
      },
    ],
  },

  howItWorks: {
    eyebrow: 'Behind the Science',
    title:   ['Rigorous selection.', 'Field validation.'],
    steps: [
      {
        num:   '01',
        title: 'Laboratory evaluation',
        desc:  'Before it reaches your field, every strain goes through months of evaluation: selection, microscopy, technical notation, and viability testing.',
      },
      {
        num:   '02',
        title: 'Performance-based selection',
        desc:  'We don\'t sell from a catalog. We develop technology that proves its value under your crop\'s real conditions.',
      },
      {
        num:   '03',
        title: 'Field validation',
        desc:  'Trials with real crops, real growers, and verifiable data. Products aren\'t approved by marketing — they\'re approved in the field.',
      },
      {
        num:   '04',
        title: 'Ongoing technical support',
        desc:  'A genuine partnership: real support before, during, and after every application. We don\'t sell and disappear.',
      },
    ],
  },

  whyBiotor: {
    eyebrow:     'How Biotor speaks',
    title:       'Technical without arrogance.',
    titleAccent: 'Confident without pretension.',
    body:        'Biotor\'s voice is that of a passionate scientist who is also a genuine ally in the field. Technical without arrogance. Confident without pretension. Innovation with purpose. Evidence-driven, direct, and sophisticated without being distant.',
    differentiators: [
      {
        title: 'Real Science',
        body:  'Selected, validated strains with proven modes of action. Scientific terminology with clarity — never generic.',
        icon:  '🔬',
      },
      {
        title: 'Verifiable Results',
        body:  'Field trials, concrete data, verifiable testimonials. Always with data, always with evidence. Never empty promises.',
        icon:  '📊',
      },
      {
        title: 'Genuine Partnership',
        body:  'Real technical support before, during, and after every application. Respectful and close to the field — never condescending.',
        icon:  '🤝',
      },
    ],
  },

  results: {
    eyebrow: 'Evidence & Field Results',
    title:   ['Real data.', 'Verifiable results.'],
    stats: [
      { value: 78,  unit: '%', label: 'Botrytis incidence reduction' },
      { value: 70,  unit: '%', label: 'Nematode egg parasitism (1st cycle)' },
      { value: 340, unit: '%', label: 'More root biomass' },
      { value: 45,  unit: ' days', label: 'Trial evaluation period' },
    ],
    disclaimer: 'Trials conducted under real field conditions in Central America. Reference result: greenhouse tomato, Guatemala — biofungicide protocol with 3 preventive applications. Full data available for distributors and agronomists.',
    crops: ['Tomato', 'Rice', 'Sugarcane', 'Coffee'],
  },

  testimonials: {
    eyebrow: 'Field Evidence',
    title: ['Real results.', 'Real growers.'],
    items: [
      {
        quote: 'Greenhouse tomato crop with high Botrytis pressure. After 3 preventive applications: 78% reduction in incidence, no residual pressure on fruit, and zero pre-harvest interval. The grower renewed the protocol for the next cycle.',
        author: 'Reference case',
        role: 'Tomato · Guatemala',
      },
      {
        quote: 'Many biologicals on the market promise and don\'t deliver. With Biotor we have a line we can recommend with confidence — real technical support behind it and trial data backing every recommendation.',
        author: 'Strategic distributor',
        role: 'Central America',
      },
      {
        quote: 'I had tried biologicals that didn\'t work. I needed real evidence, not promises. Biotor\'s trials showed me concrete data before I changed my crop management practices.',
        author: 'Tech-savvy grower',
        role: 'Vegetables · CA',
      },
    ],
  },

  distributorCTA: {
    eyebrow:    'Distributor Attraction',
    title:      'Want to build market share with biologicals your clients can recommend with confidence?',
    body:       'We seek strategic distributors in Central America who share our technical philosophy. We partner with companies that value technical support for their growers and make decisions based on data and field results.',
    cta:        'Apply as distributor',
    ctaMailSubject: 'Apply as Biotor distributor',
    secondaryLink: 'Learn more about Biotor →',
  },

  buy: {
    eyebrow: 'TrichoMax+',
    title:   'Choose your package',
    productName: 'TrichoMax+ WP',
    productDesc: 'Biofungicide and Biostimulant based on Trichoderma asperellum Ta.13. High-concentration wettable powder (WP) formulation — exclusive strain with rigorous selection and field validation.',
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
      'Selected for performance, not catalog',
      'Field agronomic technical support',
      'Trial data available for distributors',
    ],
  },

  nav: {
    brand: 'BIOTOR',
    brandAccent: 'LABS',
    links: [
      { label: 'Real Science', href: '/#science' },
      { label: 'Behind the Science', href: '/#how-it-works' },
      { label: 'Evidence', href: '/#results' },
    ],
    about: 'About Us',
    portfolio: 'Portfolio',
    portfolioCarousel: 'View interactive carousel',
  },

  productPage: {
    breadcrumbHome: 'Home',
    breadcrumbPortfolio: 'Portfolio',
    backToCarousel: '← Back to carousel',
    overviewLabel: 'Overview',
    highlightsLabel: 'Key benefits',
    mechanismsLabel: 'Modes of action',
    applicationLabel: 'Application',
    formulationLabel: 'Formulation',
    evidenceLabel: 'Field evidence',
    contactCta: 'Contact technical team',
    contactSubject: 'Technical inquiry',
    productNavLabel: 'Product navigation',
  },

  ui: {
    scroll: 'Scroll',
    socialNavLabel: 'Biotor Labs social media',
    strainBadge: 'Ta.13 Strain (BCC-101) — Biotor Exclusive',
    cropsLabel: 'Crops:',
    viewPortfolio: 'View full details',
    learnMore: 'Learn more ↗',
    premium: '★ Premium',
    prevProduct: 'Previous product',
    nextProduct: 'Next product',
    goToProduct: (name) => `Go to ${name}`,
    themeLightOn: 'Switch to day mode',
    themeDarkOn: 'Switch to night mode',
    languageToggle: 'Change language',
    accessToolbarLabel: 'Accessibility & language',
  },

  buyCarousel: {
    eyebrow: 'Brand & Value Proposition',
    titlePrefix: 'Portfolio',
    titleAccent: 'Biotor Labs',
    subtitle: 'At Biotor we don\'t sell on price. We sell on results. Every product was selected for performance under Central America\'s real conditions.',
  },

  footer: {
    tagline:   'Biological solutions with real results.',
    copyright: '© 2026 Biotor Labs. All rights reserved.',
    location:  'Km 109.5 Pan-American Highway, Sébaco – San Isidro, Nicaragua',
    countries: 'Nicaragua · Guatemala · El Salvador · Honduras · Costa Rica',
    socialLabel: 'Social media',
    columns: [
      {
        heading: 'Company',
        links: [
          { label: 'Real Science', href: '/#science' },
          { label: 'Behind the Science', href: '/#how-it-works' },
          { label: 'About Us', href: '/nosotros', internal: true },
        ],
      },
      {
        heading: 'Products',
        links: [
          { label: 'Portfolio', href: '/#buy', internal: true },
          { label: 'TrichoMax+',  href: '/productos/trichomax-plus', internal: true },
          { label: 'TrichoMax',   href: '/productos/trichomax', internal: true },
          { label: 'Klamic',      href: '/productos/klamic', internal: true },
          { label: 'Cronox Plus', href: '/productos/cronox', internal: true },
          { label: 'Atropos',     href: '/productos/atropos', internal: true },
          { label: 'Invictus',    href: '/productos/invictus', internal: true },
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
      description: 'Biotor\'s exclusive selected strain — not sold from a catalog, but chosen for proven performance. High pathogenicity and remarkable growth stimulation. Validated on Rice, Sugarcane, and Peanut.',
      badges: ['Biofungicide', 'Biostimulant'],
      crops: ['Rice', 'Sugarcane', 'Peanut'],
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
      tagline: 'Trichoderma for Soil',
      type: 'Biofungicide · Biostimulant',
      organism: 'Trichoderma asperellum Ta.13 (=BCC-101)',
      description: 'The original formulation with Biotor\'s Ta.13 strain. Enhances rhizospheric microbial activity and promotes soil biological balance with verifiable field evidence.',
      badges: ['Biofungicide', 'Biostimulant'],
      crops: ['Multiple crops'],
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
      tagline: 'Nematode Control',
      type: 'Bionematicide · Biostimulant',
      organism: 'Pochonia chlamydosporia IMI SD-187 (=BCC-201)',
      description: 'Premium biological control of phytoparasitic nematodes with real efficacy data: up to 70% egg parasitism in the first cycle. Restores root health with technical evidence.',
      badges: ['Bionematicide', 'Biostimulant'],
      crops: ['Tomato', 'Cucumber', 'Banana', 'Others'],
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
      tagline: 'Fungal & Nematode Control',
      type: 'Biofungicide · Bionematicide · Biostimulant',
      organism: 'T. asperellum Ta.13 + P. chlamydosporia IMI SD-187',
      description: 'Dual-action microbial consortium with Biotor-selected strains. Combines antifungal and nematicidal control in one application — technology that proves its value in the field.',
      badges: ['Biofungicide', 'Bionematicide', 'Biostimulant'],
      crops: ['Multiple crops'],
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
      type: 'Bioinsecticide · Endophyte',
      organism: 'Beauveria bassiana BCC-403 + Metarhizium anisopliae BCC-305',
      description: 'Consortium of selected entomopathogenic strains for soil and foliar pest control. Strains with proven modes of action — not generic promises.',
      badges: ['Bioinsecticide', 'Endophyte'],
      crops: ['Coffee', 'Citrus', 'Vegetables'],
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
      tagline: 'Biological Defense System',
      type: 'Triple Consortium Bioinsecticide',
      organism: 'B. bassiana BCC-411, BCC-414 + B. brongniartii BCC-405',
      description: 'Three Beauveria strains in one product — maximum versatility with rigorous selection. Superior ecological plasticity for coffee borer, Diaphorina citri, and beetle control.',
      badges: ['Bioinsecticide', 'Triple consortium'],
      crops: ['Coffee', 'Citrus', 'Beetles'],
      color: '#9b5de5',
      accentColor: '#e8d4ff',
      url: 'https://www.biotorlabs.com/invictus',
      imageUrl: productImage('invictus'),
      contactUrl: 'https://www.biotorlabs.com/fc-in',
      featured: false,
    },
  ],
}
