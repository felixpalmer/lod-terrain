varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec3 light = vec3(0, 0.0, 100.0);
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  incidence = pow(incidence, 2.0);
  vec3 color = vec3(1.0, 1.0, 1.0);
  color *= incidence;
  gl_FragColor = vec4(color, 1.0);
}
