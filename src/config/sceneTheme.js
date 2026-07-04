import * as THREE from 'three'

/** Paletas del canvas WebGL — una por tema de sitio (noche / día). */
export const SCENE_THEMES = {
  dark: {
    exposure: 1.15,
    sky: '#0d1a09',
    skyAdjust: 0,
    plant: {
      stem: '#3a6b1a',
      leaf: '#4d8a22',
      node: '#5a3d15',
      dirt: '#1f1208',
    },
    roots: {
      base: '#1A5C35',
      tip: '#4CAF7D',
      glow: '#A8E063',
    },
    soilSurface: {
      dark: [0.10, 0.07, 0.02],
      light: [0.18, 0.13, 0.06],
      rim: '#0a0802',
    },
    strata: [
      { name: 'Topsoil', y: -1.5, thickness: 1.8, color: '#1e1308', line: '#3a2a18' },
      { name: 'Subsoil_A', y: -3.8, thickness: 2.2, color: '#17100a', line: '#3a2a18' },
      { name: 'Subsoil_B', y: -6.5, thickness: 3.0, color: '#120d08', line: '#3a2a18' },
      { name: 'Parent_Rock', y: -10.5, thickness: 4.0, color: '#0e0a06', line: '#3a2a18' },
      { name: 'Bedrock', y: -16.0, thickness: 6.0, color: '#0a0704', line: '#3a2a18' },
    ],
    soilParticles: ['#3d2508', '#5c3d1e', '#7a5230', '#8a6a40', '#2a1a05'],
    mycelium: {
      low: [0.30, 0.80, 0.30],
      high: [0.90, 1.00, 0.70],
    },
    lighting: {
      ambient: '#1a2a14',
      ambientMult: 1.0,
      sun: '#d4f0c0',
      sunMult: 1.0,
      rim: '#2a5a1a',
      rimMult: 1.0,
      rootGlow: '#5bcc3e',
      rootGlowMult: 1.0,
    },
  },

  light: {
    exposure: 1.22,
    sky: '#dce8df',
    skyAdjust: 0.82,
    plant: {
      stem: '#2E7D32',
      leaf: '#66BB6A',
      node: '#A1887F',
      dirt: '#8D6E63',
    },
    roots: {
      base: '#1A5C35',
      tip: '#4CAF7D',
      glow: '#A8E063',
    },
    soilSurface: {
      dark: [0.52, 0.40, 0.28],
      light: [0.72, 0.58, 0.40],
      rim: '#d4c8b0',
    },
    strata: [
      { name: 'Topsoil', y: -1.5, thickness: 1.8, color: '#C4A574', line: '#8B7355' },
      { name: 'Subsoil_A', y: -3.8, thickness: 2.2, color: '#A0826D', line: '#7D6554' },
      { name: 'Subsoil_B', y: -6.5, thickness: 3.0, color: '#8B6914', line: '#6B5344' },
      { name: 'Parent_Rock', y: -10.5, thickness: 4.0, color: '#7A5C45', line: '#5C4638' },
      { name: 'Bedrock', y: -16.0, thickness: 6.0, color: '#6B4E3D', line: '#4A3828' },
    ],
    soilParticles: ['#0a0f0a', '#080a06', '#121810', '#0f1208', '#050604'],
    mycelium: {
      low: [0.08, 0.22, 0.10],
      high: [0.18, 0.45, 0.22],
    },
    lighting: {
      ambient: '#f0f7ec',
      ambientMult: 1.35,
      sun: '#fff8e7',
      sunMult: 1.25,
      rim: '#7cb87a',
      rimMult: 0.65,
      rootGlow: '#3d9970',
      rootGlowMult: 0.85,
    },
  },
}

export function getSceneTheme(theme) {
  return SCENE_THEMES[theme === 'light' ? 'light' : 'dark']
}

export function toColor(hexOrRgb) {
  if (Array.isArray(hexOrRgb)) {
    return new THREE.Color(hexOrRgb[0], hexOrRgb[1], hexOrRgb[2])
  }
  return new THREE.Color(hexOrRgb)
}

export function applyRootColors(uniforms, theme) {
  const { roots } = getSceneTheme(theme)
  uniforms.uColorBase.value.set(roots.base)
  uniforms.uColorTip.value.set(roots.tip)
  uniforms.uColorGlow.value.set(roots.glow)
}
