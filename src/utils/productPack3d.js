import * as THREE from 'three'
import { gsap } from 'gsap'
import { ASSETS } from '../config/assets'

/** Mismo orden que el carrusel de portafolio */
export const PRODUCT_PACK_IDS = [
  'trichomax-plus',
  'trichomax',
  'klamic',
  'cronox',
  'atropos',
  'invictus',
]

export const PRODUCT_PACK_URLS = PRODUCT_PACK_IDS.map((id) => ASSETS.products[id])

export const PRODUCT_PALETTE = [
  { primary: '#A8E063', accent: '#4CAF7D' },
  { primary: '#2E8B57', accent: '#A8E063' },
  { primary: '#e8a020', accent: '#ffeaaa' },
  { primary: '#2a9d8f', accent: '#a8ede8' },
  { primary: '#e76f51', accent: '#ffd4c8' },
  { primary: '#9b5de5', accent: '#e8d4ff' },
]

export const PACK_SCROLL_START = 0.68
export const BUY_SCROLL_START = 0.84
export const BIOTOR_ACTIVE_PRODUCT = 'biotor:active-product'

export function dispatchActiveProduct(index, id) {
  window.dispatchEvent(new CustomEvent(BIOTOR_ACTIVE_PRODUCT, { detail: { index, id } }))
}

export function getProductIndexFromScroll(progress, count = PRODUCT_PALETTE.length) {
  if (count <= 0) return 0
  if (progress < PACK_SCROLL_START) return 0
  const t = (progress - PACK_SCROLL_START) / (1 - PACK_SCROLL_START)
  return Math.min(count - 1, Math.max(0, Math.floor(t * count)))
}

export function getProductIndexFromUrl() {
  const pid = new URLSearchParams(window.location.search).get('product')
  const idx = PRODUCT_PACK_IDS.indexOf(pid)
  return idx >= 0 ? idx : 0
}

export function getEffectiveProductIndex(progress, carouselIndex, carouselLocked = false) {
  if (progress >= BUY_SCROLL_START && carouselLocked) return carouselIndex
  if (progress >= PACK_SCROLL_START) return getProductIndexFromScroll(progress)
  return 0
}

/** Solo para énfasis en carrusel — colores del portafolio están siempre activos */
export function getProductActiveBias(progress, carouselLocked) {
  if (carouselLocked) return 1
  if (progress >= BUY_SCROLL_START) return 0.65
  if (progress >= PACK_SCROLL_START) return 0.35
  return 0
}

export function stableParticleSlot(index, modulo) {
  return ((index * 2654435761) >>> 0) % modulo
}

function vividHex(hex, theme) {
  const c = new THREE.Color(hex)
  if (theme === 'dark') {
    c.r = Math.min(1, c.r * 1.35)
    c.g = Math.min(1, c.g * 1.35)
    c.b = Math.min(1, c.b * 1.35)
    return c
  }

  const hsl = { h: 0, s: 0, l: 0 }
  c.getHSL(hsl)
  hsl.s = Math.min(1, hsl.s * 1.15 + 0.28)
  hsl.l = Math.max(0.22, Math.min(0.4, hsl.l * 0.38))
  c.setHSL(hsl.h, hsl.s, hsl.l)
  return c
}

export function getPortfolioColorPool(theme) {
  return PRODUCT_PALETTE.flatMap(({ primary, accent }) => [
    vividHex(primary, theme),
    vividHex(accent, theme),
  ])
}

function activeProductSwatches(index, theme) {
  const { primary, accent } = PRODUCT_PALETTE[index] ?? PRODUCT_PALETTE[0]
  return [
    vividHex(primary, theme),
    vividHex(accent, theme),
    vividHex(primary, theme).lerp(vividHex(accent, theme), 0.5),
  ]
}

/** Colores del portafolio — siempre visibles, distribuidos al azar (estable por índice) */
export function buildPortfolioParticleColors(count, theme, activeIndex = 0, activeBias = 0) {
  const colors = new Float32Array(count * 3)
  const portfolioPool = getPortfolioColorPool(theme)
  const activePool = activeProductSwatches(activeIndex, theme)
  const bias = Math.max(0, Math.min(1, activeBias))

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const slot = stableParticleSlot(i, 1000) / 1000
    const useActive = bias > 0 && slot < 0.25 * bias
    const pool = useActive ? activePool : portfolioPool
    const c = pool[stableParticleSlot(i + activeIndex * 13, pool.length)]

    colors[i3] = c.r
    colors[i3 + 1] = c.g
    colors[i3 + 2] = c.b
  }

  return colors
}

export function buildBlendedParticleColors(count, theme, _influence, activeIndex = 0) {
  return buildPortfolioParticleColors(count, theme, activeIndex, 0)
}

export function getProductMyceliumColors(productIndex, theme) {
  const sw = activeProductSwatches(productIndex, theme)
  const low = sw[0].clone().multiplyScalar(theme === 'light' ? 0.92 : 0.85)
  const high = sw[1].clone().multiplyScalar(theme === 'light' ? 1.05 : 1)
  return { low: [low.r, low.g, low.b], high: [high.r, high.g, high.b] }
}

export function tweenColorAttribute(attr, targetColors, duration = 0.55) {
  if (!attr?.array || !targetColors) return null
  const from = attr.array.slice()
  const state = { t: 0 }
  return gsap.to(state, {
    t: 1,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      for (let i = 0; i < attr.array.length; i++) {
        attr.array[i] = from[i] + (targetColors[i] - from[i]) * state.t
      }
      attr.needsUpdate = true
    },
  })
}

export function tweenMyceliumColors(uniforms, target, duration = 0.55) {
  if (!uniforms?.uColorLow || !uniforms?.uColorHigh) return null
  const fromLow = uniforms.uColorLow.value.clone()
  const fromHigh = uniforms.uColorHigh.value.clone()
  const toLow = new THREE.Vector3(...target.low)
  const toHigh = new THREE.Vector3(...target.high)
  const state = { t: 0 }
  return gsap.to(state, {
    t: 1,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      uniforms.uColorLow.value.lerpVectors(fromLow, toLow, state.t)
      uniforms.uColorHigh.value.lerpVectors(fromHigh, toHigh, state.t)
    },
  })
}

export function fitTextureContain(texture, planeW, planeH) {
  const img = texture.image
  if (!img?.width || !img?.height) return

  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping

  const imgAspect = img.width / img.height
  const planeAspect = planeW / planeH

  if (imgAspect > planeAspect) {
    const repeatY = planeAspect / imgAspect
    texture.repeat.set(1, repeatY)
    texture.offset.set(0, (1 - repeatY) / 2)
  } else {
    const repeatX = imgAspect / planeAspect
    texture.repeat.set(repeatX, 1)
    texture.offset.set((1 - repeatX) / 2, 0)
  }
}

/** Shader de puntos circulares con volumen tipo esfera */
export const SPHERE_POINT_VERT = `
  precision mediump float;
  attribute vec3 aColor;
  attribute float aScale;
  uniform float uBaseSize;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uBaseSize * aScale * (280.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

export const SPHERE_POINT_FRAG = `
  precision mediump float;
  uniform float uOpacity;
  uniform float uLightMode;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    float sphere = sqrt(max(0.0, 1.0 - (d * 2.0) * (d * 2.0)));
    float shade = uLightMode > 0.5
      ? (0.88 + sphere * 0.12)
      : (0.45 + sphere * 0.65);
    vec3 col = vColor * shade;

    float edge = uLightMode > 0.5 ? 0.32 : 0.12;
    float alpha = smoothstep(0.5, edge, d) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`

export function applySphereMaterialTheme(material, theme, baseSize) {
  if (!material?.uniforms) return
  const isLight = theme === 'light'
  material.uniforms.uLightMode.value = isLight ? 1 : 0
  material.uniforms.uOpacity.value = isLight ? 0.96 : 0.82
  material.uniforms.uBaseSize.value = baseSize ?? (isLight ? 0.05 : 0.04)
  material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
  material.depthWrite = isLight
  material.needsUpdate = true
}

export function createSpherePointsMaterial(theme, baseSize = 0.045) {
  const isLight = theme === 'light'
  return new THREE.ShaderMaterial({
    vertexShader: SPHERE_POINT_VERT,
    fragmentShader: SPHERE_POINT_FRAG,
    uniforms: {
      uOpacity: { value: isLight ? 0.96 : 0.82 },
      uBaseSize: { value: baseSize },
      uLightMode: { value: isLight ? 1 : 0 },
    },
    transparent: true,
    depthWrite: isLight,
    blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
  })
}
