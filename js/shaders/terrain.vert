uniform sampler2D uHeightData;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

float getHeight(vec3 p) {
  float h = 10.0 * texture2D(uHeightData, p.xy / 100.0).a;
  return h;
}

vec3 getNormal() {
  // Get 2 vectors perpendicular to the unperturbed normal, and create at point at each (relatvie to position)
  float delta = 0.01;
  vec3 dA = delta * normalize(cross(normal.yzx, normal));
  vec3 dB = delta * normalize(cross(dA, normal));
  vec3 p = position;
  vec3 pA = position + dA;
  vec3 pB = position + dB;

  // Now get the height at those points
  float h = getHeight(position);
  float hA = getHeight(pA);
  float hB = getHeight(pB);

  // Update the points with their correct heights and calculate true normal
  p += normal * h;
  pA += normal * hA;
  pB += normal * hB;
  return normalize(cross(pB - p, pA - p));
}

void main() {
  vPosition = position + normal * getHeight(position);
  vNormal = getNormal();
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
