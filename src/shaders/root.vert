uniform float uTime;
uniform float uGrowthProgress;
uniform float uIndex;

attribute float aLength;
attribute float aBranch;

varying float vProgress;
varying float vGlow;
varying vec3 vPosition;

void main() {
  vPosition = position;

  float segmentProgress = aLength / 1.0;
  float alive = step(segmentProgress, uGrowthProgress);

  float tipGlow = smoothstep(uGrowthProgress - 0.05, uGrowthProgress, segmentProgress);
  float pulse = sin(uTime * 3.0 + uIndex * 0.7) * 0.5 + 0.5;
  vGlow = tipGlow * pulse;

  vProgress = segmentProgress;

  vec3 pos = position;
  float wave = sin(uTime * 0.8 + position.y * 2.0 + uIndex) * 0.015 * alive;
  pos.x += wave;
  pos.z += wave * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
