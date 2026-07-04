export const aboutMediaVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const aboutMediaFragment = `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uContainerRes;
  uniform float uGridSize;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 texRes, vec2 containerRes) {
    float texAspect = texRes.x / texRes.y;
    float containerAspect = containerRes.x / containerRes.y;
    vec2 scale = vec2(1.0);
    if (containerAspect > texAspect) {
      scale.y = texAspect / containerAspect;
    } else {
      scale.x = containerAspect / texAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 gridUv = floor(vUv * uGridSize);
    float cells = uGridSize * uGridSize;
    float idx = gridUv.x + gridUv.y * uGridSize;
    float noise = hash(gridUv / uGridSize);
    float threshold = uProgress * cells;
    if (idx + noise * 2.0 > threshold) discard;

    vec2 uv = coverUv(vUv, uResolution, uContainerRes);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`
