uniform float uScale;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include colorScale.glsl

void main() {
  vec3 light = vec3(80.0, 50.0, 100.0);
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  vec3 color = colorForScale(uScale);
  color *= incidence;
  gl_FragColor = vec4(color, 1.0);
}
