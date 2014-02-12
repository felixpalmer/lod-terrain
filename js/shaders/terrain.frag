uniform float uScale;

varying vec3 vNormal;
varying vec3 vPosition;

#include colorScale.glsl

void main() {
  // Base color
  vec3 light = vec3(80.0, 150.0, 50.0);
  //vec3 color = colorForScale(uScale);
  vec3 color = vec3(0.9, 0.9, 1.0);

  // Incident light
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  color = mix(vec3(0, 0.1, 0.3), color, incidence);

  // Mix in specular light
  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light - vPosition));
  float specular = dot(vNormal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 25.0);
  color = mix(color, vec3(0, 1.0, 1.0), 0.5 * specular);

  gl_FragColor = vec4(color, 1.0);
}
