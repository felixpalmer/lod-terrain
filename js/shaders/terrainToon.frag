#extension GL_OES_standard_derivatives : enable
uniform float uScale;
uniform sampler2D uHeightData;

varying float vMorphFactor;
varying vec3 vNormal;
varying vec3 vPosition;

#include colorScale.glsl

float getHeight( vec3 p ) {
  // Assume a 1024x1024 world
  vec2 st = p.xy / 1024.0;

  // Sample multiple times to get more detail out of map
  float h = 1024.0 * texture2D(uHeightData, st).a;
  h += 64.0 * texture2D(uHeightData, 16.0 * st).a;
  //h += 4.0 * texture2D(uHeightData, 256.0 * st).a;

  // Square the height, leads to more rocky looking terrain
  return h * h / 2000.0;
}

vec3 getNormal() {
  // Differentiate the position vector (this will give us two vectors perpendicular to the surface)
  // Before differentiating, add the displacement based on the height from the height map. By doing this
  // calculation here, rather than in the vertex shader, we get a per-fragment calculated normal, rather
  // than a per-vertex normal. This improves the look of distant low-vertex terrain.
  float height = getHeight( vPosition );
  vec3 p = vec3(vPosition.xy, height);
  vec3 dPositiondx = dFdx(p);
  vec3 dPositiondy = dFdy(p);

  // The normal is the cross product of the differentials
  return normalize(cross(dPositiondx, dPositiondy));
}

void main() {
  // Base color
  vec3 light = vec3(0.0, 850.0, 50.0);
  //vec3 color = colorForScale(uScale);
  vec3 normal = getNormal();

  // Combine textures based on height and normal (use rougher normal from vertex shader)
  float texScale = 0.03;

  // Grass stick determines effect of normal on presence of grass
  float grassStick = dot( vec3( 0, 0, 1.0 ), vNormal );
  grassStick = pow( grassStick, 2.5 );
  grassStick = step( 0.2, grassStick );

  vec3 water = vec3( 0.23, 0.08, 0.345 );
  vec3 grass = vec3( 0.12, 0.87, 0.14 );
  vec3 rock = vec3( 0.31, 0.11, 0.09 );
  vec3 color = mix( water, grass, smoothstep( 7.0, 14.0, vPosition.z ) );
  color = mix( rock, color, grassStick );

  // Incident light (generate shadows and highlights)
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  float shadowFactor = pow(incidence, 0.01); // use 0.02 for cartoony shadows
  shadowFactor = 0.03 + 0.97 * shadowFactor;
  color = mix( vec3( 0, 0, 0 ), color, shadowFactor );
  color = mix( color, vec3( 0.81, 0.9, 1.0 ), 0.2 * shadowFactor );

  // Add height fog
  float fogFactor = smoothstep( 10.0, 8.0, vPosition.z );
  fogFactor = 0.83 * pow( fogFactor, 1.4 );
  //vec3 fogColor = mix( vec3( 0.86, 0.95, 1.0 ), vec3( 0.98, 0.77, 0.33), fogAngle );
  vec3 fogColor = vec3( 0.0, 0.6 + 0.4 * smoothstep( 3.0, 10.0, vPosition.z ), 0.935 );
  color = mix( color, fogColor, fogFactor );

  // Add distance fog
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  fogFactor = smoothstep( 300.0, 1000.0, depth );
  fogColor = vec3( 1.0, 0.945, 0.847 );
  color = mix( color, fogColor, fogFactor );

  gl_FragColor = vec4(color, 1.0 - fogFactor);
}
