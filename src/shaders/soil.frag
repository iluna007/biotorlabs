uniform sampler2D uSoilTexture;
uniform sampler2D uNoise;
uniform float uTime;
uniform float uDepth;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec2 uv = vUv;

  vec4 soil = texture2D(uSoilTexture, uv * 4.0);
  vec4 noise = texture2D(uNoise, uv * 2.0 + uTime * 0.01);

  vec3 color = mix(soil.rgb * 0.4, soil.rgb * 0.7, noise.r);

  float depthDark = 1.0 - (uDepth * 0.3);
  color *= depthDark;

  float light = dot(normalize(vNormal), normalize(vec3(1.0, 2.0, 1.0)));
  color += vec3(0.02, 0.04, 0.01) * max(light, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
