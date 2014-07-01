#extension GL_OES_standard_derivatives : enable
uniform float uScale;
uniform sampler2D uHeightData;

uniform sampler2D uGrass;
uniform sampler2D uRock;
uniform sampler2D uSnow;

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

  // Snow stick determines effect of normal on presence of snow
  float snowStick = dot( vec3( 0, 0, 1.0 ), normal );
  snowStick = pow( snowStick, 3.0 );
  snowStick = step( 0.2, snowStick );
  float snowAlt = 20.0;

  vec3 grass = texture2D( uGrass, texScale * vPosition.xy ).rgb;
  vec3 rock = texture2D( uRock, texScale * vPosition.xy ).rgb;
  //vec3 snow = texture2D( uSnow, texScale * vPosition.xy ).rgb;
  vec3 snow = vec3( 0.93, 0.97, 1.0 );
  //vec3 color = mix( grass, rock, smoothstep( 7.0, 14.0, vPosition.z ) );
  //vec3 color = mix( rock, snow, smoothstep( snowAlt, snowAlt + 10.0, snowAlt + snowStick * ( vPosition.z - snowAlt ) ) );
  vec3 color = mix( rock, snow, snowStick );
  //color = vec3(vMorphFactor);


  // Incident light (generate shadows and highlights)
  float incidence = dot(normalize(light - vPosition), vNormal);
  incidence = clamp(incidence, 0.0, 1.0);
  float shadowFactor = pow(incidence, 0.72);
  shadowFactor = 0.03 + 0.97 * shadowFactor;
  color = mix( vec3( 0, 0, 0 ), color, shadowFactor );
  color = mix( color, vec3( 0.81, 0.9, 1.0 ), 0.2 * shadowFactor );

  // Fade out based on distance
  //color = mix( color, vec3( 0, 0, 0 ), smoothstep( 350.0, 500.0, distance( light, vPosition ) ) );

  // Mix in specular light
  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(light - vPosition));
  float specular = dot(normal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 25.0);
  //color = mix(color, vec3(0.1, 0.8, 1.0), 0.5 * specular);

  // Add height fog
  float fogFactor = clamp( 1.0 - vPosition.z / 155.0, 0.0, 1.0 );
  fogFactor = 0.96 * pow( fogFactor, 5.4 );
  float fogAngle = dot( normalize( cameraPosition - vPosition ), normalize( vPosition - light ) );
  fogAngle = smoothstep( 0.0, 1.0, fogAngle );
  //vec3 fogColor = mix( vec3( 0.86, 0.95, 1.0 ), vec3( 0.98, 0.77, 0.33), fogAngle );
  vec3 fogColor = vec3( 0.86, 0.95, 1.0 );
  color = mix( color, fogColor, fogFactor );

  // Add distance fog
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  fogFactor = smoothstep( 300.0, 1000.0, depth );
  //fogFactor = fogFactor * ( 1.0 - clamp( ( camH - 5.0 ) / 8.0, 0.0, 1.0 ) );
  fogColor = mix( vec3( 1.0, 0.945, 0.847 ), vec3( 0.98, 0.77, 0.33), fogAngle );
  color = mix( color, fogColor, fogFactor );

  gl_FragColor = vec4(color, 1.0 - fogFactor);
}
