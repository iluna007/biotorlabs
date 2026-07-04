// src/config/assets.js
// Rutas web optimizadas — solo archivos referenciados en la app

export const ASSETS = {
  brand: {
    /** Símbolo blanco (Identidad Biotor-02) — navbar, footer, loading */
    symbolWhite: '/images/brand/logo-symbol-white.png',
    /** Símbolo verde (Identidad Biotor-01) — favicon, OG */
    symbolGreen: '/images/brand/logo-symbol-green.png',
  },

  products: {
    'trichomax-plus': '/images/products/trichomax-plus.webp',
    'trichomax':      '/images/products/trichomax.webp',
    'klamic':         '/images/products/klamic.webp',
    'cronox':         '/images/products/cronox-plus.webp',
    'atropos':        '/images/products/atropos.webp',
    'invictus':       '/images/products/invictus.webp',
  },

  hero: {
    brotes: '/images/hero/brotes-campo.webp',
  },
}

export function productImage(id) {
  return ASSETS.products[id] ?? null
}
