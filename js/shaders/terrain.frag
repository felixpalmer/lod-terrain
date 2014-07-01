#extension GL_OES_standard_derivatives : enable
uniform float uScale;
uniform sampler2D uHeightData;

varying float vMorphFactor;
varying vec3 vNormal;
varying vec3 vPosition;

#include colorScale.glsl

float getHeight(vec3 p) {
  // Assume a 1024x1024 world
  vec2 st = p.xy / 1024.0;

  // Sample multiple times to get more detail out of map
  float h = 1024.0 * texture2D(uHeightData, st).a;
  h += 64.0 * texture2D(uHeightData, 16.0 * st).a;
  h += 4.0 * texture2D(uHeightData, 256.0 * st).a;

  // Square the height, leads to more rocky looking terrain
  return h * h / 2000.0;
}

vec3 getNormal() {
  // Differentiate the position vector (this will give us two vectors perpendicular to the surface)
  // Before differentiating, add the displacement based on the height from the height map. By doing this
  // calculation here, rather than in the vertex shader, we get a per-fragment calculated normal, rather
  // than a per-vertex normal. This improves the look of distant low-vertex terrain.
  float height = getHeight( vPosition );
  vec3 p = vec3( vPosition.xy, height );
  vec3 dPositiondx = dFdx(p);
  vec3 dPositiondy = dFdy(p);

  // The normal is the cross product of the differentials
  return normalize(cross(dPositiondx, dPositiondy));
}

void main() {
  // Base color
  vec3 light = vec3(80.0, 150.0, 50.0);
  //vec3 color = colorForScale(uScale);
  vec3 color = vec3(0.27, 0.27, 0.17);
  //color = vec3(vMorphFactor);

  vec3 normal = getNormal();

  // Incident light
  float incidence = dot(normalize(light - vPosition), normal);
  incidence = clamp(incidence, 0.0, 1.0);
  incidence = pow(incidence, 0.02);
  color = mix(vec3(0, 0, 0), color, incidence);

  // Mix in specular light
  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light - vPosition));
  float specular = dot(normal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 25.0);
  color = mix(color, vec3(0, 1.0, 1.0), 0.5 * specular);

  // Add more specular light for fun
  vec3 light2 = vec3(420.0, 510.0, 30.0);
  halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light2 - vPosition));
  specular = dot(normal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 3.0);
  color = mix(color, vec3(1.0, 0.3, 0), 0.5 * specular);

  vec3 light3 = vec3(0.0, 0.0, 1000.0);
  halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light3 - vPosition));
  specular = dot(normal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 130.0);
  color = mix(color, vec3(1.0, 0.5, 0), specular);

  // Add height fog
  float fogFactor = clamp( 1.0 - vPosition.z / 25.0, 0.0, 1.0 );
  fogFactor = pow( fogFactor, 5.4 );
  color = mix( color, vec3( 1.0, 0.9, 0.8 ), fogFactor );

  // Add distance fog
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  fogFactor = smoothstep( 300.0, 1000.0, depth );
  //fogFactor = fogFactor * ( 1.0 - clamp( ( camH - 5.0 ) / 8.0, 0.0, 1.0 ) );
  color = mix( color, vec3( 0, 0, 0 ), fogFactor );

  gl_FragColor = vec4(color, 1.0);
}
