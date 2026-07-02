uniform float uGrowthProgress;
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorTip;
uniform vec3 uColorGlow;

varying float vProgress;
varying float vGlow;
varying vec3 vPosition;

void main() {
  if (vProgress > uGrowthProgress + 0.01) discard;

  float t = smoothstep(0.0, 1.0, vProgress / max(uGrowthProgress, 0.001));
  vec3 baseColor = mix(uColorBase, uColorTip, t);

  vec3 finalColor = mix(baseColor, uColorGlow, vGlow * 0.8);

  float alpha = smoothstep(uGrowthProgress - 0.02, uGrowthProgress, vProgress);
  float finalAlpha = 1.0 - (alpha * 0.3);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
