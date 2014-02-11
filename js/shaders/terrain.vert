uniform sampler2D uHeightData;
uniform float uScale;
uniform vec2 uOffset;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

float getHeight(vec3 p) {
  // Assume a 1024x1024 world
  float h = 1024.0 * texture2D(uHeightData, p.xy / 1024.0).a;
  h += 64.0 * texture2D(uHeightData, p.xy / 64.0).a;
  h += 4.0 * texture2D(uHeightData, p.xy / 4.0).a;
  return 0.1 * h;
}

vec3 getNormal() {
  // Get 2 vectors perpendicular to the unperturbed normal, and create at point at each (relative to position)
  //float delta = 1024.0 / 4.0;
  float delta = uScale / 32.0;
  vec3 dA = delta * normalize(cross(normal.yzx, normal));
  vec3 dB = delta * normalize(cross(dA, normal));
  vec3 p = vPosition;
  vec3 pA = vPosition + dA;
  vec3 pB = vPosition + dB;

  // Now get the height at those points
  float h = getHeight(vPosition);
  float hA = getHeight(pA);
  float hB = getHeight(pB);

  // Update the points with their correct heights and calculate true normal
  p += normal * h;
  pA += normal * hA;
  pB += normal * hB;
  return normalize(cross(pB - p, pA - p));
}

void main() {
  vPosition = uScale * position + vec3(uOffset, 0.0);
  vPosition = vPosition + normal * getHeight(vPosition);
  vNormal = getNormal();
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
