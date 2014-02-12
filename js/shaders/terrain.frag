uniform float uScale;

varying float vMorphFactor;
varying vec3 vNormal;
varying vec3 vPosition;

#include colorScale.glsl

void main() {
  // Base color
  vec3 light = vec3(80.0, 150.0, 50.0);
  //vec3 color = colorForScale(uScale);
  vec3 color = vec3(0.9, 0.9, 1.0);
  //color = vec3(vMorphFactor);

  // Incident light
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  color = mix(vec3(0, 0.03, 0.1), color, incidence);

  // Mix in specular light
  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light - vPosition));
  float specular = dot(vNormal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 25.0);
  color = mix(color, vec3(0, 1.0, 1.0), 0.5 * specular);

  // Add more specular light for fun
  vec3 light2 = vec3(420.0, 510.0, 30.0);
  halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light2 - vPosition));
  specular = dot(vNormal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 3.0);
  color = mix(color, vec3(1.0, 0.3, 0), 0.5 * specular);

  vec3 light3 = vec3(0.0, 0.0, 1000.0);
  halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light3 - vPosition));
  specular = dot(vNormal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 60.0);
  color = mix(color, vec3(1.0, 1.0, 1.0), specular);

  // Add fog
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep( 300.0, 1000.0, depth );
  //fogFactor = fogFactor * ( 1.0 - clamp( ( camH - 5.0 ) / 8.0, 0.0, 1.0 ) );
  color = mix( color, vec3( 0, 0, 0 ), fogFactor );
  gl_FragColor = vec4(color, 1.0);
}
